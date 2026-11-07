import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SharedStudent, StudentUpdatePayload } from '@driving-school/shared'
import { getStudents } from '../api/get-students'
import { updateStudent } from '../api/update-student'

export const useStudentStore = defineStore('student', () => {
  const items = ref<SharedStudent[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getStudents()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = response.data
  }

  const update = async (id: number, payload: StudentUpdatePayload) => {
    const response = await updateStudent(id, payload)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const setGroup = (studentId: number, group: SharedStudent['group']): void => {
    items.value = items.value.map((item) => (item.id === studentId ? { ...item, group } : item))
  }

  return { items, isLoading, loadError, load, update, setGroup }
})