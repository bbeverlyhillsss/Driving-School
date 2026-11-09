import type { PaymentPayload, SharedPayment } from "@driving-school/shared";
import ApiError from "../../exceptions/api.error.js";
import catchAsync from "../../utils/catch-async.js";
import { parseId } from "../../utils/parse-id.js";
import paymentService from "./payment.service.js";

export const getAll = catchAsync<{}, SharedPayment[]>(async (req, res) => {
  if (!req.user) {
    throw ApiError.UnauthorizedError();
  }
  const payments = await paymentService.getAll(req.user);
  return res.status(200).json(payments);
});

export const create = catchAsync<{}, SharedPayment, PaymentPayload>(async (req, res) => {
  const payment = await paymentService.create(req.body);
  return res.status(201).json(payment);
});

export const update = catchAsync<{ id: string }, SharedPayment, PaymentPayload>(
  async (req, res) => {
    const payment = await paymentService.update(
      parseId(req.params.id, "payment id"),
      req.body,
    );
    return res.status(200).json(payment);
  },
);

export const remove = catchAsync<{ id: string }>(async (req, res) => {
  await paymentService.remove(parseId(req.params.id, "payment id"));
  return res.status(204).send();
});