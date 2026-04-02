---
type: DESIGN
title: "lucide-react -> Internal Icons Migration Plan"
date: 2026-04-02
status: complete
---

# lucide-react to Internal Icons Migration Plan

## 1. Migration scope decision

### packages/ui component source — MIGRATE (critical path)

26 unique lucide icons across 20 component files. These ship to every consumer of the library. Migrating them removes `lucide-react` as a runtime dependency, which is the primary goal.

### packages/demo — DEFER

**Recommendation: Do not migrate the demo in this effort.**

Rationale:
- The demo uses ~145 unique lucide icons, many decorative (text formatting, media controls, navigation metaphors) with no internal equivalent.
- The demo imports `lucide-react` directly — it is its own dependency, not transitively pulled from `packages/ui`.
- Demo is not consumer-facing as a library artifact. It serves as an internal reference app.
- Migrating 145 icons with ~30 gaps would bloat this effort from small to large for no user-visible benefit.
- The demo can continue using `lucide-react` as its own devDependency without affecting the UI package.

### Stories — DEFER (with exceptions)

Stories are developer-facing, not consumer-facing. They use ~30 unique lucide icons for illustration purposes.

**Exception:** If a story demonstrates a component whose implementation was just migrated (e.g., `chip.stories.tsx` uses `X` from lucide — same icon the chip component itself used), consider migrating those story imports at the same time for consistency. This is opportunistic, not required.

## 2. Gap resolution strategy

Two icons have no internal equivalent: `Moon` and `Sun`. These are used exclusively in `mode-toggle.tsx` for the dark/light theme toggle.

### Options evaluated

| Option | Pros | Cons |
|--------|------|------|
| A. Add Moon/Sun to internal catalog | Clean removal of lucide; long-term consistency | Requires SVG source + regeneration; design team involvement |
| B. Keep lucide-react as peer dep for 2 icons | Quick; no new SVGs needed | Defeats the purpose — lucide remains a dependency |
| C. Inline SVG paths directly in mode-toggle.tsx | Zero dependencies; self-contained component | Maintenance burden; hardcoded paths |
| D. Add Moon/Sun SVGs to the `svg/` directory + regenerate | Same as A but developer-driven | Need to source/create SVGs that match Acronis design language |

### Recommendation: Option D — Add SVGs and regenerate

**Confidence: Substantiated**

Add `moon--16.svg` and `sun--16.svg` to `packages/ui/src/components/icons/svg/`, then run `npm run generate:icons` to create `MoonIcon` and `SunIcon` components automatically. The SVGs can be sourced from:

1. The Acronis design system / Figma (preferred — maintains design language consistency)
2. A standard icon set with compatible licensing (MIT), simplified to fill-based 16x16

This is a small, contained addition (2 SVG files) that completely eliminates the lucide-react dependency. Option B leaves lucide as a dependency — which defeats the entire migration. Option C works but creates a maintenance outlier.

**Weakest assumption:** That acceptable Moon/Sun SVG sources exist or can be created quickly. If this blocks, Option C (inline SVGs in mode-toggle.tsx) is a valid fallback that can be upgraded to Option D later.

## 3. viewBox / size compatibility

### The problem

| Property | Internal icons | Lucide icons |
|----------|---------------|--------------|
| viewBox | `0 0 16 16` (default) | `0 0 24 24` |
| Default rendered size | `size-4` (16px via Tailwind) | 24px (via `width`/`height` attributes) |
| Stroke vs fill | **Fill-based** (`fill="currentColor"`) | **Stroke-based** (`stroke="currentColor"`, `strokeWidth={2}`) |
| Color inheritance | `currentColor` in all auto-generated SVGs | `currentColor` via stroke |

### Analysis

**Internal icons are fill-based, not stroke-based.** Every auto-generated SVG uses `fill="currentColor"` with `fill="none"` on the root `<svg>`. There are no `stroke` attributes in the auto-generated icons (except the hand-crafted ones in `icon-library.tsx`). This means:

