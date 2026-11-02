<template>
  <BaseIconButton label="Delete" tone="danger" @click="isConfirming = true">
    <Trash2 :size="16" />
  </BaseIconButton>

  <BaseConfirmDialog
    v-if="isConfirming"
    title="Delete car"
    :description="`Delete ${car.brand} ${car.model} (${car.plateNumber})? This action cannot be undone.`"
    confirm-label="Delete"
    :loading="isLoading"
    :error
    @confirm="onConfirm"
    @cancel="close"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { SharedCar } from '@driving-school/shared'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseConfirmDialog } from '@/shared/ui/modal'
import { useCarStore } from '@/entities/car'

const props = defineProps<{ car: SharedCar }>()

const carStore = useCarStore()
const isConfirming = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

const close = (): void => {
  isConfirming.value = false
  error.value = null
}

const onConfirm = async (): Promise<void> => {
  error.value = null
  isLoading.value = true
  const response = await carStore.remove(props.car.id)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  close()
}
</script>