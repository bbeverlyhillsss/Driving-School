<template>
  <BaseModal title="Edit instructor" :description="instructor.email" @close="emit('close')">
    <InstructorForm
      mode="edit"
      :categories="categoryStore.items"
      :initial="toInstructorFormValues(instructor)"
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
import type { SharedInstructor } from '@driving-school/shared'
import { InstructorForm, toInstructorFormValues } from '@/entities/instructor'
import { useCategoryStore } from '@/entities/category'
import { BaseModal } from '@/shared/ui/modal'
import { useEditInstructor } from '../model/use-edit-instructor'

const props = defineProps<{ instructor: SharedInstructor }>()
const emit = defineEmits<{ close: [] }>()

const categoryStore = useCategoryStore()

const { errors, serverError, isLoading, submit } = useEditInstructor(props.instructor.id, () =>
  emit('close'),
)
</script>