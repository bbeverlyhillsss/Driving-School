import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CategoryPayload, SharedCategory } from '@driving-school/shared'
import { getCategories } from '../api/get-categories'
import { createCategory } from '../api/create-category'
import { updateCategory } from '../api/update-category'
import { deleteCategory } from '../api/delete-category'

export const useCategoryStore = defineStore('category', () => {
  const items = ref<SharedCategory[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getCategories()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = response.data
  }

  const create = async (payload: CategoryPayload) => {
    const response = await createCategory(payload)
    if (response.ok) items.value.push(response.data)
    return response
  }

  const update = async (id: number, payload: CategoryPayload) => {
    const response = await updateCategory(id, payload)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const remove = async (id: number) => {
    const response = await deleteCategory(id)
    if (response.ok) items.value = items.value.filter((item) => item.id !== id)
    return response
  }

  return { items, isLoading, loadError, load, create, update, remove }
})
