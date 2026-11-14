import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const tailwindMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'numeric-xl',
            'numeric-lg',
            'numeric-md',
            'title',
            'state',
            'label',
            'label-lg',
            'brand-logo',
            'body-x-sm',
            'body-sm',
            'body-md',
            'body-lg',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return tailwindMerge(clsx(inputs));
}
