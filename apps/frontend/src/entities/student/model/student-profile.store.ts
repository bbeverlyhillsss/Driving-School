import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SharedStudent, StudentSelfPayload } from '@driving-school/shared'
import { getMyProfile } from '../api/get-my-profile'
import { updateMyProfile } from '../api/update-my-profile'

export const useStudentProfileStore = defineStore('student-profile', () => {
  const profile = ref<SharedStudent | null>(null)
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  const load = async (): Promise<void> => {
    profile.value = null
    isLoading.value = true
    loadError.value = null

    const response = await getMyProfile()
    isLoading.value = false

    if (!response.ok) {
      loadError.value = response.error?.message ?? 'Server is unavailable'
      return
    }

    profile.value = response.data
  }

  const update = async (payload: StudentSelfPayload) => {
    const response = await updateMyProfile(payload)
    if (response.ok) profile.value = response.data
    return response
  }

  return { profile, isLoading, loadError, load, update }
})