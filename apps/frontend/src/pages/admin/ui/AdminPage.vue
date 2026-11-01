<template>
  <h1 class="text-2xl font-bold text-slate-900">Admin</h1>
  <BaseIconButton label="Edit"><Pencil :size="16" /></BaseIconButton>
  <BaseIconButton label="Delete" tone="danger"><Trash2 :size="16" /></BaseIconButton>
  <BaseButton variant="primary"></BaseButton>
  <BaseFormField #default="{ id, invalid }" label="Email">
    <BaseInput :id="id" :invalid="invalid" />
  </BaseFormField>
</template>

<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import { BaseIconButton } from '@/shared/ui/icon-button/index'
import { BaseButton } from '@/shared/ui/button'
import { BaseInput } from '@/shared/ui/input'
import { BaseFormField } from '@/shared/ui/form-field'
</script>
