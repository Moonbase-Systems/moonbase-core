<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseOptionButtonProps } from '.';

const props = withDefaults(defineProps<BaseOptionButtonProps>(), {
  tone: 'accent',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const toneVariants = cva(
  'w-full rounded-sm px-x-sm py-tiny text-center font-roboto text-body-sm leading-snug font-normal lowercase text-on-surface transition-colors duration-short focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      tone: {
        accent: 'bg-surface-container hover:bg-surface-container/80',
        layout: 'bg-surface-container hover:bg-surface-container/80',
        interactive: 'bg-category-interactive/20 hover:bg-category-interactive/30',
      },
    },
    defaultVariants: {
      tone: 'accent',
    },
  },
);

function onClick(event: MouseEvent) {
  if (props.disabled) {
    return;
  }
  emit('click', event);
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="cn(toneVariants({ tone }), props.class)"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>
