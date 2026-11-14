<script setup lang="ts">
import { inspectorFieldTypography, inspectorTypography } from '../../../utils/inspector-typography.utils';
import { cn } from '../../../utils/tailwind.utils';
import IconInspectorArrowH from '../../icons/inspector/IconInspectorArrowH.vue';
import IconInspectorLock from '../../icons/inspector/IconInspectorLock.vue';
import type { BaseValueFieldProps } from '.';

const props = withDefaults(defineProps<BaseValueFieldProps>(), {
  suffix: undefined,
  fieldSuffix: 'none',
  step: 1,
  disabled: false,
  showStepArrows: false,
  suffixIcon: undefined,
  showLock: false,
  valueTypography: 'standard-medium',
  fieldClass: undefined,
});

const valueTypeClass = computed(() => inspectorFieldTypography(props.valueTypography));

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
  'lock-click': [];
}>();

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('change', value);
}
</script>

<template>
  <div :class="cn('flex items-center gap-xxx-sm', props.class)">
    <span
      v-if="label.trim()"
      :class="cn(inspectorTypography.label, 'shrink-0 text-on-surface-dim')"
    >
      {{ label }}
    </span>
    <div
      :class="
        cn(
          'flex h-control w-full min-w-0 max-w-[10.4rem] shrink items-center justify-between border border-line px-xxx-sm transition-colors duration-short focus-within:border-accent hover:border-on-surface-dim',
          props.fieldClass,
        )
      "
    >
      <input
        type="text"
        inputmode="decimal"
        :value="modelValue"
        :disabled="disabled"
        :class="
          cn(
            valueTypeClass,
            'min-w-0 flex-1 border-0 bg-transparent p-0 text-left text-on-surface outline-none disabled:text-on-surface-dim',
          )
        "
        @input="onInput"
        @change="onChange"
      />
      <span
        v-if="suffix"
        :class="cn(inspectorTypography.label, 'shrink-0 text-on-surface-dim')"
      >
        {{ suffix }}
      </span>
      <span
        v-if="fieldSuffix === 'horizontal'"
        class="size-md shrink-0 text-on-surface-dim"
      >
        <IconInspectorArrowH />
      </span>
      <span
        v-else-if="fieldSuffix === 'vertical'"
        class="size-md shrink-0 rotate-90 text-on-surface-dim"
      >
        <IconInspectorArrowH />
      </span>
      <button
        v-if="showLock"
        type="button"
        class="size-md shrink-0 text-line"
        tabindex="-1"
        aria-hidden="true"
        @click="emit('lock-click')"
      >
        <IconInspectorLock />
      </button>
    </div>
  </div>
</template>
