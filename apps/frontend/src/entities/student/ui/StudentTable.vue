<template>
  <DataTable :columns :items :total empty-text="No students found.">
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :student="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { StudentStatus } from '@driving-school/shared'
import type { SharedStudent } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import { STUDENT_STATUS_LABEL } from '../model/student-status'

defineProps<{ items: SharedStudent[]; total?: number }>()

defineSlots<{
  actions?(props: { student: SharedStudent }): unknown
}>()

const formatText = (value: string | null): string => (value === null || value === '' ? '—' : value)

const formatDate = (value: string | null): string =>
  value === null ? '—' : new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA')

const statusClass = (student: SharedStudent): string | undefined => {
  if (student.status === StudentStatus.EXPELLED) return 'font-medium text-red-600'
  if (student.status === StudentStatus.GRADUATED) return 'text-zinc-500'
  return undefined
}

const columns: Column<SharedStudent>[] = [
  { key: 'fullName', header: 'Full name', emphasis: true, value: (s) => s.fullName },
  { key: 'email', header: 'Email', value: (s) => s.email },
  { key: 'birthDate', header: 'Birth date', value: (s) => formatDate(s.birthDate) },
  { key: 'phone', header: 'Phone', value: (s) => formatText(s.phone) },
  { key: 'group', header: 'Group', value: (s) => s.group?.name ?? '—' },
  {
    key: 'status',
    header: 'Status',
    value: (s) => STUDENT_STATUS_LABEL[s.status],
    cellClass: statusClass,
  },
]
</script>