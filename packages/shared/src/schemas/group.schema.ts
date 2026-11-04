import { z } from 'zod'

export const groupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(50, 'Name must be at most 50 characters'),
    instructorId: z.int('Instructor is required').positive('Instructor is required'),
    startDate: z.iso.date('Valid start date is required'),
    endDate: z.iso.date('Valid end date is required'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must not be before start date',
    path: ['endDate'],
  })