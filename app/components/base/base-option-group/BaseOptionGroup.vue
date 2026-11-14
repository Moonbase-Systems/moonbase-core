<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { cn } from '../../../utils/tailwind.utils';
import BaseFrameBrackets from '../base-frame/BaseFrameBrackets.vue';
import type { BaseOptionGroupProps } from '.';

const props = withDefaults(defineProps<BaseOptionGroupProps>(), {
  tone: 'accent',
});

const titleVariants = cva('mb-xx-sm font-mono text-label font-normal uppercase', {
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
  <section :class="cn('relative flex flex-col gap-tiny border border-line p-x-sm', props.class)">
    <BaseFrameBrackets :tone="props.tone" />
    <h3 :class="cn(titleVariants({ tone: props.tone }))">
      {{ title }}
    </h3>
    <div class="flex min-h-0 flex-1 flex-col justify-center gap-tiny">
      <slot />
    </div>
  </section>
</template>
