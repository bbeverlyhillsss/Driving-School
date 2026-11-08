import { http } from '@/shared/api'
import type { ExamPayload, SharedExam } from '@driving-school/shared'

export const createExam = (payload: ExamPayload) =>
  http.fetchFull<SharedExam>({
    url: '/exams',
    method: 'POST',
    data: payload,
  })