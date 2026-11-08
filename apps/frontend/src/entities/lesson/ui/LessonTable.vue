<template>
  <DataTable :columns :items :total empty-text="No lessons found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :lesson="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { LessonType } from '@driving-school/shared'
import type { SharedLesson } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import { getLessonState, LESSON_STATE_LABEL, LESSON_TYPE_LABEL } from '../model/lesson-view'

defineProps<{ items: SharedLesson[]; total?: number }>()

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { lesson: SharedLesson }): unknown
}>()

const formatDate = (value: string): string =>
  new Date(`${value}T00:00:00`).toLocaleDateString('uk-UA', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

const stateClass = (lesson: SharedLesson): string | undefined => {
  const state = getLessonState(lesson)
  if (state === 'cancelled') return 'font-medium text-red-600'
  if (state === 'held') return 'text-zinc-500'
  return undefined
}

const columns: Column<SharedLesson>[] = [
  { key: 'date', header: 'Date', emphasis: true, value: (l) => formatDate(l.date) },
  { key: 'time', header: 'Time', value: (l) => `${l.startTime}–${l.endTime}` },
  { key: 'type', header: 'Type', value: (l) => LESSON_TYPE_LABEL[l.type] },
  {
    key: 'participant',
    header: 'Group / Student',
    value: (l) => (l.type === LessonType.THEORY ? (l.group?.name ?? '—') : (l.student?.fullName ?? '—')),
  },
  { key: 'instructor', header: 'Instructor', value: (l) => l.instructor.fullName },
  {
    key: 'car',
    header: 'Car',
    value: (l) => (l.car ? `${l.car.brand} ${l.car.model} · ${l.car.plateNumber}` : '—'),
  },
  {
    key: 'status',
    header: 'Status',
    value: (l) => LESSON_STATE_LABEL[getLessonState(l)],
    cellClass: stateClass,
  },
]
</script>