import type {
  SharedStudent,
  StudentSelfPayload,
  StudentUpdatePayload,
} from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import studentService from "./student.service.js";

export const getAll = catchAsync<{}, SharedStudent[]>(async (req, res) => {
  const students = await studentService.getAll();
  return res.status(200).json(students);
});

export const getMe = catchAsync<{}, SharedStudent>(async (req, res) => {
  if (!req.user) {
    throw ApiError.UnauthorizedError();
  }
  const student = await studentService.getByUserId(req.user.id);
  return res.status(200).json(student);
});

export const updateMe = catchAsync<{}, SharedStudent, StudentSelfPayload>(
  async (req, res) => {
    if (!req.user) {
      throw ApiError.UnauthorizedError();
    }
    const student = await studentService.updateSelf(req.user.id, req.body);
    return res.status(200).json(student);
  },
);

export const update = catchAsync<{ id: string }, SharedStudent, StudentUpdatePayload>(
  async (req, res) => {
    const student = await studentService.update(
      parseId(req.params.id, "student id"),
      req.body,
    );
    return res.status(200).json(student);
  },
);