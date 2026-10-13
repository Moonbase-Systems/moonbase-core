import type { ClassValue } from 'clsx';

export interface BaseInputProps {
  modelValue?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  loading?: boolean;
  id?: string;
  name?: string;
  autocomplete?: string;
  class?: ClassValue;
}

export { default as BaseInput } from './BaseInput.vue';
