<template>
  <div>
    <BaseButton v-if="!isOpen" @click="isOpen = true">Додати категорію</BaseButton>
    <CategoryForm
      v-else
      :errors
      :server-error="serverError"
      :loading="isLoading"
      submit-label="Створити"
      @submit="submit"
      @cancel="close"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton } from '@/shared/ui/button'
import { CategoryForm } from '@/entities/category'
import { useCreateCategory } from '../model/use-create-category'

const isOpen = ref(false)

const { errors, serverError, isLoading, submit, reset } = useCreateCategory(() => {
  isOpen.value = false
})

const close = (): void => {
  reset()
  isOpen.value = false
}
</script>
