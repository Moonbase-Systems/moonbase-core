import type { BaseOptionButtonTone } from '../base-option-button';

export interface BaseOptionGroupProps {
  title: string;
  tone?: BaseOptionButtonTone;
}

export { default as BaseOptionGroup } from './BaseOptionGroup.vue';
