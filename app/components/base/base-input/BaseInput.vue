<script setup lang="ts">
import { gsap } from 'gsap';

import { cn } from '../../../utils/tailwind.utils';
import type { BaseInputProps } from '.';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
  loading: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const focused = ref(false);
const lineHidden = ref(false);
const dotsTrackRef = useTemplateRef<HTMLElement>('dotsTrackRef');
const lineRef = useTemplateRef<HTMLElement>('lineRef');
const rootRef = useTemplateRef<HTMLElement>('rootRef');

const SPAWN_INTERVAL_MS = 140;
const DOT_DURATION = 1.15;
const FINISH_DURATION = 0.55;

let spawnTimer: ReturnType<typeof setInterval> | null = null;
let spawnToLeft = true;
let finishTl: gsap.core.Timeline | null = null;
const activeTweens = new Set<gsap.core.Timeline>();

const isDisabled = computed(() => props.disabled || props.loading);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Priority: disabled → loading → error → focused → default */
const lineColor = computed(() => {
  if (props.disabled) return 'var(--input-line)';
  if (props.loading || lineHidden.value) return 'var(--input-line-active)';
  if (props.error) return 'var(--input-line-error)';
  if (focused.value) return 'var(--input-line-active)';
  return 'var(--input-line)';
});

function cssRgb(token: string) {
  const raw = getComputedStyle(rootRef.value ?? document.documentElement)
    .getPropertyValue(token)
    .trim();
  return raw ? `rgb(${raw})` : undefined;
}

function spawnDot() {
  const track = dotsTrackRef.value;
  if (!track) return;

  const halfWidth = track.clientWidth / 2;
  if (halfWidth <= 0) return;

  // Stop short of the hard clip edge so glow never gets sliced into a bright speck.
  const travel = Math.max(halfWidth - 10, halfWidth * 0.92);

  const direction = spawnToLeft ? -1 : 1;
  spawnToLeft = !spawnToLeft;

  const color = cssRgb('--color-accent') ?? 'rgb(var(--color-accent))';
  const dot = document.createElement('span');
  dot.className = 'base-input-dot';
  dot.style.backgroundColor = color;
  track.appendChild(dot);

  const tl = gsap.timeline({
    onComplete: () => {
      activeTweens.delete(tl);
      tl.kill();
      dot.remove();
    },
  });

  activeTweens.add(tl);

  tl.fromTo(
    dot,
    { x: 0, opacity: 0, scale: 0.7 },
    {
      x: direction * travel,
      duration: DOT_DURATION,
      ease: 'none',
    },
    0,
  );
  tl.to(dot, { opacity: 1, scale: 1, duration: DOT_DURATION * 0.1, ease: 'power1.out' }, 0);
  tl.to(
    dot,
    {
      opacity: 0,
      scale: 0.75,
      duration: DOT_DURATION * 0.35,
      ease: 'power1.in',
    },
    DOT_DURATION * 0.55,
  );
}

function clearDotsHard() {
  activeTweens.forEach((tl) => tl.kill());
  activeTweens.clear();

  const track = dotsTrackRef.value;
  if (!track) return;

  track.querySelectorAll('.base-input-dot').forEach((dot) => {
    gsap.killTweensOf(dot);
    dot.remove();
  });
}

function resetLine() {
  const line = lineRef.value;
  if (!line) return;
  gsap.killTweensOf(line);
  gsap.set(line, { clearProps: 'opacity,transform,transformOrigin,scaleX' });
}

function startSpawner() {
  if (finishTl) {
    finishTl.kill();
    finishTl = null;
  }

  clearDotsHard();
  resetLine();

  if (prefersReducedMotion()) {
    lineHidden.value = false;
    return;
  }

  lineHidden.value = true;

  spawnDot();
  spawnTimer = setInterval(spawnDot, SPAWN_INTERVAL_MS);
}

function stopSpawnTimer() {
  if (spawnTimer) {
    clearInterval(spawnTimer);
    spawnTimer = null;
  }
}

