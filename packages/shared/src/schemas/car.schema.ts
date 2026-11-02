import { z } from 'zod'

const MIN_YEAR = 2000
const currentYear = new Date().getFullYear()

export const carSchema = z.object({
  categoryId: z.int('Category is required').positive('Category is required'),
  brand: z.string().trim().min(1, 'Brand is required').max(50, 'Brand must be at most 50 characters'),
  model: z.string().trim().min(1, 'Model is required').max(50, 'Model must be at most 50 characters'),
  plateNumber: z
    .string()
    .transform((value) => value.replace(/\s+/g, '').toUpperCase())
    .pipe(
      z
        .string()
        .min(4, 'Plate number must be at least 4 characters')
        .max(10, 'Plate number must be at most 10 characters')
        .regex(/^[\p{L}\p{N}]+$/u, 'Plate number may contain only letters and digits'),
    ),
  year: z
    .int('Year must be an integer')
    .min(MIN_YEAR, `Year must be at least ${MIN_YEAR}`)
    .max(currentYear, `Year must be at most ${currentYear}`)
    .nullish(),
  inspectionDate: z.iso.date('Invalid inspection date').nullish(),
})