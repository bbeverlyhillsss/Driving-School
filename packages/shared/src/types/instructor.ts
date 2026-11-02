import type { z } from 'zod'
import type { instructorSchema, instructorUpdateSchema } from '../schemas/instructor.schema'

export type InstructorPayload = z.infer<typeof instructorSchema>
export type InstructorUpdatePayload = z.infer<typeof instructorUpdateSchema>

export interface SharedInstructor {
  id: number
  email: string
  fullName: string
  categoryId: number
  category: { id: number; name: string }
  experienceYears: number | null
  phone: string | null
}