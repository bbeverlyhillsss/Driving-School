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
import { computed } from 'vue'
import { LessonType } from '@driving-school/shared'
import type { SharedLesson } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import {
  formatLessonDate,
  getLessonState,
  LESSON_STATE_LABEL,
  LESSON_TYPE_LABEL,
} from '../model/lesson-view'
import type { LessonPerspective } from '../model/lesson-view'

const props = withDefaults(
  defineProps<{ items: SharedLesson[]; total?: number; perspective?: LessonPerspective }>(),
  { perspective: 'admin' },
)

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { lesson: SharedLesson }): unknown
}>()

const stateClass = (lesson: SharedLesson): string | undefined => {
  const state = getLessonState(lesson)
  if (state === 'cancelled') return 'font-medium text-red-600'
  if (state === 'held') return 'text-zinc-500'
  return undefined
}

const dateColumn: Column<SharedLesson> = {
  key: 'date',
  header: 'Date',
  emphasis: true,
  value: (l) => formatLessonDate(l.date),
}

const timeColumn: Column<SharedLesson> = {
  key: 'time',
  header: 'Time',
  value: (l) => `${l.startTime}–${l.endTime}`,
}

const typeColumn: Column<SharedLesson> = {
  key: 'type',
  header: 'Type',
  value: (l) => LESSON_TYPE_LABEL[l.type],
}

const participantColumn: Column<SharedLesson> = {
  key: 'participant',
  header: 'Group / Student',
  value: (l) =>
    l.type === LessonType.THEORY ? (l.group?.name ?? '—') : (l.student?.fullName ?? '—'),
}

const instructorColumn: Column<SharedLesson> = {
  key: 'instructor',
  header: 'Instructor',
  value: (l) => l.instructor.fullName,
}

const carColumn: Column<SharedLesson> = {
  key: 'car',
  header: 'Car',
  value: (l) => (l.car ? `${l.car.brand} ${l.car.model} · ${l.car.plateNumber}` : '—'),
}

const statusColumn: Column<SharedLesson> = {
  key: 'status',
  header: 'Status',
  value: (l) => LESSON_STATE_LABEL[getLessonState(l)],
  cellClass: stateClass,
}

const columns = computed<Column<SharedLesson>[]>(() => {
  if (props.perspective === 'student') {
    return [dateColumn, timeColumn, typeColumn, instructorColumn, carColumn, statusColumn]
  }
  if (props.perspective === 'instructor') {
    return [dateColumn, timeColumn, typeColumn, participantColumn, carColumn, statusColumn]
  }
  return [
    dateColumn,
    timeColumn,
    typeColumn,
    participantColumn,
    instructorColumn,
    carColumn,
    statusColumn,
  ]
})
</script>