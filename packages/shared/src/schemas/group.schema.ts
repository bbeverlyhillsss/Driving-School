import { z } from 'zod'
import { GroupShift } from '../types/group'
import { isWorkingDay } from '../utils/work-days'

export const groupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(50, 'Name must be at most 50 characters'),
  instructorId: z.int('Instructor is required').positive('Instructor is required'),
  shift: z.enum([GroupShift.MORNING, GroupShift.EVENING], { error: 'Shift is required' }),
  startDate: z.iso
    .date('Valid start date is required')
    .refine(isWorkingDay, 'Start date must be a weekday'),
})