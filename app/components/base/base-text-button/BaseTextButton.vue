<script setup lang="ts">
import { gsap } from 'gsap';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseTextButtonProps } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseTextButtonProps>(), {
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const accentRef = useTemplateRef<HTMLElement>('accentRef');

onMounted(() => {
  if (!accentRef.value) return;
  gsap.set(accentRef.value, { clipPath: 'inset(100% 0 0 0)' });
});

function onPointerEnter() {
  if (!accentRef.value) return;
  gsap.to(accentRef.value, {
    clipPath: 'inset(0% 0 0 0)',
    duration: 0.15,
    ease: 'power2.out',
  });
}

function onPointerLeave() {
  if (!accentRef.value) return;
  gsap.to(accentRef.value, {
    clipPath: 'inset(100% 0 0 0)',
    duration: 0.15,
    ease: 'power2.out',
  });
}

function onClick(event: MouseEvent) {
  if (props.disabled) return;
  emit('click', event);
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="cn('font-roboto text-body-md font-medium', props.class)"
    @click="onClick"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <span class="relative inline-block">
      <span class="text-on-surface">{{ text }}</span>
      <span
        ref="accentRef"
        class="absolute inset-0 text-accent"
        aria-hidden="true"
      >
        {{ text }}
      </span>
    </span>
  </button>
</template>
