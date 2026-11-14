<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseFrameProps } from '.';
import BaseFrameBrackets from './BaseFrameBrackets.vue';

const props = withDefaults(defineProps<BaseFrameProps>(), {
  label: undefined,
  active: false,
  corners: 'diagonal',
  tone: 'accent',
  filled: false,
  as: 'section',
  class: undefined,
});
</script>

<template>
  <component
    :is="props.as"
    :class="
      cn('relative min-w-0 border border-line', props.filled ? 'bg-surface-container' : 'bg-transparent', props.class)
    "
  >
    <BaseFrameBrackets
      v-if="active"
      :corners="corners"
      :tone="tone"
    />
    <span
      v-if="label"
      class="mb-xxx-sm block font-mono text-label uppercase text-on-surface-dim"
    >
      {{ label }}
    </span>
    <slot />
  </component>
</template>
