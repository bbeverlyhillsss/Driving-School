import { http } from '@/shared/api'
import type { AuthResponse, RegisterPayload } from '@driving-school/shared'

export const register = (payload: RegisterPayload) =>
  http.fetchFull<AuthResponse>({
    url: '/auth/register',
    method: 'POST',
    data: payload,
  })
