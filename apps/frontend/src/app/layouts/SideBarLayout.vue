<template>
  <div class="flex min-h-screen flex-col bg-zinc-900 text-zinc-300">
    <header class="flex h-16 shrink-0 items-center pr-6">
      <span class="w-64 shrink-0 px-6 text-lg font-semibold text-white">Driving School</span>

      <template v-if="userStore.user">
        <div class="flex items-center gap-3 pl-8">
          <span class="rounded-md bg-zinc-100 p-0.5">
            <span
              class="block rounded-[5px] border border-zinc-900 px-2.5 py-0.5 text-sm font-medium text-zinc-900"
            >
              {{ roleLabel }}
            </span>
          </span>
          <span class="text-sm text-zinc-300">{{ userStore.user.email }}</span>
        </div>

        <div class="ml-auto flex items-center gap-4">
          <RouterLink
            :to="homeLink"
            class="text-sm font-medium text-white transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
          >
            Profile
          </RouterLink>
          <LogoutButton />
        </div>
      </template>
    </header>

    <div class="flex min-h-0 flex-1">
      <aside class="w-64 shrink-0">
        <nav class="flex flex-col gap-1.5 px-4 py-3">
          <RouterLink
            v-for="{ to, name } in links"
            v-slot="{ href, navigate, isActive }"
            :key="name"
            :to
            custom
          >
            <a
              :href
              :aria-current="isActive ? 'page' : undefined"
              :class="[linkBase, isActive ? linkActive : linkIdle]"
              @click="navigate"
            >
              {{ name }}
            </a>
          </RouterLink>
        </nav>
      </aside>

      <main class="min-w-0 flex-1 overflow-auto rounded-tl-2xl bg-zinc-100 p-8 text-zinc-900">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { Role } from '@driving-school/shared'
import { useUserStore } from '@/entities/user'
import LogoutButton from '@/features/auth/logout/ui/LogoutButton.vue'

import { CATEGORIES_LINK } from '@/pages/categories'
import { ROOT_LINK } from '@/shared/config'
import { ROLE_HOME_LINK } from '../router/role-home'
import { CARS_LINK } from '@/pages/cars'
import { INSTRUCTORS_LINK } from '@/pages/instructors'
import { GROUPS_LINK } from '@/pages/groups'

interface Link {
  to: RouteLocationRaw
  name: string
}

const userStore = useUserStore()

const ROLE_LABEL: Record<Role, string> = {
  [Role.ADMIN]: 'Admin',
  [Role.INSTRUCTOR]: 'Instructor',
  [Role.STUDENT]: 'Student',
}

const roleLabel = computed(() => (userStore.role ? ROLE_LABEL[userStore.role] : ''))

const homeLink = computed<RouteLocationRaw>(() =>
  userStore.role ? ROLE_HOME_LINK[userStore.role] : ROOT_LINK,
)

const links = computed<Link[]>(() => [
  { to: homeLink.value, name: 'My Workspace' },
  { to: CATEGORIES_LINK, name: 'Categories' },
  { to: CARS_LINK, name: 'Cars' },
  { to: INSTRUCTORS_LINK, name: 'Instructors' },
  { to: GROUPS_LINK, name: 'Groups' },
])

const linkBase =
  'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300'
const linkIdle = 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
const linkActive = 'bg-zinc-800 text-white'
</script>
