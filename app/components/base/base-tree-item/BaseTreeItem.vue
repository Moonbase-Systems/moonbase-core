<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
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
});

const emit = defineEmits<{
  select: [];
  'update:open': [value: boolean];
}>();

function onToggleClick(event: MouseEvent) {
  event.stopPropagation();
  emit('update:open', !props.open);
}

function onSelectClick() {
  emit('select');
}
</script>

<template>
  <BaseCollapsible
    v-if="expandable"
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <template #trigger>
      <div class="flex min-h-md items-center justify-between gap-x-sm">
        <button
          type="button"
          :class="
            cn(
              'min-w-0 flex-1 truncate text-left font-roboto text-body-md font-medium transition-colors duration-short',
              props.selected ? 'text-accent' : 'text-on-surface',
              'hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            )
          "
          @click="onSelectClick"
        >
          {{ label }}
        </button>

        <div class="flex shrink-0 items-center gap-tiny">
          <slot name="actions" />
          <BaseIconButton
            :label="toggleLabel"
            @click="onToggleClick"
          >
            <IconChevronRight v-if="!open" />
            <IconChevronDown v-else />
          </BaseIconButton>
        </div>
      </div>
    </template>

    <div class="ml-x-sm flex flex-col gap-tiny border-l border-accent pl-md">
      <slot />
    </div>
  </BaseCollapsible>

  <div
    v-else
    class="flex min-h-md items-center justify-between gap-x-sm"
  >
    <button
      type="button"
      :class="
        cn(
          'min-w-0 flex-1 truncate text-left font-roboto text-body-md font-medium transition-colors duration-short',
          props.selected ? 'text-accent' : 'text-on-surface',
          'hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        )
      "
      @click="onSelectClick"
    >
      {{ label }}
    </button>

    <div
      v-if="$slots.actions"
      class="flex shrink-0 items-center gap-tiny"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
