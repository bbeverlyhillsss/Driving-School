import type { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../config/database";
import { Role } from "../../../generated/prisma/client";

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

export default {
  createStudentProfile,
};
