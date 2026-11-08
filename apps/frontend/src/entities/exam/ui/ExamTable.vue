<template>
  <DataTable :columns :items :total :row-key="getExamKey" empty-text="No exams found.">
    <template v-if="$slots['header-actions']" #header-actions>
      <slot name="header-actions" />
    </template>
    <template v-if="$slots.actions" #actions="{ row }">
      <slot name="actions" :exam="row" />
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ExamResult } from '@driving-school/shared'
import type { SharedExam } from '@driving-school/shared'
import { DataTable } from '@/shared/ui/data-table'
import type { Column } from '@/shared/ui/data-table'
import {
  EXAM_RESULT_LABEL,
  EXAM_TYPE_LABEL,
  formatExamDate,
  getExamKey,
} from '../model/exam-view'

const props = withDefaults(
  defineProps<{ items: SharedExam[]; total?: number; perspective?: 'staff' | 'student' }>(),
  { perspective: 'staff' },
)

defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { exam: SharedExam }): unknown
}>()

const resultClass = (exam: SharedExam): string => {
  if (exam.result === ExamResult.PASSED) return 'font-medium text-emerald-700'
  if (exam.result === ExamResult.FAILED) return 'font-medium text-red-600'
  return 'text-zinc-500'
}

const dateColumn: Column<SharedExam> = {
  key: 'date',
  header: 'Date',
  emphasis: true,
  value: (e) => formatExamDate(e.date),
}

const studentColumn: Column<SharedExam> = {
  key: 'student',
  header: 'Student',
  value: (e) => e.student.fullName,
}

const groupColumn: Column<SharedExam> = {
  key: 'group',
  header: 'Group',
  value: (e) => e.student.group?.name ?? '—',
}

const typeColumn: Column<SharedExam> = {
  key: 'type',
  header: 'Type',
  value: (e) => EXAM_TYPE_LABEL[e.type],
}

const resultColumn: Column<SharedExam> = {
  key: 'result',
  header: 'Result',
  value: (e) => (e.result ? EXAM_RESULT_LABEL[e.result] : 'Pending'),
  cellClass: resultClass,
}

const scoreColumn: Column<SharedExam> = {
  key: 'score',
  header: 'Score',
  value: (e) => (e.score === null ? '—' : String(e.score)),
}

const columns = computed<Column<SharedExam>[]>(() =>
  props.perspective === 'student'
    ? [dateColumn, typeColumn, resultColumn, scoreColumn]
    : [dateColumn, studentColumn, groupColumn, typeColumn, resultColumn, scoreColumn],
)
</script>