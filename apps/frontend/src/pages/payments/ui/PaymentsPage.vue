<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">Payments</h1>

    <CreatePayment v-if="isCreating" @close="isCreating = false" />
    <EditPayment
      v-if="editing"
      :key="editing.id"
      :payment="editing"
      @close="editing = null"
    />

    <div class="flex items-center gap-2">
      <BaseSearchInput
        v-model="search"
        placeholder="Search by student, category, purpose or status"
        class="w-full max-w-sm"
      />
    </div>

    <p v-if="paymentStore.isLoading" class="text-zinc-600">Loading...</p>
    <p v-else-if="paymentStore.loadError" class="text-red-600">{{ paymentStore.loadError }}</p>
    <template v-else>
      <p class="text-sm text-zinc-600">
        Paid: {{ formatAmount(paidTotal) }} · Pending: {{ formatAmount(pendingTotal) }}
      </p>

      <PaymentTable :items="filteredItems" :total="paymentStore.items.length">
        <template #header-actions>
          <BaseButton size="sm" variant="inverse" @click="isCreating = true">
            <Plus :size="16" />
            Create payment
          </BaseButton>
        </template>

        <template #actions="{ payment }">
          <div class="flex justify-end gap-1">
            <BaseIconButton label="Edit" @click="editing = payment">
              <Pencil :size="16" />
            </BaseIconButton>
            <DeletePayment :payment />
          </div>
        </template>
      </PaymentTable>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pencil, Plus } from 'lucide-vue-next'
import type { SharedPayment } from '@driving-school/shared'
import { useCategoryStore } from '@/entities/category'
import { useGroupStore } from '@/entities/group'
import {
  formatAmount,
  formatPaymentDate,
  getPaidTotal,
  getPendingTotal,
  PAYMENT_STATUS_LABEL,
  PaymentTable,
  usePaymentStore,
} from '@/entities/payment'
import { useStudentStore } from '@/entities/student'
import { CreatePayment } from '@/features/payment/create'
import { DeletePayment } from '@/features/payment/delete'
import { EditPayment } from '@/features/payment/edit'
import { BaseButton } from '@/shared/ui/button'
import { BaseIconButton } from '@/shared/ui/icon-button'
import { BaseSearchInput } from '@/shared/ui/search-input'

const paymentStore = usePaymentStore()
const studentStore = useStudentStore()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()

const isCreating = ref(false)
const editing = ref<SharedPayment | null>(null)
const search = ref('')

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return paymentStore.items

  return paymentStore.items.filter((payment) =>
    [
      payment.student.fullName,
      payment.category.name,
      payment.purpose ?? '',
      PAYMENT_STATUS_LABEL[payment.status],
      formatPaymentDate(payment.date),
      String(payment.amount),
    ].some((field) => field.toLowerCase().includes(query)),
  )
})

const paidTotal = computed(() => getPaidTotal(filteredItems.value))
const pendingTotal = computed(() => getPendingTotal(filteredItems.value))

onMounted(() => {
  void paymentStore.load()
  void studentStore.load()
  void categoryStore.load()
  void groupStore.load()
})
</script>