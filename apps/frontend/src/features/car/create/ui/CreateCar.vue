<template>
  <BaseModal title="New car" description="Add a new car to the fleet." @close="close">
    <CarForm
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
import { CarForm } from '@/entities/car'
import { useCategoryStore } from '@/entities/category'
import { BaseModal } from '@/shared/ui/modal'
import { useCreateCar } from '../model/use-create-car'

const emit = defineEmits<{ close: [] }>()

const categoryStore = useCategoryStore()

const { errors, serverError, isLoading, submit, reset } = useCreateCar(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>