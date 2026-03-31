---
type: DESIGN
title: Tailwind CSS v4 Migration — Architecture
date: 2026-03-30
status: complete
---

# Tailwind CSS v4 Migration — Architecture

## Hard Constraint

**Option A — Strict pixel-identical output.** After migration, all 320 visual regression snapshots must pass against the existing v3 baselines with 0% diff (within the 3% threshold already set). Every Tailwind v4 rendering change must be compensated so the visual output is identical to v3.

---

## 1. Package Changes (Exact Versions)

### Install (new or upgraded)

| Package | Version | Where | Type |
|---------|---------|-------|------|
| `tailwindcss` | `^4.2.2` | `packages/ui`, `packages/demo` | devDependency |
| `@tailwindcss/postcss` | `^4.2.2` | `packages/ui`, `packages/demo` | devDependency |
| `@tailwindcss/cli` | `^4.2.2` | `packages/ui` only | devDependency |
| `tw-animate-css` | `^1.4.0` | `packages/ui` | dependency (runtime — imported in CSS) |

### Remove

| Package | Where |
|---------|-------|
| `tailwindcss-animate` | `packages/ui` (dependency + devDependency + peerDependency + peerDependenciesMeta), `packages/demo` (devDependency) |
| `autoprefixer` | `packages/ui`, `packages/demo` (devDependency) |

### Why these choices

- **`@tailwindcss/postcss`** — required because the project uses SCSS. `@tailwindcss/vite` is incompatible with SCSS.
- **`@tailwindcss/cli`** — required for `build-full-css.ts` script which invokes the CLI directly.
- **`tw-animate-css`** — the shadcn/ui official v4 replacement for `tailwindcss-animate`. Class names are intentionally 1:1 compatible. Confidence: HIGH.
- **`autoprefixer` removed** — v4 handles vendor prefixing internally.

### `peerDependencies` and `peerDependenciesMeta` changes

`packages/ui/package.json` currently declares `tailwindcss-animate: ^1.0.7` as an optional peerDependency (line 69) with a corresponding `peerDependenciesMeta` entry (line 78-80). These must be updated:

| Field | Current | New |
|-------|---------|-----|
| `peerDependencies.tailwindcss-animate` | `"^1.0.7"` | **Remove** |
| `peerDependencies.tw-animate-css` | *(none)* | **Add** `"^1.4.0"` |
| `peerDependenciesMeta.tailwindcss-animate` | `{ "optional": true }` | **Remove** |
| `peerDependenciesMeta.tw-animate-css` | *(none)* | **Add** `{ "optional": true }` |

`tw-animate-css` is added as an optional peer dependency so that v4 consumers who use the `tailwind-preset` export are prompted to install it. It is optional because pre-built CSS consumers (`./styles`, `./styles/full`) get animations baked in and do not need it installed. Preset consumers who build their own CSS must install it and add `@import "tw-animate-css"` to their CSS entry file.

### Consumer impact (breaking change)

**This is a breaking change for consumers who use `@acronis-platform/shadcn-uikit/tailwind-preset` directly.**

- **Pre-built CSS consumers** (`./styles`, `./styles/full`, etc.): No impact. Animation utilities are included in the built CSS output.
- **Preset consumers** (import `tailwind-preset` in their own Tailwind config): Animation utilities previously came from the `tailwindcss-animate` plugin in the preset's `plugins` array. After migration, the preset has no plugins. These consumers must:
  1. Remove `tailwindcss-animate` from their dependencies
  2. Install `tw-animate-css`
  3. Add `@import "tw-animate-css"` to their CSS entry file
  4. If on Tailwind v4: add `@config` directive pointing to their config that uses the preset

**Documentation update needed**: `packages/docs/GETTING_STARTED.md` references `tailwindcss-animate` at lines 89 and 227. The tech-writer must update these references to document the v4 consumer setup with `tw-animate-css`. This is out of scope for the migration implementation but must be tracked.

### `package.json` files that change

