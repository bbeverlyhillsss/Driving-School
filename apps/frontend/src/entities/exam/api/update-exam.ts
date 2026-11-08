import { http } from '@/shared/api'
import type { ExamUpdatePayload, SharedExam } from '@driving-school/shared'

export const updateExam = (studentId: number, date: string, payload: ExamUpdatePayload) =>
  http.fetchFull<SharedExam>({
    url: `/exams/${studentId}/${date}`,
    method: 'PUT',
    data: payload,
  })