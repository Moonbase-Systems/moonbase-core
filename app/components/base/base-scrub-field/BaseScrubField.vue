<script setup lang="ts">
import { inspectorFieldTypography, inspectorTypography } from '../../../utils/inspector-typography.utils';
import { cn } from '../../../utils/tailwind.utils';
import IconInspectorArrowH from '../../icons/inspector/IconInspectorArrowH.vue';
import IconInspectorLock from '../../icons/inspector/IconInspectorLock.vue';
import type { BaseScrubFieldProps } from '.';

const props = withDefaults(defineProps<BaseScrubFieldProps>(), {
  suffix: undefined,
  fieldSuffix: 'none',
  step: 1,
  min: undefined,
  max: undefined,
  disabled: false,
  showLock: false,
  compact: false,
  valueTypography: 'standard-medium',
  fieldClass: undefined,
});

const valueTypeClass = computed(() =>
  props.compact
    ? 'font-inter text-body-sm font-medium tracking-normal text-white'
    : cn(inspectorFieldTypography(props.valueTypography), 'text-white'),
);

const labelTypeClass = computed(() =>
  props.compact ? valueTypeClass.value : cn(inspectorTypography.standardMedium, 'text-white'),
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
  'lock-click': [];
}>();

const editing = ref(false);
const draft = ref(String(props.modelValue));
const dragging = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    if (!editing.value && !dragging.value) {
      draft.value = String(value);
    }
  },
);

function clamp(value: number) {
  const snapped = Math.round(value / props.step) * props.step;
  const withMin = props.min === undefined ? snapped : Math.max(props.min, snapped);
  const withMax = props.max === undefined ? withMin : Math.min(props.max, withMin);
  return Number(withMax.toFixed(4));
}

function commitRaw(raw: string) {
  const value = Number(raw.replace(/[^\d.-]/g, ''));
  if (!Number.isFinite(value)) {
    draft.value = String(props.modelValue);
    return;
  }
  const next = String(clamp(value));
  draft.value = next;
  emit('update:modelValue', next);
  emit('change', next);
}

function onFocus() {
  editing.value = true;
}

function onBlur() {
  editing.value = false;
  commitRaw(draft.value);
}

let dragOrigin: { y: number; value: number } | null = null;

function onScrubDown(event: PointerEvent) {
  if (props.disabled) {
    return;
  }
  const handle = event.currentTarget;
  if (!(handle instanceof HTMLElement)) {
    return;
  }
  handle.setPointerCapture(event.pointerId);
  dragging.value = true;
  dragOrigin = {
    y: event.clientY,
    value: Number(props.modelValue),
  };
}

function onScrubMove(event: PointerEvent) {
  if (!dragOrigin || !Number.isFinite(dragOrigin.value)) {
    return;
  }
  const next = clamp(dragOrigin.value + (dragOrigin.y - event.clientY) * props.step);
  const raw = String(next);
  draft.value = raw;
  emit('update:modelValue', raw);
  emit('change', raw);
}

function onScrubUp(event: PointerEvent) {
  const handle = event.currentTarget;
  if (handle instanceof HTMLElement && handle.hasPointerCapture(event.pointerId)) {
    handle.releasePointerCapture(event.pointerId);
  }
  dragging.value = false;
  dragOrigin = null;
}
</script>

<template>
  <div :class="cn('flex items-center gap-[6px]', props.class)">
    <span
      v-if="label.trim()"
      :class="cn(labelTypeClass, 'shrink-0')"
    >
      {{ label }}
    </span>
    <div
      :class="
        cn(
          props.compact
            ? 'flex h-[24px] w-full min-w-0 shrink items-center justify-between bg-[color-mix(in_srgb,white_5%,#050004)] px-[4px]'
            : 'flex h-[36px] w-full min-w-0 max-w-[90px] shrink items-center justify-between bg-[color-mix(in_srgb,white_5%,#050004)] px-[5px] py-[6px]',
          props.fieldClass,
        )
      "
    >
      <span class="flex min-w-0 items-center">
        <input
          v-model="draft"
          type="text"
          inputmode="decimal"
          :disabled="disabled"
          :class="
            cn(valueTypeClass, 'min-w-[1ch] border-0 bg-transparent p-0 text-left outline-none disabled:opacity-50')
          "
          :style="{ width: `${Math.max(draft.length, 1)}ch` }"
          @focus="onFocus"
          @blur="onBlur"
          @change="commitRaw(($event.target as HTMLInputElement).value)"
          @keydown.enter="($event.target as HTMLInputElement).blur()"
        />
        <span
          v-if="suffix"
          :class="cn(valueTypeClass, 'shrink-0')"
        >
          {{ suffix }}
        </span>
      </span>
      <button
        v-if="fieldSuffix !== 'none'"
        type="button"
        :class="
          cn(
            'shrink-0 cursor-ns-resize touch-none text-white',
            compact ? 'size-4' : 'size-6',
            fieldSuffix === 'vertical' && 'rotate-90',
          )
        "
        tabindex="-1"
        aria-hidden="true"
        @pointerdown="onScrubDown"
        @pointermove="onScrubMove"
        @pointerup="onScrubUp"
        @pointercancel="onScrubUp"
      >
        <IconInspectorArrowH />
      </button>
      <button
        v-if="showLock"
        type="button"
        class="shrink-0 text-white/10"
        :class="compact ? 'size-4' : 'size-6'"
        tabindex="-1"
        aria-hidden="true"
        @click="emit('lock-click')"
      >
        <IconInspectorLock />
      </button>
    </div>
  </div>
</template>