1. `packages/ui/package.json` — all of the above, plus remove `tailwindcss-animate` from `peerDependencies` and `peerDependenciesMeta`
2. `packages/demo/package.json` — `tailwindcss` upgrade, add `@tailwindcss/postcss`, remove `autoprefixer` and `tailwindcss-animate`

---

## 2. PostCSS Config Changes

### `packages/ui/postcss.config.js` — new content

```js
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [tailwindcss],
}
```

### `packages/demo/postcss.config.js` — new content

```js
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [tailwindcss],
}
```

### Changes from v3

- Switch from object-key shorthand (`tailwindcss: {}`) to explicit import of `@tailwindcss/postcss`
- Switch from object syntax to array syntax for plugins
- Remove `autoprefixer` — v4 handles prefixing internally

---

## 3. SCSS Entry File Changes (File-by-File)

All files must add a `@config` directive to load the JS config (v4 does not auto-detect it). The `@tailwind` directives are replaced with v4 CSS imports.

**Important**: The theme layer (`tailwindcss/theme.css`) is deliberately omitted from all entry files except `full.scss`. This project defines its own design tokens via CSS custom properties in `_globals.scss` and does not use Tailwind's default color palette (slate, blue, etc.) in components. Including the default theme would add ~10KB of unused CSS variables and risk subtle color conflicts.

### 3.1 `packages/ui/src/styles/index.scss`

```scss
@use './tokens';

// @use './variables'; // Commented out - conflicts with new semantic tokens
@use './base';
@use './mixins';

// @use './globals'; // Commented out - conflicts with new semantic tokens

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";
```

### 3.2 `packages/ui/src/styles/full.scss`

```scss
@use './tokens';
@use './base';
@use './globals';

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.full.js";
```

Note: `full.scss` includes `tailwindcss/theme.css` because `tailwind-reference.html` references default Tailwind colors (`bg-gray-100`, `dark:bg-gray-900`) that require the default theme to generate.

### 3.3 `packages/ui/src/styles/base-only.scss`

```scss
@use './tokens';
@use './base';

@import "tailwindcss/preflight.css" layer(base);

@config "../../tailwind.config.js";
```

### 3.4 `packages/ui/src/styles/components-only.scss`

In v4, the `components` layer is empty — there are no built-in component classes. This file currently imports all three layers despite its name. The v4 equivalent preserves the same behavior (base + utilities, no built-in components):

```scss
@use './globals';

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";
```

### 3.5 `packages/ui/src/styles/utilities-only.scss`

```scss
@import "tailwindcss/utilities.css" layer(utilities);

@config "../../tailwind.config.js";
```

### 3.6 `packages/demo/src/styles/index.scss`

```scss
/**
 * Demo App Styles Entry Point
 *
 * This file imports the library's token system and adds Tailwind directives
 * for processing demo-app specific styles in development mode.
 */

/* Import library's design tokens */
@use '../../../ui/src/styles/tokens';
@use '../../../ui/src/styles/themes';

/* Tailwind v4 imports */
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";

/* Demo-app specific styles can be added here */
body {
  @apply bg-background text-foreground font-sans text-base;
  letter-spacing: var(--av-letter-spacing-base, 0);
}
```

Note: The current demo `index.scss` does not contain an `html, body, #root { height: 100%; ... }` block. The v4 migration preserves the existing file content exactly, only replacing the `@tailwind` directives and adding `@config` + `tw-animate-css`.

---

## 4. Rendering Parity Fixes (Critical for Option A)

### 4a. Shadow Utility Rename

**Problem**: In v4, shadow utilities were renamed:
- v3 `shadow-sm` = v4 `shadow-xs`
- v3 `shadow` = v4 `shadow-sm`

Components using `shadow-sm` will render a _larger_ shadow in v4 unless renamed.

**Fix**: Rename `shadow-sm` to `shadow-xs` in these files:

| File | Line | Current | New |
|------|------|---------|-----|
| `packages/ui/src/components/ui/card.tsx` | 9 | `shadow-sm` | `shadow-xs` |
| `packages/ui/src/components/ui/auth-layout.tsx` | 38 | `shadow-sm` | `shadow-xs` |
| `packages/ui/src/components/ui/select.tsx` | 20 | `shadow-sm` | `shadow-xs` |

