# PLTFRM-86107: Add Missing Chart Types to Shadcn Library

## Jira Task

**[UI-Kit][React] Add missing chart types to the Shadcn library**
Figma: https://www.figma.com/design/XIxQClqVxjEr8Tc7TAn16u/Charts-anatomy

## Scope

Implement all 13 widget types from the Figma "Charts-anatomy" file as React components in `packages/ui` with demos in `packages/demo`.

---

## Figma Page Inventory

### Chart Widgets (5)

| #   | Page Name    | Node ID      | Status                                 | Notes                                        |
| --- | ------------ | ------------ | -------------------------------------- | -------------------------------------------- |
| 1   | Bar-Chart    | `101:5`      | Playground exists, need widget wrapper | Has anatomy, colors, states, dropdown, usage |
| 2   | Donut-Chart  | `101:77575`  | **NEW** — no dedicated component       | Pie variant with inner radius                |
| 3   | Line-Chart   | `217:67003`  | Playground exists, need widget wrapper | Has anatomy, colors, states, dropdown, usage |
| 4   | Stacked-Area | `824:83684`  | **NEW** — no dedicated component       | Area chart variant                           |
| 5   | Treemap      | `861:107574` | Playground exists, need widget wrapper | Has anatomy, colors, states, dropdown, usage |

### Dashboard Widgets (8)

| #   | Page Name          | Node ID     | Status  | Notes                                                           |
| --- | ------------------ | ----------- | ------- | --------------------------------------------------------------- |
| 6   | Alert-Widget       | `201:65481` | **NEW** | Info/Success/Warning/Danger variants, hover/active/focus states |
| 7   | Progress-Tiers     | `229:70578` | **NEW** | Tiered progress bars with chart colors                          |
| 8   | Progress-Chunks    | `237:74702` | **NEW** | Chunked progress visualization                                  |
| 9   | Placeholders       | `229:73962` | **NEW** | Empty state / placeholder widgets                               |
| 10  | Protection-Status  | `533:75562` | **NEW** | Protection status indicator                                     |
| 11  | Protection-Summary | `538:78584` | **NEW** | Protection summary dashboard widget                             |
| 12  | Table-Data         | `826:86024` | **NEW** | Data table widget with states                                   |
| 13  | Text-Widgets       | `829:95739` | **NEW** | Text-based dashboard widgets                                    |

---

## Implementation Approach

### Architecture

Each widget follows the existing pattern in `packages/ui/src/components/ui/`:

- Single `.tsx` file per widget (compound component pattern)
- Uses `cn()` utility + `cva()` for variants
- `React.forwardRef` for all sub-components
- Exported from `packages/ui/src/react.ts`

### Component Naming Convention

Following the existing `av-` prefix convention:

- `WidgetBarChart` / `widget-bar-chart.tsx`
- `WidgetDonutChart` / `widget-donut-chart.tsx`
- `WidgetLineChart` / `widget-line-chart.tsx`
- `WidgetStackedArea` / `widget-stacked-area.tsx`
- `WidgetTreemap` / `widget-treemap.tsx`
- `WidgetAlert` / `widget-alert.tsx`
- `WidgetProgressTiers` / `widget-progress-tiers.tsx`
- `WidgetProgressChunks` / `widget-progress-chunks.tsx`
- `WidgetPlaceholder` / `widget-placeholder.tsx`
- `WidgetProtectionStatus` / `widget-protection-status.tsx`
- `WidgetProtectionSummary` / `widget-protection-summary.tsx`
- `WidgetTableData` / `widget-table-data.tsx`
- `WidgetText` / `widget-text.tsx`

### Widget Structure (common pattern from Figma anatomy)

Each widget is a Card-like container with:

- **Header**: Title (24px) + optional icon (16px) + optional dropdown trigger
- **Content area**: Chart/data visualization
- **Footer** (optional): Legend, labels, or actions
- **Padding**: 24px outer, 16px inner spacing
- **Border**: `brand-light`
- **Background**: `inversed-primary`
- **States**: Hover (`el-secondary-hover`), Active (`el-secondary-active`), Focus (`fixed-focus`)

### Color Tokens (from Figma)

