import { prisma } from "../../config/database.js";
import type { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import {
  getPracticeEndTime,
  getWorkingDays,
  LessonStatus,
  LessonType,
  Role,
  StudentStatus,
  THEORY_LESSONS_COUNT,
  THEORY_TIME,
} from "@driving-school/shared";
import type { JwtPayload, PracticeLessonPayload, SharedLesson } from "@driving-school/shared";
import { fromDbDate, toDbDate, toDbTime, todayString } from "../../utils/schedule.js";
import { lessonInclude, toSharedLesson } from "./lesson.mapper.js";

const visibleTo = (user: JwtPayload): Prisma.LessonWhereInput => {
  if (user.role === Role.ADMIN) return {};
  if (user.role === Role.INSTRUCTOR) return { instructor: { userId: user.id } };
  return {
    OR: [
      { student: { userId: user.id } },
      { group: { students: { some: { userId: user.id } } } },
    ],
  };
};

const overlapping = (date: string, startTime: string, endTime: string): Prisma.LessonWhereInput => ({
  status: { not: LessonStatus.CANCELLED },
  date: toDbDate(date),
  startTime: { lt: toDbTime(endTime) },
  endTime: { gt: toDbTime(startTime) },
});

const isBusy = async (
  who: Prisma.LessonWhereInput,
  date: string,
  startTime: string,
  endTime: string,
  excludeId?: number,
): Promise<boolean> => {
  const count = await prisma.lesson.count({
    where: {
      AND: [
        who,
        overlapping(date, startTime, endTime),
        excludeId ? { id: { not: excludeId } } : {},
      ],
    },
  });
  return count > 0;
};

const assertPracticeAllowed = async (
  data: PracticeLessonPayload,
  excludeId?: number,
): Promise<void> => {
  if (data.date < todayString()) {
    throw ApiError.BadRequest("Practice cannot be scheduled in the past.");
  }

  const student = await prisma.student.findUnique({
    where: { id: data.studentId },
    select: {
      status: true,
      group: {
        select: {
          categoryId: true,
          endDate: true,
          category: { select: { practiceHours: true } },
        },
      },
    },
  });
  if (!student) {
    throw ApiError.BadRequest("Student not found.");
  }
  if (student.status !== StudentStatus.ACTIVE) {
    throw ApiError.BadRequest("Only active students can have lessons.");
  }
  if (!student.group) {
    throw ApiError.BadRequest("Student is not in a group.");
  }
  if (data.date <= fromDbDate(student.group.endDate)) {
    throw ApiError.BadRequest(
      "Practice is available only after the group's theory course ends.",
    );
  }

  const instructor = await prisma.instructor.findUnique({
    where: { id: data.instructorId },
    select: { categoryId: true },
  });
  if (!instructor) {
    throw ApiError.BadRequest("Instructor not found.");
  }
  if (instructor.categoryId !== student.group.categoryId) {
    throw ApiError.BadRequest("Instructor category does not match the student's group category.");
  }

  const car = await prisma.car.findUnique({
    where: { id: data.carId },
    select: { categoryId: true, inspectionDate: true },
  });
  if (!car) {
    throw ApiError.BadRequest("Car not found.");
  }
  if (car.categoryId !== student.group.categoryId) {
    throw ApiError.BadRequest("Car category does not match the student's group category.");
  }
  if (car.inspectionDate && fromDbDate(car.inspectionDate) < data.date) {
    throw ApiError.BadRequest("Car inspection is expired on the lesson date.");
  }

  const endTime = getPracticeEndTime(data.startTime);
  if (await isBusy({ instructorId: data.instructorId }, data.date, data.startTime, endTime, excludeId)) {
    throw ApiError.BadRequest("Instructor is busy at this time.");
  }
  if (await isBusy({ carId: data.carId }, data.date, data.startTime, endTime, excludeId)) {
    throw ApiError.BadRequest("Car is busy at this time.");
  }
  if (await isBusy({ studentId: data.studentId }, data.date, data.startTime, endTime, excludeId)) {
    throw ApiError.BadRequest("Student is busy at this time.");
  }

  const practiceHours = student.group.category.practiceHours;
  if (practiceHours !== null) {
    const planned = await prisma.lesson.count({
      where: {
        studentId: data.studentId,
        type: LessonType.PRACTICE,
        status: { not: LessonStatus.CANCELLED },
        id: excludeId ? { not: excludeId } : undefined,
      },
    });
    if (planned >= practiceHours) {
      throw ApiError.BadRequest("Student has reached the practice hours limit for the category.");
    }
  }
};

const toPracticeData = (data: PracticeLessonPayload) => ({
  type: LessonType.PRACTICE,
  studentId: data.studentId,
  instructorId: data.instructorId,
  carId: data.carId,
  date: toDbDate(data.date),
  startTime: toDbTime(data.startTime),
  endTime: toDbTime(getPracticeEndTime(data.startTime)),
});

export const getAll = async (user: JwtPayload): Promise<SharedLesson[]> => {
  const lessons = await prisma.lesson.findMany({
    where: visibleTo(user),
    include: lessonInclude,
    orderBy: [{ date: "asc" }, { startTime: "asc" }, { id: "asc" }],
  });
  return lessons.map(toSharedLesson);
};

export const createPractice = async (data: PracticeLessonPayload): Promise<SharedLesson> => {
  await assertPracticeAllowed(data);
  const lesson = await prisma.lesson.create({
    data: toPracticeData(data),
    include: lessonInclude,
  });
  return toSharedLesson(lesson);
};

export const updatePractice = async (
  id: number,
  data: PracticeLessonPayload,
): Promise<SharedLesson> => {
  const current = await prisma.lesson.findUnique({
    where: { id },
    select: { type: true, status: true, date: true },
  });
  if (!current) {
    throw ApiError.NotFound("Lesson not found.");
  }
  if (current.type !== LessonType.PRACTICE) {
    throw ApiError.BadRequest("Only practice lessons can be edited.");
  }
  if (current.status !== LessonStatus.PLANNED) {
    throw ApiError.BadRequest("Only planned lessons can be edited.");
  }
  if (fromDbDate(current.date) < todayString()) {
    throw ApiError.BadRequest("Past lessons cannot be edited.");
  }

  await assertPracticeAllowed(data, id);
  const lesson = await prisma.lesson.update({
    where: { id },
    data: toPracticeData(data),
    include: lessonInclude,
  });
  return toSharedLesson(lesson);
};

export const cancel = async (id: number): Promise<SharedLesson> => {
  const current = await prisma.lesson.findUnique({
    where: { id },
    select: { status: true, date: true },
  });
  if (!current) {
    throw ApiError.NotFound("Lesson not found.");
  }
  if (current.status === LessonStatus.CANCELLED) {
    throw ApiError.BadRequest("Lesson is already cancelled.");
  }
  if (fromDbDate(current.date) < todayString()) {
    throw ApiError.BadRequest("Past lessons cannot be cancelled.");
  }

  const lesson = await prisma.lesson.update({
    where: { id },
    data: { status: LessonStatus.CANCELLED },
    include: lessonInclude,
  });
  return toSharedLesson(lesson);
};

export const generateTheory = async (groupId: number): Promise<SharedLesson[]> => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: {
      shift: true,
      startDate: true,
      instructorId: true,
      _count: { select: { lessons: true } },
    },
  });
  if (!group) {
    throw ApiError.NotFound("Group not found.");
  }
  if (group._count.lessons > 0) {
    throw ApiError.BadRequest("Theory schedule already exists for this group.");
  }

  const dates = getWorkingDays(fromDbDate(group.startDate), THEORY_LESSONS_COUNT);
  const time = THEORY_TIME[group.shift];

  const clashes = await prisma.lesson.count({
    where: {
      instructorId: group.instructorId,
      status: { not: LessonStatus.CANCELLED },
      date: { in: dates.map(toDbDate) },
      startTime: { lt: toDbTime(time.end) },
      endTime: { gt: toDbTime(time.start) },
    },
  });
  if (clashes > 0) {
    throw ApiError.BadRequest("Instructor is busy during the theory schedule.");
  }

  await prisma.lesson.createMany({
    data: dates.map((date) => ({
      type: LessonType.THEORY,
      date: toDbDate(date),
      startTime: toDbTime(time.start),
      endTime: toDbTime(time.end),
      instructorId: group.instructorId,
      groupId,
    })),
  });

  const lessons = await prisma.lesson.findMany({
    where: { groupId },
    include: lessonInclude,
    orderBy: [{ date: "asc" }, { id: "asc" }],
  });
  return lessons.map(toSharedLesson);
};

export default { getAll, createPractice, updatePractice, cancel, generateTheory };