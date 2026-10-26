import type { SharedCategory } from '@driving-school/shared'

export interface CategoryFormValues {
  name: string
  minAge: string
  theoryHours: string
  practiceHours: string
  price: string
}

export type CategoryFormErrors = Partial<Record<keyof CategoryFormValues, string>>

export const createEmptyCategoryForm = (): CategoryFormValues => ({
  name: '',
  minAge: '',
  theoryHours: '',
  practiceHours: '',
  price: '',
})

export const toCategoryFormValues = (category: SharedCategory): CategoryFormValues => ({
  name: category.name,
  minAge: category.minAge?.toString() ?? '',
  theoryHours: category.theoryHours?.toString() ?? '',
  practiceHours: category.practiceHours?.toString() ?? '',
  price: category.price?.toString() ?? '',
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim().replace(',', '.')
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toCategoryPayloadInput = (values: CategoryFormValues) => ({
  name: values.name,
  minAge: toNumber(values.minAge),
  theoryHours: toNumber(values.theoryHours),
  practiceHours: toNumber(values.practiceHours),
  price: toNumber(values.price),
})
