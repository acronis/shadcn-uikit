---
type: DESIGN
title: "lucide-react to Internal Icons Migration — Phase 2 Plan"
date: 2026-04-04
status: active
---

# lucide-react to Internal Icons Migration — Phase 2 Plan

## References

- Prior design: `docs/team/icon-migration-plan/design/architect.md` (2026-04-02, status: complete)
- Current-state exploration: `docs/team/icon-migration/explore/researcher.md` (2026-04-04)

---

## A. Current state snapshot

### Completed work

The core migration is done. All consumer-facing code in `packages/ui` is free of `lucide-react`.

| Area | Status | Evidence |
|------|--------|----------|
| `packages/ui` — 22 component files | COMPLETE | All import from `@/components/icons` or `@/components/icons/auto-generated`. Zero `lucide-react` imports. |
| `packages/ui` — 17 story files | COMPLETE | All import from `@/components/icons`. Zero `lucide-react` imports. |
| `lucide-react` dependency removal | COMPLETE | Not listed in any `package.json` across the monorepo. |
| Visual regression snapshots | COMPLETE | Regenerated post-migration. |

### Remaining work

Three items remain, in order of priority:

| Item | Scope | Effort | Risk |
|------|-------|--------|------|
| 1. Fix `missing-icons.tsx` duplication | `packages/demo` | Trivial (delete file, update imports) | Low — `packages/docs` already does this correctly |
| 2. Moon/Sun catalog gap | `packages/ui/src/components/icons/svg/` + `mode-toggle.tsx` | Small (2 SVGs, regenerate, update 1 file) | Low — inline SVGs already work as fallback |
| 3. Catalog expansion for 79 shimmed icons | `packages/ui/src/components/icons/svg/` | Medium-Large — design team decision | Low — shims are functional, this is polish |

---

## B. Remaining work plan

### B.1 Fix missing-icons duplication

**Priority: 1 (do first)**
**Confidence: Substantiated**
**Effort: < 30 minutes**

#### Problem

`packages/demo/src/components/icons/missing-icons.tsx` is a 525-line identical copy of `packages/demos/src/icons/missing-icons.tsx`. Meanwhile, `packages/docs` already imports from the demos package correctly:

```
// packages/docs/src/icons/missing-icons.tsx
export * from '@acronis-platform/shadcn-uikit-demos/icons/missing-icons';
```

`packages/demo` should do the same instead of maintaining its own duplicate.

#### Steps

1. Delete `packages/demo/src/components/icons/missing-icons.tsx`.
2. Create a new file at the same path with a single re-export:
   ```typescript
   export * from '@acronis-platform/shadcn-uikit-demos/icons/missing-icons';
   ```
3. Verify that `packages/demo` has `@acronis-platform/shadcn-uikit-demos` as a dependency in its `package.json`. If not, add it.
4. Run the demo app build to confirm all 19 import sites in `packages/demo` resolve correctly.

#### Blast radius

- Affects only `packages/demo` (internal reference app, not published).
- If the import path does not resolve, the build fails immediately — no silent breakage.
- Fully reversible by restoring the deleted file from git.

---

### B.2 Moon/Sun catalog gap

**Priority: 2**
**Confidence: Substantiated**
**Effort: ~1 hour**

#### Problem

`mode-toggle.tsx` contains two inline SVG components (`MoonIcon`, `SunIcon`) with explicit TODO comments requesting addition to the internal catalog. No `moon--16.svg` or `sun--16.svg` exists in `packages/ui/src/components/icons/svg/`.

The inline SVGs are already fill-based and use `viewBox="0 0 16 16"`, matching the internal icon conventions. They can serve as the source for the catalog SVGs.

#### Steps

