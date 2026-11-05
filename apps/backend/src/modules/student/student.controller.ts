import type { SharedStudent } from "@driving-school/shared";
import catchAsync from "../../utils/catch-async.js";
import studentService from "./student.service.js";

export const getAll = catchAsync<{}, SharedStudent[]>(async (req, res) => {
  const students = await studentService.getAll();
  return res.status(200).json(students);
});