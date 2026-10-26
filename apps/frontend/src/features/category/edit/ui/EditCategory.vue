<template>
  <CategoryForm
    :initial="toCategoryFormValues(category)"
    :errors
    :server-error="serverError"
    :loading="isLoading"
    submit-label="Зберегти"
    @submit="submit"
    @cancel="emit('close')"
  />
</template>

<script setup lang="ts">
import type { SharedCategory } from '@driving-school/shared'
import { CategoryForm, toCategoryFormValues } from '@/entities/category'
import { useEditCategory } from '../model/use-edit-category'

const props = defineProps<{ category: SharedCategory }>()
const emit = defineEmits<{ close: [] }>()

const { errors, serverError, isLoading, submit } = useEditCategory(props.category.id, () =>
  emit('close'),
)
</script>