1. **Extract SVG files from the inline components.**

   Create `packages/ui/src/components/icons/svg/moon--16.svg`:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
     <path d="M14.5 10.29A7.5 7.5 0 0 1 5.71 1.5 6 6 0 1 0 14.5 10.29z" />
   </svg>
   ```

   Create `packages/ui/src/components/icons/svg/sun--16.svg`:
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
     <circle cx="8" cy="8" r="3" />
     <path d="M8 1v2M8 13v2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M1 8h2M13 8h2M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
   </svg>
   ```

   **Note:** These SVGs come from the already-committed inline code in `mode-toggle.tsx`. If the design team prefers Acronis-style fill icons instead of these lucide-derived shapes, replace the paths with design-team-provided artwork before proceeding. The inline SVGs are a valid starting point.

2. **Regenerate the icon components.**
   ```bash
   npm run generate:icons
   ```
   Verify that `MoonIcon` and `SunIcon` appear in `auto-generated.tsx`.

3. **Update `mode-toggle.tsx`.**
   - Remove the two inline component definitions.
   - Import from `@/components/icons`:
     ```typescript
     import { MoonIcon, SunIcon } from '@/components/icons'
     ```
   - The JSX usage stays the same (component names are identical).

4. **Update `categories.json`.**
   Add entries under appropriate prefixes:
   - `"moon": ["moon-16"]`
   - `"sun": ["sun-16"]`

5. **Regenerate visual snapshots** for `mode-toggle` stories if any exist.

#### Blast radius

- Adds 2 SVG files and 2 auto-generated components. No existing code changes except `mode-toggle.tsx`.
- `MoonIcon` and `SunIcon` become part of the public icon API. Consumers who shimmed their own can switch to the official versions.

---

### B.3 Catalog expansion roadmap

**Priority: 3 (design team decision)**
**Confidence: Conjecture — catalog additions require design review**

#### Context

79 icons are shimmed in `missing-icons.tsx` as inline stroke-style SVGs (lucide paths, MIT licensed). These are used exclusively in demo/example code, not in the published UI library. The shim is functional but creates visual inconsistency: stroke-style lucide icons alongside fill-style internal icons.

#### Potential internal catalog matches

The following shimmed icons have plausible equivalents already in the internal catalog. These are approximate — visual review by the design team is required before substitution.

| Shimmed icon | Potential internal match | SVG source | Notes |
|---|---|---|---|
| `ExternalLinkIcon` | `ExternalLinkIcon` | `external-link--16.svg` | **Already exists in catalog.** Should be removed from shim and imported from catalog instead. |
| `GripVerticalIcon` | `GripDotsIcon` | `grip-dots--16.svg` | **Already exists in catalog.** Different dot count (lucide 2x3 vs internal 2x4). Should be removed from shim. |
| `MinusIcon` | `MinusIcon` | `minus--16.svg` | **Already exists in catalog.** The shim shadows the catalog version. Should be removed from shim. |
| `MenuIcon` | `MenuIcon` (via `menu--24.svg`) | `menu--24.svg` | Exists at 24px only. Verify scaling at 16px. |
| `BellRingIcon` | `BellIcon` (via `bell--24.svg`) | `bell--24.svg` | Exists at 24px. Bell without ring animation lines. Semantic match only. |
| `CalendarDaysIcon` | `CalendarIcon` (via `calendar--16.svg`) | `calendar--16.svg` | Generic calendar. No "days" visual. Partial match. |
| `DatabaseIcon` | `DbIcon` (via `db--16.svg`) | `db--16.svg` | Different visual style. Semantic match. |
| `NetworkIcon` | `NetworkIcon` (via `network--32.svg`) | `network--32.svg` | Exists at 32px only. Verify scaling. |
| `ShareIcon` (Share2Icon) | `ShareIcon` (via `share--16.svg`) | `share--16.svg` | Exists at 16px. Visual style may differ (share nodes vs share arrow). |
| `TargetIcon` | `TargetIcon` (via `target--24.svg`) | `target--24.svg` | Exists at 24px. Crosshair target. |
| `UserPlusIcon` | `UserIcon` + `PlusIcon` | `user--16.svg`, `plus--16.svg` | No compound icon. Would need new SVG. |
| `MonitorIcon` | `DevicesDesktopIcon` (via `devices-desktop-24.svg`) | `devices-desktop-24.svg` | Different naming convention. 24px only. |
| `PlusCircleIcon` | `PlusIcon` or `AddIcon` | `plus--16.svg`, `add--16.svg` | Plus without circle. Partial. |

