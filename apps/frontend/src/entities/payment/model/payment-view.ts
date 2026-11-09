import { PaymentStatus } from '@driving-school/shared'
import type { SharedPayment } from '@driving-school/shared'

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  [PaymentStatus.PAID]: 'Paid',
  [PaymentStatus.PENDING]: 'Pending',
}

export const PAYMENT_STATUS_OPTIONS = Object.values(PaymentStatus).map((value) => ({
  value,
  label: PAYMENT_STATUS_LABEL[value],
}))

export const formatPaymentDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

export const formatAmount = (value: number): string =>
  new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(value)

const sumByStatus = (items: SharedPayment[], status: PaymentStatus): number =>
  items.filter((item) => item.status === status).reduce((sum, item) => sum + item.amount, 0)

export const getPaidTotal = (items: SharedPayment[]): number =>
  sumByStatus(items, PaymentStatus.PAID)

export const getPendingTotal = (items: SharedPayment[]): number =>
  sumByStatus(items, PaymentStatus.PENDING)