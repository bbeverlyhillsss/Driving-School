import type { z } from 'zod'
import type { groupSchema } from '../schemas/group.schema'

export const GroupShift = {
  MORNING: 'MORNING',
  EVENING: 'EVENING',
} as const

export type GroupShift = (typeof GroupShift)[keyof typeof GroupShift]

export type GroupPayload = z.infer<typeof groupSchema>

export interface SharedGroup {
  id: number
  name: string
  shift: GroupShift
  startDate: string
  endDate: string
  category: { id: number; name: string }
  instructor: { id: number; fullName: string }
  studentsCount: number
  lessonsCount: number
}