**Action item (3 icons):** `ExternalLinkIcon`, `GripVerticalIcon`, and `MinusIcon` already exist in the internal catalog. These should be removed from `missing-icons.tsx` and their import sites updated to use the catalog versions. This is a small, safe change that reduces the shim from 79 to 76 icons.

#### Highest-value additions (by usage frequency)

If the design team wants to reduce the shim further, these icons are used in the most demo files:

| Rank | Icon | Files using it | Category |
|------|------|---------------|----------|
| 1 | `TrendingUpIcon` | 8 | Data visualization |
| 2 | `MusicIcon` | 8 | Media |
| 3 | `CreditCardIcon` | 8 | Commerce |
| 4 | `TagIcon` | 7 | Metadata |
| 5 | `ActivityIcon` | 7 | Data visualization |
| 6 | `ZapIcon` | 6 | Status/energy |
| 7 | `TrendingDownIcon` | 6 | Data visualization |
| 8 | `MoreVerticalIcon` | 5 | Navigation (note: `EllipsisVIcon` or `MoreIcon` may exist) |
| 9 | `LogOutIcon` | 5 | Authentication |
| 10 | `ExternalLinkIcon` | 5 | Navigation (**already in catalog**) |

**Recommendation:** This is a design team decision, not an engineering decision. The shim works correctly. Catalog expansion should be driven by whether the icons are needed in the Acronis design language, not by demo file count. Frame this as a request to the design team: "Here are 79 icons used in demos that have no internal equivalent. Which, if any, should be added to the official catalog?"

---

## C. Icon name mapping table (complete reference)

### Legend

| Column | Description |
|--------|-------------|
| `lucide_name` | Exact export name from `lucide-react` |
| `internal_name` | Internal icon component name (from `auto-generated.tsx` or inline) |
| `status` | `MIGRATED` = in packages/ui source, `SHIMMED` = in missing-icons.tsx, `INLINE` = in mode-toggle.tsx |
| `match_quality` | `EXACT` = direct equivalent, `PARTIAL` = semantic match with visual differences, `MISSING` = no internal equivalent |
| `notes` | Visual differences, size info, alternatives |

### C.1 UI component icons (26 unique lucide names, all MIGRATED)

These are the icons that were used in `packages/ui/src/components/ui/` and `packages/ui/src/components/mode-toggle.tsx`. All have been migrated to internal icons (or inlined with TODO markers for Moon/Sun).

