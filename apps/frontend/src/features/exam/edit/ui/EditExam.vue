<template>
  <BaseModal title="Edit exam result" :description @close="emit('close')">
    <ExamForm
      mode="edit"
      :initial="toExamFormValues(exam)"
      :errors
      :server-error="serverError"
      :loading="isLoading"
      submit-label="Save"
      @submit="submit"
      @cancel="emit('close')"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SharedExam } from '@driving-school/shared'
import { EXAM_TYPE_LABEL, ExamForm, formatExamDate, toExamFormValues } from '@/entities/exam'
import { BaseModal } from '@/shared/ui/modal'
import { useEditExam } from '../model/use-edit-exam'

const props = defineProps<{ exam: SharedExam }>()
const emit = defineEmits<{ close: [] }>()

const description = computed(
  () =>
    `${props.exam.student.fullName} · ${EXAM_TYPE_LABEL[props.exam.type]} · ${formatExamDate(props.exam.date)}`,
)

const { errors, serverError, isLoading, submit } = useEditExam(
  props.exam.studentId,
  props.exam.date,
  () => emit('close'),
)
</script>