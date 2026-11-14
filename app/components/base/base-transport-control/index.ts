import type { ClassValue } from 'clsx';

export type BaseTransportState = 'idle' | 'live' | 'paused';
export type BaseTransportMode = 'stream' | 'record';

export interface BaseTransportControlLabels {
  /** Accessible name of the whole control group. */
  group: string;
  /** Status word for the current state. */
  status: string;
  pause: string;
  resume: string;
  stop: string;
  /** Starts an RTMP session via Bridge. */
  stream: string;
  /** Starts a local recording in the browser (no Bridge). */
  record: string;
}

export interface BaseTransportControlProps {
  state?: BaseTransportState;
  /** Elapsed time as `HH:MM:SS`. */
  time?: string;
  /** Disables pause / resume / stop. */
  disabled?: boolean;
  /** Disables Stream — typically when Bridge is offline. */
  streamDisabled?: boolean;
  /** Disables Record. Local recording does not need Bridge. */
  recordDisabled?: boolean;
  labels: BaseTransportControlLabels;
  class?: ClassValue;
}

export { default as BaseTransportControl } from './BaseTransportControl.vue';
