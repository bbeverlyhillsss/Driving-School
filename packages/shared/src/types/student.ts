export const StudentStatus = {
  ACTIVE: 'ACTIVE',
  GRADUATED: 'GRADUATED',
  EXPELLED: 'EXPELLED',
} as const

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus]

export interface SharedStudent {
  id: number
  email: string
  fullName: string
  phone: string | null
  status: StudentStatus
  group: { id: number; name: string } | null
}