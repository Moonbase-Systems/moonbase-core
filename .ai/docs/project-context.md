# Project Context - moonbase-core

## Overview

`moonbase-core` is a shared Nuxt layer for the Moonbase ecosystem.  
It provides reusable UI primitives, design tokens, and utility helpers consumed by application repositories (for example `moonbase-studio-web`).

The main goal of this repository is consistency:

- one source of truth for shared visual language,
- one shared set of base UI components,
- one reusable Tailwind/token foundation for all Moonbase frontends.

---

## Tech Stack

| Area                | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| Framework           | Nuxt 4 (`nuxt ^4.3.1`)                                    |
| Language            | TypeScript (`strict: true`)                               |
| Styling             | Tailwind CSS + CSS tokens                                 |
| UI utilities        | `class-variance-authority`, `clsx`, `tailwind-merge`      |
| Forms compatibility | VeeValidate + Zod modules available in layer              |
| Fonts               | `@nuxt/fonts`, `@nuxtjs/google-fonts`, `@nuxtjs/fontaine` |
| Icons/UI primitives | `@nuxt/icon`, `reka-ui`                                   |
| Package manager     | pnpm                                                      |
| Quality tools       | ESLint + Stylelint + Prettier + Husky + commitlint        |

---

## Project Structure

```text
moonbase-core/
├── app/
│   ├── assets/
│   │   └── css/
│   │       ├── base.css
│   │       ├── tailwind.css
│   │       └── tokens.css
│   ├── components/
│   │   ├── base/
│   │   │   ├── base-button/
│   │   │   ├── base-card/
│   │   │   ├── base-form-field/
│   │   │   ├── base-input/
│   │   │   ├── base-line-chart/
│   │   │   ├── base-password-input/
│   │   │   ├── base-progress-bar/
│   │   │   ├── base-select/
│   │   │   └── base-status-badge/
│   │   └── brand-logo/
│   ├── composables/
│   │   └── useOncePerTick.ts
│   └── utils/
│       ├── arrayToString.ts
│       ├── tailwind.utils.ts
│       └── index.ts
├── tailwind/
│   └── plugins/
│       └── root-font-size.ts
├── sandbox/
│   ├── nuxt.config.ts
│   └── app/
│       ├── app.vue
│       └── pages/index.vue
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Layer Behavior

- The layer registers components from `app/components` via Nuxt config.
- Global CSS is provided by `base.css`, `tailwind.css`, and `tokens.css`.
- Tailwind is extended centrally (`tailwind.config.ts` + `tailwind/plugins`).
- Auto-import scanning is disabled (`imports.scan: false`) for predictable imports.

---

## Consumers and Integration

- This repository is consumed as a Nuxt layer by downstream apps.
- Components and style tokens defined here are expected to be stable and reusable.
- Changes in shared APIs (component props, exported utils, token names) can affect multiple projects, so compatibility is important.
