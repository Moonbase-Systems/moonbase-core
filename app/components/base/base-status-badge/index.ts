import type { ClassValue } from 'clsx';

export type BaseStatusBadgeState = 'idle' | 'live' | 'paused' | 'warning' | 'error' | 'offline' | 'ok' | 'info';

export interface BaseStatusBadgeProps {
  state?: BaseStatusBadgeState;
  /** The word is required: color never carries the state alone. */
  label: string;
  /** Announces changes politely (aria-live). */
  live?: boolean;
  class?: ClassValue;
}

export { default as BaseStatusBadge } from './BaseStatusBadge.vue';
