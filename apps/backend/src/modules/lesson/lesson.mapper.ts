import type { Prisma } from "../../../generated/prisma/client.js";
import type { LessonStatus, LessonType, SharedLesson } from "@driving-school/shared";
import { fromDbDate, fromDbTime } from "../../utils/schedule.js";

export const lessonInclude = {
  instructor: { select: { id: true, fullName: true } },
  student: { select: { id: true, fullName: true } },
  group: { select: { id: true, name: true } },
  car: { select: { id: true, brand: true, model: true, plateNumber: true } },
} satisfies Prisma.LessonInclude;

type LessonWithRelations = Prisma.LessonGetPayload<{ include: typeof lessonInclude }>;

export const toSharedLesson = (lesson: LessonWithRelations): SharedLesson => ({
  id: lesson.id,
  type: lesson.type as LessonType,
  status: lesson.status as LessonStatus,
  date: fromDbDate(lesson.date),
  startTime: fromDbTime(lesson.startTime),
  endTime: fromDbTime(lesson.endTime),
  instructor: lesson.instructor,
  student: lesson.student,
  group: lesson.group,
  car: lesson.car,
});