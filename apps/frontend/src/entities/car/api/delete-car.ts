import { http } from '@/shared/api'

export const deleteCar = (id: number) =>
  http.fetchFull<void>({
    url: `/cars/${id}`,
    method: 'DELETE',
  })
