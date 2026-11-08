import type { Prisma } from "../../../generated/prisma/client.js";
import type { GroupShift, SharedGroup } from "@driving-school/shared";
import { fromDbDate } from "../../utils/schedule.js";

export const groupInclude = {
  category: true,
  instructor: { select: { id: true, fullName: true } },
  _count: { select: { students: true, lessons: true } },
} satisfies Prisma.GroupInclude;

type GroupWithRelations = Prisma.GroupGetPayload<{ include: typeof groupInclude }>;

export const toSharedGroup = (group: GroupWithRelations): SharedGroup => ({
  id: group.id,
  name: group.name,
  shift: group.shift as GroupShift,
  startDate: fromDbDate(group.startDate),
  endDate: fromDbDate(group.endDate),
  category: { id: group.category.id, name: group.category.name },
  instructor: { id: group.instructor.id, fullName: group.instructor.fullName },
  studentsCount: group._count.students,
  lessonsCount: group._count.lessons,
});