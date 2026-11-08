import type { z } from 'zod'
import type { practiceLessonSchema } from '../schemas/lesson.schema'

export const LessonType = {
  THEORY: 'THEORY',
  PRACTICE: 'PRACTICE',
} as const

export type LessonType = (typeof LessonType)[keyof typeof LessonType]

export const LessonStatus = {
  PLANNED: 'PLANNED',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
} as const

export type LessonStatus = (typeof LessonStatus)[keyof typeof LessonStatus]

export type PracticeLessonPayload = z.infer<typeof practiceLessonSchema>

export interface SharedLesson {
  id: number
  type: LessonType
  status: LessonStatus
  date: string
  startTime: string
  endTime: string
  instructor: { id: number; fullName: string }
  student: { id: number; fullName: string } | null
  group: { id: number; name: string } | null
  car: { id: number; brand: string; model: string; plateNumber: string } | null
}