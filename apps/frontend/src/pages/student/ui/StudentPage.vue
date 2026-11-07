<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-zinc-900">My workspace</h1>
    <StudentProfile />
  </div>
</template>

<script setup lang="ts">
import { StudentProfile } from '@/features/student/profile'
</script>