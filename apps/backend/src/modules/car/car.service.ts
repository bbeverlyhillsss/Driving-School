import { prisma } from "../../config/database.js";
import { Prisma } from "../../../generated/prisma/client.js";
import ApiError from "../../exceptions/api.error.js";
import type { CarPayload, SharedCar } from "@driving-school/shared";
import { toSharedCar } from "./car.mapper.js";

const include = { category: true } satisfies Prisma.CarInclude;

const toData = (data: CarPayload) => ({
  categoryId: data.categoryId,
  brand: data.brand,
  model: data.model,
  plateNumber: data.plateNumber,
  year: data.year ?? null,
  inspectionDate: data.inspectionDate ? new Date(data.inspectionDate) : null,
});

export const getAll = async (): Promise<SharedCar[]> => {
  const cars = await prisma.car.findMany({ include, orderBy: { id: "asc" } });
  return cars.map(toSharedCar);
};

export const create = async (data: CarPayload): Promise<SharedCar> => {
  const car = await prisma.car.create({ data: toData(data), include });
  return toSharedCar(car);
};

export const update = async (id: number, data: CarPayload): Promise<SharedCar> => {
  const car = await prisma.car.update({ where: { id }, data: toData(data), include });
  return toSharedCar(car);
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prisma.car.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw ApiError.BadRequest("Cannot delete car: it has related data.");
    }
    throw error;
  }
};

export default { getAll, create, update, remove };