import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CarPayload, SharedCar } from '@driving-school/shared'
import { getCars } from '../api/get-cars'
import { createCar } from '../api/create-car'
import { updateCar } from '../api/update-car'
import { deleteCar } from '../api/delete-car'

export const useCarStore = defineStore('car', () => {
  const items = ref<SharedCar[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getCars()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = response.data
  }

  const create = async (payload: CarPayload) => {
    const response = await createCar(payload)
    if (response.ok) items.value.push(response.data)
    return response
  }

  const update = async (id: number, payload: CarPayload) => {
    const response = await updateCar(id, payload)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const remove = async (id: number) => {
    const response = await deleteCar(id)
    if (response.ok) items.value = items.value.filter((item) => item.id !== id)
    return response
  }

  return { items, isLoading, loadError, load, create, update, remove }
})
