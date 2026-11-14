<script setup lang="ts">
import { cva } from 'class-variance-authority';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseStatusBadgeProps } from '.';

const props = withDefaults(defineProps<BaseStatusBadgeProps>(), {
  state: 'idle',
  live: false,
  class: undefined,
});

const wordVariants = cva('inline-flex items-center gap-xxx-sm whitespace-nowrap font-mono text-label uppercase', {
  variants: {
    state: {
      idle: 'text-on-surface-dim',
      live: 'text-accent',
      paused: 'text-warning',
      warning: 'text-warning',
      error: 'text-error',
      offline: 'text-on-surface-dim',
      ok: 'text-on-surface',
      info: 'text-info',
    },
  },
});

const dotClass = computed(() => {
  if (props.state === 'offline') {
    return 'border border-current bg-transparent';
  }
  if (props.state === 'ok') {
    return 'bg-accent';
  }
  return 'bg-current';
});
</script>

<template>
  <span
    :class="cn(wordVariants({ state: props.state }), props.class)"
    :role="live ? 'status' : undefined"
  >
    <span
      :class="['size-xxx-sm shrink-0 rounded-full', dotClass]"
      aria-hidden="true"
    />
    {{ label }}
  </span>
</template>