**Bare `shadow` → `shadow-sm` rename**: In v4, bare `shadow` maps to v3's `shadow-md` equivalent (a larger shadow). Three occurrences of bare `shadow` exist in UI component files and must be renamed to `shadow-sm`:

| File | Line | Current | New |
|------|------|---------|-----|
| `packages/ui/src/components/ui/slider.tsx` | 36 | `shadow` | `shadow-sm` |
| `packages/ui/src/components/ui/sidebar.tsx` | 249 | `group-data-[variant=floating]:shadow` | `group-data-[variant=floating]:shadow-sm` |
| `packages/ui/src/components/ui/sidebar.tsx` | 321 | `md:peer-data-[variant=inset]:shadow` | `md:peer-data-[variant=inset]:shadow-sm` |

**Demo package**: `shadow-sm` appears in 5 demo files (`CardPlayground.tsx`, `TablePlayground.tsx`, `ChatContainer.tsx`, `LoginPage.tsx`, `CyberChatHostDemo.tsx`). These must also be renamed to `shadow-xs` for visual parity in the demo app, though they do not affect the visual regression snapshots (those test Storybook stories from `packages/ui`).

**`tailwind-reference.html`**: Line 35 contains `shadow shadow-sm shadow-md shadow-lg shadow-xl shadow-2xl shadow-inner shadow-none`. Update to `shadow-sm shadow-xs shadow-md shadow-lg shadow-xl shadow-2xl shadow-inner shadow-none` (rename `shadow` → `shadow-sm` and `shadow-sm` → `shadow-xs`).

**`shadow-xs` already used**: `button-group.tsx` and `calendar.tsx` already use `shadow-xs`. In v3, this resolves via the default scale. In v4, `shadow-xs` is the new name for v3's `shadow-sm`. These two files need **no change** — they will render identically.

### 4b. Default Border Color

**Problem**: v4 defaults border color to `currentColor` instead of v3's `gray-200`.

**Mitigation**: `packages/ui/src/styles/_base.scss` applies `* { @apply border-border; }` which sets the border color on all elements to the design token. This covers all components.

**Risk**: Dynamically injected elements or portal-based elements outside the styled tree. However, all UI components render within the Storybook root where the base styles apply.

**Action**: No change needed. The existing base rule provides full coverage. Confidence: HIGH.

### 4c. `tailwindcss-animate` to `tw-animate-css`

**Problem**: `tailwindcss-animate` v1.x uses the v3 plugin API and is incompatible with v4.

**Solution**: Replace with `tw-animate-css` which is a pure CSS import (no JS plugin).

**Integration point**: Import `tw-animate-css` in each SCSS entry file that needs animation utilities:

```scss
@import "tw-animate-css";
```

This must be added to:
- `packages/ui/src/styles/index.scss`
- `packages/ui/src/styles/full.scss`
- `packages/ui/src/styles/components-only.scss`
- `packages/demo/src/styles/index.scss`

Not needed in `base-only.scss` or `utilities-only.scss` (no animation classes used in those contexts).

**Import ordering analysis** (verified by inspecting `tw-animate-css@1.4.0` source):

`tw-animate-css` is NOT plain CSS. It uses Tailwind v4 native directives:
- `@property` declarations for CSS custom properties
- `@theme inline { ... }` to register theme values (animation delays, percentages, keyframes)
- `@utility` directives to register utility classes (fade-in, slide-in-from-top, etc.)

These directives are processed by `@tailwindcss/postcss` as part of the Tailwind compilation pass. The `@theme inline` block merges with the existing theme (from `@config`), and `@utility` directives register utilities alongside Tailwind's built-in utilities layer.

**`@config` vs `@import "tw-animate-css"` ordering**: `@tailwindcss/postcss` collects all directives (`@config`, `@theme`, `@utility`, `@import`) from the entire file before processing. Directive order does not affect resolution — `@config` does not need to appear before or after `tw-animate-css`. However, for readability and to match the logical processing order, the recommended placement is:

