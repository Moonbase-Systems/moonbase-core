<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseIconButtonProps } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseIconButtonProps>(), {
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function onClick(event: MouseEvent) {
  if (props.disabled) {
    return;
  }
  emit('click', event);
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :aria-label="label"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center text-on-surface transition-colors duration-short',
        'hover:text-on-surface-dim',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot />
  </button>
</template>
