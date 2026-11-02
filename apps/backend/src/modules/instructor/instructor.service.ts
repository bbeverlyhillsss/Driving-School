import bcrypt from "bcrypt";
import { prisma } from "../../config/database.js";
import { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import userService from "../user/user.service.js";
import { Role } from "@driving-school/shared";
import type {
  InstructorPayload,
  InstructorUpdatePayload,
  SharedInstructor,
} from "@driving-school/shared";
import { instructorInclude, toSharedInstructor } from "./instructor.mapper.js";

export const getAll = async (): Promise<SharedInstructor[]> => {
  const instructors = await prisma.instructor.findMany({
    include: instructorInclude,
    orderBy: { id: "asc" },
  });
  return instructors.map(toSharedInstructor);
};

export const create = async (data: InstructorPayload): Promise<SharedInstructor> => {
  const existingUser = await userService.findByEmail(data.email);
  if (existingUser) {
    throw ApiError.BadRequest(`User with email ${data.email} already exists.`);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const instructor = await prisma.$transaction(async (tx) => {
    const user = await userService.createUser(
      { email: data.email, passwordHash, role: Role.INSTRUCTOR },
      tx,
    );

    return tx.instructor.create({
      data: {
        userId: user.id,
        categoryId: data.categoryId,
        fullName: data.fullName,
        experienceYears: data.experienceYears ?? null,
        phone: data.phone ?? null,
      },
      include: instructorInclude,
    });
  });

  return toSharedInstructor(instructor);
};

export const update = async (
  id: number,
  data: InstructorUpdatePayload,
): Promise<SharedInstructor> => {
  const current = await prisma.instructor.findUnique({
    where: { id },
    select: { categoryId: true },
  });
  if (!current) {
    throw ApiError.NotFound("Instructor not found.");
  }

  if (current.categoryId !== data.categoryId) {
    const groupsCount = await prisma.group.count({ where: { instructorId: id } });
    if (groupsCount > 0) {
      throw ApiError.BadRequest("Cannot change category: instructor has groups.");
    }
  }

  const instructor = await prisma.instructor.update({
    where: { id },
    data: {
      categoryId: data.categoryId,
      fullName: data.fullName,
      experienceYears: data.experienceYears ?? null,
      phone: data.phone ?? null,
    },
    include: instructorInclude,
  });

  return toSharedInstructor(instructor);
};

export const remove = async (id: number): Promise<void> => {
  const instructor = await prisma.instructor.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!instructor) {
    throw ApiError.NotFound("Instructor not found.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.instructor.delete({ where: { id } });
      await tx.user.delete({ where: { id: instructor.userId } });
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw ApiError.BadRequest("Cannot delete instructor: it has related data.");
    }
    throw error;
  }
};

export default { getAll, create, update, remove };