```
Background: inversed-primary (var(--av-inversed-primary))
Border: brand-light (var(--av-brand-light))
Title: fixed-primary (var(--av-fixed-primary))
Icon: fixed-link (var(--av-fixed-link))
Values: fixed-primary (var(--av-fixed-primary))

Chart colors:
- Success: chart-success (var(--av-chart-success))
- Warning: chart-warning (var(--av-chart-warning))
- Critical: chart-critical (var(--av-chart-critical))
- Danger: chart-danger (var(--av-chart-danger))
- Neutral: chart-neutral (var(--av-chart-neutral))
- Info: chart-info (var(--av-chart-info))

Alert variants:
- Info: fixed-info-accent bg, fixed-info border
- Success: fixed-success-accent bg, fixed-success border
- Warning: fixed-warning-accent bg, fixed-warning border
- Danger: fixed-danger-accent bg, fixed-danger border
```

### Interactive States (all widgets)

```
Hover: el-secondary-hover
Active: el-secondary-active
Focus: fixed-focus (2px outline)
Focus-Data: Show tooltip for focused data point
```

---

## Phase Plan

### Phase 1: Widget Base + Chart Widgets ✅ DONE

1. ✅ `widget.tsx` — shared widget container (Widget, WidgetHeader, WidgetIcon, WidgetTitle, WidgetActions, WidgetContent, WidgetFooter, WidgetValue, WidgetLabel, WidgetDivider)
2. Chart widgets use the generic Widget base + Recharts directly (Bar, Line, Donut, Stacked Area, Treemap shown in demo)

### Phase 2: Dashboard Widgets ✅ DONE

3. ✅ `widget-alert.tsx` — Alert notification widget (info/success/warning/danger)
4. ✅ `widget-progress-tiers.tsx` — Tiered progress bars
5. ✅ `widget-progress-chunks.tsx` — Chunked progress visualization
6. ✅ `widget-placeholder.tsx` — Empty state placeholder
7. ✅ `widget-protection-status.tsx` — Protection status indicator
8. ✅ `widget-protection-summary.tsx` — Protection summary
9. ✅ `widget-table-data.tsx` — Data table widget
10. ✅ `widget-text.tsx` — Text-based widget

### Phase 3: Demos & Integration ✅ DONE

11. ✅ `packages/demo/src/demos/widget/WidgetAll.tsx` — comprehensive demo
12. ✅ `packages/demo/src/demos/widget/index.ts` — barrel export
13. ✅ `packages/demo/src/components/WidgetDemo.tsx` — demo page with DemoWithCode
14. ✅ Route added in `App.tsx` at `/widgets`
15. ✅ All widgets exported from `react.ts`

### Phase 4: Verification ✅ DONE

16. ✅ UI library build (`pnpm build`) — PASSED
17. ✅ Demo app build (`pnpm build`) — PASSED
18. ⬜ Visual verification in demo app (manual step)

---

## Dependencies

- `recharts` (already installed in demo)
- `class-variance-authority` (already in ui)
- `@/lib/utils` (cn helper, already exists)

## Files to Create

```
packages/ui/src/components/ui/widget-base.tsx
packages/ui/src/components/ui/widget-bar-chart.tsx
packages/ui/src/components/ui/widget-donut-chart.tsx
packages/ui/src/components/ui/widget-line-chart.tsx
packages/ui/src/components/ui/widget-stacked-area.tsx
packages/ui/src/components/ui/widget-treemap.tsx
packages/ui/src/components/ui/widget-alert.tsx
packages/ui/src/components/ui/widget-progress-tiers.tsx
packages/ui/src/components/ui/widget-progress-chunks.tsx
packages/ui/src/components/ui/widget-placeholder.tsx
packages/ui/src/components/ui/widget-protection-status.tsx
packages/ui/src/components/ui/widget-protection-summary.tsx
packages/ui/src/components/ui/widget-table-data.tsx
packages/ui/src/components/ui/widget-text.tsx
packages/demo/src/demos/widget/index.ts
packages/demo/src/demos/widget/WidgetAll.tsx
packages/demo/src/components/WidgetDemo.tsx
```

## Files to Modify

```
packages/ui/src/react.ts (add exports)
packages/demo/src/App.tsx (add routes)
packages/demo/src/pages/Home.tsx (add navigation)
```
