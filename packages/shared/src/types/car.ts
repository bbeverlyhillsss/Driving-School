import type { z } from 'zod'
import type { carSchema } from '../schemas/car.schema'

export type CarPayload = z.infer<typeof carSchema>

export interface SharedCar {
  id: number
  categoryId: number
  category: { id: number; name: string }
  brand: string
  model: string
  plateNumber: string
  year: number | null
  inspectionDate: string | null
}