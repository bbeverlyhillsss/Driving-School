<template>
  <div class="overflow-hidden rounded-xl border border-zinc-300 bg-white">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm tabular-nums">
        <thead>
          <tr class="h-14 bg-zinc-900 text-zinc-300">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-5 align-middle font-medium whitespace-nowrap"
            >
              {{ column.header }}
            </th>
            <th v-if="hasActions" class="px-5 text-right align-middle whitespace-nowrap">
              <slot name="header-actions" />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200">
          <tr v-for="item in items" :key="item.id" class="transition-colors hover:bg-zinc-50">
            <td v-for="column in columns" :key="column.key" :class="cellClasses(column, item)">
              {{ column.value(item) }}
            </td>
            <td v-if="hasActions" class="px-5 py-2">
              <slot name="actions" :row="item" />
            </td>
          </tr>
          <tr v-if="!items.length">
            <td
              :colspan="columns.length + (hasActions ? 1 : 0)"
              class="px-5 py-8 text-center text-zinc-500"
            >
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="border-t border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-zinc-500">
      Showing {{ items.length }} of {{ total ?? items.length }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id: number }">
import { computed } from 'vue'
import type { Column } from './types'

withDefaults(
  defineProps<{
    columns: Column<T>[]
    items: T[]
    total?: number
    emptyText?: string
  }>(),
  { emptyText: 'No data found.' },
)

const slots = defineSlots<{
  'header-actions'?(): unknown
  actions?(props: { row: T }): unknown
}>()

const hasActions = computed(() => !!slots.actions || !!slots['header-actions'])

const cellClasses = (column: Column<T>, item: T): string => {
  const custom = column.cellClass?.(item)
  const tone = custom ?? (column.emphasis ? 'font-semibold text-zinc-900' : 'text-zinc-700')
  return `px-5 py-3.5 ${tone}`
}
</script>