import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GroupPayload, SharedGroup } from '@driving-school/shared'
import { getGroups } from '../api/get-groups'
import { createGroup } from '../api/create-group'
import { updateGroup } from '../api/update-group'
import { deleteGroup } from '../api/delete-group'

export const useGroupStore = defineStore('group', () => {
  const items = ref<SharedGroup[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getGroups()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    items.value = response.data
  }

  const create = async (payload: GroupPayload) => {
    const response = await createGroup(payload)
    if (response.ok) items.value.push(response.data)
    return response
  }

  const update = async (id: number, payload: GroupPayload) => {
    const response = await updateGroup(id, payload)
    if (response.ok) {
      items.value = items.value.map((item) => (item.id === id ? response.data : item))
    }
    return response
  }

  const remove = async (id: number) => {
    const response = await deleteGroup(id)
    if (response.ok) items.value = items.value.filter((item) => item.id !== id)
    return response
  }

  const setStudentsCount = (id: number, count: number): void => {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, studentsCount: count } : item,
    )
  }

  return { items, isLoading, loadError, load, create, update, remove, setStudentsCount }
})
