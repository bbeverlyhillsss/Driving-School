import type { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/database";
import type { SharedStudent } from "@driving-school/shared";
import { studentInclude, toSharedStudent } from "./student.mapper.js";

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

export default {
  createStudentProfile,
  getAll,
};
