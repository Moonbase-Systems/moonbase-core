import type { ClassValue } from 'clsx';

export interface BaseColorSwatchProps {
  modelValue: string;
  label?: string;
  disabled?: boolean;
  class?: ClassValue;
}

export { default as BaseColorSwatch } from './BaseColorSwatch.vue';
