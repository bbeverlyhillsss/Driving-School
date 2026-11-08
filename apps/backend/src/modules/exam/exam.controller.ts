import type {
  ExamPayload,
  ExamUpdatePayload,
  SharedExam,
} from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import examService from "./exam.service.js";

const parseDate = (value: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw ApiError.BadRequest("Invalid exam date.");
  }
  return value;
};

export const getAll = catchAsync<{}, SharedExam[]>(async (req, res) => {
  if (!req.user) {
    throw ApiError.UnauthorizedError();
  }
  const exams = await examService.getAll(req.user);
  return res.status(200).json(exams);
});

export const create = catchAsync<{}, SharedExam, ExamPayload>(async (req, res) => {
  const exam = await examService.create(req.body);
  return res.status(201).json(exam);
});

export const update = catchAsync<
  { studentId: string; date: string },
  SharedExam,
  ExamUpdatePayload
>(async (req, res) => {
  const exam = await examService.update(
    parseId(req.params.studentId, "student id"),
    parseDate(req.params.date),
    req.body,
  );
  return res.status(200).json(exam);
});

export const remove = catchAsync<{ studentId: string; date: string }>(async (req, res) => {
  await examService.remove(
    parseId(req.params.studentId, "student id"),
    parseDate(req.params.date),
  );
  return res.status(204).send();
});