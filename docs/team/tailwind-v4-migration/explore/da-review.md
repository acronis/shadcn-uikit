---
type: DA-REVIEW
phase: Explore
artifact: docs/team/tailwind-v4-migration/explore/researcher.md
date: 2026-03-30
---

# Verdict: BLOCKED

## Blockers (must fix before Design)

### B1. `tw-animate-css` parity with custom keyframes is unverified

Agent: researcher | Evidence: researcher.md Section 4, Open Question 4

The researcher claims `tw-animate-css` or `tailwind-animate` are replacements for `tailwindcss-animate`, but the analysis stops at "both provide the same animation utilities." This project defines three custom keyframes in the preset (`accordion-down`, `accordion-up`, `indeterminate-progress`) with project-specific values (e.g., `var(--accordion-panel-height)`, `translateX(400%)`). These are NOT standard `tailwindcss-animate` animations -- they are custom keyframes that happen to coexist alongside the plugin.

The question that must be answered before Design: Does removing `tailwindcss-animate` from the plugins array break the loading of these custom keyframes defined in `theme.extend.keyframes`? The answer is no -- custom keyframes in `theme.extend` are independent of the plugin. But the researcher never stated this clearly, leaving the impression that the animation replacement is a single atomic swap. More critically, 38 occurrences of `animate-in`, `animate-out`, `fade-in-*`, `fade-out-*`, `zoom-in-*`, `zoom-out-*`, `slide-in-*`, `slide-out-*` across 12 component files depend on utilities that come FROM `tailwindcss-animate`. The researcher must confirm that `tw-animate-css` provides the exact same utility class names and CSS output for these 38 usages, not just that it "provides accordion-down/accordion-up."

### B2. `@layer base` in SCSS is marked LOW confidence but is a critical path

Agent: researcher | Evidence: researcher.md Section 6 "`@layer base` behavior", _base.scss, _globals.scss

Two SCSS files use `@layer base { ... }`: `_base.scss` and `_globals.scss`. The `_base.scss` contains the global `* { @apply border-border; }` rule that is the project's defense against v4's `currentColor` border default change. The `_globals.scss` defines all CSS custom properties (`:root` variables) inside `@layer base`.

If `@layer base` does not work correctly in v4 when processed through `@tailwindcss/postcss` with SCSS:
- All CSS custom property definitions could be lost or misordered (no design tokens)
- The border-border override fails and every bordered element changes appearance
- The body base styles fail

The researcher marked this LOW confidence and left it as "needs empirical testing." This is the single highest-risk item in the entire migration. Design cannot proceed without knowing whether this works or what the alternative is. The researcher must either: (a) run a proof-of-concept test, or (b) research the documented v4 behavior for `@layer base` in PostCSS-processed files specifically.

### B3. Modular CSS build strategy for v4 is not analyzed

Agent: researcher | Evidence: researcher.md Section 6 "@tailwind directives replaced"

The project exports five separate CSS bundles: `styles`, `styles/full`, `styles/tokens`, `styles/base`, `styles/components`, `styles/utilities`. The current build uses selective `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives per file:
- `base-only.scss`: only `@tailwind base`
- `components-only.scss`: `@tailwind base; @tailwind components; @tailwind utilities`
- `utilities-only.scss`: only `@tailwind utilities`

The researcher states "v4 provides `@import "tailwindcss/preflight"`, `@import "tailwindcss/utilities"`, etc." but does not confirm these granular imports actually exist or work with `@config`. The `components-only.scss` currently loads all three layers -- does v4 provide an `@import "tailwindcss/components"`? Tailwind v4 moved away from the components layer concept. This modular build strategy may be fundamentally incompatible with v4 and the researcher did not investigate it.

### B4. Visual snapshot claim is contradictory

Agent: researcher | Evidence: researcher.md Section 5, Key Takeaways

The researcher says "320 visual regression snapshots must be regenerated and verified after migration." The team lead's brief states the user requirement is "all visual regression snapshots must be the same." These are contradictory: "regenerated" means new baselines (different pixels), "the same" means pixel-identical to current v3 baselines.

The researcher must clarify: will a correct v4 migration produce pixel-identical CSS output to v3? If not (which is almost certainly the case given preflight changes, shadow renames, and different CSS generation), the Design phase needs to know this upfront so it can establish what "visual equivalence" means and what the acceptance threshold is.

## Concerns (Design must address)

### C1. `shadow` utility rename is incomplete

The researcher identified `shadow-sm` -> `shadow-xs` rename affecting 3 files, but `shadow` (bare) is also renamed to `shadow-sm` in v4. The codebase uses bare `shadow` in `sidebar.tsx` (2 occurrences). After migration, `shadow` in v4 produces a different (smaller) shadow than `shadow` in v3. The researcher should enumerate ALL shadow utility usages and their v4 equivalents, not just `shadow-sm`.

### C2. `build-full-css.ts` CLI invocation is not fully analyzed

The build script uses `pnpm exec tailwindcss -c ${configPath} -i ${inputPath} -o ${outputPath} --minify`. In v4, the CLI package is `@tailwindcss/cli` and the `-c` flag for config path may not exist. The researcher mentions this in passing (Section 2: "removed `-c ${configPath}` flag") but does not confirm what the v4 CLI equivalent is. The `@config` directive in the CSS file is one approach, but the researcher should confirm the v4 CLI accepts the same flags or document the replacement.

### C3. Consumer backward compatibility needs a decision, not an open question

Open Question 3 asks "How should documentation guide consumers from v3 preset usage to v4?" This is not an open question -- it is a Design-phase decision. But the researcher should provide the factual foundation: Can a v4-built preset JS file still be consumed by v3 projects? If the preset removes `tailwindcss-animate` from plugins, v3 consumers lose animations. This constraint must be stated clearly.

### C4. `darkMode: ['class']` array syntax vs v4 behavior

The researcher states v4 "defaults to `class` strategy" and that "the `darkMode` config option is ignored when using `@config`." This needs verification. If `darkMode` in the JS config is silently ignored, that is fine since `class` is the default. But if the array syntax `['class']` causes a parse error or unexpected behavior in v4's config reader, it would be a subtle bug. The researcher should confirm v4 handles the array syntax gracefully.

### C5. `@use` (Sass module system) interaction with `@import "tailwindcss"`

All SCSS entry files use `@use` to load Sass partials before the `@tailwind` directives. In v4, `@tailwind base/components/utilities` becomes `@import "tailwindcss"`. The Sass `@use` and CSS `@import` directives have ordering constraints. The researcher did not investigate whether `@use './tokens'` followed by `@import "tailwindcss"` produces correct output when processed through the Sass -> PostCSS -> Tailwind pipeline. This could cause layer ordering issues.

## Confirmed correct

- Accurate inventory of all config files, SCSS entry points, and their contents
- Correct identification of `@tailwindcss/postcss` as the only viable path (not `@tailwindcss/vite`) due to SCSS usage
- Accurate analysis of the previous failed migration attempt and why it failed
- Correct identification of `tailwindcss-animate` incompatibility as a blocking issue
- Accurate mapping of the monorepo dependency chain and package relationships
- Correct identification that `hsl(var(--av-*))` color pattern continues to work via `@config` bridge
- Thorough inventory of `@apply` usage (limited to 2 files, 3 occurrences)
- Correct note that `autoprefixer` is no longer needed in v4
- Accurate description of the visual test infrastructure and tooling