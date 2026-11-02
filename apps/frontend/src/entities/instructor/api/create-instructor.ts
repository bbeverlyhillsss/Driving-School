import { http } from '@/shared/api'
import type { InstructorPayload, SharedInstructor } from '@driving-school/shared'

export const createInstructor = (payload: InstructorPayload) =>
  http.fetchFull<SharedInstructor>({
    url: '/instructors',
    method: 'POST',
    data: payload,
  })