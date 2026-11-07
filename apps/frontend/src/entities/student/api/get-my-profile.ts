import { http } from '@/shared/api'
import type { SharedStudent } from '@driving-school/shared'

export const getMyProfile = () =>
  http.fetchFull<SharedStudent>({
    url: '/students/me',
    method: 'GET',
  })