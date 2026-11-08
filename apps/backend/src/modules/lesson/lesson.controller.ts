import type { PracticeLessonPayload, SharedLesson } from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import lessonService from "./lesson.service.js";

export const getAll = catchAsync<{}, SharedLesson[]>(async (req, res) => {
  if (!req.user) {
    throw ApiError.UnauthorizedError();
  }
  const lessons = await lessonService.getAll(req.user);
  return res.status(200).json(lessons);
});

export const createPractice = catchAsync<{}, SharedLesson, PracticeLessonPayload>(
  async (req, res) => {
    const lesson = await lessonService.createPractice(req.body);
    return res.status(201).json(lesson);
  },
);

export const updatePractice = catchAsync<{ id: string }, SharedLesson, PracticeLessonPayload>(
  async (req, res) => {
    const lesson = await lessonService.updatePractice(
      parseId(req.params.id, "lesson id"),
      req.body,
    );
    return res.status(200).json(lesson);
  },
);

export const cancel = catchAsync<{ id: string }, SharedLesson>(async (req, res) => {
  const lesson = await lessonService.cancel(parseId(req.params.id, "lesson id"));
  return res.status(200).json(lesson);
});

export const generateTheory = catchAsync<{ id: string }, SharedLesson[]>(
  async (req, res) => {
    const lessons = await lessonService.generateTheory(parseId(req.params.id, "group id"));
    return res.status(201).json(lessons);
  },
);