import type { z } from 'zod'
import type { paymentSchema } from '../schemas/payment.schema'

export const PaymentStatus = {
  PAID: 'PAID',
  PENDING: 'PENDING',
} as const

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export type PaymentPayload = z.infer<typeof paymentSchema>

export interface SharedPayment {
  id: number
  amount: number
  date: string
  status: PaymentStatus
  purpose: string | null
  student: { id: number; fullName: string }
  category: { id: number; name: string }
}