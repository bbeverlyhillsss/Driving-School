import type { z } from 'zod'
import type { examSchema, examUpdateSchema } from '../schemas/exam.schema'
import type { LessonType } from './lesson'

export const ExamResult = {
  PASSED: 'PASSED',
  FAILED: 'FAILED',
} as const

export type ExamResult = (typeof ExamResult)[keyof typeof ExamResult]

export type ExamPayload = z.infer<typeof examSchema>
export type ExamUpdatePayload = z.infer<typeof examUpdateSchema>

export interface SharedExam {
  studentId: number
  date: string
  type: LessonType
  result: ExamResult | null
  score: number | null
  student: {
    id: number
    fullName: string
    group: { id: number; name: string } | null
  }
}