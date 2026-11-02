<template>
  <DataTable :columns :items :total empty-text="No instructors found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :instructor="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import type { SharedInstructor } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'

defineProps<{ items: SharedInstructor[]; total?: number }>()

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { instructor: SharedInstructor }): unknown
}>()

const formatValue = (value: number | string | null): string =>
  value === null || value === '' ? '—' : String(value)

const columns: Column<SharedInstructor>[] = [
  { key: 'fullName', header: 'Full name', emphasis: true, value: (i) => i.fullName },
  { key: 'category', header: 'Category', value: (i) => i.category.name },
  { key: 'experience', header: 'Experience, years', value: (i) => formatValue(i.experienceYears) },
  { key: 'phone', header: 'Phone', value: (i) => formatValue(i.phone) },
  { key: 'email', header: 'Email', value: (i) => i.email },
]
</script>
