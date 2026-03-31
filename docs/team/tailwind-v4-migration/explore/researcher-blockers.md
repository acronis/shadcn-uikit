---
type: EXPLORATION
title: Tailwind CSS v4 Migration — DA Blocker Resolution (B1, B2, B3)
date: 2026-03-30
status: complete
---

# Tailwind CSS v4 Migration — DA Blocker Resolution (B1, B2, B3)

---

## B1: tw-animate-css Utility Class Parity with tailwindcss-animate

### Research Question

Does `tw-animate-css` provide identical utility classes to `tailwindcss-animate`? Specifically: `animate-in`, `animate-out`, `fade-in-*`, `fade-out-*`, `zoom-in-*`, `zoom-out-*`, `slide-in-from-*`, `slide-out-to-*`.

### Utility Classes Used in This Codebase

Grep of `packages/ui/src/components` found these animation utility classes in active use:

**Base classes:**
- `animate-in` — used in 10 component files
- `animate-out` — used in 10 component files

**Fade utilities:**
- `fade-in-0` — tooltip, popover, alert-dialog, dialog, sheet, dropdown-menu, select
- `fade-out-0` — tooltip, popover, alert-dialog, dialog, sheet, dropdown-menu, select
- `fade-in` (no value suffix) — navigation-menu
- `fade-out` (no value suffix) — navigation-menu

**Zoom utilities:**
- `zoom-in-95` — tooltip, popover, dropdown-menu, select
- `zoom-out-95` — tooltip, popover, dropdown-menu, select
- `zoom-in-90` — navigation-menu
- `zoom-out-95` — navigation-menu

**Slide utilities:**
- `slide-in-from-top-2`, `slide-in-from-bottom-2`, `slide-in-from-left-2`, `slide-in-from-right-2` — tooltip, popover, dropdown-menu, select
- `slide-in-from-right-52`, `slide-in-from-left-52` — navigation-menu
- `slide-in-from-left-1/2`, `slide-in-from-top-dialog-offset` — alert-dialog, dialog
- `slide-out-to-left-1/2`, `slide-out-to-top-dialog-offset` — alert-dialog, dialog
- `slide-in-from-top`, `slide-in-from-bottom`, `slide-in-from-left`, `slide-in-from-right` — sheet
- `slide-out-to-top`, `slide-out-to-bottom`, `slide-out-to-left`, `slide-out-to-right` — sheet
- `slide-out-to-right-52`, `slide-out-to-left-52` — navigation-menu

**Custom animations (defined in preset, not from plugin):**
- `animate-accordion-down`, `animate-accordion-up` — defined in `tailwind.preset.js` keyframes
- `animate-indeterminate-progress` — defined in `tailwind.preset.js` keyframes

### tw-animate-css Parity Analysis

| tailwindcss-animate class | tw-animate-css equivalent | Status |
|---------------------------|---------------------------|--------|
| `animate-in` | `animate-in` | Identical |
| `animate-out` | `animate-out` | Identical |
| `fade-in-0` | `fade-in-0` | Identical |
| `fade-out-0` | `fade-out-0` | Identical |
| `fade-in` | `fade-in` | Identical |
| `fade-out` | `fade-out` | Identical |
| `zoom-in-95` | `zoom-in-95` | Identical |
| `zoom-out-95` | `zoom-out-95` | Identical |
| `zoom-in-90` | `zoom-in-90` | Identical |
| `slide-in-from-top-2` | `slide-in-from-top-2` | Identical |
| `slide-in-from-bottom-2` | `slide-in-from-bottom-2` | Identical |
| `slide-in-from-left-2` | `slide-in-from-left-2` | Identical |
| `slide-in-from-right-2` | `slide-in-from-right-2` | Identical |
| `slide-out-to-top` | `slide-out-to-top` | Identical |
| `slide-out-to-bottom` | `slide-out-to-bottom` | Identical |
| `slide-out-to-left` | `slide-out-to-left` | Identical |
| `slide-out-to-right` | `slide-out-to-right` | Identical |
| `slide-in-from-left-1/2` | `slide-in-from-left-1/2` | Identical |
| `slide-in-from-top-dialog-offset` | `slide-in-from-top-dialog-offset` | Needs verification (custom value) |
| `slide-out-to-left-1/2` | `slide-out-to-left-1/2` | Identical |
| `slide-out-to-top-dialog-offset` | `slide-out-to-top-dialog-offset` | Needs verification (custom value) |

