import { prisma } from "../../config/database.js";
import type { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import { ExamResult, LessonType, Role } from "@driving-school/shared";
import type {
  ExamPayload,
  ExamUpdatePayload,
  JwtPayload,
  SharedExam,
} from "@driving-school/shared";
import { fromDbDate, toDbDate } from "../../utils/schedule.js";
import { examInclude, toSharedExam } from "./exam.mapper.js";

const visibleTo = (user: JwtPayload): Prisma.ExamWhereInput => {
  if (user.role === Role.ADMIN) return {};
  if (user.role === Role.INSTRUCTOR) {
    return { student: { group: { instructor: { userId: user.id } } } };
  }
  return { student: { userId: user.id } };
};

const assertCanCreate = async (data: ExamPayload): Promise<void> => {
  const student = await prisma.student.findUnique({
    where: { id: data.studentId },
    select: { group: { select: { endDate: true } } },
  });
  if (!student) {
    throw ApiError.BadRequest("Student not found.");
  }
  if (!student.group) {
    throw ApiError.BadRequest("Student is not in a group.");
  }

  const sameDay = await prisma.exam.count({
    where: { studentId: data.studentId, date: toDbDate(data.date) },
  });
  if (sameDay > 0) {
    throw ApiError.BadRequest("Student already has an exam on this date.");
  }

  const attempts = await prisma.exam.findMany({
    where: { studentId: data.studentId, type: data.type },
    select: { date: true, result: true },
    orderBy: { date: "asc" },
  });
  if (attempts.some((attempt) => attempt.result === ExamResult.PASSED)) {
    throw ApiError.BadRequest("Student has already passed this exam.");
  }

  const last = attempts[attempts.length - 1];
  if (last) {
    if (last.result === null) {
      throw ApiError.BadRequest("The previous attempt has no result yet.");
    }
    if (fromDbDate(last.date) >= data.date) {
      throw ApiError.BadRequest("A retake must be scheduled after the previous attempt.");
    }
  }

  if (data.type === LessonType.THEORY) {
    if (data.date <= fromDbDate(student.group.endDate)) {
      throw ApiError.BadRequest(
        "Theory exam is available only after the group's theory course ends.",
      );
    }
    return;
  }

  const passedTheory = await prisma.exam.count({
    where: {
      studentId: data.studentId,
      type: LessonType.THEORY,
      result: ExamResult.PASSED,
      date: { lt: toDbDate(data.date) },
    },
  });
  if (passedTheory === 0) {
    throw ApiError.BadRequest("Practice exam is available only after a passed theory exam.");
  }
};

export const getAll = async (user: JwtPayload): Promise<SharedExam[]> => {
  const exams = await prisma.exam.findMany({
    where: visibleTo(user),
    include: examInclude,
    orderBy: [{ date: "desc" }, { studentId: "asc" }],
  });
  return exams.map(toSharedExam);
};

export const create = async (data: ExamPayload): Promise<SharedExam> => {
  await assertCanCreate(data);

  const exam = await prisma.exam.create({
    data: {
      studentId: data.studentId,
      type: data.type,
      date: toDbDate(data.date),
      result: data.result ?? null,
      score: data.score ?? null,
    },
    include: examInclude,
  });
  return toSharedExam(exam);
};

export const update = async (
  studentId: number,
  date: string,
  data: ExamUpdatePayload,
): Promise<SharedExam> => {
  const where: Prisma.ExamWhereUniqueInput = {
    studentId_date: { studentId, date: toDbDate(date) },
  };

  const current = await prisma.exam.findUnique({ where, select: { studentId: true } });
  if (!current) {
    throw ApiError.NotFound("Exam not found.");
  }

  const exam = await prisma.exam.update({
    where,
    data: { result: data.result ?? null, score: data.score ?? null },
    include: examInclude,
  });
  return toSharedExam(exam);
};

export const remove = async (studentId: number, date: string): Promise<void> => {
  const result = await prisma.exam.deleteMany({
    where: { studentId, date: toDbDate(date) },
  });
  if (result.count === 0) {
    throw ApiError.NotFound("Exam not found.");
  }
};

export default { getAll, create, update, remove };