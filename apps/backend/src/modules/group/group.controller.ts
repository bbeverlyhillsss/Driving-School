import type { GroupPayload, SharedGroup } from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import groupService from "./group.service.js";

export const getAll = catchAsync<{}, SharedGroup[]>(async (req, res) => {
  if (!req.user) {
    throw ApiError.UnauthorizedError();
  }
  const groups = await groupService.getAll(req.user);
  return res.status(200).json(groups);
});

export const create = catchAsync<{}, SharedGroup, GroupPayload>(async (req, res) => {
  const group = await groupService.create(req.body);
  return res.status(201).json(group);
});

export const update = catchAsync<{ id: string }, SharedGroup, GroupPayload>(
  async (req, res) => {
    const group = await groupService.update(parseId(req.params.id, "group id"), req.body);
    return res.status(200).json(group);
  },
);

export const remove = catchAsync<{ id: string }>(async (req, res) => {
  await groupService.remove(parseId(req.params.id, "group id"));
  return res.status(204).send();
});