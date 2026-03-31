---
phase: verify
author: qa
reviewed-by: pending
status: draft
---

# QA Verification Report

## Verdict
FAIL

The Tailwind CSS v4 migration fails the Option A hard constraint (pixel-identical output). 189 of 320 visual regression snapshots fail against the existing v3 baselines. The build, type-check, and unit tests all pass.

---

## Automated Checks

- **Build (`pnpm build` in `packages/ui`)**: PASS
  - `build:lib` completed in ~46s (3851 modules, declaration files generated)
  - `build:full-css` completed (1 CSS ordering warning, see note below)
  - `build:llms` completed
- **Type-check (`pnpm type-check`)**: PASS (no new errors)
  - 1883 errors on this branch vs 1886 on main (3 fewer -- trivial variance)
  - Pre-existing errors in `date-picker` demos and `secondary-menu.stories.tsx` confirmed
  - No new type errors introduced by the migration
- **Unit tests (`pnpm test -- --watch=false`)**: PASS
  - 41 tests passed (2 test files: `theme-switcher.spec.ts`, `button.test.tsx`)
- **Visual regression (`pnpm storybook:test:visual:docker`)**: FAIL
  - **189 failed**, 131 passed, 320 total

---

## Visual Regression Failure Pattern Analysis

### Failure Breakdown

| Failure Type | Count | Description |
|---|---|---|
| Size mismatch | 176 | Component rendered at different dimensions than baseline |
| Pixel diff (same size, >3%) | 13 | Same dimensions but pixel difference exceeds 3% threshold |
| **Total** | **189** | |

### Size Mismatch Direction (176 failures)

The dominant direction is **shrinking** -- components render smaller under v4:

| Direction | Count | Notes |
|---|---|---|
| SHORTER (height decreased) | 156 | Overwhelming majority |
| NARROWER (width decreased) | 85 | Often co-occurs with shorter |
| TALLER (height increased) | 9 | Rare, mostly overlay/portal components |
| WIDER (width increased) | 16 | Rare, mostly dialog/scrollarea |

**Key insight: Components systematically shrink under v4.** This points to reduced default spacing in Tailwind v4's preflight CSS compared to v3.

### Size Mismatch Examples (representative)

| Component | v3 Baseline | v4 Actual | Delta |
|---|---|---|---|
| UI/Card Default | 430x284 | 430x170 | h:-114 (40% shorter) |
| UI/Form Default | 480x244 | 480x178 | h:-66 (27% shorter) |
| UI/Table Default | 507x309 | 349x205 | w:-158 h:-104 |
| UI/Stack Vertical | 160x232 | 125x152 | w:-35 h:-80 |
| UI/Stack Gaps | 448x376 | 130x200 | w:-318 h:-176 (dramatic) |
| UI/Grid Two Columns | 440x206 | 440x132 | h:-74 (36% shorter) |
| UI/Badge (all 6) | 380x96 | 380x80 | h:-16 (uniform) |
| UI/Widget Alert (all 6) | 380x86 | 380x80 | h:-6 (uniform) |
| UI/Widget Text (all 6) | 247-272x128 | 234-252x106 | ~h:-22 (uniform) |
| UI/WidgetProtectionStatus | 500x170-202 | 500x130-154 | h:-40 to -48 |
| UI/Tag (all 5) | 214x116 | 158x106 | w:-56 h:-10 (uniform) |
| UI/Calendar | 333x377 | 214x219 | w:-119 h:-158 (42% area reduction) |
| UI/DatePicker Default | 360x112 | 360x366 | h:+254 (calendar dropdown opened?) |
| UI/Avatar Default | 120x120 | 540x540 | Expanded (likely SVG sizing change) |

### Pixel Diff Failures (13 same-size failures, all >3%)

These components render at the same dimensions but have visible differences:

