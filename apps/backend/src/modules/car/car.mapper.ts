import type { Prisma } from "../../../generated/prisma/client.js";
import type { SharedCar } from "@driving-school/shared";

type CarWithCategory = Prisma.CarGetPayload<{ include: { category: true } }>;

export const toSharedCar = (car: CarWithCategory): SharedCar => ({
  id: car.id,
  categoryId: car.categoryId,
  category: { id: car.category.id, name: car.category.name },
  brand: car.brand,
  model: car.model,
  plateNumber: car.plateNumber,
  year: car.year,
  inspectionDate: car.inspectionDate?.toISOString().slice(0, 10) ?? null,
});