<script setup lang="ts">
import { cn } from '../../../utils/tailwind.utils';
import { type BaseCardProps, baseCardVariants } from '.';

withDefaults(defineProps<BaseCardProps>(), {
  padding: 'lg',
  border: false,
  shadow: 'none',
});
</script>

<template>
  <div :class="cn(baseCardVariants({ padding, border, shadow }))">
    <slot />
  </div>
</template>
