import type { ClassValue } from 'clsx';

import type { InspectorFieldTypography } from '../../../utils/inspector-typography.utils';

export type BaseValueFieldSuffix = 'horizontal' | 'vertical' | 'none';

export interface BaseValueFieldProps {
  label: string;
  modelValue: string | number;
  /** Shown inside the box after the value (e.g. °). */
  suffix?: string;
  /** Small arrow outside the box, matching inspector mockups. */
  fieldSuffix?: BaseValueFieldSuffix;
  step?: number;
  disabled?: boolean;
  /** @deprecated Inspector fields use fieldSuffix; step buttons are not shown in inspector layout. */
  showStepArrows?: boolean;
  suffixIcon?: string;
  showLock?: boolean;
  valueTypography?: InspectorFieldTypography;
  fieldClass?: ClassValue;
  class?: ClassValue;
}

export { default as BaseValueField } from './BaseValueField.vue';
