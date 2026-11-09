import bcrypt from "bcrypt";
import {
  ExamResult,
  getGroupEndDate,
  getPracticeEndTime,
  getWorkingDays,
  GroupShift,
  LessonStatus,
  LessonType,
  PaymentStatus,
  Role,
  StudentStatus,
  THEORY_LESSONS_COUNT,
  THEORY_TIME,
} from "@driving-school/shared";
import { env } from "../src/config/config.js";
import { prisma } from "../src/config/database.js";
import { toDbDate, toDbTime, todayString } from "../src/utils/schedule.js";
import {
  addDays,
  addWorkingDays,
  workingDayOnOrAfter,
  workingDayOnOrBefore,
} from "./demo-dates.js";

const DEMO_DOMAIN = "@drivingschool.demo";
const DEMO_PLATE_PREFIX = "DM";
const DEMO_GROUP_PREFIX = "Demo ";

interface PracticeSeed {
  studentId: number;
  instructorId: number;
  carId: number;
  date: string;
  time: string;
  cancelled: boolean;
}

const practiceLesson = (
  studentId: number,
  instructorId: number,
  carId: number,
  date: string,
  time: string,
  cancelled = false,
): PracticeSeed => ({ studentId, instructorId, carId, date, time, cancelled });

const assertNoConflicts = (items: PracticeSeed[]): void => {
  const seen = new Set<string>();

  for (const item of items) {
    if (item.cancelled) continue;

    const keys = [`instructor${item.instructorId}`, `car${item.carId}`, `student${item.studentId}`];
    for (const key of keys) {
      const slot = `${key}|${item.date}|${item.time}`;
      if (seen.has(slot)) {
        throw new Error(`Demo practice conflict: ${slot}`);
      }
      seen.add(slot);
    }
  }
};

const wipeDemoData = async (): Promise<void> => {
  const users = await prisma.user.findMany({
    where: { email: { endsWith: DEMO_DOMAIN } },
    select: { id: true },
  });
  const userIds = users.map((user) => user.id);

  const [students, instructors, groups, cars] = await Promise.all([
    prisma.student.findMany({ where: { userId: { in: userIds } }, select: { id: true } }),
    prisma.instructor.findMany({ where: { userId: { in: userIds } }, select: { id: true } }),
    prisma.group.findMany({
      where: { name: { startsWith: DEMO_GROUP_PREFIX } },
      select: { id: true },
    }),
    prisma.car.findMany({
      where: { plateNumber: { startsWith: DEMO_PLATE_PREFIX } },
      select: { id: true },
    }),
  ]);

  const studentIds = students.map((item) => item.id);
  const instructorIds = instructors.map((item) => item.id);
  const groupIds = groups.map((item) => item.id);
  const carIds = cars.map((item) => item.id);

  await prisma.$transaction([
    prisma.exam.deleteMany({ where: { studentId: { in: studentIds } } }),
    prisma.payment.deleteMany({ where: { studentId: { in: studentIds } } }),
    prisma.lesson.deleteMany({
      where: {
        OR: [
          { studentId: { in: studentIds } },
          { instructorId: { in: instructorIds } },
          { groupId: { in: groupIds } },
          { carId: { in: carIds } },
        ],
      },
    }),
    prisma.student.updateMany({ where: { groupId: { in: groupIds } }, data: { groupId: null } }),
    prisma.student.deleteMany({ where: { id: { in: studentIds } } }),
    prisma.group.deleteMany({ where: { id: { in: groupIds } } }),
    prisma.instructor.deleteMany({ where: { id: { in: instructorIds } } }),
    prisma.car.deleteMany({ where: { id: { in: carIds } } }),
    prisma.user.deleteMany({ where: { id: { in: userIds } } }),
  ]);
};

