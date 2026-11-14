import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

import rootFontSize from './tailwind/plugins/root-font-size';

/**
 * MoonBase — Orbit. Values mirror the "MoonBase Studio Design System" (tokens.json v2).
 * 1rem = 10px (root-font-size plugin).
 */
const config = {
  content: [],
  darkMode: ['class', '.theme-dark'],
  plugins: [rootFontSize, tailwindScrollbar({ nocompatible: true })],
  theme: {
    extend: {
      fontFamily: {
        /** Space Grotesk — the one UI face: 300 for large sizes, 400 text, 700 state. */
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        /** Space Mono — labels, units, state words, upper case. */
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        /** Lalezar — the MoonBase wordmark only. */
        brand: ['Lalezar', '"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        /* Telemetry — shared with the Commander 7" screen */
        display: ['9.6rem', { lineHeight: '9.2rem', letterSpacing: '-0.03em', fontWeight: '300' }],
        'numeric-xl': ['12rem', { lineHeight: '11.2rem', letterSpacing: '-0.04em', fontWeight: '300' }],
        'numeric-lg': ['4.8rem', { lineHeight: '5.2rem', fontWeight: '300' }],
        title: ['2.8rem', { lineHeight: '3.6rem', fontWeight: '300' }],
        'body-lg': ['1.8rem', { lineHeight: '2.6rem' }],
        state: ['1.4rem', { lineHeight: '2rem', fontWeight: '700' }],

        /* Mono labels (use with font-mono uppercase) */
        label: ['1.2rem', { lineHeight: '1.6rem', letterSpacing: '0.14em' }],
        'label-lg': ['1.4rem', { lineHeight: '2rem', letterSpacing: '0.12em' }],

        /* Studio UI */
        'numeric-md': ['2rem', { lineHeight: '2.4rem', fontWeight: '300' }],
        'body-md': ['1.6rem', { lineHeight: '2.4rem' }],
        'body-sm': ['1.4rem', { lineHeight: '2rem' }],
        'body-x-sm': ['1.2rem', { lineHeight: '1.6rem' }],

        /* Brand */
        'brand-logo': ['2.8rem', { lineHeight: '3.6rem', fontWeight: '400' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.03em',
        label: '0.14em',
        'label-lg': '0.12em',
      },
      borderRadius: {
        /* Orbit: no rounding anywhere. The status dot uses rounded-full. */
        DEFAULT: '0',
        none: '0',
        'x-sm': '0',
        sm: '0',
        md: '0',
        lg: '0',
        full: '9999px',
      },
      spacing: {
        /*
         * Named scale kept for compatibility. Orbit uses the 4px grid members:
         * tiny 4 · xxx-sm 8 · x-sm 12 · md 16 · xx-lg 24 · xxxx-lg 32 · xxx-huge 48 (x-tiny 2 for hairline gaps).
         * Size tokens: bar 48 · control 32 · row 28 · bracket 12.
         */
        none: '0',
        'x-tiny': '0.2rem',
        tiny: '0.4rem',
        'xxxx-sm': '0.6rem',
        'xxx-sm': '0.8rem',
        'xx-sm': '1rem',
        'x-sm': '1.2rem',
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
        'x-lg': '2rem',
        'xx-lg': '2.4rem',
        'xxx-lg': '2.8rem',
        'xxxx-lg': '3.2rem',
        huge: '3.6rem',
        'x-huge': '4rem',
        'xx-huge': '4.4rem',
        'xxx-huge': '4.8rem',
        'xxxx-huge': '5.2rem',
        bar: '4.8rem',
        control: '3.2rem',
        row: '2.8rem',
        bracket: '1.2rem',
        key: '12.8rem',
      },
      colors: {
        current: 'currentColor',
        inherit: 'inherit',
        transparent: 'transparent',

        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-inverted': 'rgb(var(--color-surface-inverted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',

        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-dim': 'rgb(var(--color-on-surface-dim) / <alpha-value>)',
        'on-surface-inverted': 'rgb(var(--color-on-surface-inverted) / <alpha-value>)',

        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-dim': 'rgb(var(--color-accent-dim) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent) / <alpha-value>)',

        'category-layout': 'rgb(var(--color-category-layout) / <alpha-value>)',
        'category-interactive': 'rgb(var(--color-category-interactive) / <alpha-value>)',
        'category-interactive-fill': 'rgb(var(--color-category-interactive-fill) / <alpha-value>)',

        info: 'rgb(var(--color-info) / <alpha-value>)',
        'info-container': 'rgb(var(--color-info-container) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        'warning-container': 'rgb(var(--color-warning-container) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        'error-container': 'rgb(var(--color-error-container) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        'success-container': 'rgb(var(--color-success-container) / <alpha-value>)',
        'on-status': 'rgb(var(--color-on-status) / <alpha-value>)',
      },
      transitionDuration: {
        short: '200ms',
        medium: '600ms',
        long: '1s',
        'x-long': '1.5s',
        'xx-long': '2s',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      animation: {
        'carousel-slow': 'carousel 2s ease-in-out infinite',
      },
      keyframes: {
        carousel: {
          '0%': {
            transform: 'translateX(-100%)',
            width: '50%',
          },
          '100%': {
            transform: 'translateX(200%)',
            width: '50%',
          },
        },
      },
    },
  },
} satisfies Config;

export default config;
