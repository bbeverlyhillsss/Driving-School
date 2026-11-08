import { z } from 'zod'
import { ExamResult } from '../types/exam'
import { LessonType } from '../types/lesson'

const resultSchema = z
  .enum([ExamResult.PASSED, ExamResult.FAILED], { error: 'Invalid result' })
  .nullish()

const scoreSchema = z
  .int('Score must be an integer')
  .min(0, 'Score cannot be negative')
  .max(100, 'Score must be at most 100')
  .nullish()

const scoreNeedsResult = (data: { result?: string | null; score?: number | null }): boolean =>
  data.score == null || data.result != null

export const examUpdateSchema = z
  .object({
    result: resultSchema,
    score: scoreSchema,
  })
  .refine(scoreNeedsResult, { message: 'Score requires a result', path: ['score'] })

export const examSchema = z
  .object({
    studentId: z.int('Student is required').positive('Student is required'),
    type: z.enum([LessonType.THEORY, LessonType.PRACTICE], { error: 'Exam type is required' }),
    date: z.iso.date('Valid date is required'),
    result: resultSchema,
    score: scoreSchema,
  })
  .refine(scoreNeedsResult, { message: 'Score requires a result', path: ['score'] })