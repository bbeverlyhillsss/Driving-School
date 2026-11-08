import { http } from '@/shared/api'
import type { PracticeLessonPayload, SharedLesson } from '@driving-school/shared'

export const updatePracticeLesson = (id: number, payload: PracticeLessonPayload) =>
  http.fetchFull<SharedLesson>({
    url: `/lessons/${id}`,
    method: 'PUT',
    data: payload,
  })