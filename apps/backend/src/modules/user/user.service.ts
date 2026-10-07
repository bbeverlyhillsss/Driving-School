import { prisma } from "../../config/database";
import type { Prisma } from "../../../generated/prisma/client";
import { Role } from "@driving-school/shared";

type PrismaTransactionClient = Prisma.TransactionClient;

interface CreateUserInput {
  email: string;
  passwordHash: string;
  role?: Role;
}

export const createUser = async (
  data: CreateUserInput,
  tx?: PrismaTransactionClient,
) => {
  const client = tx ?? prisma;
  return client.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role ?? Role.STUDENT,
    },
  });
};

export const findByEmail = async (
  email: string,
  tx?: PrismaTransactionClient,
) => {
  const client = tx ?? prisma;
  return client.user.findUnique({ where: { email } });
};

export default {
  createUser,
  findByEmail,
};
