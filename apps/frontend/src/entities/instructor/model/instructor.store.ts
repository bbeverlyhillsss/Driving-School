import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  InstructorPayload,
  InstructorUpdatePayload,
  SharedInstructor,
} from '@driving-school/shared'
import { getInstructors } from '../api/get-instructors'
import { createInstructor } from '../api/create-instructor'
import { updateInstructor } from '../api/update-instructor'
import { deleteInstructor } from '../api/delete-instructor'

export const useInstructorStore = defineStore('instructor', () => {
  const items = ref<SharedInstructor[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getInstructors()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = response.data
  }

  const create = async (payload: InstructorPayload) => {
    const response = await createInstructor(payload)
    if (response.ok) items.value.push(response.data)
    return response
  }

  const update = async (id: number, payload: InstructorUpdatePayload) => {
    const response = await updateInstructor(id, payload)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const remove = async (id: number) => {
    const response = await deleteInstructor(id)
    if (response.ok) items.value = items.value.filter((item) => item.id !== id)
    return response
  }

  return { items, isLoading, loadError, load, create, update, remove }
})
