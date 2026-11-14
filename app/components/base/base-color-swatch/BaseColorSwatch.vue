<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseColorSwatchProps } from '.';

const props = withDefaults(defineProps<BaseColorSwatchProps>(), {
  label: undefined,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

function openPicker() {
  if (props.disabled) {
    return;
  }
  inputRef.value?.click();
}

function onPickerChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  emit('change', value);
}
</script>

<template>
  <div :class="cn('flex flex-col items-start gap-x-tiny', props.class)">
    <span
      v-if="label"
      class="font-mono text-label uppercase text-on-surface-dim"
    >
      {{ label }}
    </span>
    <button
      type="button"
      :disabled="disabled"
      class="size-xx-lg shrink-0 border border-on-surface-dim p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:border-dashed"
      :style="{ backgroundColor: modelValue }"
      :aria-label="label ?? modelValue"
      @click="openPicker"
    />
    <input
      ref="inputRef"
      type="color"
      class="sr-only"
      :value="modelValue"
      :disabled="disabled"
      @input="onPickerChange"
    />
  </div>
</template>
