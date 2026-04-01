---
phase: Design
author: devil-advocate
status: reviewed
---

## Verdict
BLOCKED

## Blockers

- [BLOCKER] Agent: architect | Issue: Bare `shadow` utility rename is missed -- the document claims "Grep confirms zero occurrences of bare `shadow` (not followed by `-`) in component `.tsx` files" but this is factually wrong. Three occurrences exist: `slider.tsx:36` uses `shadow` as a standalone class, `sidebar.tsx:249` uses `group-data-[variant=floating]:shadow`, and `sidebar.tsx:321` uses `md:peer-data-[variant=inset]:shadow`. In v4, bare `shadow` maps to what was `shadow-sm` in v3 (a smaller shadow). These components will render differently and fail the Option A pixel-identical constraint. Additional verification: `shadow-sm` was confirmed NOT present in any SCSS files, story files, or markdown docs beyond the 3 UI + 5 demo files the architect identified, so the `shadow-sm` audit is complete -- it is only the bare `shadow` audit that is wrong. | Evidence: architect.md Section 4a "Bare `shadow` usage" paragraph

- [BLOCKER] Agent: architect | Issue: `dialog-offset` custom translate value resolution through `tw-animate-css` is acknowledged as MEDIUM risk (R3) but has no concrete mitigation plan in the migration steps. The `slide-in-from-top-dialog-offset` and `slide-out-to-top-dialog-offset` classes are used in `dialog.tsx` and `alert-dialog.tsx`. The architect acknowledges `tw-animate-css` generates utilities from CSS variables, not the JS config's translate extensions. If these classes silently fail to resolve, dialogs will have broken open/close animations but NO build error -- the failure is silent. The migration sequence (Section 8) has no step to verify this specific risk before proceeding to visual regression. A targeted test or fallback must be specified in the build steps, not just listed as a risk. The architect's R3 recovery suggests converting to `slide-in-from-top-[48%]` as a fallback, but this should be pre-decided as Plan A or Plan B, not left for runtime discovery. | Evidence: architect.md R3, Section 8 Phase 3

- [BLOCKER] Agent: architect | Issue: The `@import "tw-animate-css"` placement relative to `@config` is unverified and potentially wrong. In the architect's proposed SCSS files (Section 3 and Appendix), the `@import "tw-animate-css"` line appears AFTER the Tailwind CSS imports but BEFORE `@config`. Tailwind v4 documentation states `@config` must appear before any rules that depend on it. But `tw-animate-css` is a pure CSS file that injects its own `@keyframes` and utility class definitions -- it does NOT go through the Tailwind plugin system. If `tw-animate-css`'s styles need to participate in Tailwind's layer system (e.g., its utilities need to be in the utilities layer to respect specificity ordering), the import order matters. The architect does not analyze whether `tw-animate-css` uses `@layer` internally and whether its placement relative to Tailwind's layer declarations is correct. | Evidence: architect.md Appendix, all SCSS file examples

- [BLOCKER] Agent: architect | Issue: Consumer preset backward compatibility is not addressed. The `tailwind.preset.js` is a public API export (`@acronis-platform/shadcn-uikit/tailwind-preset`). Removing `tailwindcss-animate` from the preset's `plugins` array breaks v3 consumers who rely on animation utilities being provided transitively through the preset. Furthermore, `tailwindcss-animate` is listed as an optional `peerDependency` in `packages/ui/package.json:69` and `peerDependenciesMeta` at line 78. The `GETTING_STARTED.md` at line 89 instructs consumers to `require('tailwindcss-animate')`. The architect's plan (Section 5) says to remove the import and plugins array but does NOT mention updating `peerDependencies`, `peerDependenciesMeta`, or documentation. A v3 consumer upgrading to the new package version would: (a) lose all `tailwindcss-animate` utilities from the preset without warning, and (b) still see `tailwindcss-animate` listed as a peer dependency even though it is no longer used. The architect must specify what happens to these consumer-facing entries. | Evidence: architect.md Section 5, packages/ui/package.json:66-81, packages/docs/GETTING_STARTED.md:89

## Observations

