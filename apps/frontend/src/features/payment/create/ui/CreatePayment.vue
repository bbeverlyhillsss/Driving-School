<template>
  <BaseModal title="New payment" description="Record a payment received by the school." @close="close">
    <PaymentForm
      :students="studentStore.items"
      :categories="categoryStore.items"
      :groups="groupStore.items"
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
import { useCategoryStore } from '@/entities/category'
import { useGroupStore } from '@/entities/group'
import { PaymentForm } from '@/entities/payment'
import { useStudentStore } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useCreatePayment } from '../model/use-create-payment'

const emit = defineEmits<{ close: [] }>()

const studentStore = useStudentStore()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()

const { errors, serverError, isLoading, submit, reset } = useCreatePayment(() => emit('close'))

const close = (): void => {
  reset()
  emit('close')
}
</script>