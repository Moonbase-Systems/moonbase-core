<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import BaseStatusBadge from '../base-status-badge/BaseStatusBadge.vue';
import type { BaseTransportControlProps, BaseTransportMode } from '.';

const props = withDefaults(defineProps<BaseTransportControlProps>(), {
  state: 'idle',
  time: '00:00:00',
  disabled: false,
  streamDisabled: false,
  recordDisabled: false,
  class: undefined,
});

const emit = defineEmits<{
  start: [mode: BaseTransportMode];
  pause: [];
  resume: [];
  stop: [];
}>();

const timeClass = computed(() =>
  cn(
    'min-w-[9.2rem] font-sans text-numeric-md font-light tabular-nums',
    props.state === 'idle' ? 'text-on-surface-dim' : 'text-on-surface',
  ),
);

const buttonClass =
  'inline-flex h-control items-center gap-xxx-sm border border-on-surface-dim px-x-sm font-sans text-body-sm text-on-surface transition-colors duration-short hover:border-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:border-dashed disabled:border-line disabled:bg-transparent disabled:text-on-surface-dim';

const goClass = cn(
  buttonClass,
  'border-accent bg-accent font-bold text-on-accent hover:border-accent-dim hover:bg-accent-dim disabled:border-dashed disabled:border-line disabled:bg-transparent disabled:text-on-surface-dim',
);

const stopClass = cn(buttonClass, 'hover:border-error hover:text-error');
</script>

<template>
  <div
    role="group"
    :aria-label="labels.group"
    :class="cn('inline-flex items-center gap-md', props.class)"
  >
    <BaseStatusBadge
      :state="state"
      :label="labels.status"
      live
    />
    <span :class="timeClass">{{ time }}</span>
    <div class="inline-flex gap-xxx-sm">
      <template v-if="state === 'idle'">
        <button
          type="button"
          :class="goClass"
          :disabled="streamDisabled"
          @click="emit('start', 'stream')"
        >
          <Icon
            name="mdi:broadcast"
            class="size-md shrink-0"
            aria-hidden="true"
          />
          {{ labels.stream }}
        </button>
        <button
          type="button"
          :class="goClass"
          :disabled="recordDisabled"
          @click="emit('start', 'record')"
        >
          <Icon
            name="mdi:record-rec"
            class="size-md shrink-0"
            aria-hidden="true"
          />
          {{ labels.record }}
        </button>
      </template>
      <template v-else>
        <button
          v-if="state === 'live'"
          type="button"
          :class="buttonClass"
          :disabled="disabled"
          @click="emit('pause')"
        >
          <Icon
            name="mdi:pause"
            class="size-md shrink-0"
            aria-hidden="true"
          />
          {{ labels.pause }}
        </button>
        <button
          v-else
          type="button"
          :class="goClass"
          :disabled="disabled"
          @click="emit('resume')"
        >
          <Icon
            name="mdi:play"
            class="size-md shrink-0"
            aria-hidden="true"
          />
          {{ labels.resume }}
        </button>
        <button
          type="button"
          :class="stopClass"
          :disabled="disabled"
          @click="emit('stop')"
        >
          <Icon
            name="mdi:stop"
            class="size-md shrink-0"
            aria-hidden="true"
          />
          {{ labels.stop }}
        </button>
      </template>
    </div>
  </div>
</template>
