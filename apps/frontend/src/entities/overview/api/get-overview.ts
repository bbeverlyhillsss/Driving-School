import { http } from '@/shared/api'
import type { SharedOverview } from '@driving-school/shared'

export const getOverview = () =>
  http.fetchFull<SharedOverview>({
    url: '/overview',
    method: 'GET',
  })