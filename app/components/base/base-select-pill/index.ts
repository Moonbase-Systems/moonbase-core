import type { ClassValue } from 'clsx';

export interface BaseSelectPillProps {
  label: string;
  value: string;
  disabled?: boolean;
  class?: ClassValue;
}

export { default as BaseSelectPill } from './BaseSelectPill.vue';
