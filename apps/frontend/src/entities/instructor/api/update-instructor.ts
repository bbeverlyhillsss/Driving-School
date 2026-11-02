import { http } from '@/shared/api'
import type { InstructorUpdatePayload, SharedInstructor } from '@driving-school/shared'

export const updateInstructor = (id: number, payload: InstructorUpdatePayload) =>
  http.fetchFull<SharedInstructor>({
    url: `/instructors/${id}`,
    method: 'PUT',
    data: payload,
  })