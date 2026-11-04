import type { Prisma } from "../../../generated/prisma/client.js";
import type { SharedGroup } from "@driving-school/shared";

export const groupInclude = {
  category: true,
  instructor: { select: { id: true, fullName: true } },
  _count: { select: { students: true } },
} satisfies Prisma.GroupInclude;

type GroupWithRelations = Prisma.GroupGetPayload<{ include: typeof groupInclude }>;

const toDateString = (date: Date): string => date.toISOString().slice(0, 10);

export const toSharedGroup = (group: GroupWithRelations): SharedGroup => ({
  id: group.id,
  name: group.name,
  startDate: toDateString(group.startDate),
  endDate: toDateString(group.endDate),
  category: { id: group.category.id, name: group.category.name },
  instructor: { id: group.instructor.id, fullName: group.instructor.fullName },
  studentsCount: group._count.students,
});