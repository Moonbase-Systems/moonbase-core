import { cva, type VariantProps } from 'class-variance-authority';

export const baseProgressBarTrackVariants = cva('w-full overflow-hidden rounded-full bg-on-surface/[0.08]', {
  variants: {
    size: {
      sm: 'h-tiny',
      md: 'h-xx-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const baseProgressBarFillVariants = cva('h-full rounded-full transition-all duration-medium', {
  variants: {
    color: {
      default: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export interface BaseProgressBarProps {
  value: number;
  size?: 'sm' | 'md';
  color?: 'default' | 'success' | 'warning' | 'error';
  label?: string;
}

export type BaseProgressBarVariants = VariantProps<typeof baseProgressBarFillVariants>;
export { default as BaseProgressBar } from './BaseProgressBar.vue';
