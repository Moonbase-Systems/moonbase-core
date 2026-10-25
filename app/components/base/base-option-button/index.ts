import type { ClassValue } from 'clsx';

export type BaseOptionButtonTone = 'accent' | 'layout' | 'interactive';

export interface BaseOptionButtonProps {
  label: string;
  tone?: BaseOptionButtonTone;
  disabled?: boolean;
  class?: ClassValue;
}

export { default as BaseOptionButton } from './BaseOptionButton.vue';
