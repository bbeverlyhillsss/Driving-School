<template>
  <div class="overflow-hidden rounded-xl border border-zinc-300 bg-white">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm tabular-nums">
        <thead>
          <tr class="h-14 bg-zinc-900 text-zinc-300">
            <th class="px-5 align-middle font-medium">Name</th>
            <th class="px-5 align-middle font-medium">Min. age</th>
            <th class="px-5 align-middle font-medium">Theory hours</th>
            <th class="px-5 align-middle font-medium">Practice hours</th>
            <th class="px-5 align-middle font-medium">Price</th>
            <th v-if="hasActions" class="px-5 text-right align-middle whitespace-nowrap">
              <slot name="header-actions" />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200">
          <tr
            v-for="category in items"
            :key="category.id"
            class="transition-colors hover:bg-zinc-50"
          >
            <td class="px-5 py-3.5 font-semibold text-zinc-900">{{ category.name }}</td>
            <td class="px-5 py-3.5 text-zinc-700">{{ formatValue(category.minAge) }}</td>
            <td class="px-5 py-3.5 text-zinc-700">{{ formatValue(category.theoryHours) }}</td>
            <td class="px-5 py-3.5 text-zinc-700">{{ formatValue(category.practiceHours) }}</td>
            <td class="px-5 py-3.5 text-zinc-700">{{ formatPrice(category.price) }}</td>
            <td v-if="hasActions" class="px-5 py-2">
              <slot name="actions" :category="category" />
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="6" class="px-5 py-8 text-center text-zinc-500">No categories found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-zinc-500">
      Showing {{ items.length }} of {{ total ?? items.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { SharedCategory } from '@driving-school/shared'

defineProps<{ items: SharedCategory[]; total?: number }>()

const slots = useSlots()
const hasActions = computed(() => !!slots.actions || !!slots['header-actions'])

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
