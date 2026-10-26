import { prisma } from "../../config/database.js";
import { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import type { CategoryPayload, SharedCategory } from "@driving-school/shared";
import { toSharedCategory } from "./category.mapper.js";

export const getAll = async (): Promise<SharedCategory[]> => {
  const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
  return categories.map(toSharedCategory);
};

export const create = async (data: CategoryPayload): Promise<SharedCategory> => {
  const category = await prisma.category.create({ data });
  return toSharedCategory(category);
};

export const update = async (
  id: number,
  data: CategoryPayload,
): Promise<SharedCategory> => {
  const category = await prisma.category.update({ where: { id }, data });
  return toSharedCategory(category);
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw ApiError.BadRequest("Cannot delete category: it has related data.");
    }
    throw error;
  }
};

export default { getAll, create, update, remove };