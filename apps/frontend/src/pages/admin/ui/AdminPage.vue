<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-2xl font-bold text-zinc-900">My workspace</h1>
    <AdminDashboard />
  </div>
</template>

<script setup lang="ts">
import { AdminDashboard } from '@/features/admin/dashboard'
</script>