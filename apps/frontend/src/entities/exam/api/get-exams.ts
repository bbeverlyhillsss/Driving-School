import { http } from '@/shared/api'
import type { SharedExam } from '@driving-school/shared'

export const getExams = () =>
  http.fetchFull<SharedExam[]>({
    url: '/exams',
    method: 'GET',
  })