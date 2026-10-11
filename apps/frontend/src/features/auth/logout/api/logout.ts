import { http } from '@/shared/api'

export const logout = () =>
  http.fetchFull<{ message: string }>({ url: '/auth/logout', method: 'POST' })
