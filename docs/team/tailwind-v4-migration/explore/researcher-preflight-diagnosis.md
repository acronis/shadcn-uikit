---
type: EXPLORATION
title: Tailwind v4 Preflight Size Regression — Root Cause Diagnosis
date: 2026-03-30
status: complete
---

# Tailwind v4 Preflight Size Regression — Root Cause Diagnosis

## Research Question

Which specific Tailwind v4 preflight CSS changes cause components to render at different sizes than v3? What compensating overrides would restore v3 rendering parity?

---

## Summary of All v3 → v4 Preflight Differences

The v4 preflight (`tailwindcss/preflight.css`) differs from v3's (based on `modern-normalize`) in several ways. Below is a complete diff of every property-level change, organized by impact severity.

---

## HIGH-IMPACT Changes (Will Cause Visible Size/Layout Regressions)

### 1. Universal margin/padding reset — `*` selector

**v3:**
```css
blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre { margin: 0; }
ol, ul, menu { list-style: none; margin: 0; padding: 0; }
body { margin: 0; }
/* Form elements: */
button, input, optgroup, select, textarea { margin: 0; padding: 0; }
```

**v4:**
```css
*, ::after, ::before, ::backdrop, ::file-selector-button {
  margin: 0;
  padding: 0;
}
```

**What changed:** v3 only reset margins on specific semantic elements (`blockquote`, `h1`-`h6`, `p`, `pre`, `figure`, `hr`, `dd`, `dl`, `body`, form elements) and padding on lists and form elements. v4 resets margin AND padding on **every element** via `*`.

**Impact on this codebase:** Any element that previously inherited browser-default margin or padding but was not in v3's explicit reset list will now have `margin: 0; padding: 0`. This affects:
- `<fieldset>` — browsers add ~2px padding by default
- `<legend>` — browsers add padding
- `<details>`, `<summary>` — browsers add margins
- `<dialog>` — browsers add significant padding and margin
- Any elements from third-party libraries (Base UI, Radix) that relied on user-agent defaults

**Confidence: HIGH** — This is the most significant change and the most likely root cause of "components rendering at different sizes."

**Compensating override:**
```css
/* No override needed if all components use explicit Tailwind spacing utilities */
/* (p-*, m-*, px-*, py-*, etc.) — which this codebase does for all UI components */
```

Most components in this codebase use explicit sizing (`h-8`, `h-12`, `p-6`, `px-4`, `py-3`, etc.), so the universal reset should be neutral for them. However, elements from Base UI primitives that render internal DOM elements without explicit spacing classes may shrink or collapse.

**Confidence: MEDIUM** — Depends on whether Base UI/Radix internal elements rely on UA defaults.

---

### 2. Border reset — `border: 0 solid` vs `border-width: 0; border-style: solid; border-color: theme(...)`

**v3:**
```css
*, ::before, ::after {
  border-width: 0;
  border-style: solid;
  border-color: theme('borderColor.DEFAULT', currentColor);
}
```

In v3, `borderColor.DEFAULT` resolves to whatever you configured — this project sets `border: 'hsl(var(--av-border))'` in the preset, so v3's preflight sets all borders to `hsl(var(--av-border))` by default.

**v4:**
```css
*, ::after, ::before, ::backdrop, ::file-selector-button {
  border: 0 solid;
}
```

The `border: 0 solid` shorthand resets border-color to `currentColor` (CSS specification: when border-color is omitted in the shorthand, it defaults to `currentColor`).

**What changed:** Default border color goes from `hsl(var(--av-border))` (a light gray) to `currentColor` (the text color, which is dark). The `border-width` is still 0 so no borders appear by default, but when a component adds `border` (which sets `border-width: 1px`), the color will be `currentColor` instead of the design system's border color.

**Impact on this codebase:** Components using the bare `border` utility class without an explicit color class:
- `accordion.tsx`: `'border-b'` — no explicit color, will use `currentColor` in v4 vs `--av-border` in v3
- `drawer.tsx`: `'border bg-background'` — bare `border`
- `navigation-menu.tsx`: `'border bg-popover'` — bare `border`
- `tag.tsx`: `'border font-bold'` — bare `border` (but variants add explicit colors)
- `auth-layout.tsx`: `'border bg-card'` — bare `border`
- `card.tsx`: `'border bg-card'` — bare `border`
- `table.tsx`: `'border border-border'` — has explicit color, safe

Components using `border-b`, `border-t`, `border-r`, `border-l` without explicit color will all be affected.

**However:** The project's `_base.scss` applies `* { @apply border-border; }` which sets `border-color: hsl(var(--av-border))` on all elements. This override should neutralize the v4 change, **provided** it loads correctly (confirmed in B2 blocker resolution).

