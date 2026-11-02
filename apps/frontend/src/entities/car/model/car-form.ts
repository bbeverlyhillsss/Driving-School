import type { SharedCar } from '@driving-school/shared'

export interface CarFormValues {
  categoryId: string
  brand: string
  model: string
  plateNumber: string
  year: string
  inspectionDate: string
}

export type CarFormErrors = Partial<Record<keyof CarFormValues, string>>

export const createEmptyCarForm = (): CarFormValues => ({
  categoryId: '',
  brand: '',
  model: '',
  plateNumber: '',
  year: '',
  inspectionDate: '',
})

export const toCarFormValues = (car: SharedCar): CarFormValues => ({
  categoryId: String(car.categoryId),
  brand: car.brand,
  model: car.model,
  plateNumber: car.plateNumber,
  year: car.year?.toString() ?? '',
  inspectionDate: car.inspectionDate ?? '',
})

const toNumber = (value: string): number | undefined => {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : Number(trimmed)
}

export const toCarPayloadInput = (values: CarFormValues) => ({
  categoryId: toNumber(values.categoryId),
  brand: values.brand,
  model: values.model,
  plateNumber: values.plateNumber,
  year: toNumber(values.year) ?? null,
  inspectionDate: values.inspectionDate.trim() === '' ? null : values.inspectionDate,
})
