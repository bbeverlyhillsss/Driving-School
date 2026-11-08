<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <template v-if="mode === 'create'">
        <BaseFormField
          v-slot="{ id, invalid }"
          label="Student"
          :error="errors.studentId"
          class="sm:col-span-2"
        >
          <BaseSelect :id="id" v-model="form.studentId" :invalid="invalid">
            <option value="" disabled>Select student</option>
            <option
              v-for="student in eligibleStudents"
              :key="student.id"
              :value="String(student.id)"
            >
              {{ student.fullName }} ({{ student.group?.name }})
            </option>
          </BaseSelect>
        </BaseFormField>

        <BaseFormField v-slot="{ id, invalid }" label="Exam type" :error="errors.type">
          <BaseSelect :id="id" v-model="form.type" :invalid="invalid">
            <option v-for="option in EXAM_TYPE_OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </BaseSelect>
        </BaseFormField>

        <BaseFormField v-slot="{ id, invalid }" label="Date" :error="errors.date">
          <BaseInput :id="id" v-model="form.date" type="date" :invalid="invalid" />
        </BaseFormField>
      </template>

      <BaseFormField v-slot="{ id, invalid }" label="Result" :error="errors.result">
        <BaseSelect :id="id" v-model="form.result" :invalid="invalid">
          <option value="">No result yet</option>
          <option v-for="option in EXAM_RESULT_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Score (0–100)" :error="errors.score">
        <BaseInput :id="id" v-model="form.score" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>
    </div>

    <p v-if="serverError" role="alert" class="text-sm text-red-400">{{ serverError }}</p>

    <div class="flex justify-end gap-3">
      <BaseButton variant="secondary" @click="emit('cancel')">Discard</BaseButton>
      <BaseButton type="submit" variant="inverse" :loading="loading">{{ submitLabel }}</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { SharedStudent } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyExamForm } from '../model/exam-form'
import { EXAM_RESULT_OPTIONS, EXAM_TYPE_OPTIONS } from '../model/exam-view'
import type { ExamFormErrors, ExamFormValues } from '../model/exam-form'

const props = withDefaults(
  defineProps<{
    mode: 'create' | 'edit'
    students?: SharedStudent[]
    initial?: ExamFormValues
    errors?: ExamFormErrors
    serverError?: string | null
    loading?: boolean
    submitLabel?: string
  }>(),
  {
    students: () => [],
    errors: () => ({}),
    serverError: null,
    loading: false,
    submitLabel: 'Save',
  },
)

const emit = defineEmits<{
  submit: [values: ExamFormValues]
  cancel: []
}>()

const form = reactive<ExamFormValues>({ ...(props.initial ?? createEmptyExamForm()) })

const eligibleStudents = computed(() => props.students.filter((student) => student.group))
</script>