import type { Prisma } from "../../../generated/prisma/client.js";
import type { ExamResult, LessonType, SharedExam } from "@driving-school/shared";
import { fromDbDate } from "../../utils/schedule.js";

export const examInclude = {
  student: {
    select: {
      id: true,
      fullName: true,
      group: { select: { id: true, name: true } },
    },
  },
} satisfies Prisma.ExamInclude;

type ExamWithStudent = Prisma.ExamGetPayload<{ include: typeof examInclude }>;

export const toSharedExam = (exam: ExamWithStudent): SharedExam => ({
  studentId: exam.studentId,
  date: fromDbDate(exam.date),
  type: exam.type as LessonType,
  result: exam.result as ExamResult | null,
  score: exam.score,
  student: {
    id: exam.student.id,
    fullName: exam.student.fullName,
    group: exam.student.group,
  },
});