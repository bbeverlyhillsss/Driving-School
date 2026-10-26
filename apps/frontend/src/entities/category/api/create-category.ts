import { http } from '@/shared/api'
import type { CategoryPayload, SharedCategory } from '@driving-school/shared'

export const createCategory = (payload: CategoryPayload) =>
  http.fetchFull<SharedCategory>({
    url: '/categories',
    method: 'POST',
    data: payload,
  })
