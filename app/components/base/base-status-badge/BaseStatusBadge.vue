<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import { type BaseStatusBadgeProps, baseStatusBadgeVariants } from '.';

withDefaults(defineProps<BaseStatusBadgeProps>(), {
  color: 'default',
  icon: undefined,
  spinning: false,
});
</script>

<template>
  <span :class="cn(baseStatusBadgeVariants({ color }))">
    <Icon
      v-if="icon"
      :name="icon"
      size="1.2rem"
      :class="{ 'animate-spin': spinning }"
      aria-hidden="true"
    />
    {{ label }}
  </span>
</template>
