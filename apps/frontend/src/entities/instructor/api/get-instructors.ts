import { http } from '@/shared/api'
import type { SharedInstructor } from '@driving-school/shared'

export const getInstructors = () =>
  http.fetchFull<SharedInstructor[]>({
    url: '/instructors',
    method: 'GET',
  })