- Icons will look **visually different** from lucide — thicker, more solid shapes vs lucide's thin-stroke aesthetic.
- This is by design — the Acronis design language uses filled icons.
- The visual change will be **intentional and desirable** for brand consistency.

**BaseIcon sizing is className-driven.** `BaseIcon` defaults to `className="size-4 shrink-0"` and accepts className override via `cn()` merge. In all UI component files, lucide icons are sized via explicit Tailwind classes (e.g., `className="h-3 w-3"`, `className="h-2.5 w-2.5"`, `className="h-4 w-4"`). Since `BaseIcon` uses `cn()` to merge classNames, the same Tailwind size classes will work.

### Compatibility approach

1. **className passthrough works as-is.** When a component does `<Check className="h-3 w-3" />` (lucide), swapping to `<CheckIcon className="h-3 w-3" />` (internal) will render at the same pixel size because `cn('size-4 shrink-0', 'h-3 w-3')` correctly overrides the default.

2. **viewBox mismatch is handled per-component.** Each auto-generated icon already sets the correct viewBox matching its source SVG. The `BaseIcon` default of `0 0 16 16` is overridden by the auto-generated wrapper when the SVG has a different native size.

3. **Visual regression snapshots WILL change.** The fill-based icons will render differently from lucide's stroke-based icons at any size. This is expected and correct. All 338 visual regression snapshots that contain icons will need to be regenerated after migration. This is a **batch update, not a bug**.

4. **Icons with only 32px SVG sources** (e.g., `ArrowDownIcon` uses `arrow-down--32.svg` with viewBox `0 0 32 32`): These still render at the className-specified size (e.g., `h-4 w-4`). The viewBox scaling handles this — a 32x32 viewBox rendered at 16px is fine. However, icons designed at 32px may lose detail at 16px. The `ArrowSortDownIcon` (from `arrow-sort-down--16.svg`) is a better match for the sort-indicator use case.

### Icons with non-16px source SVGs (needs attention)

| Internal icon | Source SVG | viewBox | Concern |
|--------------|-----------|---------|---------|
| `ArrowDownIcon` | `arrow-down--32.svg` | 32x32 | Use `ArrowSortDownIcon` (16px) instead |
| `ArrowUpIcon` | `arrow-up--32.svg` | 32x32 | Use `ArrowSortUpIcon` (16px) instead |
| `PanelLeftIcon` | `panel-left--32.svg` | 32x32 | No 16px variant; renders fine scaled down |
| `CircleOIcon` | `circle-o--32.svg` | 32x32 | Use `CircleIcon` or `CircleOutlineIcon` (16px) instead |

## 4. Migration sequence

### Guiding principles

- Migrate one file at a time. Each file change should be independently testable.
- Start with components that have the simplest icon usage (single icon, no conditional rendering).
- Save `mode-toggle.tsx` for last (depends on Moon/Sun gap resolution).
- Batch the visual snapshot update after all component migrations are done.

### Recommended order

**Phase 1 — Gap resolution (prerequisite)**

1. Add `moon--16.svg` and `sun--16.svg` to `packages/ui/src/components/icons/svg/`
2. Run `npm run generate:icons` to regenerate `auto-generated.tsx`
3. Verify `MoonIcon` and `SunIcon` are exported

**Phase 2 — Simple single-icon components (low risk)**

| Order | File | Icons to replace | Notes |
|-------|------|-----------------|-------|
| 1 | `accordion.tsx` | `ChevronDown` -> `ChevronDownIcon` | Single icon, simple swap |
| 2 | `command.tsx` | `Search` -> `SearchIcon` | Single icon |
| 3 | `filter.tsx` | `Filter` -> `FilterIcon` | Single icon, aliased import |
| 4 | `navigation-menu.tsx` | `ChevronDown` -> `ChevronDownIcon` | Single icon |
| 5 | `chip.tsx` | `X` -> `CloseIcon` | Single icon |
| 6 | `dialog.tsx` | `X` -> `CloseIcon` | Single icon |
| 7 | `sheet.tsx` | `X` -> `CloseIcon` | Single icon |
| 8 | `resizable.tsx` | `GripVertical` -> `GripDotsIcon` | Single icon |
| 9 | `sidebar.tsx` | `PanelLeft` -> `PanelLeftIcon` | Single icon; 32px source, verify visuals |

