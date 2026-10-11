import { http } from '@/shared/api'
import type { AuthResponse } from '@driving-school/shared'

export const refresh = () =>
  http.fetchFull<AuthResponse>({
    url: '/auth/refresh',
    method: 'GET',
    skipAuthRefresh: true,
  })
