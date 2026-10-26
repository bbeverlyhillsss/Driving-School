import type { CategoryPayload, SharedCategory } from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import categoryService from "./category.service.js";

const parseId = (value: string): number => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw ApiError.BadRequest("Invalid category id.");
  }
  return id;
};

export const getAll = catchAsync<{}, SharedCategory[]>(async (req, res) => {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
});

export const create = catchAsync<{}, SharedCategory, CategoryPayload>(
  async (req, res) => {
    const category = await categoryService.create(req.body);
    return res.status(201).json(category);
  },
);

export const update = catchAsync<
  { id: string },
  SharedCategory,
  CategoryPayload
>(async (req, res) => {
  const category = await categoryService.update(
    parseId(req.params.id),
    req.body,
  );
  return res.status(200).json(category);
});

export const remove = catchAsync<{ id: string }>(async (req, res) => {
  await categoryService.remove(parseId(req.params.id));
  return res.status(204).send();
});