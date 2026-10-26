import type { z } from 'zod'
import type { categorySchema } from '../schemas/category.schema'

export type CategoryPayload = z.infer<typeof categorySchema>

export interface SharedCategory {
  id: number
  name: string
  minAge: number | null
  theoryHours: number | null
  practiceHours: number | null
  price: number | null
}