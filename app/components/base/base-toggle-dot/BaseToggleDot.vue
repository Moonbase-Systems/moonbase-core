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
          ? 'font-inter text-body-sm font-medium tracking-normal text-white'
          : 'font-roboto text-body-x-sm lowercase leading-none text-on-surface-dim'
      "
    >
      {{ label }}
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="flex size-5 shrink-0 items-center justify-center rounded-full border border-on-surface-dim/40 transition-colors disabled:opacity-50"
      :class="modelValue ? 'border-accent' : ''"
      @click="toggle"
    >
      <span
        class="size-2 rounded-full transition-colors"
        :class="modelValue ? 'bg-accent' : 'bg-transparent'"
      />
    </button>
  </div>
</template>
