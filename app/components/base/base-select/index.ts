export type BaseSelectOption = {
  label: string;
  value: string | number;
};

export type BaseSelectProps = {
  modelValue?: string | number | null;
  options: BaseSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
};
