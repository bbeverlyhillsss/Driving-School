import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PracticeLessonPayload, SharedLesson } from '@driving-school/shared'
import { getLessons } from '../api/get-lessons'
import { createPracticeLesson } from '../api/create-practice-lesson'
import { updatePracticeLesson } from '../api/update-practice-lesson'
import { cancelLesson } from '../api/cancel-lesson'
import { generateTheoryLessons } from '../api/generate-theory-lessons'

const sortLessons = (items: SharedLesson[]): SharedLesson[] =>
  [...items].sort(
    (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime) || a.id - b.id,
  )

export const useLessonStore = defineStore('lesson', () => {
  const items = ref<SharedLesson[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getLessons()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = sortLessons(response.data)
  }

  const createPractice = async (payload: PracticeLessonPayload) => {
    const response = await createPracticeLesson(payload)
    if (response.ok) items.value = sortLessons([...items.value, response.data])
    return response
  }

  const updatePractice = async (id: number, payload: PracticeLessonPayload) => {
    const response = await updatePracticeLesson(id, payload)
    if (response.ok) {
      items.value = sortLessons(items.value.map((item) => (item.id === id ? response.data : item)))
    }
    return response
  }

  const cancel = async (id: number) => {
    const response = await cancelLesson(id)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const generateTheory = async (groupId: number) => {
    const response = await generateTheoryLessons(groupId)
    if (response.ok) {
      const rest = items.value.filter((item) => item.group?.id !== groupId)
      items.value = sortLessons([...rest, ...response.data])
    }
    return response
  }

  return { items, isLoading, loadError, load, createPractice, updatePractice, cancel, generateTheory }
})