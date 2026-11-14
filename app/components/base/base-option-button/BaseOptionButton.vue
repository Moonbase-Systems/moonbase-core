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
  'w-full border border-transparent bg-surface-container-high px-x-sm py-tiny text-left font-sans text-body-sm font-normal text-on-surface transition-colors duration-short focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:border-dashed disabled:border-line disabled:bg-transparent disabled:text-on-surface-dim',
  {
    variants: {
      tone: {
        accent: 'hover:border-accent hover:bg-surface',
        layout: 'hover:border-category-layout hover:bg-surface',
        interactive: 'hover:border-category-interactive hover:bg-category-interactive-fill',
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
