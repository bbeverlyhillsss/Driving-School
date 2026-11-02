<template>
  <BaseModal title="Edit car" :description="car.plateNumber" @close="emit('close')">
    <CarForm
      :categories="categoryStore.items"
      :initial="toCarFormValues(car)"
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
import type { SharedCar } from '@driving-school/shared'
import { CarForm, toCarFormValues } from '@/entities/car'
import { useCategoryStore } from '@/entities/category'
import { BaseModal } from '@/shared/ui/modal'
import { useEditCar } from '../model/use-edit-car'

const props = defineProps<{ car: SharedCar }>()
const emit = defineEmits<{ close: [] }>()

const categoryStore = useCategoryStore()

const { errors, serverError, isLoading, submit } = useEditCar(props.car.id, () => emit('close'))
</script>