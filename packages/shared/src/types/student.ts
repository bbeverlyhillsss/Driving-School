import type { z } from 'zod'
import type { studentSelfSchema, studentUpdateSchema } from '../schemas/student.schema'

export const StudentStatus = {
  ACTIVE: 'ACTIVE',
  GRADUATED: 'GRADUATED',
  EXPELLED: 'EXPELLED',
} as const

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus]

export type StudentSelfPayload = z.infer<typeof studentSelfSchema>
export type StudentUpdatePayload = z.infer<typeof studentUpdateSchema>

export interface SharedStudent {
  id: number
  email: string
  fullName: string
  birthDate: string | null
  phone: string | null
  address: string | null
  status: StudentStatus
  group: { id: number; name: string } | null
}