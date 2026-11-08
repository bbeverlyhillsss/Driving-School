<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField
        v-slot="{ id, invalid }"
        label="Name"
        :error="errors.name"
        class="sm:col-span-2"
      >
        <BaseInput :id="id" v-model="form.name" autocomplete="off" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Instructor"
        :error="errors.instructorId"
        class="sm:col-span-2"
      >
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

      <p class="text-sm text-zinc-400 sm:col-span-2">{{ categoryHint }}</p>

      <BaseFormField v-slot="{ id, invalid }" label="Shift" :error="errors.shift">
        <BaseSelect :id="id" v-model="form.shift" :invalid="invalid">
          <option v-for="option in GROUP_SHIFT_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Start date" :error="errors.startDate">
        <BaseInput :id="id" v-model="form.startDate" type="date" :invalid="invalid" />
      </BaseFormField>

      <p class="text-sm text-zinc-400 sm:col-span-2">{{ endDateHint }}</p>
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
import { getGroupEndDate } from '@driving-school/shared'
import type { SharedInstructor } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyGroupForm } from '../model/group-form'
import { GROUP_SHIFT_OPTIONS } from '../model/group-shift'
import type { GroupFormErrors, GroupFormValues } from '../model/group-form'

const props = withDefaults(
  defineProps<{
    instructors: SharedInstructor[]
    categoryId?: number
    initial?: GroupFormValues
    errors?: GroupFormErrors
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
  submit: [values: GroupFormValues]
  cancel: []
}>()

const form = reactive<GroupFormValues>({ ...(props.initial ?? createEmptyGroupForm()) })

const availableInstructors = computed(() =>
  props.categoryId === undefined
    ? props.instructors
    : props.instructors.filter((instructor) => instructor.categoryId === props.categoryId),
)

const selectedInstructor = computed(() =>
  props.instructors.find((instructor) => String(instructor.id) === form.instructorId),
)

const categoryHint = computed(() => {
  if (!availableInstructors.value.length) return 'No instructors available.'
  if (props.categoryId !== undefined) {
    return 'The category cannot be changed, so only instructors of the same category are listed.'
  }
  if (selectedInstructor.value) {
    return `Category ${selectedInstructor.value.category.name} is taken from the instructor.`
  }
  return 'The group category is taken from the selected instructor.'
})

const endDateHint = computed(() => {
  if (!form.startDate) return 'The end date is calculated automatically: 20 working days.'
  const end = new Date(`${getGroupEndDate(form.startDate)}T00:00:00`)
  return `The course ends on ${end.toLocaleDateString('uk-UA')} (20 working days).`
})
</script>