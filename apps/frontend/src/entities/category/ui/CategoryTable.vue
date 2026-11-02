<template>
  <DataTable :columns :items :total empty-text="No categories found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :category="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import type { SharedCategory } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'

defineProps<{ items: SharedCategory[]; total?: number }>()

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { category: SharedCategory }): unknown
}>()

const formatValue = (value: number | null): string => (value === null ? '—' : String(value))

const formatPrice = (value: number | null): string =>
  value === null
    ? '—'
    : new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
      }).format(value)

const columns: Column<SharedCategory>[] = [
  { key: 'name', header: 'Name', emphasis: true, value: (c) => c.name },
  { key: 'minAge', header: 'Min. age', value: (c) => formatValue(c.minAge) },
  { key: 'theoryHours', header: 'Theory hours', value: (c) => formatValue(c.theoryHours) },
  { key: 'practiceHours', header: 'Practice hours', value: (c) => formatValue(c.practiceHours) },
  { key: 'price', header: 'Price', value: (c) => formatPrice(c.price) },
]
</script>
