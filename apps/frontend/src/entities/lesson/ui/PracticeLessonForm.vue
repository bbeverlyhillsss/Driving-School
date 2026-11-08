<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField
        v-slot="{ id, invalid }"
        label="Student"
        :error="errors.studentId"
        class="sm:col-span-2"
      >
        <BaseSelect :id="id" v-model="form.studentId" :invalid="invalid">
          <option value="" disabled>Select student</option>
          <option v-for="student in eligibleStudents" :key="student.id" :value="String(student.id)">
            {{ student.fullName }} ({{ student.group?.name }})
          </option>
        </BaseSelect>
      </BaseFormField>

      <p class="text-sm text-zinc-400 sm:col-span-2">{{ categoryHint }}</p>

      <BaseFormField v-slot="{ id, invalid }" label="Instructor" :error="errors.instructorId">
        <BaseSelect :id="id" v-model="form.instructorId" :invalid="invalid">
          <option value="" disabled>Select instructor</option>
          <option
            v-for="instructor in availableInstructors"
            :key="instructor.id"
            :value="String(instructor.id)"
          >
            {{ instructor.fullName }} ({{ instructor.category.name }})
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Car" :error="errors.carId">
        <BaseSelect :id="id" v-model="form.carId" :invalid="invalid">
          <option value="" disabled>Select car</option>
          <option v-for="car in availableCars" :key="car.id" :value="String(car.id)">
            {{ car.brand }} {{ car.model }} · {{ car.plateNumber }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Date" :error="errors.date">
        <BaseInput :id="id" v-model="form.date" type="date" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Time slot" :error="errors.startTime">
        <BaseSelect :id="id" v-model="form.startTime" :invalid="invalid">
          <option value="" disabled>Select time</option>
          <option v-for="slot in PRACTICE_START_TIMES" :key="slot" :value="slot">
            {{ slot }}–{{ getPracticeEndTime(slot) }}
          </option>
        </BaseSelect>
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
import { computed, reactive, watch } from 'vue'
import {
  getPracticeEndTime,
  PRACTICE_START_TIMES,
  StudentStatus,
} from '@driving-school/shared'
import type {
  SharedCar,
  SharedGroup,
  SharedInstructor,
  SharedStudent,
} from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyPracticeForm } from '../model/practice-form'
import type { PracticeFormErrors, PracticeFormValues } from '../model/practice-form'

const props = withDefaults(
  defineProps<{
    students: SharedStudent[]
    instructors: SharedInstructor[]
    cars: SharedCar[]
    groups: SharedGroup[]
    initial?: PracticeFormValues
    errors?: PracticeFormErrors
    serverError?: string | null
    loading?: boolean
    submitLabel?: string
  }>(),
  {
    errors: () => ({}),
    serverError: null,
    loading: false,
    submitLabel: 'Save',
  },
)

const emit = defineEmits<{
  submit: [values: PracticeFormValues]
  cancel: []
}>()

const form = reactive<PracticeFormValues>({ ...(props.initial ?? createEmptyPracticeForm()) })

const eligibleStudents = computed(() =>
  props.students.filter((student) => student.status === StudentStatus.ACTIVE && student.group),
)

const selectedGroup = computed(() => {
  const student = props.students.find((item) => String(item.id) === form.studentId)
  if (!student?.group) return null
  return props.groups.find((group) => group.id === student.group?.id) ?? null
})

const categoryId = computed(() => selectedGroup.value?.category.id ?? null)

const availableInstructors = computed(() =>
  categoryId.value === null
    ? props.instructors
    : props.instructors.filter((instructor) => instructor.categoryId === categoryId.value),
)

const availableCars = computed(() =>
  categoryId.value === null
    ? props.cars
    : props.cars.filter((car) => car.categoryId === categoryId.value),
)

const categoryHint = computed(() =>
  selectedGroup.value
    ? `Category ${selectedGroup.value.category.name}: only matching instructors and cars are listed. The course theory ends on ${new Date(`${selectedGroup.value.endDate}T00:00:00`).toLocaleDateString('uk-UA')}.`
    : 'Select a student to see matching instructors and cars.',
)

watch(categoryId, () => {
  if (!availableInstructors.value.some((item) => String(item.id) === form.instructorId)) {
    form.instructorId = ''
  }
  if (!availableCars.value.some((item) => String(item.id) === form.carId)) {
    form.carId = ''
  }
})
</script>