**Phase 3 — Multi-icon components (medium risk)**

| Order | File | Icons to replace |
|-------|------|-----------------|
| 10 | `radio-group.tsx` | `Circle` -> `CircleIcon` |
| 11 | `checkbox.tsx` | `Check` -> `CheckIcon`, `Minus` -> `MinusIcon` |
| 12 | `select.tsx` | `Check` -> `CheckIcon`, `ChevronDown` -> `ChevronDownIcon`, `ChevronUp` -> `ChevronUpIcon` |
| 13 | `dropdown-menu.tsx` | `Check` -> `CheckIcon`, `ChevronRight` -> `ChevronRightIcon`, `Circle` -> `CircleIcon` |
| 14 | `breadcrumb.tsx` | `ChevronRight` -> `ChevronRightIcon`, `MoreHorizontal` -> `EllipsisHIcon` |
| 15 | `pagination.tsx` | `ChevronLeft` -> `ChevronLeftIcon`, `ChevronRight` -> `ChevronRightIcon`, `MoreHorizontal` -> `EllipsisHIcon` |
| 16 | `tree.tsx` | `ChevronRight` -> `ChevronRightIcon`, `ChevronDown` -> `ChevronDownIcon` |
| 17 | `carousel.tsx` | `ArrowLeft` -> `ArrowLeftIcon`, `ArrowRight` -> `ArrowRightIcon` |
| 18 | `calendar.tsx` | `ChevronDownIcon` -> internal `ChevronDownIcon`, `ChevronLeftIcon` -> internal `ChevronLeftIcon`, `ChevronRightIcon` -> internal `ChevronRightIcon` |
| 19 | `combobox.tsx` | `CheckIcon` -> internal `CheckIcon`, `ChevronsUpDownIcon` -> `ChevronUpdownIcon` |

**Phase 4 — Data table components (medium risk, test together)**

These should be migrated and tested as a group since they work together.

| Order | File | Icons to replace |
|-------|------|-----------------|
| 20 | `data-table-column-header.tsx` | `ArrowDown` -> `ArrowSortDownIcon`, `ArrowUp` -> `ArrowSortUpIcon`, `ChevronsUpDown` -> `ChevronUpdownIcon`, `EyeOff` -> `HideIcon` |
| 21 | `data-table-pagination.tsx` | `ChevronLeft/Right` -> `ChevronLeftIcon/RightIcon`, `ChevronsLeft/Right` -> `ChevronBigLeftIcon/ChevronBigRightIcon` |
| 22 | `data-table-toolbar.tsx` | `X` -> `CloseIcon` |
| 23 | `data-table-view-options.tsx` | `Settings2` -> `SettingsIcon` |

**Phase 5 — Mode toggle (depends on Phase 1)**

| Order | File | Icons to replace |
|-------|------|-----------------|
| 24 | `mode-toggle.tsx` | `Moon` -> `MoonIcon`, `Sun` -> `SunIcon` |

**Phase 6 — Cleanup**

1. Remove `lucide-react` from `packages/ui/package.json` dependencies
2. Run full build to verify no remaining imports
3. Regenerate all visual regression snapshots
4. Review snapshot diffs to confirm changes are icon-style only (fill vs stroke)

## 5. Icon mapping table

### Complete mapping for packages/ui component source

Every lucide icon used in `packages/ui/src/components/ui/` and `packages/ui/src/components/mode-toggle.tsx`, with the definitive internal replacement.

