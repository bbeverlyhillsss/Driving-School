import type { Prisma } from "../../../generated/prisma/client.js";
import { Role } from "@driving-school/shared";
import type { SharedGroupMember, StudentStatus } from "@driving-school/shared";

export const memberInclude = {
  user: { select: { email: true } },
} satisfies Prisma.StudentInclude;

type StudentWithUser = Prisma.StudentGetPayload<{ include: typeof memberInclude }>;

export const toSharedGroupMember = (
  student: StudentWithUser,
  role: Role,
): SharedGroupMember => {
  const base = { id: student.id, fullName: student.fullName };

  if (role === Role.ADMIN) {
    return {
      ...base,
      email: student.user.email,
      phone: student.phone,
      status: student.status as StudentStatus,
    };
  }

  if (role === Role.INSTRUCTOR) {
    return {
      ...base,
      phone: student.phone,
      status: student.status as StudentStatus,
    };
  }

  return base;
};