| lucide_name | internal_name | status | match_quality | notes |
|---|---|---|---|---|
| `ArrowDown` | `ArrowSortDownIcon` | MIGRATED | PARTIAL | Sort variant (16px). `ArrowDownIcon` is 32px-only. Fill arrow with line vs lucide stroke arrow. |
| `ArrowLeft` | `ArrowLeftIcon` | MIGRATED | EXACT | Has 16px variant (`arrow-left--16.svg`). |
| `ArrowRight` | `ArrowRightIcon` | MIGRATED | EXACT | Has 16px variant (`arrow-right--16.svg`). |
| `ArrowUp` | `ArrowSortUpIcon` | MIGRATED | PARTIAL | Sort variant (16px). `ArrowUpIcon` is 32px-only. Fill arrow with line vs lucide stroke arrow. |
| `Check` | `CheckIcon` | MIGRATED | EXACT | 16px fill checkmark. Used in checkbox, select, dropdown-menu. |
| `ChevronDown` | `ChevronDownIcon` | MIGRATED | EXACT | 16px fill chevron. |
| `ChevronLeft` | `ChevronLeftIcon` | MIGRATED | EXACT | 16px fill chevron. |
| `ChevronRight` | `ChevronRightIcon` | MIGRATED | EXACT | 16px fill chevron. |
| `ChevronUp` | `ChevronUpIcon` | MIGRATED | EXACT | 16px fill chevron. |
| `ChevronsLeft` | `ChevronBigLeftIcon` | MIGRATED | PARTIAL | Lucide double-chevron vs internal single "big" chevron. `chevron-big-left--16.svg`. |
| `ChevronsRight` | `ChevronBigRightIcon` | MIGRATED | PARTIAL | Same as ChevronsLeft but right-facing. |
| `ChevronsUpDown` | `ChevronUpdownIcon` | MIGRATED | EXACT | 16px up/down chevrons. `ChevronSelectIcon` is an alternative. |
| `Circle` | `CircleIcon` | MIGRATED | EXACT | Lucide outline vs internal filled. Filled is correct for radio indicator use. |
| `EyeOff` | `HideIcon` | MIGRATED | PARTIAL | Semantic match (hide column). `hide--16.svg` is eye-with-slash in fill style. |
| `Filter` | `FilterIcon` | MIGRATED | EXACT | 16px funnel icon. |
| `GripVertical` | `GripDotsIcon` | MIGRATED | PARTIAL | Lucide 2x3 dots vs internal 2x4 dots. Same drag-handle metaphor. |
| `Minus` | `MinusIcon` | MIGRATED | EXACT | 16px dash. Used for checkbox indeterminate state. |
| `Moon` | `MoonIcon` (inline) | INLINE | MISSING | Inline SVG in `mode-toggle.tsx` with TODO. No `moon--16.svg` in catalog yet. See Section B.2. |
| `MoreHorizontal` | `EllipsisHIcon` | MIGRATED | EXACT | Horizontal three-dots. `ellipsis-h--16.svg`. |
| `PanelLeft` | `PanelLeftIcon` | MIGRATED | EXACT | Only 32px source (`panel-left--32.svg`). Scales via viewBox. |
| `Search` | `SearchIcon` | MIGRATED | EXACT | 16px magnifying glass. |
| `Settings2` | `SettingsIcon` | MIGRATED | PARTIAL | Lucide sliders icon vs internal gear icon. Different visual, same semantic. |
| `Sun` | `SunIcon` (inline) | INLINE | MISSING | Inline SVG in `mode-toggle.tsx` with TODO. No `sun--16.svg` in catalog yet. See Section B.2. |
| `X` | `CloseIcon` | MIGRATED | EXACT | 16px close cross. `close--16.svg`. |

**Summary:** 16 EXACT, 6 PARTIAL, 2 MISSING (Moon, Sun).

### C.2 Shimmed icons (79 icons in missing-icons.tsx)

These icons are used only in `packages/demo` and `packages/demos` example code. They have no internal catalog equivalent (except 3 noted below) and are provided as inline stroke-style SVG components copying lucide paths (MIT licensed).

