<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField v-slot="{ id, invalid }" label="Brand" :error="errors.brand">
        <BaseInput :id="id" v-model="form.brand" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Model" :error="errors.model">
        <BaseInput :id="id" v-model="form.model" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Plate number" :error="errors.plateNumber">
        <BaseInput :id="id" v-model="form.plateNumber" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Category" :error="errors.categoryId">
        <BaseSelect :id="id" v-model="form.categoryId" :invalid="invalid">
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="String(category.id)">
            {{ category.name }}
          </option>
        </BaseSelect>
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Year" :error="errors.year">
        <BaseInput :id="id" v-model="form.year" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField
        v-slot="{ id, invalid }"
        label="Inspection valid until"
        :error="errors.inspectionDate"
      >
        <BaseInput :id="id" v-model="form.inspectionDate" type="date" :invalid="invalid" />
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
import { createEmptyCarForm } from '../model/car-form'
import type { CarFormErrors, CarFormValues } from '../model/car-form'

const props = withDefaults(
  defineProps<{
    categories: SharedCategory[]
    initial?: CarFormValues
    errors?: CarFormErrors
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
  submit: [values: CarFormValues]
  cancel: []
}>()

const form = reactive<CarFormValues>({ ...(props.initial ?? createEmptyCarForm()) })
</script>
