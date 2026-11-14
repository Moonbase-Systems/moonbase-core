<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import type { BaseIconRailProps } from '.';

const props = defineProps<BaseIconRailProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function isActive(id: string) {
  return props.modelValue === id;
}

function onSelect(id: string) {
  emit('update:modelValue', id);
}
</script>

<template>
  <div
    :class="cn('flex shrink-0 flex-col items-center gap-xxx-sm', props.class)"
    role="group"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      :aria-label="item.label"
      :aria-pressed="isActive(item.id)"
      :class="[
        'flex size-x-huge items-center justify-center border transition-colors duration-short',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        item.boxClass,
        isActive(item.id) ? 'border-line text-accent' : 'border-transparent text-on-surface-dim hover:text-on-surface',
      ]"
      @click="onSelect(item.id)"
    >
      <span
        v-if="item.maskUrl"
        class="inline-block size-full bg-current"
        :style="{
          maskImage: `url('${item.maskUrl}')`,
          WebkitMaskImage: `url('${item.maskUrl}')`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }"
      />
      <component
        :is="item.iconComponent"
        v-else-if="item.iconComponent"
        class="size-full"
      />
      <Icon
        v-else-if="item.icon"
        :name="item.icon"
        :class="item.iconClass ?? 'size-[1.35rem]'"
      />
    </button>
  </div>
</template>