| Component | Diff % | Likely Cause |
|---|---|---|
| UI/Chart Line | 3.51% | Minor rendering difference |
| UI/SecondaryMenu Default | 4.23% | Layout/spacing shift |
| UI/SecondaryMenu With Footer | 4.51% | Layout/spacing shift |
| UI/Chart Area | 4.75% | Minor rendering difference |
| UI/AuthLayout Default | 6.07% | Background/spacing change |
| UI/AuthLayout Sign Up | 6.48% | Background/spacing change |
| UI/ScrollArea With Content | 8.75% | Scroll position/size change |
| UI/SecondaryMenu With Tags | 9.80% | Layout/spacing shift |
| UI/SecondaryMenu With Header | 11.17% | Layout/spacing shift |
| UI/AppShell Default | 13.29% | Sidebar width/color shift |
| UI/Sidebar Default | 19.92% | Sidebar background area change |
| UI/PageContent Default | 23.09% | Content area offset/padding change |
| UI/PageContent With Header | 22.21% | Content area offset/padding change |

### Visual Inspection of Diff Images

I inspected 20+ diff images across component categories. Key observations:

1. **Vertical spacing collapse**: In Card, Form, Table, Widget, and Stack components, vertical gaps between elements are significantly reduced. The text content is unchanged but elements are packed tighter. This is consistent with v4 preflight removing default margins from `h1`-`h6`, `p`, or other block elements.

2. **Horizontal spacing collapse in Table**: The Table component shows columns losing their cell padding -- text runs together ("INV001Paid Credit Card $250.00" instead of spaced columns). This suggests `<td>` / `<th>` default padding is removed by v4 preflight.

3. **Grid/Stack gap disappearance**: Stack and Grid components show dramatically reduced or eliminated gaps. The Stack "Gaps" story shrinks from 448x376 to 130x200 -- a 73% area reduction. This could indicate that Tailwind's `gap` utility or flex/grid spacing defaults changed.

4. **Badge/Widget uniform shrinkage**: All Badge variants shrink by exactly h:-16, and all WidgetAlert variants by h:-6. This uniform behavior per component type confirms a systemic CSS change rather than per-component bugs.

5. **Sidebar/AppShell color shift**: The sidebar renders with a narrower dark-colored rail in v4, causing a large pixel diff percentage in the full-page screenshot.

6. **Progress bar height reduction**: The progress bar renders thinner under v4.

7. **Separator spacing**: The horizontal separator loses vertical margins, causing the overall component height to shrink.

### 21 Size-Only Changes (from diff image analysis)

When comparing baseline snapshot dimensions to the actual screenshot dimensions in the diff images (which represent the Docker run), only 21 out of 193 diff images show actual dimension differences. The remaining 172 diff images were generated by the local (non-Docker) runner from the first test run and may have been overwritten by the Docker run's same-size-but-different-pixels failures.

**Correction**: The second Docker run produced 189 failures. The diff images on disk are a mixture from both runs. The 176 size-mismatch count from the Docker error messages is authoritative.

---

## Root Cause Assessment

The failure pattern -- systematic shrinking across all component types -- points to **Tailwind v4 preflight CSS differences** as the primary root cause:

1. **v4 preflight removes default margins** from `h1`-`h6`, `p`, `blockquote`, `figure`, `hr`, `dl`, `dd` and other block elements. In v3, preflight set these to `margin: 0`, but v4's preflight may handle them differently or the Sass/PostCSS processing order may cause the v3 `_base.scss` overrides to no longer take effect.

2. **v4 preflight changes default padding** on `<td>`, `<th>`, `<button>`, and other interactive elements, causing table and form spacing to collapse.

3. **The `gap` and spacing utilities may not resolve identically** when the theme is not fully loaded (no `tailwindcss/theme.css` in most entry files).

**Recommended investigation for the developer:**
- Compare the CSS output of `tailwindcss/preflight.css` between v3 and v4
- Check if `@layer base { * { @apply border-border; } }` in `_base.scss` is being applied correctly
- Verify that spacing/gap utility classes resolve to the same values in v4 without `theme.css`

