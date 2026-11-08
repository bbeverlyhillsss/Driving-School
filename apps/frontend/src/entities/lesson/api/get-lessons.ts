import { http } from '@/shared/api'
import type { SharedLesson } from '@driving-school/shared'

export const getLessons = () =>
  http.fetchFull<SharedLesson[]>({
    url: '/lessons',
    method: 'GET',
  })