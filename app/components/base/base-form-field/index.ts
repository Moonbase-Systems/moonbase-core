export interface BaseFormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
}

export { default as BaseFormField } from './BaseFormField.vue';
