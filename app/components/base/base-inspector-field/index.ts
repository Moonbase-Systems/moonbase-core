import type { ClassValue } from 'clsx';

export type BaseInspectorFieldType = 'text' | 'color';

export interface BaseInspectorFieldProps {
  modelValue: string | number;
  /** Glued unit shown beside the value. It is not part of the editable text. */
  suffix?: string;
  /** Reject letters. Digits, one decimal separator, and a leading minus stay allowed. */
  numeric?: boolean;
  type?: BaseInspectorFieldType;
  label?: string;
  disabled?: boolean;
  class?: ClassValue;
}

export { default as BaseInspectorField } from './BaseInspectorField.vue';