| lucide_name | lucide_import | internal_name | internal_import | match_quality | notes |
|---|---|---|---|---|---|
| `ArrowDown` | `import { ArrowDown } from 'lucide-react'` | `ArrowSortDownIcon` | `import { ArrowSortDownIcon } from '@/components/icons'` | PARTIAL | Use sort variant (16px). `ArrowDownIcon` is 32px-only. Visual: fill arrow with line vs lucide stroke arrow. |
| `ArrowLeft` | `import { ArrowLeft } from 'lucide-react'` | `ArrowLeftIcon` | `import { ArrowLeftIcon } from '@/components/icons'` | EXACT | Has 16px variant. Pass `size={16}` for explicit 16px. |
| `ArrowRight` | `import { ArrowRight } from 'lucide-react'` | `ArrowRightIcon` | `import { ArrowRightIcon } from '@/components/icons'` | EXACT | Has 16px variant (arrow-right--16.svg). |
| `ArrowUp` | `import { ArrowUp } from 'lucide-react'` | `ArrowSortUpIcon` | `import { ArrowSortUpIcon } from '@/components/icons'` | PARTIAL | Use sort variant (16px). `ArrowUpIcon` is 32px-only. Visual: fill arrow with line vs lucide stroke arrow. |
| `Check` | `import { Check } from 'lucide-react'` | `CheckIcon` | `import { CheckIcon } from '@/components/icons'` | EXACT | 16px fill checkmark. Used in checkbox, select, dropdown-menu. |
| `CheckIcon` | `import { CheckIcon } from 'lucide-react'` | `CheckIcon` | `import { CheckIcon } from '@/components/icons'` | EXACT | Same as above (lucide exports both `Check` and `CheckIcon`). |
| `ChevronDown` | `import { ChevronDown } from 'lucide-react'` | `ChevronDownIcon` | `import { ChevronDownIcon } from '@/components/icons'` | EXACT | 16px fill chevron. |
| `ChevronDownIcon` | `import { ChevronDownIcon } from 'lucide-react'` | `ChevronDownIcon` | `import { ChevronDownIcon } from '@/components/icons'` | EXACT | Same component, used in calendar.tsx. |
| `ChevronLeft` | `import { ChevronLeft } from 'lucide-react'` | `ChevronLeftIcon` | `import { ChevronLeftIcon } from '@/components/icons'` | EXACT | 16px fill chevron. |
| `ChevronLeftIcon` | `import { ChevronLeftIcon } from 'lucide-react'` | `ChevronLeftIcon` | `import { ChevronLeftIcon } from '@/components/icons'` | EXACT | Same component, used in calendar.tsx. |
| `ChevronRight` | `import { ChevronRight } from 'lucide-react'` | `ChevronRightIcon` | `import { ChevronRightIcon } from '@/components/icons'` | EXACT | 16px fill chevron. |
| `ChevronRightIcon` | `import { ChevronRightIcon } from 'lucide-react'` | `ChevronRightIcon` | `import { ChevronRightIcon } from '@/components/icons'` | EXACT | Same component, used in calendar.tsx. |
| `ChevronUp` | `import { ChevronUp } from 'lucide-react'` | `ChevronUpIcon` | `import { ChevronUpIcon } from '@/components/icons'` | EXACT | 16px fill chevron. |
| `ChevronsLeft` | `import { ChevronsLeft } from 'lucide-react'` | `ChevronBigLeftIcon` | `import { ChevronBigLeftIcon } from '@/components/icons'` | PARTIAL | Lucide double-chevron vs internal "big" single chevron. Visual: different metaphor but same semantic (jump to first). `chevron-big-left--16.svg` is 16px. |
| `ChevronsRight` | `import { ChevronsRight } from 'lucide-react'` | `ChevronBigRightIcon` | `import { ChevronBigRightIcon } from '@/components/icons'` | PARTIAL | Same as ChevronsLeft. |
| `ChevronsUpDown` | `import { ChevronsUpDown } from 'lucide-react'` | `ChevronUpdownIcon` | `import { ChevronUpdownIcon } from '@/components/icons'` | EXACT | 16px up/down chevrons. `ChevronSelectIcon` is an alternative — both exist. `ChevronUpdownIcon` is closer semantically. |
| `ChevronsUpDownIcon` | `import { ChevronsUpDownIcon } from 'lucide-react'` | `ChevronUpdownIcon` | `import { ChevronUpdownIcon } from '@/components/icons'` | EXACT | Same as above (combobox.tsx uses the `Icon` suffix variant). |
| `Circle` | `import { Circle } from 'lucide-react'` | `CircleIcon` | `import { CircleIcon } from '@/components/icons'` | EXACT | 16px filled circle. Used in radio-group (indicator dot) and dropdown-menu (radio item indicator). Note: lucide `Circle` is an outline; internal `CircleIcon` is filled. For radio indicator, filled is correct. |
| `EyeOff` | `import { EyeOff } from 'lucide-react'` | `HideIcon` | `import { HideIcon } from '@/components/icons'` | PARTIAL | Semantic match (hide column). `hide--16.svg` is an eye-with-slash in fill style. Visual weight will differ. |
| `Filter` | `import { Filter as FilterIcon } from 'lucide-react'` | `FilterIcon` | `import { FilterIcon } from '@/components/icons'` | EXACT | 16px filter/funnel icon. Internal `FilterIcon` exists. Aliasing no longer needed — names already match. |
| `GripVertical` | `import { GripVertical } from 'lucide-react'` | `GripDotsIcon` | `import { GripDotsIcon } from '@/components/icons'` | PARTIAL | Lucide uses 6 dots (2x3); internal uses 8 dots (2x4). Same metaphor (drag handle). 16px. |
| `Minus` | `import { Minus } from 'lucide-react'` | `MinusIcon` | `import { MinusIcon } from '@/components/icons'` | EXACT | 16px minus/dash. Used for checkbox indeterminate state. |
| `Moon` | `import { Moon } from 'lucide-react'` | `MoonIcon` | `import { MoonIcon } from '@/components/icons'` | MISSING | **Does not exist yet.** Must add `moon--16.svg` before migration. See Section 2. |
| `MoreHorizontal` | `import { MoreHorizontal } from 'lucide-react'` | `EllipsisHIcon` | `import { EllipsisHIcon } from '@/components/icons'` | EXACT | Horizontal three-dots. `ellipsis-h--16.svg` is 16px. (`MoreIcon` also exists but is vertical dots.) |
| `PanelLeft` | `import { PanelLeft } from 'lucide-react'` | `PanelLeftIcon` | `import { PanelLeftIcon } from '@/components/icons'` | EXACT | Sidebar toggle. Only 32px source (`panel-left--32.svg`), but scales fine via viewBox. |
| `Search` | `import { Search } from 'lucide-react'` | `SearchIcon` | `import { SearchIcon } from '@/components/icons'` | EXACT | 16px magnifying glass. |
| `Settings2` | `import { Settings2 } from 'lucide-react'` | `SettingsIcon` | `import { SettingsIcon } from '@/components/icons'` | PARTIAL | Lucide `Settings2` is a sliders icon; internal `SettingsIcon` is a gear. Different visual metaphor, same semantic (configure/options). |
| `Sun` | `import { Sun } from 'lucide-react'` | `SunIcon` | `import { SunIcon } from '@/components/icons'` | MISSING | **Does not exist yet.** Must add `sun--16.svg` before migration. See Section 2. |
| `X` | `import { X } from 'lucide-react'` | `CloseIcon` | `import { CloseIcon } from '@/components/icons'` | EXACT | 16px close/dismiss cross. `close--16.svg` uses `fill="currentColor"`. Also available: `TimesIcon`. Prefer `CloseIcon` for semantic clarity. |

