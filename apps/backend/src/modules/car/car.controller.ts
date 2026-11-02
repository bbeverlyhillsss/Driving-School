import type { CarPayload, SharedCar } from "@driving-school/shared";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import carService from "./car.service.js";

export const getAll = catchAsync<{}, SharedCar[]>(async (req, res) => {
  const cars = await carService.getAll();
  return res.status(200).json(cars);
});

export const create = catchAsync<{}, SharedCar, CarPayload>(async (req, res) => {
  const car = await carService.create(req.body);
  return res.status(201).json(car);
});

export const update = catchAsync<{ id: string }, SharedCar, CarPayload>(
  async (req, res) => {
    const car = await carService.update(parseId(req.params.id, "car id"), req.body);
    return res.status(200).json(car);
  },
);

export const remove = catchAsync<{ id: string }>(async (req, res) => {
  await carService.remove(parseId(req.params.id, "car id"));
  return res.status(204).send();
});