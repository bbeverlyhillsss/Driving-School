import { z } from 'zod'

export const addGroupStudentSchema = z.object({
  studentId: z.int('Student is required').positive('Student is required'),
})