import type { ClassValue } from 'clsx';

export type BaseMetricState = 'ok' | 'warning' | 'error';

export interface BaseMetricProps {
  label: string;
  /** Empty / null / undefined renders an em dash without corner brackets. */
  value?: string | number | null;
  unit?: string;
  note?: string;
  state?: BaseMetricState;
  class?: ClassValue;
}

export { default as BaseMetric } from './BaseMetric.vue';
