import { http } from '@/shared/api'
import type { SharedStudent, StudentUpdatePayload } from '@driving-school/shared'

export const updateStudent = (id: number, payload: StudentUpdatePayload) =>
  http.fetchFull<SharedStudent>({
    url: `/students/${id}`,
    method: 'PUT',
    data: payload,
  })