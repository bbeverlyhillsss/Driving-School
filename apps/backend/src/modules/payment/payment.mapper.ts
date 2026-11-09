import type { Prisma } from "../../../generated/prisma/client.js";
import type { PaymentStatus, SharedPayment } from "@driving-school/shared";
import { fromDbDate } from "../../utils/schedule.js";

export const paymentInclude = {
  student: { select: { id: true, fullName: true } },
  category: { select: { id: true, name: true } },
} satisfies Prisma.PaymentInclude;

type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: typeof paymentInclude;
}>;

export const toSharedPayment = (payment: PaymentWithRelations): SharedPayment => ({
  id: payment.id,
  amount: payment.amount.toNumber(),
  date: fromDbDate(payment.date),
  status: payment.status as PaymentStatus,
  purpose: payment.purpose,
  student: payment.student,
  category: payment.category,
});