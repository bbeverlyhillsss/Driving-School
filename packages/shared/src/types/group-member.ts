import type { z } from 'zod'
import type { addGroupStudentSchema } from '../schemas/group-student.schema'
import type { StudentStatus } from './student'

export type AddGroupStudentPayload = z.infer<typeof addGroupStudentSchema>

export interface SharedGroupMember {
  id: number
  fullName: string
  email?: string
  phone?: string | null
  status?: StudentStatus
}