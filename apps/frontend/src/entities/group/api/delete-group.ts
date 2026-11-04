import { http } from '@/shared/api'

export const deleteGroup = (id: number) =>
  http.fetchFull<void>({
    url: `/groups/${id}`,
    method: 'DELETE',
  })