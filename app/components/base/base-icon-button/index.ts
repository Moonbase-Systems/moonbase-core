import type { ClassValue } from 'clsx';

export interface BaseIconButtonProps {
  label: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: ClassValue;
}

export { default as BaseIconButton } from './BaseIconButton.vue';
