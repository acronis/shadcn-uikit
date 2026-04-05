# Web Components Package Design

**Date:** 2026-03-26
**Status:** Approved

## Goal

Add a framework-agnostic `@acronis-platform/shadcn-uikit-wc` package to the monorepo that exposes the existing UI kit's components as native Web Components (Custom Elements). Consumers using Vue, Angular, vanilla HTML, or any other framework can use the components without a React dependency.

## Architecture

### Monorepo placement

New package at `packages/web-components`, published as `@acronis-platform/shadcn-uikit-wc`.

### Implementation strategy: Hybrid

Components are split into two implementation groups based on complexity:

**Pure Lit** — simple components with no complex interactive state. Implemented directly in Lit, no React dependency.

| Component | Custom element  |
| --------- | --------------- |
| button    | `acr-button`    |
| badge     | `acr-badge`     |
| chip      | `acr-chip`      |
| input     | `acr-input`     |
| textarea  | `acr-textarea`  |
| label     | `acr-label`     |
| avatar    | `acr-avatar`    |
| separator | `acr-separator` |
| progress  | `acr-progress`  |
| skeleton  | `acr-skeleton`  |

These 10 were selected as the most universally used, stateless (or locally stateful) components with no dependency on Base UI / Radix state machines.

**React-wrapped** — complex interactive components that rely on Base UI / Radix state machines. Wrapped using `@r2wc/react-to-web-component`, which bundles React inside a shared chunk. Consumers do **not** need React installed.

| Component     | Custom element      |
| ------------- | ------------------- |
| dialog        | `acr-dialog`        |
| dropdown-menu | `acr-dropdown-menu` |
| select        | `acr-select`        |
| popover       | `acr-popover`       |
| tooltip       | `acr-tooltip`       |
| date-picker   | `acr-date-picker`   |

These 6 were selected because their interaction logic is tightly coupled to Base UI / Radix internals — re-implementing them in Lit would duplicate significant complexity.

### Styling

All components use **Shadow DOM**. Styling is done exclusively via **CSS custom properties** — no Tailwind utilities inside shadow roots.

#### Token prefix

The existing `packages/ui` token system uses the `--av-*` prefix (e.g., `--av-primary`, `--av-radius`). Token values are stored as bare HSL channels (e.g., `--av-primary: 213 65% 46%`) following Tailwind's CSS variable convention.

Each web component's shadow root `<style>` block consumes these tokens using `hsl()`:

```css
:host {
  --_bg: hsl(var(--av-primary, 213 65% 46%));
  --_color: hsl(var(--av-primary-foreground, 0 0% 100%));
  --_radius: var(--av-radius, 4px);
}
button {
  background: var(--_bg);
  color: var(--_color);
  border-radius: var(--_radius);
}
```

CSS custom properties pierce the shadow boundary by design, so `--av-*` tokens set on `:root` are accessible inside any shadow root.

#### Consumer token setup

Consumers include the token stylesheet once in their app. With a bundler:

```js
import '@acronis-platform/shadcn-uikit/styles/tokens';
```

Or with a `<link>` tag pointing to the dist file directly:

```html
<link
  rel="stylesheet"
  href="./node_modules/@acronis-platform/shadcn-uikit/dist/tokens.css"
/>
```

No Tailwind required on the consumer side.

### Props / Attributes / Events

- **Primitive values** (string, boolean, number): exposed as HTML attributes and reflected as JS properties
- **Complex values** (objects, arrays): exposed as JS properties only (set via script)
- **Callbacks**: dispatched as native `CustomEvent` on the host element

```html
<!-- attribute -->
<acr-button variant="outline" disabled>Click me</acr-button>

<!-- property (JS) -->
document.querySelector('acr-select').options = [{ value: 'a', label: 'Option A'
}];

<!-- event -->
document.querySelector('acr-dialog').addEventListener('close', () => {});
```

### Slot strategy for wrapped components

`@r2wc/react-to-web-component` does not automatically bridge Shadow DOM `<slot>` elements to React children or props. For wrapped components, content is passed via **JS properties only** — no named slots. The host element acts as a configuration point:

```js
const dialog = document.querySelector('acr-dialog');
dialog.title = 'Are you sure?';
dialog.description = 'This cannot be undone.';
dialog.open = true;
```

A shared `react-wrapper.ts` utility standardises how each wrapped component declares its property-to-prop mapping and event-to-callback mapping over `@r2wc/react-to-web-component`.

### Custom element prefix

