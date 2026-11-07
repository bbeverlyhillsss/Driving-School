import { z } from 'zod'

export const phoneSchema = z
  .string()
  .trim()
  .min(7, 'Phone must be at least 7 characters')
  .max(20, 'Phone must be at most 20 characters')
  .regex(/^[\d\s()+-]+$/, 'Phone may contain only digits, spaces, +, - and parentheses')