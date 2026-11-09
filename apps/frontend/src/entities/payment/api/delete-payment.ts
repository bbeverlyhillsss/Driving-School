import { http } from '@/shared/api'

export const deletePayment = (id: number) =>
  http.fetchFull<void>({
    url: `/payments/${id}`,
    method: 'DELETE',
  })