<template>
  <BaseIconButton label="Delete" tone="danger" @click="isConfirming = true">
    <Trash2 :size="16" />
  </BaseIconButton>

  <BaseConfirmDialog
    v-if="isConfirming"
    title="Delete instructor"
    :description="`Delete ${instructor.fullName}? The profile and the login account will be removed. This action cannot be undone.`"
    confirm-label="Delete"
    :loading="isLoading"
    :error
    @confirm="onConfirm"
    @cancel="close"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { SharedInstructor } from '@driving-school/shared'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseConfirmDialog } from '@/shared/ui/modal'
import { useInstructorStore } from '@/entities/instructor'

const props = defineProps<{ instructor: SharedInstructor }>()

const instructorStore = useInstructorStore()
const isConfirming = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

const close = (): void => {
  isConfirming.value = false
  error.value = null
}

const onConfirm = async (): Promise<void> => {
  error.value = null
  isLoading.value = true
  const response = await instructorStore.remove(props.instructor.id)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  close()
}
</script>