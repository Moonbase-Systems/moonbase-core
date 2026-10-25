<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

import { cn } from '../../../utils/tailwind.utils';
import type { BasePopoverProps } from '.';

const props = withDefaults(defineProps<BasePopoverProps>(), {
  open: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

function onUpdateOpen(value: boolean) {
  emit('update:open', value);
}

function close() {
  emit('update:open', false);
}

defineExpose({ close });
</script>

<template>
  <PopoverRoot
    :open="props.open"
    @update:open="onUpdateOpen"
  >
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="right"
        align="end"
        :side-offset="6"
        :align-offset="0"
        position-strategy="fixed"
        :avoid-collisions="true"
        :collision-padding="12"
        sticky="always"
        :prioritize-position="true"
        update-position-strategy="always"
        :class="
          cn(
            'z-50 flex h-[450px] max-h-[calc(100dvh-1.5rem)] w-[300px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden bg-surface p-x-sm shadow-lg outline-none',
          )
        "
        @escape-key-down="close"
        @pointer-down-outside="close"
      >
        <div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <slot :close="close" />
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
