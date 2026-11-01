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
  <div :class="cn('flex items-center gap-[6px]', props.class)">
    <span
      v-if="label.trim()"
      :class="cn(inspectorTypography.standardMedium, 'shrink-0 text-white')"
    >
      {{ label }}
    </span>
    <div
      :class="
        cn(
          'flex h-[36px] w-full min-w-0 max-w-[90px] shrink items-center justify-between bg-[color-mix(in_srgb,white_5%,#050004)] px-[5px] py-[6px]',
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
            'min-w-0 flex-1 border-0 bg-transparent p-0 text-left text-white outline-none disabled:opacity-50',
          )
        "
        @input="onInput"
        @change="onChange"
      />
      <span
        v-if="suffix"
        :class="cn(valueTypeClass, 'shrink-0 text-white')"
      >
        {{ suffix }}
      </span>
      <span
        v-if="fieldSuffix === 'horizontal'"
        class="size-6 shrink-0 text-white"
      >
        <IconInspectorArrowH />
      </span>
      <span
        v-else-if="fieldSuffix === 'vertical'"
        class="size-6 shrink-0 rotate-90 text-white"
      >
        <IconInspectorArrowH />
      </span>
      <button
        v-if="showLock"
        type="button"
        class="size-6 shrink-0 text-white/10"
        tabindex="-1"
        aria-hidden="true"
        @click="emit('lock-click')"
      >
        <IconInspectorLock />
      </button>
    </div>
  </div>
</template>
