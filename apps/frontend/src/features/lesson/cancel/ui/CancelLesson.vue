<template>
  <BaseIconButton label="Cancel lesson" tone="danger" @click="isConfirming = true">
    <Ban :size="16" />
  </BaseIconButton>

  <BaseConfirmDialog
    v-if="isConfirming"
    title="Cancel lesson"
    :description="`Cancel the lesson on ${lesson.date} at ${lesson.startTime}? The time slot will become free.`"
    confirm-label="Cancel lesson"
    cancel-label="Keep"
    :loading="isLoading"
    :error
    @confirm="onConfirm"
    @cancel="close"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Ban } from 'lucide-vue-next'
import type { SharedLesson } from '@driving-school/shared'
import { useLessonStore } from '@/entities/lesson'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseConfirmDialog } from '@/shared/ui/modal'

const props = defineProps<{ lesson: SharedLesson }>()

const lessonStore = useLessonStore()
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
  const response = await lessonStore.cancel(props.lesson.id)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  close()
}
</script>