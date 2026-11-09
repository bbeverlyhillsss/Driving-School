import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SharedOverview } from '@driving-school/shared'
import { getOverview } from '../api/get-overview'

export const useOverviewStore = defineStore('overview', () => {
  const overview = ref<SharedOverview | null>(null)
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    isLoading.value = true
    loadError.value = null

    const response = await getOverview()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    overview.value = response.data
  }

  return { overview, isLoading, loadError, load }
})