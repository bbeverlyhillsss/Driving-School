import { z } from 'zod'

const phoneSchema = z
  .string()
  .trim()
  .min(7, 'Phone must be at least 7 characters')
  .max(20, 'Phone must be at most 20 characters')
  .regex(/^[\d\s()+-]+$/, 'Phone may contain only digits, spaces, +, - and parentheses')

const instructorProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be at most 100 characters'),
  categoryId: z.int('Category is required').positive('Category is required'),
  experienceYears: z
    .int('Experience must be an integer')
    .min(0, 'Experience cannot be negative')
    .max(60, 'Experience must be at most 60 years')
    .nullish(),
  phone: phoneSchema.nullish(),
})

export const instructorSchema = instructorProfileSchema.extend({
  email: z.email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be at most 72 characters'),
})

export const instructorUpdateSchema = instructorProfileSchema