<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from 'reka-ui';

import type { BaseCollapsibleProps } from '.';

const props = withDefaults(defineProps<BaseCollapsibleProps>(), {
  open: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

function onUpdateOpen(value: boolean) {
  emit('update:open', value);
}
</script>

<template>
  <CollapsibleRoot
    :open="props.open"
    unmount-on-hide
    @update:open="onUpdateOpen"
  >
    <slot name="trigger" />
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
