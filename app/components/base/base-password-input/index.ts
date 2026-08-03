export interface BasePasswordInputProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  autocomplete?: string;
}

export { default as BasePasswordInput } from './BasePasswordInput.vue';
