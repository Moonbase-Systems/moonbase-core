<script setup lang="ts">
import { inspectorTypography } from '../../../utils/inspector-typography.utils';
import { cn } from '../../../utils/tailwind.utils';
import type { BasePropertyCardProps } from '.';

const props = defineProps<BasePropertyCardProps>();
</script>

<template>
  <section :class="cn('flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#050004]', props.class)">
    <div class="min-h-0 flex-1 overflow-y-auto">
      <div class="flex min-h-full flex-col items-center justify-center gap-[10px] py-[7px]">
        <h3
          :class="
            cn(inspectorTypography.specialSmall, 'flex h-[56px] shrink-0 items-center justify-center text-[#22FF86]')
          "
        >
          {{ title }}
        </h3>
        <div class="flex w-full flex-col items-center">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