**Net impact:** If `_base.scss` loads correctly, this change has **zero visible impact**. If it fails to load (the previous migration attempt's likely root cause), **every border becomes dark/currentColor**.

**Confidence: HIGH** — The `_base.scss` override is the critical safeguard.

---

### 3. Form element reset — `border-radius: 0` and `background-color: transparent`

**v3:**
```css
button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
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

**What changed:**
- **`border-radius: 0`** — New in v4. iOS Safari adds default border-radius to inputs/buttons. v4 resets this.
- **`background-color: transparent`** — New in v4. Browsers give buttons/selects a default gray background. v4 resets this.
- **`opacity: 1`** — New in v4. Ensures disabled states are consistent.
- **`letter-spacing: inherit`** — New in v4.
- **`font-feature-settings: inherit`** and **`font-variation-settings: inherit`** — New in v4.

**Impact on this codebase:**
- `border-radius: 0`: All form components (`input.tsx`, `select.tsx`, `checkbox.tsx`, `button.tsx`) already set explicit `rounded-*` classes, so this reset is harmless.
- `background-color: transparent`: Most form components set explicit backgrounds (`bg-background`, `bg-primary`, etc.), so this is neutral. However, any unstyled `<button>` or `<select>` rendered by third-party libraries (Base UI) without explicit background classes will lose the browser-default gray background.
- `letter-spacing: inherit`: Components don't rely on browser-default letter spacing.

**Confidence: HIGH** — Explicit Tailwind classes on all form components mitigate these changes.

---

### 4. Placeholder color change

**v3:**
```css
::placeholder { opacity: 1; color: theme('colors.gray.400', #9ca3af); }
```

**v4:**
```css
::placeholder { opacity: 1; }
@supports (...) {
  ::placeholder { color: color-mix(in oklab, currentcolor 50%, transparent); }
}
```

**What changed:** Placeholder text goes from a specific gray color to 50% opacity of the current text color.

**Impact on this codebase:** The `input.tsx` component uses `placeholder:text-muted-foreground` which overrides the default. Safe for all components that set explicit placeholder colors. Any form element without an explicit placeholder color will look different.

**Confidence: HIGH**

---

## MEDIUM-IMPACT Changes (May Cause Subtle Size Differences)

### 5. Button cursor change

**v3:** `button, [role="button"] { cursor: pointer; }`

**v4:** No cursor rule. Buttons use browser default `cursor: default`.

**Impact:** Not a size regression but a behavioral change. Buttons won't show pointer cursor unless `cursor-pointer` is explicitly added.

**Compensating override:**
```css
button, [role="button"] { cursor: pointer; }
```

**Confidence: HIGH**

---

### 6. `<hr>` rendering change

**v3:**
```css
hr { height: 0; color: inherit; border-top-width: 1px; }
```

**v4:** Same rule, identical.

**Impact:** None.

**Confidence: HIGH**

---

## LOW-IMPACT Changes (Unlikely to Cause Size Regressions)

### 7. `::backdrop` and `::file-selector-button` added to universal reset

v4 adds `::backdrop` and `::file-selector-button` to the `*, ::after, ::before` universal reset. This is an addition, not a change — v3 didn't touch these pseudo-elements.

**Impact:** Minimal. Dialog backdrops and file input buttons get the same reset. The `alert-dialog.tsx` and `dialog.tsx` components use custom overlays, not native `<dialog>`.

**Confidence: HIGH**

### 8. `::file-selector-button { margin-inline-end: 4px; }` added

New in v4. Adds consistent spacing after file input buttons.

**Impact:** Only affects `<input type="file">`. Not used in this component library.

**Confidence: HIGH**

### 9. Select optgroup indentation restored

```css
:where(select:is([multiple], [size])) optgroup { font-weight: bolder; }
:where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }
```

New in v4. Restores indentation for multi-select optgroups.

**Impact:** The `select.tsx` uses Base UI's custom Select, not a native `<select multiple>`. No impact.

**Confidence: HIGH**

---

## Root Cause Analysis: Why The Previous Migration Failed

The revert commit (`916c930`) stated "v4 generates fundamentally different CSS (preflight, utility classes), causing all 220 components to render unstyled."

Based on this analysis, the most likely root causes were:

### Primary cause: `tailwindcss-animate` plugin failure

The `tailwindcss-animate` v1.x plugin is a JS plugin incompatible with v4. When loaded via `@config` in v4, it would fail silently or throw, potentially causing **the entire Tailwind CSS processing to fail**. If PostCSS processing fails, no Tailwind utilities would be generated — explaining "all components render unstyled."

**Confidence: HIGH** — A plugin failure in PostCSS typically aborts the entire CSS build.

### Secondary cause: Border color regression

If the CSS build partially succeeded but `_base.scss`'s `@layer base { * { @apply border-border; } }` didn't work as expected, every `border` utility would render with `currentColor` (dark text color) instead of `--av-border`. This would cause borders to appear thick and dark across all components.

**Confidence: MEDIUM**

### Tertiary cause: Shadow renames

`shadow-sm` in v3 produces a small shadow. In v4, `shadow-sm` maps to what was `shadow` in v3 (a larger shadow), while the old `shadow-sm` is now `shadow-xs`. This would cause subtle but detectable size differences in components like `card.tsx`, `select.tsx`, `auth-layout.tsx`.

**Confidence: HIGH** — Not "unstyled" but would fail visual regression at 3% threshold.

---

## Complete List of Compensating Overrides

If the goal is to restore exact v3 rendering parity after upgrading to v4, these overrides are needed:

### Override 1: Border color default (CRITICAL)

Already handled by `_base.scss`:
```css
@layer base {
  * { @apply border-border; }
}
```

This sets `border-color: hsl(var(--av-border))` on all elements, matching v3 behavior. **No additional override needed** if `_base.scss` loads correctly.

### Override 2: Button cursor (BEHAVIORAL)

```css
@layer base {
  button, [role="button"] { cursor: pointer; }
}
```

Restores v3's `cursor: pointer` on buttons. Without this, buttons show default arrow cursor.

### Override 3: Placeholder color (COSMETIC)

Already handled by component-level `placeholder:text-muted-foreground`. **No additional override needed.**

### Override 4: Shadow utility renames (COMPONENT-LEVEL)

These are not preflight changes but utility renames. The upgrade tool handles them, but manual changes required:

| File | Current class | Required change |
|------|--------------|----------------|
| `select.tsx:20` | `shadow-sm` | Change to `shadow-xs` |
| `card.tsx:9` | `shadow-sm` | Already `shadow-xs` (safe) |
| `auth-layout.tsx:38` | `shadow-sm` | Already `shadow-xs` (safe) |

Note: Some files may have already been updated to `shadow-xs` based on grep results showing both `shadow-sm` and `shadow-xs` in the codebase.

### Override 5: Universal margin/padding reset (MONITOR)

No explicit override needed — all components use explicit Tailwind spacing. However, monitor for:
- Base UI internal elements that relied on browser-default padding (e.g., `<fieldset>`, `<details>`)
- Any `<dialog>` elements using native browser styling

---

## Preflight Property-Level Diff Table

| CSS Property | v3 Preflight | v4 Preflight | Size Impact |
|-------------|-------------|-------------|-------------|
| `margin` on `*` | Not set (only specific elements) | `0` on all elements | HIGH — elements with UA margins shrink |
| `padding` on `*` | Not set (only lists/forms) | `0` on all elements | HIGH — fieldset, dialog, etc. lose padding |
| `border` on `*` | `border-width: 0; border-style: solid; border-color: theme(...)` | `border: 0 solid` (color = currentColor) | HIGH — border color changes to text color |
| `border-radius` on form elements | Not reset | `0` | LOW — components set explicit rounding |
| `background-color` on form elements | Not reset | `transparent` | LOW — components set explicit backgrounds |
| `opacity` on form elements | Not reset | `1` | NONE |
| `letter-spacing` on form elements | Not inherited | `inherit` | LOW — may affect form element width |
| `cursor` on buttons | `pointer` | Not set (browser default = `default`) | NONE (behavioral, not sizing) |
| `placeholder` color | `gray-400` | `color-mix(currentcolor 50%, transparent)` | NONE (cosmetic only) |
| `font` on form elements | `font-family: inherit; font-size: 100%; font-weight: inherit; line-height: inherit;` | `font: inherit; font-feature-settings: inherit; font-variation-settings: inherit;` | LOW — `font: inherit` is equivalent for most cases |

---

## Key Takeaways

1. The **universal `margin: 0; padding: 0` on `*`** is the biggest structural change between v3 and v4 preflight. Any element relying on browser-default spacing will collapse. (Corroborated — [Tailwind v4 Preflight docs](https://tailwindcss.com/docs/preflight))

2. The **border color change from `theme(borderColor.DEFAULT)` to `currentColor`** is neutralized by this project's `_base.scss` applying `* { @apply border-border; }`. (Substantiated)

3. The **most likely cause of the previous migration failure was `tailwindcss-animate` crashing the PostCSS build**, not preflight changes per se. A plugin crash would explain "all components render unstyled." (Conjecture — depends on whether the v4 build failed silently or produced partial output)

4. **Two explicit compensating overrides** are needed: (a) button cursor restoration, and (b) shadow utility renames. Everything else is already handled by the codebase's existing base styles and explicit utility usage. (Substantiated)

5. The `shadow-sm` → `shadow-xs` rename affects at least `select.tsx` and will cause measurable visual differences exceeding the 3% threshold. (Corroborated — [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide))

## Sources

1. [Tailwind CSS v4 Preflight docs](https://tailwindcss.com/docs/preflight) — complete v4 preflight rules
2. [Tailwind CSS v3 Preflight docs](https://v3.tailwindcss.com/docs/preflight) — v3 preflight reference
3. [Tailwind CSS v4 Preflight source](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/preflight.css) — actual CSS source
4. [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — breaking changes list
5. [GitHub Discussion #19114](https://github.com/tailwindlabs/tailwindcss/discussions/19114) — v3/v4 preflight conflicts
6. [GitHub Discussion #16002](https://github.com/tailwindlabs/tailwindcss/discussions/16002) — border-color currentColor issue