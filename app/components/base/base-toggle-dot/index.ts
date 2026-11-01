import type { ClassValue } from 'clsx';

export type BaseToggleDotLabelTypography = 'default' | 'inspector';

export interface BaseToggleDotProps {
  label: string;
  modelValue: boolean;
  disabled?: boolean;
  labelTypography?: BaseToggleDotLabelTypography;
  class?: ClassValue;
}

export { default as BaseToggleDot } from './BaseToggleDot.vue';