```scss
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";
```

This places the CSS framework imports together, followed by the config directive. The `@config` is last because it is a metadata directive (telling Tailwind where to find config), not a content import.

**Layer participation**: `tw-animate-css` does NOT use `@layer`. Its `@utility` directives are automatically placed in Tailwind's utilities layer by the v4 engine (all `@utility`-registered classes participate in the utilities layer). Its `@theme inline` values merge into the theme layer. This means `tw-animate-css` utilities have the same specificity ordering as built-in Tailwind utilities — no layer conflict.

**Custom keyframe conflict analysis**: The preset defines three custom keyframes:
- `accordion-down` — also provided by `tw-animate-css`
- `accordion-up` — also provided by `tw-animate-css`
- `indeterminate-progress` — custom, only in this project

Since the JS config is loaded via `@config`, the custom keyframe definitions in `theme.extend.keyframes` will override `tw-animate-css`'s built-in accordion keyframes. This is the desired behavior — the project's accordion animation uses `var(--accordion-panel-height)` which is component-specific. `indeterminate-progress` has no conflict.

**Action**: Keep all three custom keyframes in `tailwind.preset.js`. They coexist with and override `tw-animate-css` defaults. Confidence: HIGH.

### 4d. `darkMode` Configuration

**Problem**: v4 defaults to `.dark` class-based dark mode.

**Current config**: `darkMode: ['class']` in `tailwind.preset.js`.

**Action**: No change needed. v4's default behavior matches the project's explicit config. The `darkMode` key in the JS config is simply ignored (v4 uses `.dark` class by default). Confidence: HIGH.

### 4e. Other v4 Preflight Differences

**Ring width reset**: v4 preflight removes the `--tw-ring-offset-shadow`, `--tw-ring-shadow`, `--tw-shadow` custom properties that v3 set on `*`. This is handled by v4's new shadow/ring implementation and should not cause visual differences because the project does not rely on these intermediate variables.

**`@layer base` with `@apply`**: Verified working. The `_base.scss` pattern `@layer base { * { @apply border-border; } }` is explicitly supported in v4 for built-in utilities. Sass passes `@layer` and `@apply` through unchanged to PostCSS. Confidence: HIGH.

**CSS variable declarations in `@layer base`**: The `_globals.scss` file declares CSS custom properties (`:root { --av-background: ... }`) inside `@layer base`. The shadcn/ui v4 pattern moves these out of `@layer base` into bare `:root` blocks. However, since we are using the `@config` bridge to keep the JS config, and the CSS variables are consumed via `hsl(var(--av-*))` in the JS theme, this should not cause issues. The variables are injected into the cascade at the base layer level, which is the same layer where they are consumed.

**Action**: No change to `_globals.scss` for this migration. If visual regressions appear in dark mode or theme switching, investigate moving variables out of `@layer base` as a follow-up. Confidence: MEDIUM.

---

## 5. `tailwind.preset.js` Changes

### Remove `tailwindcss-animate` import and plugin

```js
// REMOVE this line:
// import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      // ... all existing theme extensions stay unchanged ...
    },
  },
  // REMOVE plugins array:
  // plugins: [tailwindcssAnimate],
};
```

### What stays unchanged

- All `theme.extend` entries (colors, container, fontFamily, fontSize, borderRadius, keyframes, animation, translate)
- `darkMode: ['class']` — harmless in v4, ignored but not breaking
- The file continues to be exported as `@acronis-platform/shadcn-uikit/tailwind-preset` for consumer use

### No other changes needed

The preset is loaded via `@config` in the JS config chain (`tailwind.config.js` imports the preset). The v4 `@config` bridge supports `presets`, `theme.extend`, and all config keys used here.

---

## 6. `tailwind.config.js` and `tailwind.config.full.js`

### Keep via `@config` bridge

Both files are preserved as-is and loaded via `@config` directives in the SCSS entry files.

### `@config` directive paths