### Summary

| Match quality | Count | Icons |
|---|---|---|
| EXACT | 19 | ArrowLeft, ArrowRight, Check, CheckIcon, ChevronDown, ChevronDownIcon, ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon, ChevronUp, ChevronsUpDown, ChevronsUpDownIcon, Circle, Filter, Minus, MoreHorizontal, Search, X |
| PARTIAL | 7 | ArrowDown, ArrowUp, ChevronsLeft, ChevronsRight, EyeOff, GripVertical, Settings2 |
| MISSING | 2 | Moon, Sun |

## 6. Consumer impact

### Current state

`lucide-react` is listed as a **direct runtime dependency** in `packages/ui/package.json`. Consumers of `@acronis-platform/shadcn-uikit` get `lucide-react` transitively — it is installed in their `node_modules` even if they never import from it directly.

### After migration

Removing `lucide-react` from `packages/ui/package.json`:

1. **Consumers who only use UI components:** No impact. Icons are now internal — the components render them without any external dependency.

2. **Consumers who import `lucide-react` directly in their own code:** Their code will still work IF they have `lucide-react` in their own `package.json`. However, if they were relying on the transitive dependency (never explicitly installed it), their build will break after upgrading `@acronis-platform/shadcn-uikit`.

3. **lucide-react is NOT re-exported from the UI package's public API** (`packages/ui/src/index.ts`). This means any consumer importing `lucide-react` is already importing from `'lucide-react'` directly, not from the UI package. They should already have it in their own `package.json`. If they do not, this is technically incorrect dependency management on their side.

