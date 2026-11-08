import { http } from '@/shared/api'
import type { SharedLesson } from '@driving-school/shared'

export const generateTheoryLessons = (groupId: number) =>
  http.fetchFull<SharedLesson[]>({
    url: `/groups/${groupId}/lessons/theory`,
    method: 'POST',
  })