- The `_globals.scss` `@layer base` decision (Section 4e) is marked MEDIUM confidence and deferred to "investigate as a follow-up if visual regressions appear." Given the Option A strict constraint, this should not be a follow-up -- it should be the FIRST thing verified in Phase 3, Step 3.3. If CSS variable declarations in `@layer base` are hoisted differently in v4, every single component loses its colors. The architect should specify this as a priority check in the verification plan rather than a post-hoc investigation.

- The `tailwind-reference.html` shadow rename (Section 4a) says to update `shadow-sm` to `shadow-xs` and "also update `shadow` to `shadow-sm` if present as standalone." The file at line 35 contains `shadow shadow-sm shadow-md`. Per the v4 rename, this should become `shadow-sm shadow-xs shadow-md`. The architect uses conditional language ("if present") rather than confirming the actual content. This is not a blocker but indicates insufficient verification.

- The `components-only.scss` has a naming problem. It currently imports all three Tailwind layers (`@tailwind base; @tailwind components; @tailwind utilities;`), and the v4 version continues to import base + utilities. An export called `./styles/components` that contains base + utilities + globals but no actual "components" layer content is misleading. This is not a migration concern per se, but the architect should note this discrepancy so that the team lead is aware it is a pre-existing naming issue, not something introduced by the migration.

- The demo `index.scss` proposed in Section 3.6 adds several lines not present in the current file: the `html, body, #root { height: 100%; margin: 0; padding: 0; }` block is new content. The current file (verified at `packages/demo/src/styles/index.scss`) does NOT have this block. The architect is silently adding new styles to the demo app entry file. This goes beyond a Tailwind migration and could affect demo app rendering. The architect should either explain why this is necessary for v4 parity or remove it.

- The `shadow-none` class in `sidebar.tsx:340` is not addressed. In v4, `shadow-none` still means no shadow. This is fine and no action needed, but the architect should have included it in the shadow audit for completeness.

- Risk R2 rates `tw-animate-css` parity as LOW likelihood, MEDIUM impact. Given the Option A pixel-identical constraint, any animation timing or easing difference would fail the visual regression for components captured mid-animation. The test runner waits 400ms for animations to settle (per researcher artifact), but some animations use `ease-in-out` with durations that may not fully settle in 400ms if the easing curve differs. The impact should be rated HIGH given the constraint, not MEDIUM.

- Risk R5 rates full CSS bundle generation as LOW impact because "the full bundle is a convenience export, not used by visual regression tests." However, the full bundle is a published artifact (`./styles/full` in `package.json` exports). Breaking it silently would be a regression for consumers. The impact should be at least MEDIUM.

- The atomic migration risk (Section 8, Phase 1 vs Phase 2) is correctly identified by the architect: `shadow-xs` does not exist in v3's default scale, so Step 1.1 (shadow renames) cannot be committed separately. The architect notes "Do NOT commit this step alone" and suggests bundling with Step 2. However, the plan still presents them as separate numbered phases, which could confuse a developer. The architect should restructure so Phase 1 and Phase 2 are a single phase, or at minimum add a bold warning that Phase 1 is NOT independently committable. As for `pnpm install` partial failure: this is a non-issue because `pnpm install` is transactional (lockfile is only updated on success), and the code changes are all local files that can be reverted.

- The `@tailwindcss/cli` command in Section 7 is specific enough: `pnpm exec @tailwindcss/cli -i ${inputPath} -o ${outputPath} --minify`. The `-c` flag removal is explicitly called out, and the `configPath` variable removal is noted. This is sufficiently unambiguous for a developer to implement. Cleared.

## Cleared Items

- Package version choices are well-reasoned and specific
- PostCSS config changes are correct and minimal
- The `@config` bridge approach preserves the existing JS config without modification, which is the lowest-risk migration path
- The modular SCSS entry file mapping from v3 directives to v4 imports is thorough and correctly handles each file's unique combination of layers (addresses Explore blocker B3)
- The `@layer base` + `@apply` analysis (Section 4e) for `_base.scss` is well-researched with proper source citations and correctly distinguishes between built-in utility `@apply` (works) and custom class `@apply` (problematic)
- The build script changes are correct -- removing `-c` flag and switching to `@tailwindcss/cli`
- The migration sequence is correctly ordered as atomic phases
- The verification plan with Docker-based deterministic snapshots is appropriate for the Option A constraint
- The risk register is comprehensive and covers the major areas of concern
- The researcher's Explore blockers (B1-B4) have all been addressed in the architecture

