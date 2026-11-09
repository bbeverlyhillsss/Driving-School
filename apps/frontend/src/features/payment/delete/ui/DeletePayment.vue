<template>
  <BaseIconButton label="Delete" tone="danger" @click="isConfirming = true">
    <Trash2 :size="16" />
  </BaseIconButton>

  <BaseConfirmDialog
    v-if="isConfirming"
    title="Delete payment"
    :description="`Delete the payment of ${formatAmount(payment.amount)} from ${payment.student.fullName} on ${formatPaymentDate(payment.date)}? This action cannot be undone.`"
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
import type { SharedPayment } from '@driving-school/shared'
import { formatAmount, formatPaymentDate, usePaymentStore } from '@/entities/payment'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseConfirmDialog } from '@/shared/ui/modal'

const props = defineProps<{ payment: SharedPayment }>()

const paymentStore = usePaymentStore()
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
  const response = await paymentStore.remove(props.payment.id)
  isLoading.value = false

  if (!response.ok) {
    error.value = response.error?.message ?? 'Server is unavailable'
    return
  }

  close()
}
</script>