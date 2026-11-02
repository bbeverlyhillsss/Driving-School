import ApiError from "../exceptions/api.error.js";

export const parseId = (value: string, name = "id"): number => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw ApiError.BadRequest(`Invalid ${name}.`);
  }
  return id;
};