import type { Prisma } from "../../../generated/prisma/client.js";
import type { SharedInstructor } from "@driving-school/shared";

export const instructorInclude = {
  user: { select: { email: true } },
  category: true,
} satisfies Prisma.InstructorInclude;

type InstructorWithRelations = Prisma.InstructorGetPayload<{
  include: typeof instructorInclude;
}>;

export const toSharedInstructor = (
  instructor: InstructorWithRelations,
): SharedInstructor => ({
  id: instructor.id,
  email: instructor.user.email,
  fullName: instructor.fullName,
  categoryId: instructor.categoryId,
  category: { id: instructor.category.id, name: instructor.category.name },
  experienceYears: instructor.experienceYears,
  phone: instructor.phone,
});