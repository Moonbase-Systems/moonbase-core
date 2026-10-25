<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseOptionGroupProps } from '.';

const props = withDefaults(defineProps<BaseOptionGroupProps>(), {
  tone: 'accent',
});

const sectionVariants = cva('gap-tiny flex flex-col border border-dashed px-x-sm py-x-sm', {
  variants: {
    tone: {
      accent: 'border-accent',
      layout: 'border-category-layout',
      interactive: 'border-category-interactive',
    },
  },
  defaultVariants: {
    tone: 'accent',
  },
});

const titleVariants = cva('font-roboto text-body-sm leading-snug font-semibold lowercase', {
  variants: {
    tone: {
      accent: 'text-accent',
      layout: 'text-category-layout',
      interactive: 'text-category-interactive',
    },
  },
  defaultVariants: {
    tone: 'accent',
  },
});
</script>

<template>
  <section :class="cn(sectionVariants({ tone: props.tone }), props.class)">
    <h3 :class="cn(titleVariants({ tone: props.tone }))">
      {{ title }}
    </h3>
    <div class="flex min-h-0 flex-1 flex-col justify-center gap-tiny">
      <slot />
    </div>
  </section>
</template>
