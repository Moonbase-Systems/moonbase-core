import type { ClassValue } from 'clsx';

export interface BaseLevelMeterProps {
  /** Normalized level in 0…1. */
  value?: number;
  /** Optional peak hold in 0…1. */
  peak?: number;
  /** Segment count. Default 18. */
  segments?: number;
  /** Fraction of the scale where warning color starts. Default 0.75. */
  warnAt?: number;
  /** Fraction of the scale where hot/error color starts. Default 0.9. */
  hotAt?: number;
  label?: string;
  /** Numeric readout above the track (e.g. "-6"). */
  readout?: string;
  class?: ClassValue;
}

export { default as BaseLevelMeter } from './BaseLevelMeter.vue';
