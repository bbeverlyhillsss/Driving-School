<template>
  <BaseIconButton label="Delete" tone="danger" @click="isConfirming = true">
    <Trash2 :size="16" />
  </BaseIconButton>

  <BaseConfirmDialog
    v-if="isConfirming"
    title="Delete exam"
    :description="`Delete the ${EXAM_TYPE_LABEL[exam.type].toLowerCase()} exam of ${exam.student.fullName} on ${formatExamDate(exam.date)}? This action cannot be undone.`"
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
import type { SharedExam } from '@driving-school/shared'
import { EXAM_TYPE_LABEL, formatExamDate, useExamStore } from '@/entities/exam'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseConfirmDialog } from '@/shared/ui/modal'

const props = defineProps<{ exam: SharedExam }>()

const examStore = useExamStore()
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
  const response = await examStore.remove(props.exam.studentId, props.exam.date)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  close()
}
</script>