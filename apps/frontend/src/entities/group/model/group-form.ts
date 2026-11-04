import type { SharedGroup } from '@driving-school/shared'

export interface GroupFormValues {
  name: string
  instructorId: string
  startDate: string
  endDate: string
}

export type GroupFormErrors = Partial<Record<keyof GroupFormValues, string>>

export const createEmptyGroupForm = (): GroupFormValues => ({
  name: '',
  instructorId: '',
  startDate: '',
  endDate: '',
})

export const toGroupFormValues = (group: SharedGroup): GroupFormValues => ({
  name: group.name,
  instructorId: String(group.instructor.id),
  startDate: group.startDate,
  endDate: group.endDate,
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toGroupPayloadInput = (values: GroupFormValues) => ({
  name: values.name,
  instructorId: toNumber(values.instructorId),
  startDate: values.startDate,
  endDate: values.endDate,
})