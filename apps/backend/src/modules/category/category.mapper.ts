import type { Category } from "../../../generated/prisma/client.js";
import type { SharedCategory } from "@driving-school/shared";

export const toSharedCategory = (category: Category): SharedCategory => ({
  id: category.id,
  name: category.name,
  minAge: category.minAge,
  theoryHours: category.theoryHours,
  practiceHours: category.practiceHours,
  price: category.price?.toNumber() ?? null,
});