---

## Build Warning

The `build:full-css` step produces this warning:
```
@import url("tw-animate-css");
  ^-- @import rules must precede all rules aside from @charset and @layer statements
```

This is caused by `@import url("tw-animate-css")` appearing after Sass-generated CSS rules. The `url()` wrapper forces Sass to pass it through as a plain CSS `@import` rather than resolving it as a Tailwind directive. The architect spec specified `@import "tw-animate-css"` (without `url()`), but all 4 SCSS files use `@import url("tw-animate-css")` instead. This deviation may affect how `tw-animate-css` directives (`@theme inline`, `@utility`) are processed by `@tailwindcss/postcss`.

---

## Convention Compliance Spot-Check

- [x] Shadow utility renames: `shadow-sm` to `shadow-xs` applied correctly in `card.tsx`, `auth-layout.tsx`, `select.tsx`
- [x] Bare `shadow` to `shadow-sm` applied correctly in `slider.tsx`, `sidebar.tsx` (2 occurrences)
- [x] PostCSS config matches architect spec (Section 2)
- [x] `tailwind.preset.js`: `tailwindcss-animate` import and `plugins` array removed correctly
- [x] `tailwind.preset.js`: `theme.extend.screens` workaround present with correct breakpoint values
- [x] `@config` directives present in all SCSS entry files
- [x] `tailwindcss/theme.css` only included in `full.scss` (per spec)
- [ ] **DEVIATION**: `@import url("tw-animate-css")` used instead of `@import "tw-animate-css"` in all 4 SCSS files (spec Section 4c specifies without `url()`)
- [x] `build-full-css.ts` uses `@tailwindcss/cli` (verified by build success)
- [x] Demo SCSS file updated with v4 imports and `@config`

---

## Bugs Found

| Severity | Description | Steps to Reproduce | Notes |
|---|---|---|---|
| HIGH | 176/320 visual regression snapshots fail with size mismatches -- components render systematically shorter/narrower | Run `pnpm storybook:test:visual:docker` from `packages/ui` | Blocker for Option A. Root cause: v4 preflight differences. |
| HIGH | 13/320 visual regression snapshots fail with pixel diffs >3% at same size | Same as above | Affects Sidebar, AppShell, PageContent, SecondaryMenu, AuthLayout, Charts, ScrollArea. Max diff: 23%. |
| HIGH | `tw-animate-css` animation utilities missing from built CSS due to `url()` wrapper | Check `dist/shadcn-uikit.css` for `.animate-in` class -- absent. | **Confirmed**: `@import url("tw-animate-css")` prevents `@tailwindcss/postcss` from processing `tw-animate-css`'s `@utility` directives. Only raw CSS `@import` is emitted. The `@keyframes enter`/`exit` and CSS variables (`--tw-enter-opacity` etc.) ARE present (from the component source), but the utility class selectors (`.animate-in`, `.fade-in-0`, `.slide-in-from-top-*`) are completely absent. Must change to `@import "tw-animate-css"` (without `url()`) in all 4 SCSS files. |

---

## Handoff Notes

The developer fix should focus on:

1. **Preflight parity**: Compare v3 vs v4 `preflight.css` output and add compensating CSS rules in `_base.scss` to restore default margins/padding on block elements, table cells, and form controls. This single fix will likely resolve the majority of the 176 size-mismatch failures since they are all caused by the same root issue.

2. **The `url()` wrapper on `tw-animate-css` imports**: Change `@import url("tw-animate-css")` to `@import "tw-animate-css"` in all 4 SCSS files. The `url()` wrapper prevents `@tailwindcss/postcss` from processing the file's Tailwind directives.

3. **Gap/spacing utility resolution**: Verify that `gap-*`, `space-*`, and `p-*` utilities resolve to the same values without `theme.css`. If not, the missing default spacing scale may need to be added to the preset.