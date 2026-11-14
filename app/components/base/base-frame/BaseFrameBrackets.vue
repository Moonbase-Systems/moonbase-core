<script setup lang="ts">
import { cva } from 'class-variance-authority';

import type { BaseFrameCorners, BaseFrameTone } from '.';

const props = withDefaults(defineProps<{ corners?: BaseFrameCorners; tone?: BaseFrameTone }>(), {
  corners: 'diagonal',
  tone: 'accent',
});

const bracketVariants = cva('pointer-events-none absolute size-bracket border-0', {
  variants: {
    tone: {
      accent: 'border-accent',
      warning: 'border-warning',
      error: 'border-error',
      layout: 'border-category-layout',
      interactive: 'border-category-interactive',
    },
  },
  defaultVariants: { tone: 'accent' },
});

const positions = computed(() => {
  const diagonal = ['-left-px -top-px border-l border-t', '-bottom-px -right-px border-b border-r'];
  if (props.corners === 'diagonal') {
    return diagonal;
  }
  return [...diagonal, '-right-px -top-px border-r border-t', '-bottom-px -left-px border-b border-l'];
});
</script>

<template>
  <span
    v-for="position in positions"
    :key="position"
    :class="[bracketVariants({ tone: props.tone }), position]"
    aria-hidden="true"
  />
</template>
