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
          <option v-for="student in students" :key="student.id" :value="String(student.id)">
            {{ student.fullName }} ({{ student.group?.name ?? 'no group' }})
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Category" :error="errors.categoryId">
        <BaseSelect :id="id" v-model="form.categoryId" :invalid="invalid">
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="String(category.id)">
            {{ category.name }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Status" :error="errors.status">
        <BaseSelect :id="id" v-model="form.status" :invalid="invalid">
          <option v-for="option in PAYMENT_STATUS_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <p class="text-sm text-zinc-400 sm:col-span-2">{{ categoryHint }}</p>

      <BaseFormField v-slot="{ id, invalid }" label="Amount, UAH" :error="errors.amount">
        <BaseInput :id="id" v-model="form.amount" inputmode="decimal" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Date" :error="errors.date">
        <BaseInput :id="id" v-model="form.date" type="date" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Purpose (optional)"
        :error="errors.purpose"
        class="sm:col-span-2"
      >
        <BaseInput :id="id" v-model="form.purpose" autocomplete="off" :invalid="invalid" />
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
import type { SharedCategory, SharedGroup, SharedStudent } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyPaymentForm } from '../model/payment-form'
import { PAYMENT_STATUS_OPTIONS } from '../model/payment-view'
import type { PaymentFormErrors, PaymentFormValues } from '../model/payment-form'

const props = withDefaults(
  defineProps<{
    students: SharedStudent[]
    categories: SharedCategory[]
    groups: SharedGroup[]
    initial?: PaymentFormValues
    errors?: PaymentFormErrors
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
  submit: [values: PaymentFormValues]
  cancel: []
}>()

const form = reactive<PaymentFormValues>({ ...(props.initial ?? createEmptyPaymentForm()) })

const selectedStudent = computed(() =>
  props.students.find((student) => String(student.id) === form.studentId),
)

const studentGroup = computed(() => {
  const groupId = selectedStudent.value?.group?.id
  return props.groups.find((group) => group.id === groupId) ?? null
})

const categoryHint = computed(() => {
  if (!selectedStudent.value) return 'Select a student, and the category is suggested from their group.'
  if (studentGroup.value) {
    return `Category ${studentGroup.value.category.name} is suggested from the group ${studentGroup.value.name}.`
  }
  return 'The student is not in a group yet, so choose the category manually (for example, for a prepayment).'
})

watch(
  () => form.studentId,
  () => {
    if (studentGroup.value) form.categoryId = String(studentGroup.value.category.id)
  },
)
</script>