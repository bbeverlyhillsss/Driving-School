import { http } from '@/shared/api'

export const deleteExam = (studentId: number, date: string) =>
  http.fetchFull<void>({
    url: `/exams/${studentId}/${date}`,
    method: 'DELETE',
  })