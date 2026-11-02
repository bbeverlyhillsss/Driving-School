import { http } from '@/shared/api'

export const deleteInstructor = (id: number) =>
  http.fetchFull<void>({
    url: `/instructors/${id}`,
    method: 'DELETE',
  })