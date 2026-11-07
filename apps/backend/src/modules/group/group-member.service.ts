import { prisma } from "../../config/database.js";
import ApiError from "../../exceptions/api.error.js";
import { getAge } from "../../utils/get-age.js";
import { Role, StudentStatus } from "@driving-school/shared";
import type { JwtPayload, SharedGroupMember } from "@driving-school/shared";
import { visibleTo } from "./group.service.js";
import { memberInclude, toSharedGroupMember } from "./group-member.mapper.js";

const today = (): string => new Date().toLocaleDateString("sv-SE");

export const getMembers = async (
  groupId: number,
  user: JwtPayload,
): Promise<SharedGroupMember[]> => {
  const group = await prisma.group.findFirst({
    where: { AND: [{ id: groupId }, visibleTo(user)] },
    select: { id: true },
  });
  if (!group) {
    throw ApiError.NotFound("Group not found.");
  }

  const students = await prisma.student.findMany({
    where: { groupId },
    include: memberInclude,
    orderBy: { fullName: "asc" },
  });
  return students.map((student) => toSharedGroupMember(student, user.role));
};

export const addMember = async (
  groupId: number,
  studentId: number,
): Promise<SharedGroupMember> => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: {
      startDate: true,
      endDate: true,
      category: { select: { minAge: true } },
    },
  });
  if (!group) {
    throw ApiError.NotFound("Group not found.");
  }
  if (group.endDate.toISOString().slice(0, 10) < today()) {
    throw ApiError.BadRequest("Group has already ended.");
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { groupId: true, status: true, birthDate: true },
  });
  if (!student) {
    throw ApiError.BadRequest("Student not found.");
  }
  if (student.groupId !== null) {
    throw ApiError.BadRequest("Student is already in a group.");
  }
  if (student.status !== StudentStatus.ACTIVE) {
    throw ApiError.BadRequest("Only active students can be added to a group.");
  }

  const minAge = group.category.minAge;
  if (minAge !== null) {
    if (!student.birthDate) {
      throw ApiError.BadRequest("Student birth date is required to join a group.");
    }
    if (getAge(student.birthDate, group.startDate) < minAge) {
      throw ApiError.BadRequest(
        `Student must be at least ${minAge} years old on the group start date.`,
      );
    }
  }

  const result = await prisma.student.updateMany({
    where: { id: studentId, groupId: null, status: StudentStatus.ACTIVE },
    data: { groupId },
  });
  if (result.count === 0) {
    throw ApiError.BadRequest("Student is not available for this group.");
  }

  const added = await prisma.student.findUniqueOrThrow({
    where: { id: studentId },
    include: memberInclude,
  });
  return toSharedGroupMember(added, Role.ADMIN);
};

export const removeMember = async (
  groupId: number,
  studentId: number,
): Promise<void> => {
  const result = await prisma.student.updateMany({
    where: { id: studentId, groupId },
    data: { groupId: null },
  });
  if (result.count === 0) {
    throw ApiError.NotFound("Student is not in this group.");
  }
};

export default { getMembers, addMember, removeMember };