All elements use the `acr-` prefix to avoid collisions with built-in HTML elements and other libraries.

## Package structure

```
packages/web-components/
├── src/
│   ├── components/
│   │   ├── simple/
│   │   │   ├── button.ts
│   │   │   ├── badge.ts
│   │   │   ├── chip.ts
│   │   │   ├── input.ts
│   │   │   ├── textarea.ts
│   │   │   ├── label.ts
│   │   │   ├── avatar.ts
│   │   │   ├── separator.ts
│   │   │   ├── progress.ts
│   │   │   └── skeleton.ts
│   │   └── wrapped/
│   │       ├── dialog.ts
│   │       ├── dropdown-menu.ts
│   │       ├── select.ts
│   │       ├── popover.ts
│   │       ├── tooltip.ts
│   │       └── date-picker.ts
│   ├── utils/
│   │   └── react-wrapper.ts   # shared helper around @r2wc/react-to-web-component
│   └── index.ts               # registers all custom elements, re-exports types
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Build

- **Bundler:** Vite
- **Output format:** ESM only
- **Two-pass build strategy:**
  - `packages/web-components/src/components/simple/**` — built with `preserveModules: true` so consumers can tree-shake individual Lit components
  - `packages/web-components/src/components/wrapped/**` — built as a **single shared chunk** that includes React, ReactDOM, and all wrapped components; React is deduplicated into one chunk regardless of how many wrapped components the consumer imports
- React and ReactDOM are **not** peer dependencies — they are bundled in the wrapped chunk
- **Lit is a peer dependency** — Lit is a tiny, standard web component base (~6kb) that consumers are expected to have; unlike React it is not application-framework-specific, and sharing the Lit instance avoids custom element registry conflicts when multiple Lit-based libraries are used together

## Dependencies

| Dependency                       | Type                              | Reason                                                           |
| -------------------------------- | --------------------------------- | ---------------------------------------------------------------- |
| `lit`                            | peer                              | Web component base framework; shared to avoid registry conflicts |
| `@r2wc/react-to-web-component`   | direct                            | Converts React components to custom elements                     |
| `react`                          | direct (bundled in wrapped chunk) | Required by wrapped components; not exposed to consumer          |
| `react-dom`                      | direct (bundled in wrapped chunk) | Required by wrapped components; not exposed to consumer          |
| `@acronis-platform/shadcn-uikit` | direct (workspace:\*)             | Source React components for the wrapped group                    |

### Version coupling

`@acronis-platform/shadcn-uikit` is referenced as `workspace:*` — the web components package always uses the local monorepo version. Both packages are released together in the same changeset when the React package has breaking changes.

## TypeScript types

`index.ts` exports:

- A typed interface per custom element (e.g., `AcrButtonElement extends HTMLElement`)
- An `HTMLElementTagNameMap` augmentation so TypeScript resolves `document.querySelector('acr-button')` to the correct type
- A `GlobalComponents` augmentation for Vue 3 (in a separate `vue.d.ts` entry)

## Testing

- **Unit tests:** Vitest + `@web/test-runner` (or happy-dom) — test each Lit component in isolation
- **Integration tests:** Playwright — mount each component in a plain HTML page and verify attributes, properties, and events work correctly
- **Browser targets:** Chromium, Firefox, Safari (latest 2 versions) — all support Custom Elements v1 natively
- **Visual parity:** not required in v1; the React Storybook remains the visual reference

## Consumer usage examples

**Vanilla HTML:**

```html
<link
  rel="stylesheet"
  href="./node_modules/@acronis-platform/shadcn-uikit/dist/tokens.css"
/>
<script
  type="module"
  src="./node_modules/@acronis-platform/shadcn-uikit-wc/dist/index.js"
></script>

<acr-button variant="outline">Open</acr-button>
```

**Vue:**

```vue
<template>
  <acr-button @click="open = true">Open</acr-button>
</template>

<script setup>
import '@acronis-platform/shadcn-uikit/styles/tokens';
import '@acronis-platform/shadcn-uikit-wc';
</script>
```

**Angular** — add `CUSTOM_ELEMENTS_SCHEMA` to the module:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class AppModule {}
```

## Out of scope (v1)

- Storybook stories for web components (separate effort)
- Server-side rendering
- Components beyond the 16 listed above
- Form association via `ElementInternals` — deferred to v2
- Framework-specific wrapper packages (e.g., `@acronis-platform/shadcn-uikit-vue`) — deferred to v2
