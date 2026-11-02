import type {
  InstructorPayload,
  InstructorUpdatePayload,
  SharedInstructor,
} from "@driving-school/shared";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import instructorService from "./instructor.service.js";

export const getAll = catchAsync<{}, SharedInstructor[]>(async (req, res) => {
  const instructors = await instructorService.getAll();
  return res.status(200).json(instructors);
});

export const create = catchAsync<{}, SharedInstructor, InstructorPayload>(
  async (req, res) => {
    const instructor = await instructorService.create(req.body);
    return res.status(201).json(instructor);
  },
);

export const update = catchAsync<
  { id: string },
  SharedInstructor,
  InstructorUpdatePayload
>(async (req, res) => {
  const instructor = await instructorService.update(
    parseId(req.params.id, "instructor id"),
    req.body,
  );
  return res.status(200).json(instructor);
});

export const remove = catchAsync<{ id: string }>(async (req, res) => {
  await instructorService.remove(parseId(req.params.id, "instructor id"));
  return res.status(204).send();
});