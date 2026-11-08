<template>
  <DataTable :columns :items :total empty-text="No groups found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :group="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import type { SharedGroup } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import { GROUP_SHIFT_SHORT } from '../model/group-shift'

defineProps<{ items: SharedGroup[]; total?: number }>()

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { group: SharedGroup }): unknown
}>()

const formatDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

const columns: Column<SharedGroup>[] = [
  { key: 'name', header: 'Name', emphasis: true, value: (g) => g.name },
  { key: 'category', header: 'Category', value: (g) => g.category.name },
  { key: 'instructor', header: 'Instructor', value: (g) => g.instructor.fullName },
  { key: 'shift', header: 'Shift', value: (g) => GROUP_SHIFT_SHORT[g.shift] },
  { key: 'startDate', header: 'Start date', value: (g) => formatDate(g.startDate) },
  { key: 'endDate', header: 'End date', value: (g) => formatDate(g.endDate) },
  { key: 'students', header: 'Students', value: (g) => String(g.studentsCount) },
]
</script>