import { GroupShift } from '@driving-school/shared'
import type { SharedGroup } from '@driving-school/shared'

export interface GroupFormValues {
  name: string
  instructorId: string
  shift: string
  startDate: string
}

export type GroupFormErrors = Partial<Record<keyof GroupFormValues, string>>

export const createEmptyGroupForm = (): GroupFormValues => ({
  name: '',
  instructorId: '',
  shift: GroupShift.MORNING,
  startDate: '',
})

export const toGroupFormValues = (group: SharedGroup): GroupFormValues => ({
  name: group.name,
  instructorId: String(group.instructor.id),
  shift: group.shift,
  startDate: group.startDate,
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toGroupPayloadInput = (values: GroupFormValues) => ({
  name: values.name,
  instructorId: toNumber(values.instructorId),
  shift: values.shift,
  startDate: values.startDate,
})