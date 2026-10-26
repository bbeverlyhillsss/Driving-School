<template>
  <form
    class="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5"
    @submit.prevent="emit('submit', { ...form })"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseFormField label="Назва" :error="errors.name" #default="{ id, invalid }">
        <BaseInput :id="id" v-model="form.name" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField label="Мін. вік" :error="errors.minAge" #default="{ id, invalid }">
        <BaseInput :id="id" v-model="form.minAge" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField label="Теорія, год" :error="errors.theoryHours" #default="{ id, invalid }">
        <BaseInput :id="id" v-model="form.theoryHours" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField label="Практика, год" :error="errors.practiceHours" #default="{ id, invalid }">
        <BaseInput :id="id" v-model="form.practiceHours" inputmode="numeric" :invalid="invalid" />
      </BaseFormField>

      <BaseFormField label="Ціна, грн" :error="errors.price" #default="{ id, invalid }">
        <BaseInput :id="id" v-model="form.price" inputmode="decimal" :invalid="invalid" />
      </BaseFormField>
    </div>

    <p v-if="serverError" class="text-sm text-red-600">{{ serverError }}</p>

    <div class="flex gap-3">
      <BaseButton type="submit" :loading="loading">{{ submitLabel }}</BaseButton>
      <BaseButton variant="secondary" @click="emit('cancel')">Скасувати</BaseButton>
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
    submitLabel: 'Зберегти',
  },
)

const emit = defineEmits<{
  submit: [values: CategoryFormValues]
  cancel: []
}>()

const form = reactive<CategoryFormValues>({ ...(props.initial ?? createEmptyCategoryForm()) })
</script>