| SCSS File | `@config` Path |
|-----------|----------------|
| `packages/ui/src/styles/index.scss` | `@config "../../tailwind.config.js";` |
| `packages/ui/src/styles/full.scss` | `@config "../../tailwind.config.full.js";` |
| `packages/ui/src/styles/base-only.scss` | `@config "../../tailwind.config.js";` |
| `packages/ui/src/styles/components-only.scss` | `@config "../../tailwind.config.js";` |
| `packages/ui/src/styles/utilities-only.scss` | `@config "../../tailwind.config.js";` |
| `packages/demo/src/styles/index.scss` | `@config "../../tailwind.config.js";` |

Note: The demo `@config` path resolves to `packages/demo/tailwind.config.js` which in turn imports `../ui/tailwind.config.js` as a preset.

### Changes to JS configs themselves

**`tailwind.config.js`** — No changes.

**`tailwind.config.full.js`** — No changes. The `content: ['./src/styles/tailwind-reference.html']` is still respected via `@config` in v4.

---

## 7. `build-full-css.ts` Script Changes

### Current (v3)

```ts
execSync(
  `pnpm exec tailwindcss -c ${configPath} -i ${inputPath} -o ${outputPath} --minify`,
  { stdio: 'inherit' }
);
```

### New (v4)

```ts
execSync(
  `pnpm exec @tailwindcss/cli -i ${inputPath} -o ${outputPath} --minify`,
  { stdio: 'inherit' }
);
```

### Changes

1. **Command**: `tailwindcss` → `@tailwindcss/cli` (the v4 CLI is a separate package)
2. **Remove `-c ${configPath}`**: The config is now loaded via `@config "../../tailwind.config.full.js"` directive inside `full.scss`
3. **Remove `configPath` variable**: No longer needed in the script

The `inputPath` and `outputPath` variables remain unchanged.

---

## 8. Migration Sequence

Ordered steps that keep the build working at each stage. Each step is atomic — the build should succeed after each one.

### Phase 1: Preparation (no build changes yet)

**Step 1.1** — Rename shadow utilities in component source files.

`shadow-sm` → `shadow-xs` (3 UI components + 5 demo files):
- `packages/ui/src/components/ui/card.tsx:9`: `shadow-sm` → `shadow-xs`
- `packages/ui/src/components/ui/auth-layout.tsx:38`: `shadow-sm` → `shadow-xs`
- `packages/ui/src/components/ui/select.tsx:20`: `shadow-sm` → `shadow-xs`
- `packages/demo/src/components/CardPlayground.tsx`: `shadow-sm` → `shadow-xs`
- `packages/demo/src/components/TablePlayground.tsx`: `shadow-sm` → `shadow-xs`
- `packages/demo/src/components/chat/ChatContainer.tsx`: `shadow-sm` → `shadow-xs`
- `packages/demo/src/app/demo/cyberchat-flow/components/LoginPage.tsx`: `shadow-sm` → `shadow-xs`
- `packages/demo/src/app/demo/cyberchat/CyberChatHostDemo.tsx`: `shadow-sm` → `shadow-xs`

Bare `shadow` → `shadow-sm` (3 UI components):
- `packages/ui/src/components/ui/slider.tsx:36`: `shadow` → `shadow-sm`
- `packages/ui/src/components/ui/sidebar.tsx:249`: `group-data-[variant=floating]:shadow` → `group-data-[variant=floating]:shadow-sm`
- `packages/ui/src/components/ui/sidebar.tsx:321`: `md:peer-data-[variant=inset]:shadow` → `md:peer-data-[variant=inset]:shadow-sm`

`tailwind-reference.html:35`:
- `shadow shadow-sm` → `shadow-sm shadow-xs`

**Important**: Do NOT commit this step alone. `shadow-xs` does not exist in v3's default scale — the project's v3 config does not define it (though `button-group.tsx` and `calendar.tsx` already use it, suggesting a custom addition or newer v3 version). Verify that `shadow-xs` resolves in the current v3 setup before proceeding. If it does not, this step must be bundled with Step 2 (the v4 package swap) as a single atomic change.

