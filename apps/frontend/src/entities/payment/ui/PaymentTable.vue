<template>
  <DataTable :columns :items :total empty-text="No payments found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :payment="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PaymentStatus } from '@driving-school/shared'
import type { SharedPayment } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import { formatAmount, formatPaymentDate, PAYMENT_STATUS_LABEL } from '../model/payment-view'

const props = withDefaults(
  defineProps<{ items: SharedPayment[]; total?: number; perspective?: 'staff' | 'student' }>(),
  { perspective: 'staff' },
)

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { payment: SharedPayment }): unknown
}>()

const statusClass = (payment: SharedPayment): string =>
  payment.status === PaymentStatus.PAID ? 'font-medium text-emerald-700' : 'text-zinc-500'

const dateColumn: Column<SharedPayment> = {
  key: 'date',
  header: 'Date',
  emphasis: true,
  value: (p) => formatPaymentDate(p.date),
}

const studentColumn: Column<SharedPayment> = {
  key: 'student',
  header: 'Student',
  value: (p) => p.student.fullName,
}

const categoryColumn: Column<SharedPayment> = {
  key: 'category',
  header: 'Category',
  value: (p) => p.category.name,
}

const amountColumn: Column<SharedPayment> = {
  key: 'amount',
  header: 'Amount',
  value: (p) => formatAmount(p.amount),
}

const statusColumn: Column<SharedPayment> = {
  key: 'status',
  header: 'Status',
  value: (p) => PAYMENT_STATUS_LABEL[p.status],
  cellClass: statusClass,
}

const purposeColumn: Column<SharedPayment> = {
  key: 'purpose',
  header: 'Purpose',
  value: (p) => p.purpose ?? '—',
}

const columns = computed<Column<SharedPayment>[]>(() =>
  props.perspective === 'student'
    ? [dateColumn, categoryColumn, amountColumn, statusColumn, purposeColumn]
    : [dateColumn, studentColumn, categoryColumn, amountColumn, statusColumn, purposeColumn],
)
</script>