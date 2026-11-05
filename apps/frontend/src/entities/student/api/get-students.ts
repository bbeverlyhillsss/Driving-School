import { http } from '@/shared/api'
import type { SharedStudent } from '@driving-school/shared'

export const getStudents = () =>
  http.fetchFull<SharedStudent[]>({
    url: '/students',
    method: 'GET',
  })