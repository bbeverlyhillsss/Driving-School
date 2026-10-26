<template>
  <BaseButton variant="danger" size="sm" :loading="isLoading" @click="onDelete">
    Видалити
  </BaseButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SharedCategory } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { useCategoryStore } from '@/entities/category'

const props = defineProps<{ category: SharedCategory }>()
const emit = defineEmits<{ error: [message: string | null] }>()

const categoryStore = useCategoryStore()
const isLoading = ref(false)

const onDelete = async (): Promise<void> => {
  if (!window.confirm(`Видалити категорію "${props.category.name}"?`)) return

  emit('error', null)
  isLoading.value = true
  const response = await categoryStore.remove(props.category.id)
  isLoading.value = false

  if (!response.ok) {
    emit('error', response.error?.message ?? 'Server is unavailable')
  }
}
</script>
