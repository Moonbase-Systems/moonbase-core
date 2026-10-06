<script setup lang="ts">
import { gsap } from 'gsap';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseTextButtonProps } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseTextButtonProps>(), {
  active: false,
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const CLIP_VISIBLE = 'inset(0% 0 0 0)';
const CLIP_FROM_TOP = 'inset(100% 0 0 0)';
const CLIP_TO_CENTER = 'inset(0 50% 0 50%)';

const accentRef = useTemplateRef<HTMLElement>('accentRef');

onMounted(() => {
  if (!accentRef.value) return;
  gsap.set(accentRef.value, {
    clipPath: props.active ? CLIP_VISIBLE : CLIP_FROM_TOP,
  });
});

watch(
  () => props.active,
  (active, wasActive) => {
    if (!accentRef.value) return;

    if (active) {
      gsap.fromTo(
        accentRef.value,
        { clipPath: CLIP_FROM_TOP },
        {
          clipPath: CLIP_VISIBLE,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: true,
        },
      );
      return;
    }

    if (wasActive) {
      // zwinięcie do środka, potem cichy reset do stanu hover (bez skoku wizualnego)
      gsap
        .timeline({ overwrite: true })
        .to(accentRef.value, {
          clipPath: CLIP_TO_CENTER,
          duration: 0.3,
          ease: 'power2.out',
        })
        .set(accentRef.value, { clipPath: CLIP_FROM_TOP });
    }
  },
);

function onPointerEnter() {
  if (props.active || !accentRef.value) return;

  gsap.fromTo(
    accentRef.value,
    { clipPath: CLIP_FROM_TOP },
    {
      clipPath: CLIP_VISIBLE,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: true,
    },
  );
}

function onPointerLeave() {
  if (props.active || !accentRef.value) return;

  gsap.fromTo(
    accentRef.value,
    { clipPath: CLIP_VISIBLE },
    {
      clipPath: CLIP_FROM_TOP,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: true,
    },
  );
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
    :aria-current="active ? 'page' : undefined"
    :class="cn('font-sans text-body-md font-medium', props.class)"
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
