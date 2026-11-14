<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import IconChevronDown from '../../icons/IconChevronDown.vue';
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
    <span class="mb-x-tiny block font-mono text-label uppercase text-on-surface-dim">
      {{ label }}
    </span>
    <button
      type="button"
      :disabled="disabled"
      class="flex h-control min-w-[14.4rem] items-center justify-between gap-xxx-sm border border-line bg-transparent px-xxx-sm font-sans text-body-sm text-on-surface transition-colors duration-short hover:border-on-surface-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:border-dashed disabled:text-on-surface-dim"
      @click="onClick"
    >
      <span class="truncate">{{ value }}</span>
      <IconChevronDown class="size-md text-on-surface-dim" />
    </button>
  </div>
</template>
