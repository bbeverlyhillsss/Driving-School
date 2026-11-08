import { http } from '@/shared/api'
import type { PracticeLessonPayload, SharedLesson } from '@driving-school/shared'

export const createPracticeLesson = (payload: PracticeLessonPayload) =>
  http.fetchFull<SharedLesson>({
    url: '/lessons/practice',
    method: 'POST',
    data: payload,
  })