| lucide_name | internal_name | status | match_quality | notes |
|---|---|---|---|---|
| `Activity` | `ActivityIcon` | SHIMMED | MISSING | No internal equivalent. Heartbeat/pulse line. |
| `AlignCenter` | `AlignCenterIcon` | SHIMMED | MISSING | No internal equivalent. Text alignment. |
| `AlignLeft` | `AlignLeftIcon` | SHIMMED | MISSING | No internal equivalent. Text alignment. |
| `AlignRight` | `AlignRightIcon` | SHIMMED | MISSING | No internal equivalent. Text alignment. |
| `AppWindow` | `AppWindowIcon` | SHIMMED | MISSING | No internal equivalent. Application window frame. |
| `ArrowDownRight` | `ArrowDownRightIcon` | SHIMMED | MISSING | No internal equivalent. Diagonal arrow. |
| `ArrowUpDown` | `ArrowUpDownIcon` | SHIMMED | MISSING | No internal equivalent. Vertical sort arrows. |
| `ArrowUpRight` | `ArrowUpRightIcon` | SHIMMED | MISSING | No internal equivalent. Diagonal arrow. |
| `Award` | `AwardIcon` | SHIMMED | MISSING | No internal equivalent. Ribbon/medal. |
| `BarChart` | `BarChartIcon` | SHIMMED | MISSING | No internal equivalent. Simple bar chart. |
| `BarChart3` | `BarChart3Icon` | SHIMMED | MISSING | No internal equivalent. Bar chart with axes. |
| `BellRing` | `BellRingIcon` | SHIMMED | MISSING | Catalog has `bell--24.svg` (no ring lines, 24px only). Partial semantic match. |
| `Bold` | `BoldIcon` | SHIMMED | MISSING | No internal equivalent. Text formatting. |
| `Bookmark` | `BookmarkIcon` | SHIMMED | MISSING | No internal equivalent. Bookmark/save ribbon. |
| `Brain` | `BrainIcon` | SHIMMED | MISSING | No internal equivalent. Brain/AI metaphor. |
| `CalendarDays` | `CalendarDaysIcon` | SHIMMED | MISSING | Catalog has `calendar--16.svg` (generic, no day dots). Partial semantic match. |
| `CheckSquare` | `CheckSquareIcon` | SHIMMED | MISSING | Catalog has `check--16.svg` (checkmark only, no square). Partial. |
| `ChevronsLeft` | `ChevronsLeftIcon` | SHIMMED | MISSING | NOTE: The UI component used `ChevronsLeft` mapped to `ChevronBigLeftIcon`. This shim version is a separate stroke-style copy for demos. |
| `ChevronsRight` | `ChevronsRightIcon` | SHIMMED | MISSING | Same note as ChevronsLeftIcon above. |
| `ClipboardList` | `ClipboardListIcon` | SHIMMED | MISSING | Catalog has `clipboard--24.svg` (no list lines, 24px). Partial semantic match. |
| `Code` | `CodeIcon` | SHIMMED | MISSING | No internal equivalent. Code brackets `</>`. |
| `CreditCard` | `CreditCardIcon` | SHIMMED | MISSING | No internal equivalent. Payment card. |
| `Database` | `DatabaseIcon` | SHIMMED | MISSING | Catalog has `db--16.svg`. Different visual style. Semantic match. |
| `DollarSign` | `DollarSignIcon` | SHIMMED | MISSING | No internal equivalent. Currency symbol. |
| `ExternalLink` | `ExternalLinkIcon` | SHIMMED | **EXACT** | **Already in catalog** as `external-link--16.svg`. Should be removed from shim and imported from catalog. |
| `FileSearch` | `FileSearchIcon` | SHIMMED | MISSING | No internal equivalent. File with magnifying glass. |
| `GripVertical` | `GripVerticalIcon` | SHIMMED | **PARTIAL** | **Already in catalog** as `GripDotsIcon` (`grip-dots--16.svg`). Different dot count. Should be removed from shim. |
| `Heart` | `HeartIcon` | SHIMMED | MISSING | Catalog has `heartbeat--24.svg` (heart with pulse, 24px). Different concept. |
| `Italic` | `ItalicIcon` | SHIMMED | MISSING | No internal equivalent. Text formatting. |
| `Keyboard` | `KeyboardIcon` | SHIMMED | MISSING | No internal equivalent. |
| `Layers` | `LayersIcon` | SHIMMED | MISSING | No internal equivalent. Stacked layers. |
| `LayoutDashboard` | `LayoutDashboardIcon` | SHIMMED | MISSING | Catalog has `layout-o--32.svg` (generic layout, 32px). Partial. |
| `LayoutGrid` | `LayoutGridIcon` | SHIMMED | MISSING | No internal equivalent. Grid view. |
| `LayoutIcon` | `LayoutIconIcon` | SHIMMED | MISSING | No internal equivalent. |
| `LayoutTemplate` | `LayoutTemplateIcon` | SHIMMED | MISSING | No internal equivalent. |
| `LifeBuoy` | `LifeBuoyIcon` | SHIMMED | MISSING | No internal equivalent. Help/support ring. |
| `ListOrdered` | `ListOrderedIcon` | SHIMMED | MISSING | No internal equivalent. Numbered list. |
| `LogOut` | `LogOutIcon` | SHIMMED | MISSING | No internal equivalent. Sign out arrow. |
| `Menu` | `MenuIcon` | SHIMMED | MISSING | Catalog has `menu--24.svg` (24px only). Verify scaling. Potential match. |
| `Minus` | `MinusIcon` | SHIMMED | **EXACT** | **Already in catalog** as `minus--16.svg`. The shim version shadows the catalog version. Should be removed from shim. |
| `Monitor` | `MonitorIcon` | SHIMMED | MISSING | Catalog has `devices-desktop-24.svg` (24px, different naming). Partial semantic match. |
| `Moon` | `MoonIcon` | SHIMMED | MISSING | Also inlined in `mode-toggle.tsx`. See Section B.2 for catalog addition plan. |
| `MoreVertical` | `MoreVerticalIcon` | SHIMMED | MISSING | Catalog may have vertical ellipsis (`MoreIcon` or `EllipsisVIcon`). Needs verification. |
| `MousePointer` | `MousePointerIcon` | SHIMMED | MISSING | No internal equivalent. Cursor arrow. |
| `MoveLeft` | `MoveLeftIcon` | SHIMMED | MISSING | No internal equivalent. Arrow with line. |
| `MoveRight` | `MoveRightIcon` | SHIMMED | MISSING | No internal equivalent. Arrow with line. |
| `Music` | `MusicIcon` | SHIMMED | MISSING | No internal equivalent. Music note. |
| `Navigation` | `NavigationIcon` | SHIMMED | MISSING | No internal equivalent. Navigation arrow/compass. |
| `Network` | `NetworkIcon` | SHIMMED | MISSING | Catalog has `network--32.svg` (32px only). Verify scaling. Partial. |
| `Package` | `PackageIcon` | SHIMMED | MISSING | No internal equivalent. Box/package. |
| `Palette` | `PaletteIcon` | SHIMMED | MISSING | No internal equivalent. Color palette. |
| `PanelTop` | `PanelTopIcon` | SHIMMED | MISSING | Catalog has `panel-left--32.svg` and `panel-right--32.svg` but no panel-top. |
| `Paperclip` | `PaperclipIcon` | SHIMMED | MISSING | No internal equivalent. Attachment. |
| `Percent` | `PercentIcon` | SHIMMED | MISSING | No internal equivalent. Percentage symbol. |
| `PlusCircle` | `PlusCircleIcon` | SHIMMED | MISSING | Catalog has `plus--16.svg` (no circle). Partial. |
| `RectangleHorizontal` | `RectangleHorizontalIcon` | SHIMMED | MISSING | No internal equivalent. |
| `RectangleVertical` | `RectangleVerticalIcon` | SHIMMED | MISSING | No internal equivalent. |
| `Redo` | `RedoIcon` | SHIMMED | MISSING | No internal equivalent. Redo arrow. |
| `Ruler` | `RulerIcon` | SHIMMED | MISSING | No internal equivalent. |
| `Scissors` | `ScissorsIcon` | SHIMMED | MISSING | Catalog has `scissors-ab--32.svg` (32px, branded variant). Partial. |
| `Share2` | `Share2Icon` | SHIMMED | MISSING | Catalog has `share--16.svg`. Different visual (share nodes vs connected dots). Partial. |
| `SkipBack` | `SkipBackIcon` | SHIMMED | MISSING | No internal equivalent. Media control. |
| `SkipForward` | `SkipForwardIcon` | SHIMMED | MISSING | No internal equivalent. Media control. |
| `Smile` | `SmileIcon` | SHIMMED | MISSING | No internal equivalent. Smiley face. |
| `Square` | `SquareIcon` | SHIMMED | MISSING | No internal equivalent. Empty square. |
| `Sun` | `SunIcon` | SHIMMED | MISSING | Also inlined in `mode-toggle.tsx`. See Section B.2 for catalog addition plan. |
| `Tag` | `TagIcon` | SHIMMED | MISSING | No internal equivalent. Label tag. |
| `Target` | `TargetIcon` | SHIMMED | MISSING | Catalog has `target--24.svg` (24px). Crosshair target. Partial. |
| `ThumbsDown` | `ThumbsDownIcon` | SHIMMED | MISSING | No internal equivalent. Dislike gesture. |
| `ThumbsUp` | `ThumbsUpIcon` | SHIMMED | MISSING | No internal equivalent. Like gesture. |
| `ToggleLeft` | `ToggleLeftIcon` | SHIMMED | MISSING | No internal equivalent. Toggle switch. |
| `TrendingDown` | `TrendingDownIcon` | SHIMMED | MISSING | No internal equivalent. Downward trend line. |
| `TrendingUp` | `TrendingUpIcon` | SHIMMED | MISSING | No internal equivalent. Upward trend line. |
| `Type` | `TypeIcon` | SHIMMED | MISSING | No internal equivalent. Typography "T". |
| `Underline` | `UnderlineIcon` | SHIMMED | MISSING | No internal equivalent. Text formatting. |
| `Undo` | `UndoIcon` | SHIMMED | MISSING | No internal equivalent. Undo arrow. |
| `Unlock` | `UnlockIcon` | SHIMMED | MISSING | Catalog has `lock--16.svg` and `locked--16.svg` but no unlock variant. Partial. |
| `UserPlus` | `UserPlusIcon` | SHIMMED | MISSING | Catalog has `user--16.svg` (no plus). No compound icon. |
| `Zap` | `ZapIcon` | SHIMMED | MISSING | No internal equivalent. Lightning bolt. |

