import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
  minAge: z.int('Min age must be an integer').min(14, 'Min age must be at least 14').max(100, 'Min age must be at most 100'),
  theoryHours: z.int('Theory hours must be an integer').min(0, 'Theory hours cannot be negative'),
  practiceHours: z.int('Practice hours must be an integer').min(0, 'Practice hours cannot be negative'),
  price: z.number('Price must be a number').positive('Price must be greater than 0'),
})