function finishLoading() {
  stopSpawnTimer();

  if (prefersReducedMotion()) {
    clearDotsHard();
    resetLine();
    lineHidden.value = false;
    return;
  }

  const track = dotsTrackRef.value;
  const line = lineRef.value;
  if (!track || !line) {
    clearDotsHard();
    lineHidden.value = false;
    return;
  }

  // Keep dots where they are — stop travel timelines without removing nodes.
  activeTweens.forEach((tl) => tl.kill());
  activeTweens.clear();

  const dots = Array.from(track.querySelectorAll<HTMLElement>('.base-input-dot'));
  const gray = cssRgb('--color-on-surface-dim') ?? 'rgb(120 120 120)';

  if (finishTl) finishTl.kill();

  finishTl = gsap.timeline({
    onComplete: () => {
      dots.forEach((dot) => {
        gsap.killTweensOf(dot);
        dot.remove();
      });
      resetLine();
      lineHidden.value = false;
      finishTl = null;
    },
  });

  if (dots.length) {
    dots.forEach((dot) => {
      gsap.set(dot, { opacity: Math.max(Number(gsap.getProperty(dot, 'opacity')), 0.35) });
    });

    finishTl.to(
      dots,
      {
        scaleX: 18,
        scaleY: 0.35,
        borderRadius: 0,
        backgroundColor: gray,
        boxShadow: '0 0 0 transparent',
        duration: FINISH_DURATION,
        ease: 'power2.inOut',
        stagger: 0.015,
      },
      0,
    );
    finishTl.to(
      dots,
      {
        opacity: 0,
        duration: 0.28,
        ease: 'power1.in',
      },
      FINISH_DURATION * 0.55,
    );
  }

  gsap.set(line, {
    backgroundColor: gray,
    opacity: 0,
    scaleX: 0.12,
    transformOrigin: '50% 50%',
  });
  lineHidden.value = false;

  finishTl.to(
    line,
    {
      opacity: 1,
      scaleX: 1,
      duration: FINISH_DURATION,
      ease: 'power2.out',
    },
    dots.length ? 0.12 : 0,
  );
}

watch(
  () => props.loading,
  async (loading) => {
    if (loading) {
      await nextTick();
      startSpawner();
      return;
    }
    finishLoading();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  stopSpawnTimer();
  if (finishTl) finishTl.kill();
  clearDotsHard();
});

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function onFocus(event: FocusEvent) {
  focused.value = true;
  emit('focus', event);
}

function onBlur(event: FocusEvent) {
  focused.value = false;
  emit('blur', event);
}
</script>

<template>
  <div
    ref="rootRef"
    :class="cn('base-input relative w-full', props.class)"
  >
    <input
      v-bind="$attrs"
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-invalid="error || undefined"
      :aria-busy="loading || undefined"
      :class="
        cn(
          'w-full border-0 bg-transparent px-0 py-xx-sm font-sans text-body-md text-on-surface outline-none',
          'placeholder:text-on-surface-dim',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'transition-colors duration-short',
        )
      "
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      class="relative h-[0.4rem] w-full"
      aria-hidden="true"
    >
      <div
        ref="lineRef"
        class="base-input-line absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
        :class="{ 'opacity-40': disabled }"
        :style="{
          backgroundColor: lineColor,
          opacity: lineHidden ? 0 : undefined,
        }"
      />

      <div
        ref="dotsTrackRef"
        class="base-input-dots pointer-events-none absolute inset-0 overflow-hidden"
      />
    </div>
  </div>
</template>

<style scoped>
.base-input {
  --input-line: rgb(var(--color-on-surface-dim));
  --input-line-active: rgb(var(--color-accent));
  --input-line-error: rgb(var(--color-error));
}

.base-input-dots {
  /* Soft fade at both edges — avoids a clipped bright pixel on the right */
  mask-image: linear-gradient(to right, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%);
}

.base-input-dots :deep(.base-input-dot) {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  margin-top: -2.5px;
  margin-left: -2.5px;
  border-radius: 9999px;
  will-change: transform, opacity, background-color;
}

@media (prefers-reduced-motion: reduce) {
  .base-input-dots {
    display: none;
  }
}
</style>
