import { prisma } from "../../config/database.js";
import { LessonStatus, PaymentStatus, StudentStatus } from "@driving-school/shared";
import type { SharedOverview } from "@driving-school/shared";
import { toDbDate, todayString } from "../../utils/schedule.js";
import { lessonInclude, toSharedLesson } from "../lesson/lesson.mapper.js";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const INSPECTION_WARNING_DAYS = 30;

export const getOverview = async (): Promise<SharedOverview> => {
  const today = todayString();
  const todayDate = toDbDate(today);
  const soonDate = new Date(todayDate.getTime() + INSPECTION_WARNING_DAYS * DAY_IN_MS);
  const monthStart = toDbDate(`${today.slice(0, 7)}-01`);
  const nextMonthStart = new Date(
    Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1),
  );

  const [
    activeStudents,
    totalStudents,
    activeGroups,
    instructors,
    cars,
    lessonsToday,
    paidThisMonth,
    studentsWithoutGroup,
    carsInspectionExpired,
    carsInspectionExpiringSoon,
    groupsWithoutSchedule,
    examsAwaitingResult,
    pendingPayments,
    todayLessons,
  ] = await Promise.all([
    prisma.student.count({ where: { status: StudentStatus.ACTIVE } }),
    prisma.student.count(),
    prisma.group.count({
      where: { startDate: { lte: todayDate }, endDate: { gte: todayDate } },
    }),
    prisma.instructor.count(),
    prisma.car.count(),
    prisma.lesson.count({
      where: { date: todayDate, status: { not: LessonStatus.CANCELLED } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: PaymentStatus.PAID,
        date: { gte: monthStart, lt: nextMonthStart },
      },
    }),
    prisma.student.count({ where: { status: StudentStatus.ACTIVE, groupId: null } }),
    prisma.car.count({ where: { inspectionDate: { lt: todayDate } } }),
    prisma.car.count({ where: { inspectionDate: { gte: todayDate, lte: soonDate } } }),
    prisma.group.count({
      where: { lessons: { none: {} }, endDate: { gte: todayDate } },
    }),
    prisma.exam.count({ where: { result: null, date: { lt: todayDate } } }),
    prisma.payment.count({ where: { status: PaymentStatus.PENDING } }),
    prisma.lesson.findMany({
      where: { date: todayDate },
      include: lessonInclude,
      orderBy: [{ startTime: "asc" }, { id: "asc" }],
    }),
  ]);

  return {
    counts: {
      activeStudents,
      totalStudents,
      activeGroups,
      instructors,
      cars,
      lessonsToday,
      paidThisMonth: paidThisMonth._sum.amount?.toNumber() ?? 0,
    },
    attention: {
      studentsWithoutGroup,
      carsInspectionExpired,
      carsInspectionExpiringSoon,
      groupsWithoutSchedule,
      examsAwaitingResult,
      pendingPayments,
    },
    todayLessons: todayLessons.map(toSharedLesson),
  };
};

export default { getOverview };