### Phase 2: Package swap (atomic — must complete all sub-steps together)

**Step 2.1** — Update `packages/ui/package.json`:
- Change `tailwindcss` from `^3.4.1` to `^4.2.2`
- Add `@tailwindcss/postcss: ^4.2.2`
- Add `@tailwindcss/cli: ^4.2.2`
- Add `tw-animate-css: ^1.4.0` (as dependency, not devDependency — it is imported in CSS)
- Remove `tailwindcss-animate` from `dependencies`, `devDependencies`, `peerDependencies`, and `peerDependenciesMeta`
- Add `tw-animate-css: ^1.4.0` to `peerDependencies` and add `{ "optional": true }` to `peerDependenciesMeta`
- Remove `autoprefixer`

**Step 2.2** — Update `packages/demo/package.json`:
- Change `tailwindcss` from `^3.4.1` to `^4.2.2`
- Add `@tailwindcss/postcss: ^4.2.2`
- Remove `tailwindcss-animate`
- Remove `autoprefixer`

**Step 2.3** — Update PostCSS configs:
- `packages/ui/postcss.config.js` → new content (Section 2)
- `packages/demo/postcss.config.js` → new content (Section 2)

**Step 2.4** — Update `tailwind.preset.js`:
- Remove `tailwindcss-animate` import
- Remove `plugins` array

**Step 2.5** — Update all 6 SCSS entry files:
- Replace `@tailwind` directives with `@import` directives (Section 3)
- Add `@config` directives
- Add `@import "tw-animate-css"` where needed

**Step 2.6** — Update `build-full-css.ts`:
- Change CLI command (Section 7)

**Step 2.7** — Run `pnpm install` to update lockfile.

### Phase 3: Verification

**Step 3.1** — Run `pnpm build` in `packages/ui` to verify the library builds.

**Step 3.2** — Run `pnpm dev` in `packages/demo` to verify the dev server starts.

**Step 3.2a** — **Dialog-offset translate verification** (targeted check before full regression). After the build succeeds, verify that `slide-in-from-top-dialog-offset` resolves to a concrete CSS value. Run:
```bash
# Inspect the built CSS for the dialog-offset translate value
grep -o 'slide-in-from-top-dialog-offset[^}]*' packages/ui/dist/shadcn-uikit.css
# Expected: a rule setting --tw-enter-translate-y to -48% (or calc(...*-1) of 48%)
# If the class is missing from the output, the custom translate did not resolve.
```
If the class is absent, apply the fallback: replace `slide-in-from-top-dialog-offset` with `slide-in-from-top-[48%]` and `slide-out-to-top-dialog-offset` with `slide-out-to-top-[48%]` in `dialog.tsx` and `alert-dialog.tsx`, then rebuild.

**Step 3.2b** — **CSS variable layer verification** (priority check for R4). Open Storybook and confirm that components have their correct design token colors (not black text on white, not `currentColor` borders). Specifically check:
- A Card component (uses `bg-card`, `text-card-foreground`, `border`)
- A Button component (uses `bg-primary`, `text-primary-foreground`)
- Dark mode toggle (CSS variables switch correctly)

If colors are wrong, the `_globals.scss` `@layer base` variable declarations need to be moved out of the layer (see R4 recovery).

**Step 3.3** — Visual spot-check: open Storybook, verify components render correctly.

**Step 3.4** — Run full visual regression suite (see Section 10).

### Phase 4: Snapshot update (only if Phase 3 passes)

**Step 4.1** — If all 320 snapshots pass within 3% threshold, migration is complete.

**Step 4.2** — If any snapshots fail, investigate the diff images, identify the rendering change, apply targeted fixes, and re-run.

---

## 9. Risk Register

### R1: SCSS + v4 PostCSS interaction

| | |
|---|---|
| **What** | `@import "tailwindcss/preflight.css"` inside SCSS files may not resolve correctly through the Sass → PostCSS pipeline |
| **Likelihood** | LOW — the previous migration attempt used this pattern and the issue was unstyled components (a different root cause) |
| **Impact** | HIGH — build failure, no CSS output |
| **Detection** | Build step fails or produces empty CSS |
| **Recovery** | Check that Sass passes `@import` with quoted URL strings through to PostCSS unchanged. If not, move Tailwind imports to a separate `.css` file imported after Sass processing |

