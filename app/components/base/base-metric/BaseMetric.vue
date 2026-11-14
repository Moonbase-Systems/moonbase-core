<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import BaseFrameBrackets from '../base-frame/BaseFrameBrackets.vue';
import type { BaseMetricProps } from '.';

const props = withDefaults(defineProps<BaseMetricProps>(), {
  value: undefined,
  unit: undefined,
  note: undefined,
  state: undefined,
  class: undefined,
});

const empty = computed(() => props.value === null || props.value === undefined || props.value === '');

const showBrackets = computed(() => !empty.value && (props.state === 'warning' || props.state === 'error'));

const bracketTone = computed(() => (props.state === 'error' ? 'error' : 'warning'));

const valueClass = computed(() => {
  if (empty.value) {
    return 'text-on-surface-dim';
  }
  if (props.state === 'warning') {
    return 'text-warning';
  }
  if (props.state === 'error') {
    return 'text-error';
  }
  return 'text-on-surface';
});

const noteClass = computed(() => {
  if (props.state === 'warning') {
    return 'text-warning';
  }
  if (props.state === 'error') {
    return 'text-error';
  }
  return 'text-on-surface-dim';
});
</script>

<template>
  <div :class="cn('relative flex min-w-[13.6rem] flex-col gap-tiny border border-line px-md py-x-sm', props.class)">
    <BaseFrameBrackets
      v-if="showBrackets"
      corners="diagonal"
      :tone="bracketTone"
    />
    <span class="font-mono text-label uppercase text-on-surface-dim">{{ label }}</span>
    <span :class="cn('flex items-baseline gap-x-tiny font-sans text-title font-light tabular-nums', valueClass)">
      <template v-if="empty">—</template>
      <template v-else>
        {{ value }}
        <span
          v-if="unit"
          class="font-mono text-body-x-sm tracking-[0.08em] text-on-surface-dim"
        >
          {{ unit }}
        </span>
      </template>
    </span>
    <span
      v-if="note"
      :class="cn('font-mono text-label uppercase', noteClass)"
    >
      {{ note }}
    </span>
  </div>
</template>
