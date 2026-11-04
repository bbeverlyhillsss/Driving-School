<template>
  <BaseModal
    title="New group"
    description="The group category is taken from the instructor."
    @close="close"
  >
    <GroupForm
      :instructors="instructorStore.items"
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
import { GroupForm } from '@/entities/group'
import { useInstructorStore } from '@/entities/instructor'
import { BaseModal } from '@/shared/ui/modal'
import { useCreateGroup } from '../model/use-create-group'

const emit = defineEmits<{ close: [] }>()

const instructorStore = useInstructorStore()

const { errors, serverError, isLoading, submit, reset } = useCreateGroup(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>