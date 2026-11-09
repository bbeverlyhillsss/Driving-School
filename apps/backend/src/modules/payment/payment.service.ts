import { prisma } from "../../config/database.js";
import ApiError from "../../exceptions/api.error.js";
import { Role } from "@driving-school/shared";
import type { JwtPayload, PaymentPayload, SharedPayment } from "@driving-school/shared";
import { toDbDate } from "../../utils/schedule.js";
import { paymentInclude, toSharedPayment } from "./payment.mapper.js";

const assertRelationsExist = async (
  studentId: number,
  categoryId: number,
): Promise<void> => {
  const [students, categories] = await Promise.all([
    prisma.student.count({ where: { id: studentId } }),
    prisma.category.count({ where: { id: categoryId } }),
  ]);
  if (students === 0) {
    throw ApiError.BadRequest("Student not found.");
  }
  if (categories === 0) {
    throw ApiError.BadRequest("Category not found.");
  }
};

const toData = (data: PaymentPayload) => ({
  studentId: data.studentId,
  categoryId: data.categoryId,
  amount: data.amount,
  date: toDbDate(data.date),
  status: data.status,
  purpose: data.purpose || null,
});

export const getAll = async (user: JwtPayload): Promise<SharedPayment[]> => {
  const payments = await prisma.payment.findMany({
    where: user.role === Role.ADMIN ? {} : { student: { userId: user.id } },
    include: paymentInclude,
    orderBy: [{ date: "desc" }, { id: "desc" }],
  });
  return payments.map(toSharedPayment);
};

export const create = async (data: PaymentPayload): Promise<SharedPayment> => {
  await assertRelationsExist(data.studentId, data.categoryId);

  const payment = await prisma.payment.create({
    data: toData(data),
    include: paymentInclude,
  });
  return toSharedPayment(payment);
};

export const update = async (id: number, data: PaymentPayload): Promise<SharedPayment> => {
  const current = await prisma.payment.findUnique({ where: { id }, select: { id: true } });
  if (!current) {
    throw ApiError.NotFound("Payment not found.");
  }

  await assertRelationsExist(data.studentId, data.categoryId);

  const payment = await prisma.payment.update({
    where: { id },
    data: toData(data),
    include: paymentInclude,
  });
  return toSharedPayment(payment);
};

export const remove = async (id: number): Promise<void> => {
  await prisma.payment.delete({ where: { id } });
};

export default { getAll, create, update, remove };