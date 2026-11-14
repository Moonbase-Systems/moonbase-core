<script setup lang="ts">
import { inspectorTypography } from '../../../utils/inspector-typography.utils';
import { cn } from '../../../utils/tailwind.utils';
import BaseFrameBrackets from '../base-frame/BaseFrameBrackets.vue';
import type { BasePropertyCardProps } from '.';

const props = defineProps<BasePropertyCardProps>();
</script>

<template>
  <section
    :class="cn('relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-line', props.class)"
  >
    <BaseFrameBrackets />
    <div class="min-h-0 flex-1 overflow-y-auto px-md py-md">
      <div class="flex min-h-full flex-col gap-md">
        <h3 :class="cn(inspectorTypography.title, 'shrink-0 text-on-surface')">
          {{ title }}
        </h3>
        <div class="flex w-full flex-col">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
