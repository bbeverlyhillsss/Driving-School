import { http } from '@/shared/api'
import type { SharedGroup } from '@driving-school/shared'

export const getGroups = () =>
  http.fetchFull<SharedGroup[]>({
    url: '/groups',
    method: 'GET',
  })