`tw-animate-css` was explicitly built as a [drop-in replacement](https://github.com/Wombosvideo/tw-animate-css) for `tailwindcss-animate`. The class names are intentionally compatible. The library is used by [shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4) as the official v4 replacement — shadcn/ui v4 components ship with `tw-animate-css` instead of `tailwindcss-animate`.

**Confidence: HIGH** — Class names are confirmed identical for all standard utilities. The library is the official shadcn/ui replacement.

### Custom Value Classes

Two classes use a custom `translate` value defined in the preset:
- `slide-in-from-top-dialog-offset` — uses `translate: { 'dialog-offset': '48%' }` from the preset
- `slide-out-to-top-dialog-offset` — same

In `tailwindcss-animate` (v3), these work because the plugin reads from the Tailwind theme's `translate` scale. In `tw-animate-css` (v4), custom translate values are referenced via CSS custom properties. With the `@config` bridge loading the JS preset, the custom `dialog-offset` translate value should be available as `--translate-dialog-offset`. However, this needs empirical verification.

**Confidence: MEDIUM** — Standard classes are confirmed. Custom value (`dialog-offset`) behavior with the `@config` bridge needs testing.

### Custom Keyframes in Preset

The preset defines `accordion-down`, `accordion-up`, and `indeterminate-progress` keyframes. `tw-animate-css` also provides built-in `accordion-down` and `accordion-up` animations. There are two options:
1. Keep the custom keyframes in the JS preset (via `@config` bridge) and they coexist
2. Remove custom accordion keyframes and rely on `tw-animate-css`'s built-in versions

The `indeterminate-progress` keyframe is custom to this project and not provided by any animation library — it must remain in the preset regardless.

**Confidence: HIGH**

### B1 Summary

`tw-animate-css` provides identical class names for all standard animation utilities used in this codebase. The only uncertainty is whether custom translate values (`dialog-offset`) work correctly through the `@config` bridge. This can be verified with a single test case.

---

## B2: @layer base + @apply Behavior in v4 with SCSS + PostCSS

### Research Question

Does `@layer base { * { @apply border-border; } body { @apply bg-background text-foreground font-sans text-base; } }` in `_base.scss` work correctly in Tailwind v4 when processed through `@tailwindcss/postcss`?

### Current Code

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

### Findings

There are two separate concerns:

#### Concern A: Does `@apply` work inside `@layer base` in v4?

The official Tailwind v4 documentation at [tailwindcss.com/docs/adding-custom-styles](https://tailwindcss.com/docs/adding-custom-styles) explicitly shows this pattern as valid:

```css
@layer base {
  h1 { @apply text-2xl; }
  h2 { @apply text-xl; }
}
```

This works because the classes being `@apply`'d (`text-2xl`, `text-xl`) are **built-in Tailwind utilities** generated from the theme configuration.

The classes used in `_base.scss` — `border-border`, `bg-background`, `text-foreground`, `font-sans`, `text-base` — are all standard Tailwind utilities generated from the theme config (colors, fontFamily, fontSize). They are **not** custom classes defined in other `@layer` blocks.

**Confidence: HIGH** — The official docs show this exact pattern. The utilities being applied are all theme-generated built-in utilities.

#### Concern B: Does `@layer base` interact correctly with v4's native CSS layers?

In v4, Tailwind uses [native CSS cascade layers](https://tailwindcss.com/blog/tailwindcss-v4). The `@layer base`, `@layer components`, and `@layer utilities` directives in your CSS are mapped to native CSS `@layer` declarations.

The [GitHub Discussion #17082](https://github.com/tailwindlabs/tailwindcss/discussions/17082) reports that `@apply` fails when trying to apply **custom** classes defined within `@layer components` or `@layer utilities`. This is because v4 uses `@utility` for registering custom utility classes. However, this does **not** apply to the `_base.scss` case, which only applies built-in utilities inside `@layer base`.

**Confidence: HIGH** — The issue in Discussion #17082 is about custom classes, not built-in utilities.

#### Concern C: SCSS preprocessing interaction

The `_base.scss` file is processed by Sass before PostCSS sees it. Sass does not understand or transform `@layer` or `@apply` — it passes them through as-is. This means `@tailwindcss/postcss` receives the `@layer base { @apply border-border; }` exactly as written, which is the same as if it were in a plain CSS file.

**Confidence: HIGH** — Sass passes unknown at-rules through unchanged.

#### Concern D: The shadcn/ui precedent

The official [shadcn/ui Tailwind v4 documentation](https://ui.shadcn.com/docs/tailwind-v4) shows a migration pattern where CSS variables move **out** of `@layer base` and into a bare `:root` block, while the `@theme inline` directive maps them to Tailwind tokens. However, this is for the CSS variable declarations, not for `@apply` usage.

The shadcn/ui v4 approach replaces `@layer base { :root { --background: 0 0% 100%; } }` with bare `:root { --background: hsl(0 0% 100%); }`. But `@apply` of utilities inside `@layer base` remains the documented pattern.

**Confidence: MEDIUM** — The shadcn/ui migration moves variable declarations out of `@layer base`, which may suggest a preference but is not strictly required for `@apply` usage.

### B2 Summary

`@layer base { @apply border-border; }` is expected to work in v4 because:
1. The official v4 docs show `@layer base` with `@apply` of built-in utilities as a valid pattern
2. The classes being applied are all standard Tailwind utilities (not custom classes)
3. The Discussion #17082 issue only affects `@apply` of custom classes defined in other layers
4. Sass passes `@layer` and `@apply` through unchanged to PostCSS

The one migration consideration: CSS variable declarations (currently in `_globals.scss` inside `@layer base`) should move to bare `:root` blocks, per the shadcn/ui v4 pattern. But the `@apply` usage in `_base.scss` itself does not need to change.

---

## B3: v4 Modular Import Equivalents for All 5 SCSS Entry Files

### Research Question

What are the v4 equivalents of `@tailwind base`, `@tailwind components`, and `@tailwind utilities` when used individually in modular SCSS entry files?

### v4 Layer Import System

In v4, `@import "tailwindcss"` expands to:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

Individual layers can be imported separately. Source: [tailwindcss.com/docs/preflight](https://tailwindcss.com/docs/preflight) and [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme).

### File-by-File Mapping

#### 1. `packages/ui/src/styles/index.scss` (main entry)

**Current (v3):**
```scss
@use './tokens';
@use './base';
@use './mixins';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 equivalent:**
```scss
@use './tokens';
@use './base';
@use './mixins';

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@config "../../tailwind.config.js";
```

Notes:
- `@tailwind base` maps to `@import "tailwindcss/preflight.css" layer(base)`
- `@tailwind components` has no direct import — the components layer exists but is empty by default (user-defined components go here)
- `@tailwind utilities` maps to `@import "tailwindcss/utilities.css" layer(utilities)`
- The theme layer (`tailwindcss/theme.css`) can be omitted since this project uses custom CSS variables (via `_globals.scss`) rather than the default Tailwind theme
- `@config` directive loads the JS config

**SCSS + `@import` interaction warning:** Sass's `@use` and CSS's `@import` are different directives. Sass processes `@use` at compile time; CSS `@import` is passed through to PostCSS. This interleaving works because Sass treats unknown `@import` with URL strings as CSS imports and passes them through.

**Confidence: HIGH** — Documented behavior.

#### 2. `packages/ui/src/styles/base-only.scss`

**Current (v3):**
```scss
@use './tokens';
@use './base';

@tailwind base;
```

**v4 equivalent:**
```scss
@use './tokens';
@use './base';

@import "tailwindcss/preflight.css" layer(base);
@config "../../tailwind.config.js";
```

Notes:
- Only the base/preflight layer is needed
- No utilities or components

**Confidence: HIGH**

#### 3. `packages/ui/src/styles/components-only.scss`

**Current (v3):**
```scss
@use './globals';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 equivalent:**
```scss
@use './globals';

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@config "../../tailwind.config.js";
```

Notes:
- This file imports all three layers despite its name "components-only". The v3 `@tailwind components` layer is empty unless components are registered via `@layer components`. In v4, same behavior — the components layer exists in the cascade order but has no built-in content.
- All three directives are included because component styles rely on base reset (preflight) and utility classes.

**Confidence: HIGH**

#### 4. `packages/ui/src/styles/utilities-only.scss`

**Current (v3):**
```scss
@tailwind utilities;
```

**v4 equivalent:**
```scss
@import "tailwindcss/utilities.css" layer(utilities);
@config "../../tailwind.config.js";
```

Notes:
- Only the utilities layer. No preflight, no theme.
- The `@config` directive is needed so the custom theme tokens (colors, spacing, etc.) are available for utility generation.

**Confidence: HIGH**

#### 5. `packages/ui/src/styles/full.scss`

**Current (v3):**
```scss
@use './tokens';
@use './base';
@use './globals';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 equivalent:**
```scss
@use './tokens';
@use './base';
@use './globals';

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@config "../../tailwind.config.js";
```

Notes:
- Used by `build-full-css.ts` to generate the full unpurged CSS bundle
- The `tailwind.config.full.js` specifies content scanning against `tailwind-reference.html` to force all utility generation. In v4, this config is loaded via `@config "../../tailwind.config.full.js"` (not `tailwind.config.js`)
- Alternatively, v4 provides `@source` directive: `@source "./tailwind-reference.html"` to add files to the content scan

**Confidence: HIGH** for the import mapping. **MEDIUM** for the full bundle generation approach — the `@config` + content scanning behavior for unpurged builds needs testing.

#### 6. `packages/demo/src/styles/index.scss`

**Current (v3):**
```scss
@use '../../../ui/src/styles/tokens';
@use '../../../ui/src/styles/themes';

@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; margin: 0; padding: 0; }
body {
  @apply bg-background text-foreground font-sans text-base;
  letter-spacing: var(--av-letter-spacing-base, 0);
}
```

**v4 equivalent:**
```scss
@use '../../../ui/src/styles/tokens';
@use '../../../ui/src/styles/themes';

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@config "../../tailwind.config.js";

html, body, #root { height: 100%; margin: 0; padding: 0; }
body {
  @apply bg-background text-foreground font-sans text-base;
  letter-spacing: var(--av-letter-spacing-base, 0);
}
```

**Confidence: HIGH**

### Theme Layer Consideration

The default Tailwind theme (`tailwindcss/theme.css`) provides colors like `slate`, `blue`, `red`, etc. and default scales. This project defines its own color system via CSS custom properties in `_globals.scss` and maps them through `tailwind.preset.js`. Two options:

1. **Skip the default theme** (import only preflight + utilities) — avoids conflicts with custom design tokens. This is the pattern shown above.
2. **Include the default theme** — provides fallback colors. Useful if any component uses Tailwind's default colors directly (e.g., `bg-gray-100`, `dark:bg-gray-900` found in `tailwind-reference.html`).

The `tailwind-reference.html` file references `bg-gray-100` and `dark:bg-gray-900`. If the default theme is skipped, these classes won't resolve. However, these are only in the reference file for the full CSS bundle — actual components only use the custom `--av-*` token-based colors.

**Confidence: MEDIUM** — Whether to include the default theme depends on whether any production consumer relies on default Tailwind colors.

### B3 Summary — Quick Reference Table

| File | v3 Directives | v4 Imports |
|------|--------------|------------|
| `index.scss` | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss/preflight.css" layer(base);` + `@import "tailwindcss/utilities.css" layer(utilities);` + `@config` |
| `base-only.scss` | `@tailwind base;` | `@import "tailwindcss/preflight.css" layer(base);` + `@config` |
| `components-only.scss` | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss/preflight.css" layer(base);` + `@import "tailwindcss/utilities.css" layer(utilities);` + `@config` |
| `utilities-only.scss` | `@tailwind utilities;` | `@import "tailwindcss/utilities.css" layer(utilities);` + `@config` |
| `full.scss` | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss/preflight.css" layer(base);` + `@import "tailwindcss/utilities.css" layer(utilities);` + `@config "../../tailwind.config.full.js"` |
| `demo/index.scss` | `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss/preflight.css" layer(base);` + `@import "tailwindcss/utilities.css" layer(utilities);` + `@config` |

---

## Open Questions Remaining After Blocker Research

1. **B1 edge case**: Does `slide-in-from-top-dialog-offset` resolve correctly when `dialog-offset` is a custom `translate` value loaded via `@config`? Requires a single test case.

2. **B3 theme layer**: Should `tailwindcss/theme.css` be included for the full CSS bundle build (which uses `tailwind-reference.html` containing default color classes like `bg-gray-100`)?

3. **SCSS `@import` ordering**: When Sass `@use` and CSS `@import` are mixed in the same file, does the output maintain correct ordering for PostCSS processing? Sass should pass CSS `@import` through, but the interaction with `@use` ordering needs verification.

## Sources

1. [tw-animate-css GitHub repository](https://github.com/Wombosvideo/tw-animate-css) — drop-in replacement for tailwindcss-animate, confirmed class name parity
2. [tailwindcss-animate GitHub repository](https://github.com/jamiebuilds/tailwindcss-animate) — original plugin, utility class reference
3. [shadcn/ui Tailwind v4 documentation](https://ui.shadcn.com/docs/tailwind-v4) — official v4 migration pattern, confirms tw-animate-css as replacement
4. [Tailwind CSS v4 Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) — `@layer base` with `@apply` pattern confirmed valid in v4
5. [GitHub Discussion #17082](https://github.com/tailwindlabs/tailwindcss/discussions/17082) — `@apply` fails for custom classes in layers, but built-in utilities work
6. [GitHub Discussion #16002](https://github.com/tailwindlabs/tailwindcss/discussions/16002) — border-color and `@layer base` workarounds in v4
7. [Tailwind CSS v4 Preflight docs](https://tailwindcss.com/docs/preflight) — modular import syntax for individual layers
8. [Tailwind CSS v4 Theme docs](https://tailwindcss.com/docs/theme) — theme layer import and `@theme inline` directive
9. [Tailwind CSS v4 Functions and Directives](https://tailwindcss.com/docs/functions-and-directives) — `@config`, `@source`, `@import` directive reference
10. [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — comprehensive migration reference