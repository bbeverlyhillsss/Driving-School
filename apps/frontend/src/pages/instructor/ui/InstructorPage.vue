<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-bold text-zinc-900">My workspace</h1>

    <GroupMembers
      v-if="viewingMembers"
      :key="viewingMembers.id"
      :group="viewingMembers"
      :can-manage="false"
      @close="viewingMembers = null"
    />

    <p v-if="!isReady" class="text-zinc-600">Loading...</p>
    <template v-else>
      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold text-zinc-900">My groups</h2>
        <p v-if="groupStore.loadError" class="text-red-600">{{ groupStore.loadError }}</p>
        <GroupTable v-else :items="groupStore.items">
          <template #actions="{ group }">
            <div class="flex justify-end gap-1">
              <BaseIconButton label="Members" @click="viewingMembers = group">
                <Users :size="16" />
              </BaseIconButton>
            </div>
          </template>
        </GroupTable>
      </section>

      <LessonSchedule perspective="instructor" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Users } from 'lucide-vue-next'
import type { SharedGroup } from '@driving-school/shared'
import { GroupTable, useGroupStore } from '@/entities/group'
import { useLessonStore } from '@/entities/lesson'
import { GroupMembers } from '@/features/group/members'
import { LessonSchedule } from '@/features/lesson/schedule'
import { BaseIconButton } from '@/shared/ui/icon-button'

const groupStore = useGroupStore()
const lessonStore = useLessonStore()

const viewingMembers = ref<SharedGroup | null>(null)
const isReady = ref(false)

onMounted(async () => {
  await Promise.all([groupStore.load(), lessonStore.load()])
  isReady.value = true
})
</script>