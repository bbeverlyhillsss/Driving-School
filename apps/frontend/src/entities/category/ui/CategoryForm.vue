<template>
  <form class="flex flex-col gap-6" @submit.prevent="emit('submit', { ...form })">
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField
        v-slot="{ id, invalid }"
        label="Name"
        :error="errors.name"
        class="sm:col-span-2"
      >
        <BaseInput :id="id" v-model="form.name" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Min. age" :error="errors.minAge">
        <BaseInput :id="id" v-model="form.minAge" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Price" :error="errors.price">
        <BaseInput :id="id" v-model="form.price" inputmode="decimal" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Theory hours" :error="errors.theoryHours">
        <BaseInput :id="id" v-model="form.theoryHours" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField v-slot="{ id, invalid }" label="Practice hours" :error="errors.practiceHours">
        <BaseInput :id="id" v-model="form.practiceHours" inputmode="numeric" :invalid="invalid" />
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
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseFormField } from '@/shared/ui/form-field'
import { createEmptyCategoryForm } from '../model/category-form'
import type { CategoryFormErrors, CategoryFormValues } from '../model/category-form'

const props = withDefaults(
  defineProps<{
    initial?: CategoryFormValues
    errors?: CategoryFormErrors
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
  submit: [values: CategoryFormValues]
  cancel: []
}>()

const form = reactive<CategoryFormValues>({ ...(props.initial ?? createEmptyCategoryForm()) })
</script>
