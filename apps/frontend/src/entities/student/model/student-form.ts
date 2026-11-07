import type { SharedStudent } from '@driving-school/shared'

export interface StudentFormValues {
  fullName: string
  status: string
  birthDate: string
  phone: string
  address: string
}

export type StudentFormErrors = Partial<Record<keyof StudentFormValues, string>>

export const toStudentFormValues = (student: SharedStudent): StudentFormValues => ({
  fullName: student.fullName,
  status: student.status,
  birthDate: student.birthDate ?? '',
  phone: student.phone ?? '',
  address: student.address ?? '',
})

const toNullable = (value: string): string | null => {
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

export const toStudentSelfInput = (values: StudentFormValues) => ({
  birthDate: toNullable(values.birthDate),
  phone: toNullable(values.phone),
  address: toNullable(values.address),
})

export const toStudentUpdateInput = (values: StudentFormValues) => ({
  ...toStudentSelfInput(values),
  fullName: values.fullName,
  status: values.status,
})