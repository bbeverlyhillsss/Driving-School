import type { AddGroupStudentPayload, SharedGroupMember } from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import groupMemberService from "./group-member.service.js";

export const getMembers = catchAsync<{ id: string }, SharedGroupMember[]>(
  async (req, res) => {
    if (!req.user) {
      throw ApiError.UnauthorizedError();
    }
    const members = await groupMemberService.getMembers(
      parseId(req.params.id, "group id"),
      req.user,
    );
    return res.status(200).json(members);
  },
);

export const addMember = catchAsync<
  { id: string },
  SharedGroupMember,
  AddGroupStudentPayload
>(async (req, res) => {
  const member = await groupMemberService.addMember(
    parseId(req.params.id, "group id"),
    req.body.studentId,
  );
  return res.status(201).json(member);
});

export const removeMember = catchAsync<{ id: string; studentId: string }>(
  async (req, res) => {
    await groupMemberService.removeMember(
      parseId(req.params.id, "group id"),
      parseId(req.params.studentId, "student id"),
    );
    return res.status(204).send();
  },
);