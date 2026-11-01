<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseSelectPillProps } from '.';

const props = withDefaults(defineProps<BaseSelectPillProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function onClick(event: MouseEvent) {
  if (props.disabled) {
    return;
  }
  emit('click', event);
}
</script>

<template>
  <div :class="cn('flex min-w-0 flex-col', props.class)">
    <span class="mb-[0.2rem] block font-roboto text-[10px] lowercase leading-none text-on-surface">
      {{ label }}
    </span>
    <button
      type="button"
      :disabled="disabled"
      class="flex h-[1.375rem] min-w-[5.5rem] items-center justify-between gap-x-sm rounded-[0.2rem] bg-surface-container px-[0.45rem] font-roboto text-[11px] leading-none text-on-surface transition-colors hover:bg-surface-container/90 disabled:opacity-50"
      @click="onClick"
    >
      <span class="truncate lowercase">{{ value }}</span>
      <span class="text-[10px] text-on-surface-dim">&gt;</span>
    </button>
  </div>
</template>
