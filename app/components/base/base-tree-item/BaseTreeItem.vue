<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import { useTreeLine } from '../../../utils/tree-line';
import IconChevronDown from '../../icons/IconChevronDown.vue';
import IconChevronRight from '../../icons/IconChevronRight.vue';
import { BaseCollapsible } from '../base-collapsible';
import { BaseIconButton } from '../base-icon-button';
import type { BaseTreeItemProps } from '.';

const props = withDefaults(defineProps<BaseTreeItemProps>(), {
  selected: false,
  expandable: false,
  open: false,
  toggleLabel: '',
  dense: false,
  interactiveLabel: true,
});

const rowClass = computed(() =>
  cn('flex items-center justify-between', props.dense ? 'min-h-0 gap-x-tiny' : 'min-h-md gap-x-sm'),
);

const labelClass = computed(() =>
  cn(
    'min-w-0 flex-1 truncate text-left font-roboto font-medium transition-colors duration-short',
    props.dense ? 'py-xx-sm text-body-sm' : 'text-body-md',
    props.selected ? 'text-accent' : 'text-on-surface',
    props.interactiveLabel &&
      'hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ),
);

const emit = defineEmits<{
  select: [event: MouseEvent];
  'update:open': [value: boolean];
}>();

const { childActive } = useTreeLine(() => props.selected);
const lineActive = computed(() => props.selected || childActive.value);

function onToggleClick(event: MouseEvent) {
  event.stopPropagation();
  emit('update:open', !props.open);
}

function onSelectClick(event: MouseEvent) {
  emit('select', event);
}
</script>

<template>
  <BaseCollapsible
    v-if="expandable"
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <template #trigger>
      <div :class="rowClass">
        <button
          v-if="interactiveLabel"
          type="button"
          :class="labelClass"
          @click="onSelectClick"
        >
          {{ label }}
        </button>
        <span
          v-else
          :class="labelClass"
        >
          {{ label }}
        </span>

        <div class="flex shrink-0 items-center gap-tiny">
          <slot name="actions" />
          <BaseIconButton
            :label="toggleLabel"
            @mousedown.stop
            @click="onToggleClick"
          >
            <IconChevronRight v-if="!open" />
            <IconChevronDown v-else />
          </BaseIconButton>
        </div>
      </div>
    </template>

    <BaseRevealList
      :active="lineActive"
      :dense="dense"
    >
      <slot />
    </BaseRevealList>
  </BaseCollapsible>

  <div :class="rowClass">
    <button
      v-if="interactiveLabel"
      type="button"
      :class="labelClass"
      @click="onSelectClick"
    >
      {{ label }}
    </button>
    <span
      v-else
      :class="labelClass"
    >
      {{ label }}
    </span>

    <div
      v-if="$slots.actions"
      class="flex shrink-0 items-center gap-tiny"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
