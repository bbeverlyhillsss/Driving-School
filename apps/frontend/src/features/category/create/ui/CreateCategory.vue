<template>
  <BaseModal title="New category" description="Add a new driving category." @close="close">
    <CategoryForm
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
import { CategoryForm } from '@/entities/category'
import { BaseModal } from '@/shared/ui/modal'
import { useCreateCategory } from '../model/use-create-category'

const emit = defineEmits<{ close: [] }>()

const { errors, serverError, isLoading, submit, reset } = useCreateCategory(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>