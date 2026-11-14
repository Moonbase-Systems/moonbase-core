<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseLevelMeterProps } from '.';

const props = withDefaults(defineProps<BaseLevelMeterProps>(), {
  value: 0,
  peak: undefined,
  segments: 18,
  warnAt: 0.75,
  hotAt: 0.9,
  label: undefined,
  readout: undefined,
  class: undefined,
});

const clamped = computed(() => Math.max(0, Math.min(1, props.value)));

const onCount = computed(() => Math.round(clamped.value * props.segments));

const peakIndex = computed(() => {
  if (props.peak === undefined) {
    return -1;
  }
  const peak = Math.max(0, Math.min(1, props.peak));
  return Math.max(0, Math.round(peak * props.segments) - 1);
});

const warnFrom = computed(() => Math.round(props.segments * props.warnAt));
const hotFrom = computed(() => Math.round(props.segments * props.hotAt));

const segmentIndexes = computed(() => Array.from({ length: props.segments }, (_, index) => index));

function segmentClass(index: number) {
  const lit = index < onCount.value;
  const peakOnly = index === peakIndex.value && index >= onCount.value;
  return cn(
    'h-[0.4rem] w-full transition-colors duration-short',
    lit && 'bg-accent',
    lit && index >= warnFrom.value && 'bg-warning',
    lit && index >= hotFrom.value && 'bg-error',
    peakOnly && 'bg-on-surface',
    !lit && !peakOnly && 'bg-surface-container-high',
  );
}
</script>

<template>
  <div
    role="meter"
    :aria-label="label"
    :aria-valuemin="0"
    :aria-valuemax="1"
    :aria-valuenow="clamped"
    :class="cn('inline-flex flex-col items-center gap-xxx-sm', props.class)"
  >
    <span
      v-if="readout"
      class="font-sans text-body-sm font-bold tabular-nums text-on-surface"
    >
      {{ readout }}
    </span>
    <div class="flex w-[1.2rem] flex-col-reverse gap-[2px]">
      <span
        v-for="index in segmentIndexes"
        :key="index"
        :class="segmentClass(index)"
      />
    </div>
    <span
      v-if="label"
      class="font-mono text-body-x-sm uppercase tracking-[0.08em] text-on-surface-dim"
    >
      {{ label }}
    </span>
  </div>
</template>
