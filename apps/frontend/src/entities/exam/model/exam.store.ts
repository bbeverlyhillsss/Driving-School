import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ExamPayload, ExamUpdatePayload, SharedExam } from '@driving-school/shared'
import { getExams } from '../api/get-exams'
import { createExam } from '../api/create-exam'
import { updateExam } from '../api/update-exam'
import { deleteExam } from '../api/delete-exam'

const sortExams = (items: SharedExam[]): SharedExam[] =>
  [...items].sort(
    (a, b) => b.date.localeCompare(a.date) || a.student.fullName.localeCompare(b.student.fullName),
  )

const isSame = (exam: SharedExam, studentId: number, date: string): boolean =>
  exam.studentId === studentId && exam.date === date

export const useExamStore = defineStore('exam', () => {
  const items = ref<SharedExam[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getExams()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = sortExams(response.data)
  }

  const create = async (payload: ExamPayload) => {
    const response = await createExam(payload)
    if (response.ok) items.value = sortExams([...items.value, response.data])
    return response
  }

  const update = async (studentId: number, date: string, payload: ExamUpdatePayload) => {
    const response = await updateExam(studentId, date, payload)
    if (response.ok) {
      items.value = sortExams(
        items.value.map((item) => (isSame(item, studentId, date) ? response.data : item)),
      )
    }
    return response
  }

  const remove = async (studentId: number, date: string) => {
    const response = await deleteExam(studentId, date)
    if (response.ok) {
      items.value = items.value.filter((item) => !isSame(item, studentId, date))
    }
    return response
  }

  return { items, isLoading, loadError, load, create, update, remove }
})