# Feature: lucide-react to Internal Icons Migration

## Objective

Remove the `lucide-react` runtime dependency from `packages/ui` by replacing all lucide icon imports in component source files with internal icon components from `@/components/icons`. This reduces bundle size and dependency surface for all consumers of the library.

## What changed

All 20 component source files in `packages/ui/src/components/` that imported from `lucide-react` were migrated to use internal icon components. The `lucide-react` dependency was removed from `packages/ui/package.json`.

### Icon mapping used

| lucide import | Internal replacement | Match quality |
|---|---|---|
| `ArrowDown` | `ArrowSortDownIcon` | PARTIAL (16px sort variant) |
| `ArrowLeft` | `ArrowLeftIcon` | EXACT |
| `ArrowRight` | `ArrowRightIcon` | EXACT |
| `ArrowUp` | `ArrowSortUpIcon` | PARTIAL (16px sort variant) |
| `Check` / `CheckIcon` | `CheckIcon` | EXACT |
| `ChevronDown` / `ChevronDownIcon` | `ChevronDownIcon` | EXACT |
| `ChevronLeft` / `ChevronLeftIcon` | `ChevronLeftIcon` | EXACT |
| `ChevronRight` / `ChevronRightIcon` | `ChevronRightIcon` | EXACT |
| `ChevronUp` | `ChevronUpIcon` | EXACT |
| `ChevronsLeft` | `ChevronBigLeftIcon` | PARTIAL |
| `ChevronsRight` | `ChevronBigRightIcon` | PARTIAL |
| `ChevronsUpDown` / `ChevronsUpDownIcon` | `ChevronUpdownIcon` | EXACT |
| `Circle` | `CircleIcon` | EXACT |
| `EyeOff` | `HideIcon` | PARTIAL |
| `Filter` | `FilterIcon` | EXACT |
| `GripVertical` | `GripDotsIcon` | PARTIAL |
| `Minus` | `MinusIcon` | EXACT |
| `MoreHorizontal` | `EllipsisHIcon` | EXACT |
| `PanelLeft` | `PanelLeftIcon` | EXACT |
| `Search` | `SearchIcon` | EXACT |
| `Settings2` | `SettingsIcon` | PARTIAL |
| `X` | `CloseIcon` | EXACT |
| `Moon` | Inline SVG in `mode-toggle.tsx` | MISSING |
| `Sun` | Inline SVG in `mode-toggle.tsx` | MISSING |

### Moon/Sun gap

`Moon` and `Sun` icons have no internal equivalent. They are used only in `mode-toggle.tsx` for the dark/light theme toggle. They were replaced with inline SVG components defined locally in that file, each with a `TODO` comment.

To complete the gap later:
1. Add `moon--16.svg` and `sun--16.svg` to `packages/ui/src/components/icons/svg/`
2. Run `pnpm --filter @acronis-platform/shadcn-uikit generate:icons`
3. Replace the inline SVGs in `mode-toggle.tsx` with `MoonIcon` and `SunIcon` from `@/components/icons`

### Out of scope

- Stories files (`__stories__/*.stories.tsx`) -- 18 files still import from `lucide-react`
- `packages/demo` -- uses `lucide-react` as its own dependency

## Visual impact

Internal icons are fill-based (`fill="currentColor"`) while lucide icons are stroke-based (`stroke="currentColor"`). Icons will appear visually different -- thicker, more solid shapes. This is intentional and consistent with the Acronis design language. Visual regression snapshots will need regeneration.

## Consumer impact

Consumers who import `lucide-react` directly in their own code must ensure it is listed in their own `package.json`. It is no longer provided transitively through this package.

## Definition of done

- [x] All component source files in `packages/ui/src/components/` use internal icons
- [x] `lucide-react` removed from `packages/ui/package.json` dependencies
- [x] `pnpm --filter @acronis-platform/shadcn-uikit build` passes
- [x] Moon/Sun gap documented with inline SVG fallback and TODO for future resolution
- [x] Visual regression snapshots regenerated and passing (338/338)
