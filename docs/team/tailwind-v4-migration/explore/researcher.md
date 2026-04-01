---
type: EXPLORATION
title: Tailwind CSS v4 Migration — Codebase Research
date: 2026-03-30
status: complete
---

# Tailwind CSS v4 Migration — Codebase Research

## 1. Current Tailwind Configuration Files

### `packages/ui/tailwind.config.js`

```js
import preset from './tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    '../demo-app/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
};
```

**Confidence: HIGH**

### `packages/ui/tailwind.preset.js`

Full contents — this is the core design system configuration:

```js
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
          '3xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
          '3xl': '1920px',
        },
      },
      fontFamily: {
        sans: ['var(--av-font-sans)', 'system-ui', '-apple-system', ...],
      },
      fontSize: {
        base: ['var(--av-font-size-base, 16px)', { lineHeight: 'var(--av-line-height-base, 1.5)' }],
      },
      lineHeight: { base: 'var(--av-line-height-base, 1.5)' },
      letterSpacing: { base: 'var(--av-letter-spacing-base, 0)' },
      colors: {
        background: 'hsl(var(--av-background))',
        foreground: 'hsl(var(--av-foreground))',
        primary: { DEFAULT: 'hsl(var(--av-primary))', foreground: 'hsl(var(--av-primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--av-secondary))', foreground: 'hsl(var(--av-secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--av-muted))', foreground: 'hsl(var(--av-muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--av-accent))', foreground: 'hsl(var(--av-accent-foreground))' },
        destructive: { DEFAULT: '...', foreground: '...', light: '...', accent: '...' },
        danger: { DEFAULT: '...', foreground: '...', accent: '...' },
        success: { DEFAULT: '...', foreground: '...', accent: '...' },
        warning: { DEFAULT: '...', foreground: '...', accent: '...' },
        info: { DEFAULT: '...', foreground: '...', accent: '...' },
        critical: { DEFAULT: '...', foreground: '...', accent: '...' },
        neutral: { DEFAULT: '...', foreground: '...', accent: '...' },
        ai: { DEFAULT: '...', foreground: '...', accent: '...' },
        popover: { DEFAULT: '...', foreground: '...' },
        tooltip: { DEFAULT: '...', foreground: '...' },
        card: { DEFAULT: '...', foreground: '...' },
        border: 'hsl(var(--av-border))',
        input: 'hsl(var(--av-input))',
        ring: 'hsl(var(--av-ring))',
        sidebar: { DEFAULT: '...', foreground: '...', primary: '...', ... },
      },
      translate: { 'dialog-offset': '48%' },
      borderRadius: {
        lg: 'var(--av-radius)',
        md: 'calc(var(--av-radius) - 2px)',
        sm: 'calc(var(--av-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--accordion-panel-height)' } },
        'accordion-up': { from: { height: 'var(--accordion-panel-height)' }, to: { height: '0' } },
        'indeterminate-progress': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(400%)' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'indeterminate-progress': 'indeterminate-progress 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
```

Key characteristics:
- Uses `darkMode: ['class']` (array syntax)
- All colors use `hsl(var(--av-*))` pattern with CSS custom properties
- Uses `tailwindcss-animate` plugin (v1.0.7)
- Contains custom keyframes and animations
- Extends `container`, `fontFamily`, `fontSize`, `borderRadius`
- **This preset is exported as `@acronis-platform/shadcn-uikit/tailwind-preset`** for consumer use

**Confidence: HIGH**

### `packages/ui/tailwind.config.full.js`

```js
import preset from './tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ['./src/styles/tailwind-reference.html'],
};
```

Used by `build-full-css.ts` to generate an unpurged CSS bundle. The reference HTML file at `packages/ui/src/styles/tailwind-reference.html` contains a manually maintained list of utility classes to force generation.

**Confidence: HIGH**

### `packages/ui/postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Uses the v3 object shorthand syntax with `tailwindcss` as a direct PostCSS plugin.

**Confidence: HIGH**

### `packages/demo/tailwind.config.js`

```js
import libraryConfig from '../ui/tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    '../ui/src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  presets: [libraryConfig],
}
```

Extends the UI library config as a preset.

**Confidence: HIGH**

### `packages/demo/postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Identical to the UI package — v3 object syntax.

**Confidence: HIGH**

---

## 2. Previous Migration Attempt

### Commit `225aa63` — Copilot agent attempt (2026-03-28)

Changes made:
1. **Package versions**: Bumped `tailwindcss` from `^3.4.1` to `^4.0.0` in both `packages/ui` and `packages/demo`
2. **New packages**: Added `@tailwindcss/postcss` and `@tailwindcss/cli` (v4 packages)
3. **PostCSS config**: Changed from object syntax to array syntax with explicit imports:
   ```js
   import tailwindcss from '@tailwindcss/postcss';
   import autoprefixer from 'autoprefixer';
   export default { plugins: [tailwindcss, autoprefixer] };
   ```
4. **Added `@config` directives**: Added `@config "../../tailwind.config.js"` to all SCSS entry files:
   - `packages/ui/src/styles/base-only.scss`
   - `packages/ui/src/styles/components-only.scss`
   - `packages/ui/src/styles/full.scss`
   - `packages/ui/src/styles/index.scss`
   - `packages/ui/src/styles/utilities-only.scss`
   - `packages/demo/src/styles/index.scss`
5. **Build script**: Changed `build-full-css.ts` to remove `-c ${configPath}` flag (relying on `@config` directive in CSS instead)
6. **Did NOT change**: `tailwind.config.js`, `tailwind.preset.js`, or any component source files. The JS config was preserved and loaded via `@config`.

**Confidence: HIGH**

### Commit `916c930` — Full revert (2026-03-29)

