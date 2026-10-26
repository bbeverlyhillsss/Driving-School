<template>
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="w-full text-left text-sm">
      <thead class="bg-slate-50 text-slate-600">
        <tr>
          <th class="px-4 py-3 font-medium">Назва</th>
          <th class="px-4 py-3 font-medium">Мін. вік</th>
          <th class="px-4 py-3 font-medium">Теорія, год</th>
          <th class="px-4 py-3 font-medium">Практика, год</th>
          <th class="px-4 py-3 font-medium">Ціна</th>
          <th v-if="$slots.actions" class="px-4 py-3" />
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr v-for="category in items" :key="category.id">
          <td class="px-4 py-3 font-semibold text-slate-900">{{ category.name }}</td>
          <td class="px-4 py-3">{{ formatValue(category.minAge) }}</td>
          <td class="px-4 py-3">{{ formatValue(category.theoryHours) }}</td>
          <td class="px-4 py-3">{{ formatValue(category.practiceHours) }}</td>
          <td class="px-4 py-3">{{ formatPrice(category.price) }}</td>
          <td v-if="$slots.actions" class="px-4 py-3">
            <slot name="actions" :category="category" />
          </td>
        </tr>
        <tr v-if="!items.length">
          <td colspan="6" class="px-4 py-6 text-center text-slate-500">Категорій поки немає</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { SharedCategory } from '@driving-school/shared'

defineProps<{ items: SharedCategory[] }>()

const formatValue = (value: number | null): string => (value === null ? '—' : String(value))

const formatPrice = (value: number | null): string =>
  value === null
    ? '—'
    : new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
      }).format(value)
</script>
