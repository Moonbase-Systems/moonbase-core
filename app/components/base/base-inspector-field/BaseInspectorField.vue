<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseInspectorFieldProps } from '.';

const props = withDefaults(defineProps<BaseInspectorFieldProps>(), {
  suffix: undefined,
  numeric: true,
  type: 'text',
  label: undefined,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const focused = ref(false);
const draft = ref(String(props.modelValue));

const numericPattern = /^-?\d*[.,]?\d*$/;

watch(
  () => props.modelValue,
  (value) => {
    if (!focused.value) {
      draft.value = String(value);
    }
  },
);

function onFocus() {
  focused.value = true;
}

function revertDraft() {
  draft.value = String(props.modelValue);
}

function onBeforeInput(event: InputEvent) {
  if (!props.numeric || !event.inputType.startsWith('insert')) {
    return;
  }
  const input = event.target as HTMLInputElement;
  const start = input.selectionStart ?? draft.value.length;
  const end = input.selectionEnd ?? start;
  const next = `${draft.value.slice(0, start)}${event.data ?? ''}${draft.value.slice(end)}`;
  if (next !== '' && !numericPattern.test(next)) {
    event.preventDefault();
  }
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const raw = input.value;
  if (props.numeric && raw !== '' && !numericPattern.test(raw)) {
    input.value = draft.value;
    return;
  }
  draft.value = raw;
}

function commit() {
  focused.value = false;
  if (!props.numeric) {
    emit('update:modelValue', draft.value);
    emit('change', draft.value);
    return;
  }
  const normalized = draft.value.trim().replace(',', '.');
  if (normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.') {
    revertDraft();
    return;
  }
  const value = Number(normalized);
  if (!Number.isFinite(value)) {
    revertDraft();
    return;
  }
  const next = String(value);
  draft.value = next;
  emit('update:modelValue', next);
  emit('change', next);
}

function onColorInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  emit('change', value);
}

const shellClass =
  'border border-line bg-transparent transition-colors duration-short hover:border-on-surface-dim focus-within:border-accent';
</script>

<template>
  <label
    v-if="type === 'color'"
    :class="cn('relative block size-control shrink-0 cursor-pointer border-on-surface-dim', shellClass, props.class)"
    :style="{ backgroundColor: String(modelValue) }"
  >
    <input
      type="color"
      class="absolute inset-0 size-full cursor-pointer opacity-0"
      :value="modelValue"
      :disabled="disabled"
      :aria-label="label"
      @input="onColorInput"
    />
  </label>
  <div
    v-else
    :class="cn(shellClass, 'flex h-row min-w-0 items-center px-tiny', props.class)"
  >
    <input
      :value="draft"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      :disabled="disabled"
      class="min-w-0 flex-1 border-0 bg-transparent p-0 font-sans text-body-sm font-normal tabular-nums text-on-surface outline-none disabled:text-on-surface-dim"
      @focus="onFocus"
      @beforeinput="onBeforeInput"
      @input="onInput"
      @change="commit"
      @blur="commit"
      @keydown.enter="($event.target as HTMLInputElement).blur()"
    />
    <span
      v-if="suffix"
      class="ml-x-tiny shrink-0 font-mono text-label uppercase text-on-surface-dim"
      aria-hidden="true"
    >
      {{ suffix }}
    </span>
  </div>
</template>
