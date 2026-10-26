import { http } from '@/shared/api'
import type { SharedCategory } from '@driving-school/shared'

export const getCategories = () =>
  http.fetchFull<SharedCategory[]>({
    url: '/categories',
    method: 'GET',
  })
