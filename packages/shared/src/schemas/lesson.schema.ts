import { z } from 'zod'
import { PRACTICE_START_TIMES } from '../constants/schedule'
import { isWorkingDay } from '../utils/work-days'

export const practiceLessonSchema = z.object({
  studentId: z.int('Student is required').positive('Student is required'),
  instructorId: z.int('Instructor is required').positive('Instructor is required'),
  carId: z.int('Car is required').positive('Car is required'),
  date: z.iso
    .date('Valid date is required')
    .refine(isWorkingDay, 'Practice is only available on weekdays'),
  startTime: z.enum(PRACTICE_START_TIMES, { error: 'Select a time slot' }),
})