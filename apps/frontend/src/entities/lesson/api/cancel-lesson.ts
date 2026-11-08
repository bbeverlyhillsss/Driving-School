import { http } from '@/shared/api'
import type { SharedLesson } from '@driving-school/shared'

export const cancelLesson = (id: number) =>
  http.fetchFull<SharedLesson>({
    url: `/lessons/${id}/cancel`,
    method: 'POST',
  })