### C.3 Summary statistics

| Status | Match quality | Count |
|--------|-------------|-------|
| MIGRATED | EXACT | 16 |
| MIGRATED | PARTIAL | 6 |
| INLINE | MISSING | 2 |
| SHIMMED | EXACT | 3 (ExternalLink, GripVertical, Minus — should be de-shimmed) |
| SHIMMED | PARTIAL | 0 (partial matches exist but require design review) |
| SHIMMED | MISSING | 76 |
| **Total** | | **103** |

---

## Deferred decisions

- **Which of the 79 shimmed icons to add to the catalog:** DEFER to design team. The shim is functional. Catalog additions should be driven by the Acronis design language, not by demo usage counts. Usage frequency data is provided in Section B.3 to inform the decision but not to make it.
- **Stroke-to-fill visual consistency in demos:** DEFER. The demos use stroke-style lucide SVGs alongside fill-style internal icons. Whether this matters enough to fix is a design team call. The demos are internal reference apps, not published artifacts.
- **Moon/Sun SVG art direction:** DEFER final art to design team. The inline SVGs in `mode-toggle.tsx` are a valid interim source, but the design team may prefer custom artwork that matches the Acronis fill-icon aesthetic.

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| `ExternalLinkIcon` name collision between shim and catalog | Medium | De-shim the 3 overlapping icons (B.3 action item). If both are imported in the same file, the shim shadows the catalog version. |
| Moon/Sun SVGs rejected by design team | Low | Inline SVGs in `mode-toggle.tsx` remain functional. No urgency to change. |
| Demo build break from deduplication (B.1) | Low | Verify `@acronis-platform/shadcn-uikit-demos` is a dependency of `packages/demo`. If not, add it. Build will fail fast if wrong. |

## Anti-pattern check

- **Premature abstraction:** No. We are reducing duplication, not adding abstraction layers.
- **Over-engineering:** No. All three work items are small, targeted changes.
- **Magic:** Flagged — the re-export pattern (`export * from '...'`) is an implicit convention. It is documented in the `missing-icons.tsx` file comment in `packages/docs`, and Section B.1 of this document ensures `packages/demo` follows the same pattern.
