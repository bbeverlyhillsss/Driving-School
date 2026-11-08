<template>
  <BaseModal
    title="New exam"
    description="Record an exam attempt and, if it is already known, its result."
    @close="close"
  >
    <ExamForm
      mode="create"
      :students="studentStore.items"
      :errors
      :server-error="serverError"
      :loading="isLoading"
      submit-label="Create"
      @submit="submit"
      @cancel="close"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { ExamForm } from '@/entities/exam'
import { useStudentStore } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useCreateExam } from '../model/use-create-exam'

const emit = defineEmits<{ close: [] }>()

const studentStore = useStudentStore()

const { errors, serverError, isLoading, submit, reset } = useCreateExam(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>