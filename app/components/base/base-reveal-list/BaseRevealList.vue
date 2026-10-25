<script setup lang="ts">
import { gsap } from 'gsap';

import type { BaseRevealListProps } from '.';

withDefaults(defineProps<BaseRevealListProps>(), {
  active: false,
});

const rootRef = useTemplateRef<HTMLElement>('rootRef');
const lineRef = useTemplateRef<HTMLElement>('lineRef');
const listRef = useTemplateRef<HTMLElement>('listRef');

let ctx: gsap.Context | undefined;

onMounted(() => {
  const root = rootRef.value;
  const line = lineRef.value;
  const list = listRef.value;
  if (!root || !line || !list) {
    return;
  }

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        motion: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const items = gsap.utils.toArray<HTMLElement>(list.children);
        const reduce = Boolean(context.conditions?.reduce);

        if (reduce || items.length === 0) {
          gsap.set([line, ...items], { autoAlpha: 1, y: 0 });
          return;
        }

        const each = 0.05;
        const duration = 0.28;
        const total = duration + each * (items.length - 1);

        gsap
          .timeline({ defaults: { overwrite: 'auto' } })
          .fromTo(
            items,
            { autoAlpha: 0, y: -8 },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger: each,
              ease: 'power2.out',
            },
            0,
          )
          .fromTo(
            line,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: total,
              ease: 'none',
            },
            0,
          );
      },
    );
  }, root);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div
    ref="rootRef"
    class="relative ml-x-sm"
  >
    <span
      ref="lineRef"
      :class="['pointer-events-none absolute inset-y-0 left-0 w-px', active ? 'bg-accent' : 'bg-on-surface']"
      aria-hidden="true"
    />
    <div
      ref="listRef"
      class="flex flex-col gap-tiny pl-md"
    >
      <slot />
    </div>
  </div>
</template>
