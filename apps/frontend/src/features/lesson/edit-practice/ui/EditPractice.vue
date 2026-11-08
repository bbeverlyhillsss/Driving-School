<template>
  <BaseModal
    title="Edit practice lesson"
    :description="`${lesson.date} · ${lesson.startTime}`"
    @close="emit('close')"
  >
    <PracticeLessonForm
      :students="studentStore.items"
      :instructors="instructorStore.items"
      :cars="carStore.items"
      :groups="groupStore.items"
      :initial="toPracticeFormValues(lesson)"
      :errors
      :server-error="serverError"
      :loading="isLoading"
      submit-label="Save"
      @submit="submit"
      @cancel="emit('close')"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import type { SharedLesson } from '@driving-school/shared'
import { useCarStore } from '@/entities/car'
import { useGroupStore } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { PracticeLessonForm, toPracticeFormValues } from '@/entities/lesson'
import { useStudentStore } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useEditPractice } from '../model/use-edit-practice'

const props = defineProps<{ lesson: SharedLesson }>()
const emit = defineEmits<{ close: [] }>()

const studentStore = useStudentStore()
const instructorStore = useInstructorStore()
const carStore = useCarStore()
const groupStore = useGroupStore()

const { errors, serverError, isLoading, submit } = useEditPractice(props.lesson.id, () =>
  emit('close'),
)
</script>