Reverted all changes from `225aa63`. The revert commit message states:

> The Tailwind v4 migration caused complete visual regressions. v4 generates fundamentally different CSS (preflight, utility classes), causing all 220 components to render unstyled.

This revert also restored 220 original v3 visual snapshots and removed diff output images showing broken rendering.

**Key insight**: The migration attempt only changed the tooling layer (PostCSS plugin, package versions, `@config` directives). It did **not** address v4 behavioral changes like default border color, shadow renames, preflight differences, or the `tailwindcss-animate` incompatibility. The result was "all 220 components render unstyled."

**Confidence: HIGH**

---

## 3. Tailwind Class Usage Patterns

### `@apply` usage (3 occurrences in 2 files)

```scss
/* packages/ui/src/styles/_base.scss */
@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans text-base; }
}

/* packages/demo/src/styles/index.scss */
body { @apply bg-background text-foreground font-sans text-base; }
```

`@apply` is still supported in Tailwind v4, so these do not need changing for syntax reasons. However, the `@layer base` interaction with v4's layer system needs verification.

**Confidence: MEDIUM** — `@apply` works in v4 but behavior in `@layer base` within SCSS files processed via PostCSS needs testing.

### `@tailwind` directive usage (6 SCSS files)

All six SCSS entry files use `@tailwind base; @tailwind components; @tailwind utilities;`. In v4 these are replaced with `@import "tailwindcss"`.

Files affected:
- `packages/ui/src/styles/index.scss`
- `packages/ui/src/styles/full.scss`
- `packages/ui/src/styles/base-only.scss`
- `packages/ui/src/styles/components-only.scss`
- `packages/ui/src/styles/utilities-only.scss`
- `packages/demo/src/styles/index.scss`

**Confidence: HIGH**

### Deprecated v3 utility classes in components

`bg-opacity-*` usage: Found only in `tailwind-reference.html` (1 occurrence, `bg-opacity-0 bg-opacity-50 bg-opacity-100`). Not used in actual component source.

`ring-offset-background`: Used in ~15 component files (button, checkbox, sheet, tabs, toggle-group, switch, radio-group, dialog, badge, chip). This is a custom color token, not a v3-only utility — it references `ring-offset-{color}` which still works in v4.

`shadow-sm`: Used in `select.tsx`, `card.tsx`, `auth-layout.tsx`. In v4, `shadow-sm` has been renamed to `shadow-xs`, and `shadow` has been renamed to `shadow-sm`. This is a breaking rename.

`shadow-xs`: Already used in `button-group.tsx` and `calendar.tsx` — these files already use the v4 naming convention.

**Confidence: HIGH** — The `shadow-sm` rename is a confirmed breaking change that will affect rendered output.

### Color pattern: `hsl(var(--av-*))`