### R2: `tw-animate-css` parity gap

| | |
|---|---|
| **What** | `tw-animate-css` may not produce pixel-identical animation CSS compared to `tailwindcss-animate` |
| **Likelihood** | LOW — class names are intentionally compatible, and shadcn/ui officially uses it |
| **Impact** | MEDIUM — animation duration/easing could differ, causing snapshot diffs on components mid-animation |
| **Detection** | Visual regression tests on tooltip, popover, dialog, sheet, navigation-menu, dropdown-menu, select, alert-dialog |
| **Recovery** | Override specific animation properties in `tailwind.preset.js` keyframes/animation config |

### R3: Custom `dialog-offset` translate value

| | |
|---|---|
| **What** | `slide-in-from-top-dialog-offset` uses a custom `translate: { 'dialog-offset': '48%' }` value from the JS config |
| **Likelihood** | LOW — verified by inspecting `tw-animate-css@1.4.0` source: `slide-in-from-top-*` resolves via `--value(--translate-*,[percentage],[length])`, which reads from the `--translate-*` theme namespace. The `@config` bridge converts `theme.extend.translate.dialog-offset: '48%'` into `--translate-dialog-offset: 48%` in the theme layer, which `tw-animate-css`'s `@utility slide-in-from-top-*` will resolve correctly |
| **Impact** | HIGH — dialog/sheet animations would break if resolution fails |
| **Detection** | **Step 3.2a** in Phase 3 (see below) — targeted CSS output inspection for `slide-in-from-top-dialog-offset` |
| **Recovery** | If resolution fails despite analysis: convert to arbitrary value syntax `slide-in-from-top-[48%]` and `slide-out-to-top-[48%]` in `dialog.tsx` and `alert-dialog.tsx` |

### R4: `@layer base` variable hoisting

| | |
|---|---|
| **What** | v4 may handle CSS custom properties inside `@layer base` differently, affecting theme variable resolution |
| **Likelihood** | LOW — the `@config` bridge preserves v3 behavior for theme consumption |
| **Impact** | HIGH — all components would lose their design token colors |
| **Detection** | Immediate visual check — components would be unstyled or wrong colors |
| **Recovery** | Move CSS variable declarations from `@layer base` in `_globals.scss` to bare `:root` blocks (following shadcn/ui v4 pattern) |

### R5: Full CSS bundle generation

| | |
|---|---|
| **What** | `@tailwindcss/cli` + `tailwind.config.full.js` may not generate the same set of utilities as v3 CLI, since v4 auto-detection may interfere with explicit `content` scanning |
| **Likelihood** | MEDIUM — v4's content detection behavior differs from v3 |
| **Impact** | LOW — the full bundle is a convenience export, not used by visual regression tests |
| **Detection** | Compare file size and class count of `dist/shadcn-uikit-full.css` before and after migration |
| **Recovery** | Add `@source` directives in `full.scss` to explicitly include `tailwind-reference.html` |

### R6: `shadow-xs` not resolving in v3 during transition

| | |
|---|---|
| **What** | If shadow renames (Step 1.1) are committed before the v4 package swap (Step 2), `shadow-xs` may not resolve in v3 |
| **Likelihood** | MEDIUM — `shadow-xs` is used in existing components (`button-group.tsx`, `calendar.tsx`) which suggests it may be defined in the current config or v3 version |
| **Impact** | MEDIUM — shadows disappear on affected components |
| **Detection** | Build or dev server shows missing utility warning |
| **Recovery** | Bundle Steps 1.1 and 2.x into a single atomic commit |

### R7: Consumer breakage — animation utilities missing from preset

