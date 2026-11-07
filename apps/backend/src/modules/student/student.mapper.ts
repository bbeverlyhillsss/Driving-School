import type { Prisma } from "../../../generated/prisma/client.js";
import type { SharedStudent, StudentStatus } from "@driving-school/shared";

export const studentInclude = {
  user: { select: { email: true } },
  group: { select: { id: true, name: true } },
} satisfies Prisma.StudentInclude;

type StudentWithRelations = Prisma.StudentGetPayload<{
  include: typeof studentInclude;
}>;

export const toSharedStudent = (student: StudentWithRelations): SharedStudent => ({
  id: student.id,
  email: student.user.email,
  fullName: student.fullName,
  birthDate: student.birthDate?.toISOString().slice(0, 10) ?? null,
  phone: student.phone,
  address: student.address,
  status: student.status as StudentStatus,
  group: student.group ? { id: student.group.id, name: student.group.name } : null,
});