<template>
  <BaseCard class="w-full max-w-xl">
    <form class="flex flex-col gap-6" @submit.prevent="submit">
      <BaseCardHeader>
        <BaseCardTitle as="h1">Login form</BaseCardTitle>
        <BaseCardDescription> Log in to continue.</BaseCardDescription>
      </BaseCardHeader>

      <BaseCardContent>
        <BaseFormField v-slot="{ id }" label="Email">
          <BaseInput :id v-model="form.email" type="email" autocomplete="email" />
        </BaseFormField>

        <BaseFormField v-slot="{ id }" label="Password">
          <BaseInput :id v-model="form.password" type="password" autocomplete="current-password" />
        </BaseFormField>

        <ul v-if="errors.length" role="alert" class="flex flex-col gap-1 text-sm text-red-400">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </BaseCardContent>

      <BaseCardFooter direction="column">
        <BaseButton type="submit" variant="inverse" :loading="isLoading" class="w-full">
          Log in
        </BaseButton>
        <slot name="footer" />
      </BaseCardFooter>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { BaseButton } from '@/shared/ui/button'
import { BaseFormField } from '@/shared/ui/form-field'
import { BaseInput } from '@/shared/ui/input'
import { useLogin } from '../index'
import type { RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'

import {
  BaseCard,
  BaseCardContent,
  BaseCardFooter,
  BaseCardHeader,
  BaseCardTitle,
  BaseCardDescription,
} from '@/shared/ui/card'

const props = defineProps<{ to: RouteLocationRaw }>()
const router = useRouter()
const { form, isLoading, errors, submit } = useLogin(() => router.push(props.to))
</script>
