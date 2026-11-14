<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseToggleDotProps } from '.';

const props = withDefaults(defineProps<BaseToggleDotProps>(), {
  disabled: false,
  labelTypography: 'default',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

function toggle() {
  if (props.disabled) {
    return;
  }
  const next = !props.modelValue;
  emit('update:modelValue', next);
  emit('change', next);
}
</script>

<template>
  <div :class="cn('flex min-w-0 items-center gap-x-sm', props.class)">
    <span
      :class="
        props.labelTypography === 'inspector'
          ? 'font-sans text-body-sm font-normal text-on-surface'
          : 'font-mono text-label uppercase text-on-surface-dim'
      "
    >
      {{ label }}
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :disabled="disabled"
      class="flex size-x-lg shrink-0 items-center justify-center border transition-colors duration-short focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:border-dashed"
      :class="modelValue ? 'border-accent' : 'border-on-surface-dim'"
      @click="toggle"
    >
      <span
        class="size-xx-sm transition-colors duration-short"
        :class="modelValue ? (disabled ? 'bg-on-surface-dim' : 'bg-accent') : 'bg-transparent'"
      />
    </button>
  </div>
</template>
