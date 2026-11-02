<template>
  <DataTable :columns :items :total empty-text="No cars found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :car="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import type { SharedCar } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'

defineProps<{ items: SharedCar[]; total?: number }>()

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { car: SharedCar }): unknown
}>()

const today = new Date().toLocaleDateString('sv-SE')

const isExpired = (date: string | null): boolean => date !== null && date < today

const formatValue = (value: number | null): string => (value === null ? '—' : String(value))

const formatDate = (value: string | null): string =>
  value === null ? '—' : new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

const columns: Column<SharedCar>[] = [
  { key: 'brand', header: 'Brand', emphasis: true, value: (c) => c.brand },
  { key: 'model', header: 'Model', value: (c) => c.model },
  { key: 'plateNumber', header: 'Plate number', value: (c) => c.plateNumber },
  { key: 'category', header: 'Category', value: (c) => c.category.name },
  { key: 'year', header: 'Year', value: (c) => formatValue(c.year) },
  {
    key: 'inspectionDate',
    header: 'Inspection valid until',
    value: (c) => formatDate(c.inspectionDate),
    cellClass: (c) => (isExpired(c.inspectionDate) ? 'font-medium text-red-600' : undefined),
  },
]
</script>
