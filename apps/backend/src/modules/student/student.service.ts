import type { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/database";
import type { SharedStudent } from "@driving-school/shared";
import { studentInclude, toSharedStudent } from "./student.mapper.js";
import ApiError from "../../exceptions/api.error.js";
import type {
  StudentSelfPayload,
  StudentUpdatePayload,
} from "@driving-school/shared";

type PrismaTransactionClient = Prisma.TransactionClient;

interface CreateStudentProfile {
  userId: number;
  fullName: string;
}

export const createStudentProfile = async (
  data: CreateStudentProfile,
  tx?: PrismaTransactionClient,
) => {
  const client = tx ?? prisma;
  return client.student.create({
    data: {
      userId: data.userId,
      fullName: data.fullName,
      status: "ACTIVE",
    },
  });
};

export const getAll = async (): Promise<SharedStudent[]> => {
  const students = await prisma.student.findMany({
    include: studentInclude,
    orderBy: { fullName: "asc" },
  });
  return students.map(toSharedStudent);
};

const toProfileData = (data: StudentSelfPayload) => ({
  birthDate: data.birthDate ? new Date(data.birthDate) : null,
  phone: data.phone ?? null,
  address: data.address ?? null,
});

export const getByUserId = async (userId: number): Promise<SharedStudent> => {
  const student = await prisma.student.findUnique({
    where: { userId },
    include: studentInclude,
  });
  if (!student) {
    throw ApiError.NotFound("Student profile not found.");
  }
  return toSharedStudent(student);
};

export const update = async (
  id: number,
  data: StudentUpdatePayload,
): Promise<SharedStudent> => {
  const student = await prisma.student.update({
    where: { id },
    data: {
      ...toProfileData(data),
      fullName: data.fullName,
      status: data.status,
    },
    include: studentInclude,
  });
  return toSharedStudent(student);
};

export const updateSelf = async (
  userId: number,
  data: StudentSelfPayload,
): Promise<SharedStudent> => {
  const student = await prisma.student.update({
    where: { userId },
    data: toProfileData(data),
    include: studentInclude,
  });
  return toSharedStudent(student);
};

export default {
  createStudentProfile,
  getAll,
  getByUserId,
  update,
  updateSelf,
};
