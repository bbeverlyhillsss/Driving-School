<template>
  <p v-if="!overview && overviewStore.isLoading" class="text-zinc-600">Loading...</p>
  <p v-else-if="overviewStore.loadError" class="text-red-600">{{ overviewStore.loadError }}</p>

  <div v-else-if="overview" class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold text-zinc-900">Overview</h2>
      <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-xl border border-zinc-300 bg-white px-5 py-4"
        >
          <dt class="text-sm text-zinc-500">{{ stat.label }}</dt>
          <dd class="mt-1 text-2xl font-semibold text-zinc-900 tabular-nums">{{ stat.value }}</dd>
          <dd v-if="stat.hint" class="text-sm text-zinc-500">{{ stat.hint }}</dd>
        </div>
      </dl>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold text-zinc-900">Needs attention</h2>
      <ul
        v-if="attentionItems.length"
        class="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-300 bg-white"
      >
        <li v-for="item in attentionItems" :key="item.label">
          <RouterLink
            :to="item.to"
            class="flex items-center justify-between gap-4 px-5 py-3.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-900"
          >
            <span>{{ item.label }}</span>
            <span class="flex items-center gap-2">
              <span
                :class="[
                  'rounded-md px-2 py-0.5 font-semibold tabular-nums',
                  item.urgent ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-800',
                ]"
              >
                {{ item.count }}
              </span>
              <ChevronRight :size="16" class="text-zinc-400" />
            </span>
          </RouterLink>
        </li>
      </ul>
      <p v-else class="text-sm text-zinc-600">Nothing needs attention right now.</p>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold text-zinc-900">Lessons today · {{ todayLabel }}</h2>
      <LessonTable :items="overview.todayLessons" />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold text-zinc-900">Quick links</h2>
      <div class="flex flex-wrap gap-3">
        <RouterLink v-for="link in quickLinks" :key="link.label" :to="link.to" :class="quickLinkClass">
          {{ link.label }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import type { RouteLocationRaw } from 'vue-router'
import { LessonTable } from '@/entities/lesson'
import { useOverviewStore } from '@/entities/overview'
import { formatAmount } from '@/entities/payment'
import {
  CARS_LINK,
  EXAMS_LINK,
  GROUPS_LINK,
  LESSONS_LINK,
  PAYMENTS_LINK,
  STUDENTS_LINK,
} from '@/shared/config'

interface AttentionItem {
  label: string
  count: number
  to: RouteLocationRaw
  urgent?: boolean
}

const overviewStore = useOverviewStore()
const overview = computed(() => overviewStore.overview)

const todayLabel = new Date().toLocaleDateString('uk-UA', {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const stats = computed(() => {
  const counts = overview.value?.counts
  if (!counts) return []

  return [
    {
      label: 'Active students',
      value: String(counts.activeStudents),
      hint: `of ${counts.totalStudents} registered`,
    },
    { label: 'Groups running now', value: String(counts.activeGroups), hint: '' },
    { label: 'Instructors', value: String(counts.instructors), hint: '' },
    { label: 'Cars', value: String(counts.cars), hint: '' },
    { label: 'Lessons today', value: String(counts.lessonsToday), hint: 'cancelled are not counted' },
    { label: 'Paid this month', value: formatAmount(counts.paidThisMonth), hint: '' },
  ]
})

const attentionItems = computed<AttentionItem[]>(() => {
  const attention = overview.value?.attention
  if (!attention) return []

  const items: AttentionItem[] = [
    {
      label: 'Active students without a group',
      count: attention.studentsWithoutGroup,
      to: STUDENTS_LINK,
    },
    {
      label: 'Cars with an expired inspection',
      count: attention.carsInspectionExpired,
      to: CARS_LINK,
      urgent: true,
    },
    {
      label: 'Cars with an inspection expiring within 30 days',
      count: attention.carsInspectionExpiringSoon,
      to: CARS_LINK,
    },
    {
      label: 'Groups without a theory schedule',
      count: attention.groupsWithoutSchedule,
      to: GROUPS_LINK,
    },
    {
      label: 'Past exams without a result',
      count: attention.examsAwaitingResult,
      to: EXAMS_LINK,
      urgent: true,
    },
    { label: 'Pending payments', count: attention.pendingPayments, to: PAYMENTS_LINK },
  ]

  return items.filter((item) => item.count > 0)
})

const quickLinks = [
  { label: 'Plan a practice lesson', to: LESSONS_LINK },
  { label: 'Record an exam', to: EXAMS_LINK },
  { label: 'Record a payment', to: PAYMENTS_LINK },
  { label: 'Manage groups', to: GROUPS_LINK },
] as const

const quickLinkClass =
  'inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900'

onMounted(overviewStore.load)
</script>