---

## Re-review (2026-03-30) — After Blocker Fixes

### Updated Verdict
CLEAR

### Blocker Resolution Status

**Blocker 1 (bare `shadow` rename): RESOLVED.** Section 4a now includes a complete "Bare `shadow` -> `shadow-sm` rename" table listing all 3 occurrences: `slider.tsx:36`, `sidebar.tsx:249`, `sidebar.tsx:321`. Phase 1 Step 1.1 enumerates them with exact line numbers and old/new values. The `tailwind-reference.html` update is now explicit: `shadow shadow-sm` becomes `shadow-sm shadow-xs`.

**Blocker 2 (`dialog-offset` translate): RESOLVED.** R3 now includes source-level analysis of `tw-animate-css@1.4.0`: the `slide-in-from-top-*` utility resolves via `--value(--translate-*,[percentage],[length])`, reading from the `--translate-*` theme namespace. The `@config` bridge converts `theme.extend.translate.dialog-offset: '48%'` into `--translate-dialog-offset: 48%`. A concrete verification step (Step 3.2a) was added to Phase 3 with a grep command and explicit fallback to arbitrary value syntax if resolution fails. The risk is now properly mitigated with detection AND recovery, not just listed.

**Blocker 3 (`tw-animate-css` import ordering): RESOLVED.** Section 4c now contains a thorough import ordering analysis based on inspecting the `tw-animate-css@1.4.0` source. Key findings: (a) `tw-animate-css` uses `@theme inline` and `@utility` directives, NOT `@layer`; (b) `@tailwindcss/postcss` collects all directives before processing, so relative ordering of `@import "tw-animate-css"` and `@config` does not affect resolution; (c) `@utility`-registered classes automatically participate in the utilities layer. Layer conflict concern is addressed.

**Blocker 4 (consumer preset backward compatibility): RESOLVED.** Section 1 now includes a "peerDependencies and peerDependenciesMeta changes" table specifying removal of both entries. A "Consumer impact (breaking change)" section documents the two consumer profiles (pre-built CSS vs preset users) with a 4-step migration path for preset consumers. The `GETTING_STARTED.md` documentation update is flagged as out-of-scope for implementation but tracked. Step 2.1 now explicitly lists removal of `tailwindcss-animate` from `peerDependencies` and `peerDependenciesMeta`.

### Remaining Observations (non-blocking, carried forward)

The following observations from the initial review were partially or fully addressed but are noted for awareness:

1. **`_globals.scss` `@layer base` (MEDIUM confidence)**: Still marked MEDIUM confidence, still deferred to follow-up. However, the architect added Step 3.2b as a priority verification check (inspect Card, Button, and dark mode toggle for correct design token colors). This is a reasonable compromise -- the verification is now explicit and early in Phase 3 rather than purely post-hoc. The MEDIUM confidence rating is acceptable given the fallback is straightforward (move variables out of `@layer base`).

2. **Demo `index.scss` phantom styles**: RESOLVED. Section 3.6 and the Appendix no longer include the `html, body, #root` block. Line 204 explicitly states the migration preserves existing content exactly.

3. **R2 impact rating (MEDIUM)**: Not changed. The architect keeps MEDIUM impact for `tw-animate-css` parity. Given the 400ms animation settle time in the test runner, this is acceptable -- animations should be fully settled before screenshot capture. The risk is real but LOW likelihood + visual regression suite will catch it.

4. **Phase 1/Phase 2 separation**: Still presented as separate phases with a "Do NOT commit this step alone" warning. Acceptable -- the warning is clear enough, and the implementation agent can read it.

5. **R5 impact rating (LOW)**: Not changed. Acceptable -- the full bundle is tested via Step V5 (file size comparison) which provides sufficient detection.

### Final Assessment

The architecture document is now comprehensive, internally consistent, and addresses all identified blockers. The migration plan is specific enough for implementation with:
- Exact file paths and line numbers for all changes
- Explicit verification steps for the two highest-risk items (dialog-offset, CSS variable layers)
- Clear fallback procedures for each risk
- Consumer-facing breaking change documented with migration path
- All shadow utility renames enumerated exhaustively

The plan is ready for the Build phase.