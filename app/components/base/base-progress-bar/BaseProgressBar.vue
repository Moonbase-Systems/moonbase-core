<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import { baseProgressBarFillVariants, type BaseProgressBarProps, baseProgressBarTrackVariants } from '.';

withDefaults(defineProps<BaseProgressBarProps>(), {
  size: 'md',
  color: 'default',
});
</script>

<template>
  <div
    :class="cn(baseProgressBarTrackVariants({ size }))"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div
      :class="cn(baseProgressBarFillVariants({ color }))"
      :style="{ width: `${Math.min(Math.max(value, 0), 100)}%` }"
    />
  </div>
</template>
