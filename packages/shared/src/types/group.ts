import type { z } from 'zod'
import type { groupSchema } from '../schemas/group.schema'

export type GroupPayload = z.infer<typeof groupSchema>

export interface SharedGroup {
  id: number
  name: string
  startDate: string
  endDate: string
  category: { id: number; name: string }
  instructor: { id: number; fullName: string }
  studentsCount: number
}