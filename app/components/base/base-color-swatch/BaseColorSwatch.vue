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
      class="font-roboto text-body-x-sm lowercase leading-none text-on-surface-dim"
    >
      {{ label }}
    </span>
    <button
      type="button"
      :disabled="disabled"
      class="size-6 shrink-0 rounded-x-sm border border-on-surface-dim/40 p-0 disabled:opacity-50"
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
