import type { ClassValue } from 'clsx';

import type { InspectorFieldTypography } from '../../../utils/inspector-typography.utils';

export type BaseScrubFieldSuffix = 'horizontal' | 'vertical' | 'none';

export interface BaseScrubFieldProps {
  label: string;
  modelValue: string | number;
  suffix?: string;
  fieldSuffix?: BaseScrubFieldSuffix;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  showLock?: boolean;
  /** Smaller label, value, and drag icon, matching the text inspector. */
  compact?: boolean;
  valueTypography?: InspectorFieldTypography;
  fieldClass?: ClassValue;
  class?: ClassValue;
}

export { default as BaseScrubField } from './BaseScrubField.vue';