const seedDemoData = async (password: string): Promise<void> => {
  const category = await prisma.category.findUnique({ where: { name: "B" } });
  if (!category) {
    throw new Error('Category "B" not found. Run the base seed first: pnpm --filter backend seed');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const today = todayString();

  const createInstructor = async (
    name: string,
    fullName: string,
    experienceYears: number,
    phone: string,
  ) => {
    const user = await prisma.user.create({
      data: { email: `demo.instructor.${name}${DEMO_DOMAIN}`, passwordHash, role: Role.INSTRUCTOR },
    });
    return prisma.instructor.create({
      data: { userId: user.id, categoryId: category.id, fullName, experienceYears, phone },
    });
  };

  const createStudent = async (
    index: number,
    fullName: string,
    birthDate: string | null,
    status: StudentStatus,
    groupId: number | null,
  ): Promise<number> => {
    const padded = String(index).padStart(2, "0");
    const user = await prisma.user.create({
      data: { email: `demo.student${padded}${DEMO_DOMAIN}`, passwordHash, role: Role.STUDENT },
    });
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        groupId,
        fullName,
        birthDate: birthDate ? toDbDate(birthDate) : null,
        phone: `+380 50 200 00 ${padded}`,
        address: `Vinnytsia, Soborna St. ${index}`,
        status,
      },
    });
    return student.id;
  };

  const createCar = (
    plateNumber: string,
    brand: string,
    model: string,
    year: number,
    inspectionDate: string,
  ) =>
    prisma.car.create({
      data: {
        categoryId: category.id,
        plateNumber,
        brand,
        model,
        year,
        inspectionDate: toDbDate(inspectionDate),
      },
    });

  const createGroup = (name: string, shift: GroupShift, instructorId: number, startDate: string) =>
    prisma.group.create({
      data: {
        name,
        shift,
        instructorId,
        categoryId: category.id,
        startDate: toDbDate(startDate),
        endDate: toDbDate(getGroupEndDate(startDate)),
      },
    });

  const createTheory = async (
    groupId: number,
    instructorId: number,
    shift: GroupShift,
    startDate: string,
  ): Promise<void> => {
    const time = THEORY_TIME[shift];
    await prisma.lesson.createMany({
      data: getWorkingDays(startDate, THEORY_LESSONS_COUNT).map((date) => ({
        type: LessonType.THEORY,
        date: toDbDate(date),
        startTime: toDbTime(time.start),
        endTime: toDbTime(time.end),
        instructorId,
        groupId,
      })),
    });
  };

  const exam = (
    studentId: number,
    date: string,
    type: LessonType,
    result: ExamResult | null,
    score: number | null,
  ) => ({ studentId, date: toDbDate(date), type, result, score });

  const payment = (
    studentId: number,
    amount: number,
    date: string,
    status: PaymentStatus,
    purpose: string,
  ) => ({ studentId, categoryId: category.id, amount, date: toDbDate(date), status, purpose });

  const ivan = await createInstructor("ivan", "Ivan Marchenko", 12, "+380 67 111 11 01");
  const olena = await createInstructor("olena", "Olena Savchenko", 8, "+380 67 111 11 02");
  const taras = await createInstructor("taras", "Taras Bondar", 5, "+380 67 111 11 03");

  await createCar("DM1001AA", "Volkswagen", "Golf", 2021, addDays(today, -20));
  const carSoon = await createCar("DM1002AA", "Skoda", "Fabia", 2020, addDays(today, 15));
  const carOk = await createCar("DM1003AA", "Toyota", "Yaris", 2022, addDays(today, 200));

  const finishedStart = addWorkingDays(
    workingDayOnOrBefore(addDays(today, -28)),
    -(THEORY_LESSONS_COUNT - 1),
  );
  const finishedEnd = getGroupEndDate(finishedStart);
  const runningStart = addWorkingDays(workingDayOnOrBefore(today), -8);
  const upcomingStart = workingDayOnOrAfter(addDays(today, 7));

  const finished = await createGroup(
    "Demo B Morning (finished)",
    GroupShift.MORNING,
    ivan.id,
    finishedStart,
  );
  const running = await createGroup(
    "Demo B Evening (in progress)",
    GroupShift.EVENING,
    olena.id,
    runningStart,
  );
  await createGroup("Demo B Morning (upcoming)", GroupShift.MORNING, ivan.id, upcomingStart);

  await createTheory(finished.id, ivan.id, GroupShift.MORNING, finishedStart);
  await createTheory(running.id, olena.id, GroupShift.EVENING, runningStart);

  const active = StudentStatus.ACTIVE;
  const maksym = await createStudent(1, "Maksym Bondarenko", "2001-03-14", StudentStatus.GRADUATED, finished.id);
  const olha = await createStudent(2, "Olha Kovalenko", "2002-08-25", active, finished.id);
  const andrii = await createStudent(3, "Andrii Melnyk", "2000-10-05", active, finished.id);
  const sofiia = await createStudent(4, "Sofiia Shevchenko", "2003-02-17", active, finished.id);

  const dmytro = await createStudent(5, "Dmytro Tkachenko", "2002-05-21", active, running.id);
  const iryna = await createStudent(6, "Iryna Kravchuk", "2003-09-02", active, running.id);
  const bohdan = await createStudent(7, "Bohdan Lysenko", "2000-12-11", active, running.id);
  const kateryna = await createStudent(8, "Kateryna Polishchuk", "2004-01-30", active, running.id);
  const yurii = await createStudent(9, "Yurii Moroz", "1999-07-19", active, running.id);

  const anna = await createStudent(10, "Anna Rudenko", "2005-04-08", active, null);
  await createStudent(11, "Viktor Hnatiuk", null, active, null);
  await createStudent(12, "Roman Kovalchuk", "2001-11-23", StudentStatus.EXPELLED, null);

  const afterCourse = (days: number): string => addWorkingDays(finishedEnd, days);

  const practice: PracticeSeed[] = [
    ...[3, 4, 5, 6].map((n) => practiceLesson(maksym, taras.id, carOk.id, afterCourse(n), "07:00")),
    ...[3, 4, 5].map((n) => practiceLesson(olha, taras.id, carOk.id, afterCourse(n), "08:00")),
    practiceLesson(olha, taras.id, carOk.id, afterCourse(6), "08:00", true),
    practiceLesson(
      olha,
      ivan.id,
      carSoon.id,
      workingDayOnOrAfter(addDays(today, 1)),
      "09:00",
    ),
    ...[7, 8].map((n) => practiceLesson(andrii, taras.id, carOk.id, afterCourse(n), "07:00")),
    practiceLesson(sofiia, taras.id, carOk.id, afterCourse(4), "09:00"),
  ];
  assertNoConflicts(practice);

  await prisma.lesson.createMany({
    data: practice.map((item) => ({
      type: LessonType.PRACTICE,
      studentId: item.studentId,
      instructorId: item.instructorId,
      carId: item.carId,
      date: toDbDate(item.date),
      startTime: toDbTime(item.time),
      endTime: toDbTime(getPracticeEndTime(item.time)),
      status: item.cancelled ? LessonStatus.CANCELLED : LessonStatus.PLANNED,
    })),
  });

  await prisma.exam.createMany({
    data: [
      exam(maksym, afterCourse(2), LessonType.THEORY, ExamResult.PASSED, 92),
      exam(maksym, afterCourse(12), LessonType.PRACTICE, ExamResult.PASSED, 88),
      exam(olha, afterCourse(2), LessonType.THEORY, ExamResult.PASSED, 85),
      exam(olha, afterCourse(13), LessonType.PRACTICE, ExamResult.FAILED, 55),
      exam(olha, workingDayOnOrAfter(addDays(today, 7)), LessonType.PRACTICE, null, null),
      exam(andrii, afterCourse(2), LessonType.THEORY, ExamResult.FAILED, 48),
      exam(andrii, afterCourse(7), LessonType.THEORY, ExamResult.PASSED, 70),
      exam(sofiia, afterCourse(3), LessonType.THEORY, null, null),
    ],
  });

  const paid = PaymentStatus.PAID;
  const pending = PaymentStatus.PENDING;
  await prisma.payment.createMany({
    data: [
      payment(maksym, 15000, addDays(finishedStart, -3), paid, "Course fee, category B"),
      payment(olha, 7500, addDays(finishedStart, -2), paid, "Installment 1 of 2"),
      payment(olha, 7500, addDays(today, 5), pending, "Installment 2 of 2"),
      payment(andrii, 15000, addDays(finishedStart, -1), paid, "Course fee, category B"),
      payment(sofiia, 5000, finishedStart, paid, "Prepayment"),
      payment(dmytro, 15000, addDays(runningStart, -2), paid, "Course fee, category B"),
      payment(iryna, 8000, today, paid, "Installment 1 of 2"),
      payment(bohdan, 15000, addDays(today, 3), pending, "Course fee, category B"),
      payment(kateryna, 15000, addDays(runningStart, -1), paid, "Course fee, category B"),
      payment(yurii, 15000, runningStart, paid, "Course fee, category B"),
      payment(anna, 3000, addDays(today, -2), paid, "Prepayment, no group yet"),
    ],
  });

  console.log("Demo data created (the password is DEMO_PASSWORD from .env).");
  console.log(`Instructors: demo.instructor.ivan|olena|taras${DEMO_DOMAIN}`);
  console.log(`Students: demo.student01..demo.student12${DEMO_DOMAIN}`);
  console.log(
    `Groups: ${finishedStart}..${finishedEnd} (finished), ${runningStart} (in progress), ${upcomingStart} (upcoming, no schedule)`,
  );
};

const main = async (): Promise<void> => {
  if (env.NODE_ENV === "production") {
    throw new Error("seed:demo is disabled in production.");
  }
  if (!env.DEMO_PASSWORD) {
    throw new Error("DEMO_PASSWORD is not set in .env (at least 8 characters).");
  }

  await wipeDemoData();
  await seedDemoData(env.DEMO_PASSWORD);
};

main()
  .catch((error) => {
    console.error("Demo seeding failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());