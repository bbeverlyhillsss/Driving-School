import type { SharedInstructor } from '@driving-school/shared'

export interface InstructorFormValues {
  email: string
  password: string
  fullName: string
  categoryId: string
  experienceYears: string
  phone: string
}

export type InstructorFormErrors = Partial<Record<keyof InstructorFormValues, string>>

export const createEmptyInstructorForm = (): InstructorFormValues => ({
  email: '',
  password: '',
  fullName: '',
  categoryId: '',
  experienceYears: '',
  phone: '',
})

export const toInstructorFormValues = (instructor: SharedInstructor): InstructorFormValues => ({
  email: instructor.email,
  password: '',
  fullName: instructor.fullName,
  categoryId: String(instructor.categoryId),
  experienceYears: instructor.experienceYears?.toString() ?? '',
  phone: instructor.phone ?? '',
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toInstructorUpdateInput = (values: InstructorFormValues) => ({
  fullName: values.fullName,
  categoryId: toNumber(values.categoryId),
  experienceYears: toNumber(values.experienceYears) ?? null,
  phone: values.phone.trim() === '' ? null : values.phone,
})

export const toInstructorCreateInput = (values: InstructorFormValues) => ({
  ...toInstructorUpdateInput(values),
  email: values.email.trim(),
  password: values.password,
})
