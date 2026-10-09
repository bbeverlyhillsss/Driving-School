import { http } from '@/shared/api'
import type { AuthResponse, LoginPayload } from '@driving-school/shared'

export const login = (payload: LoginPayload) =>
  http.fetchFull<AuthResponse>({
    url: '/auth/login',
    method: 'POST',
    data: payload,
  })
