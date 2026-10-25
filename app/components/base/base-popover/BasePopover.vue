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
        side="top"
        align="end"
        :side-offset="8"
        :class="cn('z-50 w-[17rem] max-w-[calc(100vw-2rem)] bg-surface p-tiny shadow-lg outline-none')"
        @escape-key-down="close"
        @pointer-down-outside="close"
      >
        <slot :close="close" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
