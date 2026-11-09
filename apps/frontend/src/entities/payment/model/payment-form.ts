import { PaymentStatus } from '@driving-school/shared'
import type { SharedPayment } from '@driving-school/shared'

export interface PaymentFormValues {
  studentId: string
  categoryId: string
  amount: string
  date: string
  status: string
  purpose: string
}

export type PaymentFormErrors = Partial<Record<keyof PaymentFormValues, string>>

export const createEmptyPaymentForm = (): PaymentFormValues => ({
  studentId: '',
  categoryId: '',
  amount: '',
  date: new Date().toLocaleDateString('sv-SE'),
  status: PaymentStatus.PAID,
  purpose: '',
})

export const toPaymentFormValues = (payment: SharedPayment): PaymentFormValues => ({
  studentId: String(payment.student.id),
  categoryId: String(payment.category.id),
  amount: String(payment.amount),
  date: payment.date,
  status: payment.status,
  purpose: payment.purpose ?? '',
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim().replace(',', '.')
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toPaymentPayloadInput = (values: PaymentFormValues) => ({
  studentId: toNumber(values.studentId),
  categoryId: toNumber(values.categoryId),
  amount: toNumber(values.amount),
  date: values.date,
  status: values.status,
  purpose: values.purpose.trim() === '' ? null : values.purpose,
})