### Mitigation

- Document the breaking change in release notes: "lucide-react is no longer a transitive dependency. If your application imports directly from lucide-react, add it to your own package.json."
- This is a **semver minor concern** — removing a transitive dependency is not a public API change, but it can break builds. Consider noting it in a minor version bump changelog, or include it as part of a major version bump if one is already planned.

## 7. Recommended approach

### Recommendation: Migrate packages/ui component source now. Defer demo and stories.

**Confidence: Substantiated**

**Effort estimate: Small to Medium**

- Phase 1 (gap resolution): ~1 hour — create 2 SVGs, regenerate icons
- Phase 2-4 (component migration): ~2-4 hours — 24 files, mechanical find-and-replace with import updates
- Phase 5 (mode-toggle): ~15 minutes — depends on Phase 1
- Phase 6 (cleanup + snapshots): ~1 hour — remove dep, rebuild, regenerate snapshots, review diffs

**Total: ~1 day of focused work.**

### Why now

- `lucide-react` is a runtime dependency that ships to every consumer. Removing it reduces bundle size and dependency surface.
- The internal icon catalog already covers 24 of 26 icons. The 2 gaps are trivially resolvable.
- The migration is mechanical — import path changes, no logic changes.
- Visual regression snapshots provide a safety net for verifying the icon swap.

### What to defer

| Scope | Decision | Reason |
|-------|----------|--------|
| packages/demo | DEFER | ~145 icons, many without equivalents, separate dependency |
| Stories | DEFER (opportunistic) | Not consumer-facing, low priority |
| Demo migration | RE-EVALUATE after UI migration | May not be needed if demo keeps its own lucide dep |

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Visual regression — fill vs stroke icons look different | Low | Expected and intentional. Review snapshot diffs. |
| Missing Moon/Sun SVGs block migration | Medium | Fallback to inline SVGs in mode-toggle.tsx (Option C) |
| Consumer breakage from removed transitive dep | Medium | Document in release notes; consumers should own their deps |
| Partial-match icons look wrong in context | Low | Visual review during snapshot regeneration; swap to alternative if needed |
| `PanelLeftIcon` (32px source) loses detail at 16px | Low | Test visually; add 16px variant if needed |

### Anti-pattern check

- **Premature abstraction:** No — we are using the existing icon system as-is.
- **Golden hammer:** No — internal icons are purpose-built for this design system.
- **Over-engineering:** No — the migration is mechanical with no new infrastructure.

## Deferred decisions

- **Demo migration timeline:** DEFER until UI migration is complete and validated. May never be needed if demo keeps its own lucide-react dependency.
- **Story migration scope:** DEFER — decide after UI migration based on team preference for consistency vs effort.
- **Icon visual parity verification:** Each PARTIAL-match icon should be visually reviewed during migration, but the exact "acceptable difference" threshold is a design team call, not an architecture decision.