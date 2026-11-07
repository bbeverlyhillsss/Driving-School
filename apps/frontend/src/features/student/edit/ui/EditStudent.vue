<template>
  <BaseModal title="Edit student" :description="student.email" @close="emit('close')">
    <StudentForm
      mode="admin"
      :initial="toStudentFormValues(student)"
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
import type { SharedStudent } from '@driving-school/shared'
import { StudentForm, toStudentFormValues } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useEditStudent } from '../model/use-edit-student'

const props = defineProps<{ student: SharedStudent }>()
const emit = defineEmits<{ close: [] }>()

const { errors, serverError, isLoading, submit } = useEditStudent(props.student.id, () =>
  emit('close'),
)
</script>