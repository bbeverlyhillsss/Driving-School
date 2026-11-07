<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <template v-if="mode === 'admin'">
        <BaseFormField v-slot="{ id, invalid }" label="Full name" :error="errors.fullName">
          <BaseInput :id="id" v-model="form.fullName" autocomplete="off" :invalid="invalid" />
        </BaseFormField>

        <BaseFormField v-slot="{ id, invalid }" label="Status" :error="errors.status">
          <BaseSelect :id="id" v-model="form.status" :invalid="invalid">
            <option
              v-for="option in STUDENT_STATUS_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </BaseSelect>
        </BaseFormField>
      </template>

      <BaseFormField v-slot="{ id, invalid }" label="Birth date" :error="errors.birthDate">
        <BaseInput :id="id" v-model="form.birthDate" type="date" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Phone" :error="errors.phone">
        <BaseInput :id="id" v-model="form.phone" type="tel" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Address"
        :error="errors.address"
        class="sm:col-span-2"
      >
        <BaseInput
          :id="id"
          v-model="form.address"
          autocomplete="street-address"
          :invalid="invalid"
        />
      </BaseFormField>
    </div>

    <p v-if="serverError" role="alert" class="text-sm text-red-400">{{ serverError }}</p>

    <div class="flex justify-end gap-3">
      <BaseButton v-if="cancellable" variant="secondary" @click="emit('cancel')"
        >Discard
      </BaseButton>
      <BaseButton type="submit" variant="inverse" :loading="loading">{{ submitLabel }}</BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { STUDENT_STATUS_OPTIONS } from '../model/student-status'
import type { StudentFormErrors, StudentFormValues } from '../model/student-form'

const props = withDefaults(
  defineProps<{
    mode: 'admin' | 'self'
    initial: StudentFormValues
    errors?: StudentFormErrors
    serverError?: string | null
    loading?: boolean
    cancellable?: boolean
    submitLabel?: string
  }>(),
  {
    errors: () => ({}),
    serverError: null,
    loading: false,
    cancellable: true,
    submitLabel: 'Save',
  },
)

const emit = defineEmits<{
  submit: [values: StudentFormValues]
  cancel: []
}>()

const form = reactive<StudentFormValues>({ ...props.initial })
</script>
