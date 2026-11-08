<template>
  <BaseModal
    title="New practice lesson"
    description="One-hour driving lesson for a student."
    @close="close"
  >
    <PracticeLessonForm
      :students="studentStore.items"
      :instructors="instructorStore.items"
      :cars="carStore.items"
      :groups="groupStore.items"
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
import { useCarStore } from '@/entities/car'
import { useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { PracticeLessonForm } from '@/entities/lesson'
import { useStudentStore } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useCreatePractice } from '../model/use-create-practice'

const emit = defineEmits<{ close: [] }>()

const studentStore = useStudentStore()
const instructorStore = useInstructorStore()
const carStore = useCarStore()
const groupStore = useGroupStore()

const { errors, serverError, isLoading, submit, reset } = useCreatePractice(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>