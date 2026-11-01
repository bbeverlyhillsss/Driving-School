<template>
  <BaseModal :title :description @close="emit('cancel')">
    <p v-if="error" role="alert" class="text-sm text-red-400">{{ error }}</p>

    <div class="flex justify-end gap-3">
      <BaseButton variant="secondary" data-autofocus @click="emit('cancel')">
        {{ cancelLabel }}
      </BaseButton>
      <BaseButton variant="inverse" :loading @click="emit('confirm')">
        {{ confirmLabel }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseButton } from '@/shared/ui/button'
import BaseModal from './BaseModal.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    loading?: boolean
    error?: string | null
  }>(),
  {
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    loading: false,
    error: null,
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>