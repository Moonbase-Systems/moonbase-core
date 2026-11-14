import type { ClassValue } from 'clsx';

export type BaseFrameTone = 'accent' | 'warning' | 'error' | 'layout' | 'interactive';
export type BaseFrameCorners = 'diagonal' | 'all';

export interface BaseFrameProps {
  /** Mono label in the top-left corner of the frame. */
  label?: string;
  /** Adds the corner brackets (Orbit "active block"). */
  active?: boolean;
  /** `diagonal`: top-left + bottom-right; `all`: four corners. */
  corners?: BaseFrameCorners;
  tone?: BaseFrameTone;
  /** Panel fill. Only for overlays (menus, dialogs, popovers) and hardware keys. */
  filled?: boolean;
  /** Rendered element. */
  as?: string;
  class?: ClassValue;
}

export { default as BaseFrame } from './BaseFrame.vue';
export { default as BaseFrameBrackets } from './BaseFrameBrackets.vue';
