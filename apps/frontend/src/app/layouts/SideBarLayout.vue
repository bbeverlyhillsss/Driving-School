<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-56 shrink-0 bg-slate-900 text-slate-100 flex flex-col">
      <div class="px-5 py-5 text-lg font-bold text-white border-b border-slate-700">
        Driving School
      </div>
      <nav class="flex flex-col gap-1 p-3">
        <RouterLink
          v-for="{ to, name } in LINKS"
          :to
          :key="name"
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          active-class="bg-blue-600 text-white hover:bg-blue-600"
        >
          {{ name }}
        </RouterLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        class="flex items-center justify-end gap-4 px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
      >
        <span class="text-sm text-gray-600">Hello, user</span>
        <RouterLink
          :to="MAIN_LINK"
          class="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          User Profile
        </RouterLink>
      </header>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { MAIN_LINK } from '@/shared/config'

interface Link {
  to: RouteLocationRaw
  name: string
}

const LINKS = [
  {
    to: MAIN_LINK,
    name: 'Main Page',
  },
] as const satisfies Array<Link>
</script>
