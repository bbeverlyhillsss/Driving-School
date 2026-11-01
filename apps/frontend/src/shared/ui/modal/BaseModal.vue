<template>
  <Teleport to="body">
    <dialog
      ref="dialogRef"
      :aria-labelledby="titleId"
      class="m-auto max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-0 text-zinc-100 backdrop:bg-zinc-950/60 backdrop:backdrop-blur-sm"
      @close="emit('close')"
      @mousedown="onMouseDown"
      @click="onClick"
    >
      <div class="flex flex-col gap-6 p-6">
        <header class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1.5">
            <h2 :id="titleId" class="text-xl font-semibold tracking-tight text-zinc-50">
              {{ title }}
            </h2>
            <p v-if="description" class="text-sm text-zinc-400">{{ description }}</p>
          </div>
          <BaseIconButton label="Close" class="-mt-1 -mr-2 shrink-0" @click="close">
            <X :size="18" />
          </BaseIconButton>
        </header>

        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, useId } from 'vue'
import { X } from 'lucide-vue-next'
import { provideSurface } from '@/shared/lib'
import { BaseIconButton } from '@/shared/ui/icon-button'

defineProps<{ title: string; description?: string }>()

const emit = defineEmits<{ close: [] }>()

provideSurface('dark')

const titleId = useId()
const dialogRef = ref<HTMLDialogElement | null>(null)
let pressedOnBackdrop = false

const close = (): void => dialogRef.value?.close()

const onMouseDown = (event: MouseEvent): void => {
  pressedOnBackdrop = event.target === dialogRef.value
}

const onClick = (event: MouseEvent): void => {
  if (pressedOnBackdrop && event.target === dialogRef.value) close()
}

onMounted(() => {
  const dialog = dialogRef.value
  if (!dialog) return

  dialog.showModal()
  dialog.querySelector<HTMLElement>('[data-autofocus], input, select, textarea')?.focus()
})
</script>