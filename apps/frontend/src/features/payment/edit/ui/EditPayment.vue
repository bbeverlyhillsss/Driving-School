<template>
  <BaseModal title="Edit payment" :description @close="emit('close')">
    <PaymentForm
      :students="studentStore.items"
      :categories="categoryStore.items"
      :groups="groupStore.items"
      :initial="toPaymentFormValues(payment)"
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
import { computed } from 'vue'
import type { SharedPayment } from '@driving-school/shared'
import { useCategoryStore } from '@/entities/category'
import { useGroupStore } from '@/entities/group'
import { formatPaymentDate, PaymentForm, toPaymentFormValues } from '@/entities/payment'
import { useStudentStore } from '@/entities/student'
import { BaseModal } from '@/shared/ui/modal'
import { useEditPayment } from '../model/use-edit-payment'

const props = defineProps<{ payment: SharedPayment }>()
const emit = defineEmits<{ close: [] }>()

const studentStore = useStudentStore()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()

const description = computed(
  () => `${props.payment.student.fullName} · ${formatPaymentDate(props.payment.date)}`,
)

const { errors, serverError, isLoading, submit } = useEditPayment(props.payment.id, () =>
  emit('close'),
)
</script>