import { z } from 'zod'
import { StudentStatus } from '../types/student'
import { phoneSchema } from './phone.schema'

const today = (): string => new Date().toLocaleDateString('sv-SE')

const birthDateSchema = z.iso
  .date('Invalid birth date')
  .refine((value) => value >= '1900-01-01', 'Invalid birth date')
  .refine((value) => value <= today(), 'Birth date cannot be in the future')

export const studentSelfSchema = z.object({
  birthDate: birthDateSchema.nullish(),
  phone: phoneSchema.nullish(),
  address: z.string().trim().max(200, 'Address must be at most 200 characters').nullish(),
})

export const studentUpdateSchema = studentSelfSchema.extend({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be at most 100 characters'),
  status: z.enum([StudentStatus.ACTIVE, StudentStatus.GRADUATED, StudentStatus.EXPELLED]),
})