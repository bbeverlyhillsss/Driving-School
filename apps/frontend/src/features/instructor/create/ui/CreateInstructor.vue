<template>
  <BaseModal
    title="New instructor"
    description="Create a login account and a profile for the instructor."
    @close="close"
  >
    <InstructorForm
      mode="create"
      :categories="categoryStore.items"
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
import { InstructorForm } from '@/entities/instructor'
import { useCategoryStore } from '@/entities/category'
import { BaseModal } from '@/shared/ui/modal'
import { useCreateInstructor } from '../model/use-create-instructor'

const emit = defineEmits<{ close: [] }>()

const categoryStore = useCategoryStore()

const { errors, serverError, isLoading, submit, reset } = useCreateInstructor(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>