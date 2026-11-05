import { prisma } from "../../config/database.js";
import { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import { Role } from "@driving-school/shared";
import type { GroupPayload, JwtPayload, SharedGroup } from "@driving-school/shared";
import { groupInclude, toSharedGroup } from "./group.mapper.js";

export const visibleTo = (user: JwtPayload): Prisma.GroupWhereInput => {
  if (user.role === Role.ADMIN) return {};
  if (user.role === Role.INSTRUCTOR) return { instructor: { userId: user.id } };
  return { students: { some: { userId: user.id } } };
};

const findInstructor = async (instructorId: number) => {
  const instructor = await prisma.instructor.findUnique({
    where: { id: instructorId },
    select: { categoryId: true },
  });
  if (!instructor) {
    throw ApiError.BadRequest("Instructor not found.");
  }
  return instructor;
};

const assertNoOverlap = async (
  instructorId: number,
  startDate: string,
  endDate: string,
  excludeId?: number,
): Promise<void> => {
  const overlapping = await prisma.group.count({
    where: {
      instructorId,
      id: excludeId ? { not: excludeId } : undefined,
      startDate: { lte: new Date(endDate) },
      endDate: { gte: new Date(startDate) },
    },
  });
  if (overlapping > 0) {
    throw ApiError.BadRequest("Instructor already leads a group in this period.");
  }
};

export const getAll = async (user: JwtPayload): Promise<SharedGroup[]> => {
  const groups = await prisma.group.findMany({
    where: visibleTo(user),
    include: groupInclude,
    orderBy: { id: "asc" },
  });
  return groups.map(toSharedGroup);
};

export const create = async (data: GroupPayload): Promise<SharedGroup> => {
  const instructor = await findInstructor(data.instructorId);
  await assertNoOverlap(data.instructorId, data.startDate, data.endDate);

  const group = await prisma.group.create({
    data: {
      name: data.name,
      instructorId: data.instructorId,
      categoryId: instructor.categoryId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
    include: groupInclude,
  });
  return toSharedGroup(group);
};

export const update = async (id: number, data: GroupPayload): Promise<SharedGroup> => {
  const current = await prisma.group.findUnique({
    where: { id },
    select: { categoryId: true },
  });
  if (!current) {
    throw ApiError.NotFound("Group not found.");
  }

  const instructor = await findInstructor(data.instructorId);
  if (instructor.categoryId !== current.categoryId) {
    throw ApiError.BadRequest("Instructor category does not match the group category.");
  }
  await assertNoOverlap(data.instructorId, data.startDate, data.endDate, id);

  const group = await prisma.group.update({
    where: { id },
    data: {
      name: data.name,
      instructorId: data.instructorId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
    include: groupInclude,
  });
  return toSharedGroup(group);
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prisma.group.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw ApiError.BadRequest("Cannot delete group: it has students or lessons.");
    }
    throw error;
  }
};

export default { getAll, create, update, remove };