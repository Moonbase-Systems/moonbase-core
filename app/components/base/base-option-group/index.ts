import type { ClassValue } from 'clsx';

import type { BaseOptionButtonTone } from '../base-option-button';

export interface BaseOptionGroupProps {
  title: string;
  tone?: BaseOptionButtonTone;
  class?: ClassValue;
}

export { default as BaseOptionGroup } from './BaseOptionGroup.vue';
