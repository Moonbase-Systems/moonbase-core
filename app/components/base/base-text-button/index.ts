import type { ClassValue } from 'clsx';

export interface BaseTextButtonProps {
  text: string;
  active?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: ClassValue;
}

export { default as BaseTextButton } from './BaseTextButton.vue';