| | |
|---|---|
| **What** | v3 consumers who import `@acronis-platform/shadcn-uikit/tailwind-preset` currently get animation utilities via the `tailwindcss-animate` plugin in the preset's `plugins` array. After migration, the preset has no plugins — animation utilities silently vanish with no build error. Components using `animate-in`, `fade-in-0`, `slide-in-from-*`, etc. will lose their animations |
| **Likelihood** | HIGH — any preset consumer who does not read the migration guide will hit this |
| **Impact** | MEDIUM — animations break but layout/functionality is unaffected. The optional `tw-animate-css` peerDependency will generate an npm warning to prompt consumers |
| **Detection** | npm/pnpm peer dependency warning at install time; visual inspection of animations at runtime |
| **Recovery** | Consumer installs `tw-animate-css` and adds `@import "tw-animate-css"` to their CSS entry file. `GETTING_STARTED.md` must document this migration path (tech-writer responsibility) |

---

## 10. Verification Plan

### Pass/Fail Criteria

**PASS**: All 320 visual regression snapshots match existing v3 baselines within the 3% pixel difference threshold (0.03 `failureThreshold` in jest-image-snapshot config).

**FAIL**: Any snapshot exceeds 3% diff, OR the build fails, OR the Storybook dev server crashes.

### Verification Steps

**Step V1 — Build verification**:
```bash
cd packages/ui && pnpm build
```
Must complete without errors. Check that `dist/shadcn-uikit.css`, `dist/shadcn-uikit-full.css`, and all modular CSS outputs exist.

**Step V2 — Storybook boot**:
```bash
cd packages/ui && pnpm storybook
```
Storybook must start without errors and render the component index.

**Step V3 — Visual regression (Docker, deterministic)**:
```bash
pnpm storybook:test:visual:docker
```
This runs Playwright in Docker for deterministic cross-platform rendering. All 320 tests must pass.

**Step V4 — Diff inspection (if any failures)**:
Failed snapshots produce diff images in `packages/ui/test/__diff_output__/`. For each failure:
1. Open the diff image
2. Identify the pixel difference source (shadow change, border color, animation state, font rendering, spacing)
3. Determine if it is a v4 behavioral change that needs compensation
4. Apply fix and re-run

**Step V5 — Full CSS bundle comparison**:
```bash
# Before migration (on main branch)
wc -c packages/ui/dist/shadcn-uikit-full.css

# After migration
wc -c packages/ui/dist/shadcn-uikit-full.css
```
File sizes should be comparable (within 20%). Large divergence indicates missing or extra utilities.

**Step V6 — Demo app smoke test**:
```bash
cd packages/demo && pnpm dev
```
Open the demo app, navigate through key pages, verify no broken layouts or missing styles.

### What constitutes completion

1. `pnpm build` succeeds in `packages/ui`
2. All 320 visual regression snapshots pass (Docker run)
3. No new TypeScript or ESLint errors
4. Demo app renders correctly in dev mode
5. `dist/shadcn-uikit-full.css` contains expected utility classes

---

## Appendix: Complete SCSS Files (Canonical Reference)

Section 3 shows the complete file contents. This appendix duplicates them for quick reference during implementation:

### `packages/ui/src/styles/index.scss` (complete)

```scss
@use './tokens';

// @use './variables'; // Commented out - conflicts with new semantic tokens
@use './base';
@use './mixins';

// @use './globals'; // Commented out - conflicts with new semantic tokens

@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";
```

### `packages/ui/src/styles/full.scss` (complete)

```scss
@use './tokens';
@use './base';
@use './globals';

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.full.js";
```

### `packages/demo/src/styles/index.scss` (complete)

```scss
/**
 * Demo App Styles Entry Point
 *
 * This file imports the library's token system and adds Tailwind directives
 * for processing demo-app specific styles in development mode.
 */

/* Import library's design tokens */
@use '../../../ui/src/styles/tokens';
@use '../../../ui/src/styles/themes';

/* Tailwind v4 imports */
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";

@config "../../tailwind.config.js";

/* Demo-app specific styles can be added here */
body {
  @apply bg-background text-foreground font-sans text-base;
  letter-spacing: var(--av-letter-spacing-base, 0);
}
```