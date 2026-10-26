import { http } from '@/shared/api'
import type { CategoryPayload, SharedCategory } from '@driving-school/shared'

export const updateCategory = (id: number, payload: CategoryPayload) =>
  http.fetchFull<SharedCategory>({
    url: `/categories/${id}`,
    method: 'PUT',
    data: payload,
  })