All custom colors use the `hsl(var(--av-*))` wrapper pattern. In v4, the [recommended pattern](https://tailwindcss.com/docs/upgrade-guide) for CSS variable colors is `hsl(var(--color))` which remains valid. However, v4's `@theme` directive uses a different declaration syntax. Since this project uses `@config` to load the JS config, the existing pattern should continue to work.

**Confidence: MEDIUM** — Works with `@config` bridge, but may need reworking if migrating fully to CSS-first config.

---

## 4. Preset Analysis for v4 Compatibility

### Features used in `tailwind.preset.js` and their v4 status

| Feature | Status in v4 | Notes |
|---------|-------------|-------|
| `darkMode: ['class']` | Changed | v4 defaults to `class` strategy. The `darkMode` config option is ignored when using `@config` — dark mode uses `.dark` class by default in v4 |
| `theme.extend.colors` | Compatible via `@config` | Works when loaded through `@config` directive |
| `theme.extend.container` | Compatible via `@config` | Works through JS config bridge |
| `theme.extend.keyframes` | Compatible via `@config` | Works through JS config bridge |
| `theme.extend.animation` | Compatible via `@config` | Works through JS config bridge |
| `theme.extend.borderRadius` | Compatible via `@config` | Works through JS config bridge |
| `plugins: [tailwindcssAnimate]` | **INCOMPATIBLE** | `tailwindcss-animate` v1.x is not compatible with v4. Requires replacement with `tw-animate-css` or `tailwind-animate` |
| `content` array | Changed | v4 auto-detects source files. `content` in JS config via `@config` is still respected but the `@source` directive is the v4 way |
| `presets` chain | Compatible via `@config` | The preset system works through the JS config bridge |

### Consumer-facing impact

The preset is exported as `@acronis-platform/shadcn-uikit/tailwind-preset` for consumers to use in their own Tailwind configs. Consumers on v3 import it in their `tailwind.config.js`. A v4 migration changes how consumers would use this — they would need `@config` or the preset would need to be converted to CSS `@theme` directives.

**Confidence: MEDIUM** — The `@config` bridge provides backward compatibility, but `tailwindcss-animate` incompatibility is blocking. Consumer migration path is unclear.

---

## 5. Visual Regression Test Setup

### Test infrastructure

- **Tool**: `@storybook/test-runner` (v0.24.2) with `jest-image-snapshot` (v6.5.1)
- **Runner**: Playwright-based, configured in `packages/ui/.storybook/test-runner.ts`
- **Snapshot directory**: `packages/ui/test/__snapshots__/`
- **Snapshot count**: 320 PNG files
- **Failure threshold**: 0.03 (3% pixel difference)
- **Storybook**: `@storybook/react-vite` (v10.1.11)
- **Styles**: Loaded via `packages/ui/.storybook/preview.ts` which imports `../src/styles/index.scss`

### Test commands

```bash
# Run visual tests (requires running Storybook)
pnpm storybook:test:visual

# Update snapshots
pnpm storybook:test:visual:update

# Docker-based (deterministic rendering)
pnpm storybook:test:visual:docker
pnpm storybook:test:visual:docker:update
```

### Workflow to update snapshots

1. Start Storybook: `pnpm storybook`
2. Run `pnpm storybook:test:visual:update` to regenerate all 320 snapshots
3. Or use Docker for deterministic cross-platform results: `pnpm storybook:test:visual:docker:update`

### Screenshot strategy

The test runner screenshots either:
- The `#storybook-root` element with 24px padding (default)
- An overlay element (`[role="dialog"]`, `[role="alertdialog"]`, `[role="menu"]`) if present
- Full page if Sonner toasts are visible
- Waits 400ms for CSS animations to settle

**Confidence: HIGH**

---

## 6. Tailwind v4 Breaking Changes (Relevant to This Project)

### PostCSS plugin moved to separate package

The `tailwindcss` npm package is no longer a PostCSS plugin. Install `@tailwindcss/postcss` and update PostCSS config. Both `postcss.config.js` files need updating.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### `@tailwind` directives replaced

`@tailwind base/components/utilities` replaced with `@import "tailwindcss"`. All 6 SCSS entry files need updating. For modular builds (base-only, components-only, utilities-only), v4 provides `@import "tailwindcss/preflight"`, `@import "tailwindcss/utilities"`, etc.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### JS config no longer auto-detected

In v4, `tailwind.config.js` is not auto-detected. Must use `@config "./tailwind.config.js"` in the CSS entry file. The previous migration attempt already did this.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### `tailwindcss-animate` is incompatible

The `tailwindcss-animate` plugin (v1.x) uses the v3 plugin API which is not compatible with v4. Replacements:
- [`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css) — pure CSS replacement
- [`tailwind-animate`](https://www.npmjs.com/package/tailwind-animate) — CSS-first v4 compatible

Both provide the same animation utilities (`accordion-down`, `accordion-up`, etc.) via CSS import instead of JS plugin.

**Confidence: HIGH** — [Source](https://github.com/Wombosvideo/tw-animate-css)

### Shadow utility renames

| v3 | v4 |
|----|-----|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `shadow-md` | `shadow-md` (unchanged) |

Components affected: `select.tsx`, `card.tsx`, `auth-layout.tsx` use `shadow-sm` which would render differently in v4.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### Default border color changed

In v3, borders default to `gray-200`. In v4, borders default to `currentColor`. This project uses `@apply border-border` in the base layer which sets a custom border color, so impact may be limited to any element that uses `border` without an explicit color class.

**Confidence: MEDIUM** — The base layer `@apply border-border` on `*` may mitigate this, but edge cases in components are possible.

### `autoprefixer` no longer needed

v4 handles vendor prefixing internally. `autoprefixer` can be removed from PostCSS configs.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### Sass/SCSS compatibility

- `@tailwindcss/postcss` **is compatible** with Sass/SCSS
- `@tailwindcss/vite` **is NOT compatible** with Sass/SCSS

Since this project uses SCSS extensively, the migration must use `@tailwindcss/postcss`, not `@tailwindcss/vite`.

**Confidence: HIGH** — [Source](https://github.com/tailwindlabs/tailwindcss/discussions/16793)

### Content detection is automatic

v4 auto-detects source files in the project. The `content` arrays in config files may no longer be needed. However, for the `tailwind.config.full.js` (which scans only `tailwind-reference.html` to force all utility generation), the `@source` directive or explicit content config may still be required.

**Confidence: MEDIUM** — Auto-detection may not produce the same output as explicit content arrays, especially for the full CSS bundle.

### Official upgrade tool

Tailwind provides `npx @tailwindcss/upgrade` which automates dependency updates, config migration, and template file changes. It requires Node.js 20+. It handles renaming utilities, updating directives, and migrating config. Running this on a branch is the recommended approach.

**Confidence: HIGH** — [Source](https://tailwindcss.com/docs/upgrade-guide)

### `@layer base` behavior

In v4, Tailwind's `@layer` directive is separate from native CSS `@layer`. The `_base.scss` file uses `@layer base { ... }` which needs verification — in v4, custom CSS using `@layer base` may need to use `@layer base { ... }` within the Tailwind CSS import context.

**Confidence: LOW** — Exact interaction of `@layer base` in SCSS files processed through PostCSS with v4's layer system needs empirical testing.

---

## 7. Package Interdependencies

### Packages in the monorepo

| Package | Tailwind dependency | Role |
|---------|-------------------|------|
| `packages/ui` | `tailwindcss: ^3.4.1` (devDependency) | Core library — builds components, exports CSS and preset |
| `packages/demo` | `tailwindcss: ^3.4.1` (devDependency) | Demo app — uses UI preset, Vite dev server |
| `packages/docs` | None | Documentation only, no Tailwind dependency |

### Dependency chain

```
packages/ui/tailwind.preset.js
    ^-- packages/ui/tailwind.config.js (uses as preset)
    ^-- packages/ui/tailwind.config.full.js (uses as preset)
    ^-- packages/demo/tailwind.config.js (imports ui/tailwind.config.js as preset)
    ^-- External consumers (import via @acronis-platform/shadcn-uikit/tailwind-preset)
```

### What changes in each package

**`packages/ui`**:
- `postcss.config.js` — switch to `@tailwindcss/postcss`
- `tailwind.config.js` — keep, load via `@config`
- `tailwind.config.full.js` — keep, load via `@config`
- `tailwind.preset.js` — replace `tailwindcss-animate` plugin, keep rest via `@config`
- All 5 SCSS entry files — replace `@tailwind` with `@import`, add `@config`
- `build-full-css.ts` — update CLI invocation for v4
- `package.json` — update `tailwindcss`, add `@tailwindcss/postcss`, `@tailwindcss/cli`, replace `tailwindcss-animate`
- Component files — rename `shadow-sm` to `shadow-xs` in affected components
- Visual snapshots — all 320 must be regenerated

**`packages/demo`**:
- `postcss.config.js` — switch to `@tailwindcss/postcss`
- `tailwind.config.js` — keep, load via `@config`
- `src/styles/index.scss` — replace `@tailwind` with `@import`, add `@config`
- `package.json` — update `tailwindcss`, add `@tailwindcss/postcss`, replace `tailwindcss-animate`

**`packages/docs`**:
- No changes needed (no Tailwind dependency)
- Documentation references to `tailwind.config.js` setup in `GETTING_STARTED.md` will need updating for v4 consumers

### Consumer impact

External consumers who use `@acronis-platform/shadcn-uikit/tailwind-preset`:
- v3 consumers: The preset's JS format continues to work with v3
- v4 consumers: Need to load the preset via `@config` directive and replace `tailwindcss-animate` with a v4-compatible alternative
- The library exports pre-built CSS (`./styles`, `./styles/full`, etc.) which is framework-agnostic and unaffected by Tailwind version changes

**Confidence: HIGH**

---

## Key Takeaways

- The previous migration attempt (commit `225aa63`) only changed the tooling layer but did not address v4 behavioral changes, causing all 220+ components to render unstyled. (Corroborated)
- `tailwindcss-animate` v1.x is incompatible with Tailwind v4 and must be replaced with `tw-animate-css` or `tailwind-animate`. (Corroborated)
- The project uses SCSS extensively, so `@tailwindcss/postcss` is the only viable integration path — `@tailwindcss/vite` does not support SCSS. (Substantiated)
- The `shadow-sm` utility rename affects at least 3 component files and will cause visual differences if not updated. (Substantiated)
- The `@config` directive provides a migration bridge that allows keeping the existing JS config and preset while adopting v4 tooling. (Substantiated)
- 320 visual regression snapshots must be regenerated and verified after migration. (Corroborated)
- The official `npx @tailwindcss/upgrade` tool can automate much of the migration. (Substantiated)

## Open Questions

1. **`@layer base` in SCSS**: Does `@layer base { @apply border-border; }` in `_base.scss` work correctly in v4 when processed through `@tailwindcss/postcss`? The interaction between SCSS preprocessing and v4's layer system is untested.

2. **Full CSS bundle generation**: The `tailwind.config.full.js` + `tailwind-reference.html` approach forces all utility generation. Does v4's `@tailwindcss/cli` produce equivalent output? Does auto-detection interfere?

3. **Consumer migration path**: How should documentation guide consumers from v3 preset usage to v4? Should the library provide both a JS preset (for v3 consumers) and a CSS `@theme` export (for v4 consumers)?

4. **`tailwindcss-animate` replacement parity**: Do `tw-animate-css` and `tailwind-animate` provide identical CSS output to `tailwindcss-animate`? The preset defines custom `accordion-down`/`accordion-up`/`indeterminate-progress` keyframes — are these duplicated or complementary?

5. **Default border color change**: The `* { @apply border-border; }` rule in `_base.scss` should override v4's `currentColor` default, but are there components that create borders without this base rule being applied (e.g., dynamically injected elements, portals)?

6. **Upgrade tool monorepo support**: Does `npx @tailwindcss/upgrade` handle monorepo layouts with multiple `tailwind.config.js` files correctly?

## Sources

1. [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — official migration guide, covers all breaking changes and the upgrade tool
2. [Tailwind CSS v4.0 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4) — announcement covering CSS-first architecture, new directives, removed features
3. [tw-animate-css (GitHub)](https://github.com/Wombosvideo/tw-animate-css) — v4-compatible replacement for `tailwindcss-animate`
4. [tailwind-animate (npm)](https://www.npmjs.com/package/tailwind-animate) — alternative v4-compatible animation package
5. [Tailwind CSS v4 + SCSS Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/16793) — confirms SCSS works with `@tailwindcss/postcss` but not `@tailwindcss/vite`
6. [Tailwind CSS v4 Functions and Directives](https://tailwindcss.com/docs/functions-and-directives) — `@config`, `@theme`, `@source`, `@import` directive documentation
7. [Tailwind CSS v4 PostCSS Installation](https://tailwindcss.com/docs/installation/using-postcss) — PostCSS plugin setup for v4
8. [shadcn/ui Issue #6925](https://github.com/shadcn-ui/ui/issues/6925) — missing animation variables in Tailwind v4, community workarounds

---

## Blocker Resolutions

### B1: tw-animate-css Utility Class Parity with tailwindcss-animate

**Status: RESOLVED** | **Confidence: HIGH**

#### Animation utility classes used in this codebase

Grep of `packages/ui/src/components` found 38 occurrences across 10 component files:

**Base classes:** `animate-in`, `animate-out` (navigation-menu, tooltip, popover, alert-dialog, dialog, sheet, dropdown-menu, select)

**Fade utilities:** `fade-in-0`, `fade-out-0`, `fade-in`, `fade-out`

**Zoom utilities:** `zoom-in-95`, `zoom-out-95`, `zoom-in-90`

**Slide utilities:** `slide-in-from-top-2`, `slide-in-from-bottom-2`, `slide-in-from-left-2`, `slide-in-from-right-2`, `slide-in-from-right-52`, `slide-in-from-left-52`, `slide-in-from-left-1/2`, `slide-in-from-top-dialog-offset`, `slide-out-to-left-1/2`, `slide-out-to-top-dialog-offset`, `slide-in-from-top`, `slide-in-from-bottom`, `slide-in-from-left`, `slide-in-from-right`, `slide-out-to-top`, `slide-out-to-bottom`, `slide-out-to-left`, `slide-out-to-right`, `slide-out-to-right-52`, `slide-out-to-left-52`

#### Parity verification

| tailwindcss-animate class | tw-animate-css equivalent | Status |
|---------------------------|---------------------------|--------|
| `animate-in` / `animate-out` | `animate-in` / `animate-out` | Identical |
| `fade-in-0` / `fade-out-0` | `fade-in-0` / `fade-out-0` | Identical |
| `fade-in` / `fade-out` | `fade-in` / `fade-out` | Identical |
| `zoom-in-95` / `zoom-out-95` | `zoom-in-95` / `zoom-out-95` | Identical |
| `zoom-in-90` | `zoom-in-90` | Identical |
| `slide-in-from-top-2` etc. | `slide-in-from-top-2` etc. | Identical |
| `slide-in-from-left-1/2` | `slide-in-from-left-1/2` | Identical |
| `slide-out-to-top` etc. | `slide-out-to-top` etc. | Identical |
| `slide-in-from-top-dialog-offset` | `slide-in-from-top-dialog-offset` | Needs testing (custom value) |

[`tw-animate-css`](https://github.com/Wombosvideo/tw-animate-css) was explicitly built as a drop-in replacement for `tailwindcss-animate`. Class names are intentionally compatible. [shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4) uses `tw-animate-css` as the official v4 replacement — shadcn/ui v4 components ship with it instead of `tailwindcss-animate`.

#### Keyframe conflict analysis

The preset defines three custom keyframes: `accordion-down`, `accordion-up`, `indeterminate-progress`.

`tw-animate-css` also provides built-in `accordion-down` and `accordion-up` animations. Two options:
1. Keep the custom keyframes in the JS preset (via `@config` bridge) — they coexist or override the built-in ones
2. Remove custom accordion keyframes from the preset and rely on `tw-animate-css`'s built-in versions

`indeterminate-progress` is custom to this project and not provided by any animation library — it must remain in the preset regardless.

**Confidence: HIGH** for standard classes. **MEDIUM** for custom `dialog-offset` translate value — needs one test case to confirm it resolves through the `@config` bridge.

---

### B2: @layer base + @apply in SCSS with v4 + PostCSS

**Status: RESOLVED** | **Confidence: HIGH**

#### Current code under review

```scss
/* packages/ui/src/styles/_base.scss */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans text-base;
    letter-spacing: var(--av-letter-spacing-base, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

#### Finding 1: @apply inside @layer base works for built-in utilities

The official Tailwind v4 documentation at [tailwindcss.com/docs/adding-custom-styles](https://tailwindcss.com/docs/adding-custom-styles) explicitly shows this pattern as valid:

```css
@layer base {
  h1 { @apply text-2xl; }
  h2 { @apply text-xl; }
}
```

The classes used in `_base.scss` — `border-border`, `bg-background`, `text-foreground`, `font-sans`, `text-base` — are all **standard Tailwind utilities** generated from the theme configuration (colors, fontFamily, fontSize). They are **not** custom classes defined in other `@layer` blocks.

**Confidence: HIGH** — Official docs show this exact pattern.

#### Finding 2: The Discussion #17082 issue does NOT apply here

[GitHub Discussion #17082](https://github.com/tailwindlabs/tailwindcss/discussions/17082) reports that `@apply` fails when applying **custom** classes defined within `@layer components` or `@layer utilities`. In v4, Tailwind uses native CSS cascade layers and the `@utility` directive replaces `@layer utilities` for registering custom utility classes.

This issue does **not** affect `_base.scss` because it only `@apply`s built-in theme-generated utilities, not custom classes.

**Confidence: HIGH** — The issue is about custom classes, not built-in utilities.

#### Finding 3: Sass passes @layer and @apply through unchanged

The `_base.scss` file is processed by Sass before PostCSS. Sass does not understand `@layer` or `@apply` — it passes them through as-is. `@tailwindcss/postcss` receives `@layer base { @apply border-border; }` exactly as if it were in a plain CSS file.

**Confidence: HIGH** — Standard Sass behavior with unknown at-rules.

#### Finding 4: CSS variable declarations should move out of @layer base

The [shadcn/ui v4 migration](https://ui.shadcn.com/docs/tailwind-v4) moves CSS variable declarations (`:root { --background: ... }`) **out of** `@layer base` into bare `:root` blocks. This affects `_globals.scss` (which declares CSS variables inside `@layer base`), not `_base.scss` (which uses `@apply`).

This is a separate concern from `@apply` usage — the `@apply` pattern in `_base.scss` itself does not need to change.

**Confidence: MEDIUM** — The shadcn/ui pattern suggests moving variable declarations out, but `@apply` of utilities inside `@layer base` remains valid.

#### B2 conclusion

`@layer base { @apply border-border; }` is expected to work in v4 because:
1. Official v4 docs show `@layer base` with `@apply` of built-in utilities as a valid pattern
2. The Discussion #17082 issue only affects custom classes defined in other layers
3. Sass passes `@layer` and `@apply` through unchanged to PostCSS
4. All classes being applied are standard theme-generated utilities

---

### B3: v4 Modular Import Equivalents for All 5 SCSS Entry Files

**Status: RESOLVED** | **Confidence: HIGH**

#### v4 layer import system

In v4, `@import "tailwindcss"` expands to:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

Individual layers can be imported separately. Sources: [tailwindcss.com/docs/preflight](https://tailwindcss.com/docs/preflight), [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme).

#### v3 → v4 directive mapping

| v3 Directive | v4 Import |
|-------------|-----------|
| `@tailwind base` | `@import "tailwindcss/preflight.css" layer(base)` |
| `@tailwind components` | No import needed — the components layer exists in cascade order but has no built-in content |
| `@tailwind utilities` | `@import "tailwindcss/utilities.css" layer(utilities)` |

Each file also needs `@config "../../tailwind.config.js"` to load the JS config.

#### File-by-file mapping

**1. `packages/ui/src/styles/index.scss`** (main entry — all layers)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` |
| `@tailwind components;` | *(remove — no built-in content)* |
| `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` |
| *(none)* | `@config "../../tailwind.config.js";` |

**2. `packages/ui/src/styles/base-only.scss`** (base layer only)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` |
| *(none)* | `@config "../../tailwind.config.js";` |

**3. `packages/ui/src/styles/components-only.scss`** (all layers despite name)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` |
| `@tailwind components;` | *(remove)* |
| `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` |
| *(none)* | `@config "../../tailwind.config.js";` |

**4. `packages/ui/src/styles/utilities-only.scss`** (utilities layer only)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` |
| *(none)* | `@config "../../tailwind.config.js";` |

**5. `packages/ui/src/styles/full.scss`** (full bundle — all layers)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` |
| `@tailwind components;` | *(remove)* |
| `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` |
| *(none)* | `@config "../../tailwind.config.full.js";` |

Note: `full.scss` uses `tailwind.config.full.js` (not `tailwind.config.js`) which scans `tailwind-reference.html` to force all utility generation.

**6. `packages/demo/src/styles/index.scss`** (demo app — all layers)

| Current (v3) | v4 Equivalent |
|-------------|--------------|
| `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` |
| `@tailwind components;` | *(remove)* |
| `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` |
| *(none)* | `@config "../../tailwind.config.js";` |

#### Theme layer consideration

The default Tailwind theme (`tailwindcss/theme.css`) provides default colors (`slate`, `blue`, etc.) and scales. This project defines its own color system via CSS custom properties in `_globals.scss`. Two options:

1. **Skip the default theme** (import only preflight + utilities) — avoids conflicts with custom design tokens. This is the pattern shown above.
2. **Include the default theme** — needed if any component or the full CSS bundle uses default Tailwind colors (e.g., `bg-gray-100` in `tailwind-reference.html`).

The `tailwind-reference.html` file references `bg-gray-100` and `dark:bg-gray-900`, but actual components only use the custom `--av-*` token-based colors. The theme layer decision only affects the full CSS bundle build.

**Confidence: HIGH** for the import mapping. **MEDIUM** for whether to include `tailwindcss/theme.css` in the full bundle build.

#### SCSS + CSS @import interaction

Sass's `@use` and CSS's `@import` are different directives. Sass processes `@use` at compile time; CSS `@import` with URL strings is passed through to PostCSS. This interleaving works because Sass treats unknown `@import` with quoted strings as CSS imports.

**Confidence: HIGH** — Standard Sass behavior.

---

### Blocker Resolution Sources

9. [tailwindcss-animate GitHub](https://github.com/jamiebuilds/tailwindcss-animate) — original plugin, enter/exit animation docs
10. [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — official v4 migration pattern, confirms tw-animate-css as replacement
11. [Tailwind CSS v4 Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) — `@layer base` with `@apply` confirmed valid in v4
12. [GitHub Discussion #17082](https://github.com/tailwindlabs/tailwindcss/discussions/17082) — `@apply` issue with custom classes in layers (does not affect built-in utilities)
13. [GitHub Discussion #16002](https://github.com/tailwindlabs/tailwindcss/discussions/16002) — border-color and `@layer base` in v4
14. [Tailwind CSS v4 Preflight docs](https://tailwindcss.com/docs/preflight) — modular import syntax for base layer
15. [Tailwind CSS v4 Theme docs](https://tailwindcss.com/docs/theme) — theme layer import and `@theme inline` directive

---

## Preflight Regression Analysis

### Context

After swapping to Tailwind CSS v4, 193 of 320 visual regression snapshots fail with size mismatches. This section compares the actual v3 and v4 preflight CSS files from `node_modules` to identify which behavioral changes cause components to render at different sizes.

**Files compared:**
- v3: `node_modules/.pnpm/tailwindcss@3.4.19.../src/css/preflight.css` (387 lines)
- v4: `node_modules/.pnpm/tailwindcss@4.2.2/node_modules/tailwindcss/preflight.css` (394 lines)

---

### 1. Universal reset: margin and padding

**v3** resets selectively — only specific elements get `margin: 0`:

```css
/* v3: only these elements */
blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre { margin: 0; }
fieldset { margin: 0; padding: 0; }
ol, ul, menu { list-style: none; margin: 0; padding: 0; }
body { margin: 0; }
button, input, optgroup, select, textarea { margin: 0; padding: 0; }
```

**v4** resets universally via the `*` selector:

```css
/* v4: everything */
*, ::after, ::before, ::backdrop, ::file-selector-button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}
```

**Impact:** Any element not explicitly listed in v3's reset that had default browser margins or padding (e.g., `dialog`, `details`, `summary`, custom elements) now gets `margin: 0; padding: 0` in v4. The v3 preflight also resets `dialog { padding: 0 }` and `legend { padding: 0 }` individually, but v4's universal rule catches everything.

**Likely snapshot impact:** LOW for this project — most components use explicit Tailwind spacing utilities. However, any component that relies on browser-default margins of unlisted elements would shift.

**Confidence: Corroborated** — verified directly in both preflight files.

---

### 2. Border reset syntax

**v3:**
```css
*, ::before, ::after {
  border-width: 0;
  border-style: solid;
  border-color: theme('borderColor.DEFAULT', currentColor);
}
```

**v4:**
```css
*, ::after, ::before, ::backdrop, ::file-selector-button {
  border: 0 solid;
}
```

**Key difference:** v3 uses `border-color: theme('borderColor.DEFAULT', currentColor)` — resolved at build time to the configured border color (this project sets `border-border` in `_base.scss`). v4 uses the `border` shorthand with no color, which means `border-color` defaults to `currentColor`.

**However**, `_base.scss` contains `* { @apply border-border; }` which sets `border-color` on all elements in both versions. This override neutralizes the v3/v4 difference for this project.

**Likely snapshot impact:** NONE — the `_base.scss` override handles this.

**Confidence: Corroborated**

---

### 3. Body rule: missing in v4

**v3:**
```css
body {
  margin: 0;
  line-height: inherit;
}
```

**v4:** No `body` rule exists in preflight at all.

**Analysis:** In v3, `body { line-height: inherit }` explicitly inherits from `html { line-height: 1.5 }`. In v4, there is no body rule, but `line-height` is an inherited CSS property, so `body` still receives `1.5` from `html`. The `margin: 0` is handled by v4's universal `* { margin: 0 }`.

**Additionally**, `_base.scss` applies `@apply text-base` to `body`, which sets both `font-size` and `line-height` explicitly (see Section 5 below).

**Likely snapshot impact:** NONE — CSS inheritance and `_base.scss` override cover this.

**Confidence: Substantiated**

---

### 4. Form element reset differences

**v3:**
```css
button, input, optgroup, select, textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}
```

**v4:**
```css
button, input, select, optgroup, textarea, ::file-selector-button {
  font: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  letter-spacing: inherit;
  color: inherit;
  border-radius: 0;
  background-color: transparent;
  opacity: 1;
}
```

**Key differences:**

| Property | v3 | v4 | Impact |
|----------|----|----|--------|
| `font-size` | `100%` (relative to parent) | `font: inherit` (inherits computed value) | Functionally equivalent for standard nesting. `100%` and `inherit` differ only when the parent has a non-standard font-size context (rare). |
| `line-height` | `inherit` (explicit) | `font: inherit` (sets line-height as part of shorthand) | Equivalent — both inherit the parent's computed line-height. |
| `border-radius` | not reset | `0` | **Form elements lose default browser border-radius.** Any `<input>`, `<select>`, `<button>` that relied on browser-default border-radius now has sharp corners unless Tailwind `rounded-*` classes are applied. |
| `background-color` | not reset (buttons get `transparent` separately) | `transparent` (all form elements) | `<select>`, `<textarea>`, `<input>` lose browser-default backgrounds. |
| `opacity` | not reset | `1` | Overrides browser defaults for disabled state presentation in some browsers. |
| `margin` / `padding` | explicitly `0` | handled by universal `*` reset | Equivalent result. |

**Likely snapshot impact:** MEDIUM — `border-radius: 0` on all form elements is the most visible change. Components using `<select>`, `<input>`, or `<button>` without explicit `rounded-*` classes will render with sharp corners. However, this project's components (`select.tsx`, `input.tsx`, `button.tsx`) all use explicit `rounded-lg` or `rounded-md` classes, which override the reset.

**Confidence: Corroborated**

---

### 5. `text-base` utility: v3 vs v4 output

**v3** defines `text-base` as:
```js
base: ['1rem', { lineHeight: '1.5rem' }]
```
Output: `font-size: 1rem; line-height: 1.5rem;`

**v4** defines `text-base` as:
```css
--text-base: 1rem;
--text-base--line-height: calc(1.5 / 1);
```
Output: `font-size: 1rem; line-height: 1.5;`

**Critical difference:** v3 sets `line-height: 1.5rem` (absolute, 24px at default). v4 sets `line-height: 1.5` (unitless ratio, 1.5x the element's font-size).

For the body element at `font-size: 16px`, both compute to 24px. However, for child elements with different font sizes, the behavior diverges:

- v3 `line-height: 1.5rem` = always 24px regardless of the child's font-size
- v4 `line-height: 1.5` = scales with the child's font-size (e.g., 12px font → 18px line-height)

**This project's override:** `_base.scss` applies `@apply text-base` only to `body`. In the current v3 build, this produces:

```css
body {
  font-size: var(--av-font-size-base, 16px);
  line-height: var(--tw-leading, var(--av-line-height-base, 1.5));
}
```

The design token `--av-line-height-base` defaults to `1.5` (unitless), not `1.5rem`. So this project already uses the unitless value in the v3 build due to the custom theme configuration.

**Scope:** `text-base` is applied only to `body` in `_base.scss`. It is NOT applied to `*` or any other global selector. Text sizing in components comes from explicit utilities (`text-sm`, `text-xs`, `text-lg`, etc.).

**Likely snapshot impact:** LOW — the project's custom theme already uses unitless `1.5` for the body line-height. Components that inherit from body and have `font-size: 16px` see no difference. Components with other font sizes would only differ if they inherited `line-height` from body without setting their own — but most use explicit size utilities.

**Confidence: Corroborated** — verified in theme config, built CSS, and both preflight files.

---

### 6. Button cursor: pointer removed

**v3:**
```css
button, [role="button"] { cursor: pointer; }
:disabled { cursor: default; }
```

**v4:** No cursor rules in preflight.

**Impact:** Buttons and role="button" elements no longer get `cursor: pointer` by default. Users must add it explicitly.

**Likely snapshot impact:** NONE for screenshots — cursor is not captured in visual snapshots.

**Confidence: Corroborated**

---

### 7. Additional v4 preflight additions

v4 adds rules not present in v3:

| Rule | Purpose |
|------|---------|
| `::backdrop` in universal reset | Resets dialog/fullscreen backdrops |
| `::file-selector-button` in universal reset and form reset | File input buttons get consistent styling |
| `::placeholder { opacity: 1 }` + `color-mix` rule | Placeholder text uses 50% opacity of `currentcolor` via `color-mix(in oklab, currentcolor 50%, transparent)` |
| `::-webkit-date-and-time-value { min-height: 1lh }` | Ensures date inputs maintain height when empty |
| `::-webkit-datetime-edit { display: inline-flex }` | Prevents height changes on date inputs |
| `[hidden]:where(:not([hidden='until-found'])) { display: none !important }` | `!important` added (v3 uses `display: none` without `!important`) |
| `select optgroup` rules | Restores font-weight and padding for grouped options |

**Likely snapshot impact:** LOW to MEDIUM — placeholder color changes could affect input components in their empty state. The `!important` on `[hidden]` is unlikely to cause visual differences in normal snapshots.

**Confidence: Corroborated**

---

### 8. Removed v3 rules absent in v4

| v3 Rule | Removed in v4 |
|---------|---------------|
| `body { margin: 0; line-height: inherit; }` | Covered by universal `*` and CSS inheritance |
| `button, select { text-transform: none; }` | No longer reset |
| `button, [role="button"] { cursor: pointer; }` | No longer set |
| `:disabled { cursor: default; }` | No longer set |
| `[type='search'] { -webkit-appearance: textfield; outline-offset: -2px; }` | Removed |
| `::-webkit-file-upload-button { -webkit-appearance: button; font: inherit; }` | Replaced by `::file-selector-button` rules |
| `input::placeholder, textarea::placeholder { opacity: 1; color: theme('colors.gray.400'); }` | Replaced by `::placeholder` with `color-mix` |
| `::before, ::after { --tw-content: ''; }` | No longer set in preflight (likely moved elsewhere) |

**Likely snapshot impact:** The placeholder color change is the most visible. v3 uses `gray.400` (#9ca3af) while v4 uses 50% of `currentcolor`. For black text, 50% opacity in `oklab` produces a different gray than `#9ca3af`.

**Confidence: Corroborated**

---

### Root Cause Assessment for 193/320 Failures

The 193 failures with size mismatches are most likely caused by a combination of factors, not a single preflight change. The preflight differences alone are unlikely to cause this volume of failures given that:

1. Most components use explicit height utilities (`h-8`, `h-9`, `h-12`, etc.)
2. The `_base.scss` override neutralizes the border-color default change
3. The body line-height is already unitless in the v3 build due to custom theme tokens

**More probable root causes for size-based failures:**

1. **Build failure / zero CSS output** — The previous migration attempt (commit `225aa63`) swapped `tailwindcss-animate` v1.x (incompatible with v4) without replacing it with `tw-animate-css`. If the PostCSS build crashes due to plugin incompatibility, the resulting CSS would be empty or incomplete, causing widespread layout collapse. This would explain 60% failure rate (193/320) rather than targeted element-level regressions.

2. **`shadow-sm` → `shadow-xs` rename** — v4 renames `shadow-sm` to `shadow-xs`. Any component still using `shadow-sm` would lose its shadow, potentially affecting perceived sizing in visual comparisons. (Note: some components in this project already use `shadow-xs`.)

3. **`ring-offset-background` utility changes** — v4 changes how ring utilities work. Components like `button.tsx` use `ring-offset-background` which may not exist in v4's utility space without migration.

4. **Default border-color: `currentColor` vs theme** — Without `_base.scss`'s `* { @apply border-border }` loading correctly, the fallback changes from the configured border color to `currentColor`, changing every bare `border` utility's color.

**Confidence: Substantiated** — The preflight changes alone do not account for 193/320 failures. A build-level issue (empty/broken CSS from plugin incompatibility) is the most consistent explanation.

---

### Compensating CSS Overrides

If preflight differences do cause regressions after the build-level issues are resolved, the following overrides in `_base.scss` or a new `_preflight-compat.scss` would restore v3-equivalent behavior:

```scss
@layer base {
  /* Restore v3-style button cursor */
  button,
  [role="button"] {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  /* Restore v3-style placeholder color (gray-400 equivalent) */
  ::placeholder {
    color: hsl(var(--av-muted-foreground));
  }

  /* Restore text-transform reset for buttons/selects if needed */
  button,
  select {
    text-transform: none;
  }

  /* Restore ::before/::after content variable if needed by animations */
  ::before,
  ::after {
    --tw-content: '';
  }
}
```

**Note:** The universal `* { margin: 0; padding: 0 }` in v4 is strictly a superset of v3's selective resets — it cannot cause elements to gain margin/padding they lacked before. No override is needed for this.

**Note:** The `border-radius: 0` on form elements in v4 is intentional and aligns with Tailwind's philosophy of opt-in styling. All components in this project already use explicit `rounded-*` classes. No override is needed.

---

### Sources

16. v3 preflight: `node_modules/.pnpm/tailwindcss@3.4.19.../src/css/preflight.css` — direct file comparison
17. v4 preflight: `node_modules/.pnpm/tailwindcss@4.2.2/node_modules/tailwindcss/preflight.css` — direct file comparison
18. v3 `text-base` definition: `tailwindcss@3.4.19/stubs/config.full.js` — `base: ['1rem', { lineHeight: '1.5rem' }]`
19. v4 `text-base` definition: `tailwindcss@4.2.2/theme.css` — `--text-base: 1rem; --text-base--line-height: calc(1.5 / 1)`
20. Built CSS analysis: `packages/ui/dist/shadcn-uikit.css` — confirmed unitless line-height in current v3 build
