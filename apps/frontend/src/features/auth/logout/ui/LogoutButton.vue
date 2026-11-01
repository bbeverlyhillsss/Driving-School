<template>
  <BaseButton variant="inverse" size="sm" :loading="isLoading" @click="submit">Log out</BaseButton>
</template>

<script setup lang="ts">
import { BaseButton } from '@/shared/ui/button'
import { useLogout } from '../model/useLogout'

const { isLoading, submit } = useLogout()
</script>
