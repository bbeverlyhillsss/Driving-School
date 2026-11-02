<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField
        v-slot="{ id, invalid }"
        label="Full name"
        :error="errors.fullName"
        class="sm:col-span-2"
      >
        <BaseInput :id="id" v-model="form.fullName" autocomplete="off" :invalid="invalid" />
      </BaseFormField>

      <template v-if="mode === 'create'">
        <BaseFormField v-slot="{ id, invalid }" label="Email" :error="errors.email">
          <BaseInput
            :id="id"
            v-model="form.email"
            type="email"
            autocomplete="off"
            :invalid="invalid"
          />
        </BaseFormField>

        <BaseFormField v-slot="{ id, invalid }" label="Password" :error="errors.password">
          <BaseInput
            :id="id"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            :invalid="invalid"
          />
        </BaseFormField>
      </template>

      <BaseFormField v-slot="{ id, invalid }" label="Category" :error="errors.categoryId">
        <BaseSelect :id="id" v-model="form.categoryId" :invalid="invalid">
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="String(category.id)">
            {{ category.name }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Experience, years"
        :error="errors.experienceYears"
      >
        <BaseInput :id="id" v-model="form.experienceYears" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Phone"
        :error="errors.phone"
        class="sm:col-span-2"
      >
        <BaseInput :id="id" v-model="form.phone" type="tel" :invalid="invalid" />
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
import { reactive } from 'vue'
import type { SharedCategory } from '@driving-school/shared'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseSelect } from '@/shared/ui/select'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyInstructorForm } from '../model/instructor-form'
import type { InstructorFormErrors, InstructorFormValues } from '../model/instructor-form'

const props = withDefaults(
  defineProps<{
    mode: 'create' | 'edit'
    categories: SharedCategory[]
    initial?: InstructorFormValues
    errors?: InstructorFormErrors
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
  submit: [values: InstructorFormValues]
  cancel: []
}>()

const form = reactive<InstructorFormValues>({
  ...(props.initial ?? createEmptyInstructorForm()),
})
</script>
