import { z } from 'zod'
import { PaymentStatus } from '../types/payment'

const hasAtMostTwoDecimals = (value: number): boolean =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6

export const paymentSchema = z.object({
  studentId: z.int('Student is required').positive('Student is required'),
  categoryId: z.int('Category is required').positive('Category is required'),
  amount: z
    .number('Amount must be a number')
    .positive('Amount must be greater than 0')
    .max(1_000_000, 'Amount must be at most 1 000 000')
    .refine(hasAtMostTwoDecimals, 'Amount can have at most 2 decimal places'),
  date: z.iso.date('Valid date is required'),
  status: z.enum([PaymentStatus.PAID, PaymentStatus.PENDING], { error: 'Status is required' }),
  purpose: z.string().trim().max(200, 'Purpose must be at most 200 characters').nullish(),
})