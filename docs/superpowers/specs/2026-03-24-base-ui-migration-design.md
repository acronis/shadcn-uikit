# Base UI Migration Design

**Date:** 2026-03-24
**Status:** Approved
**Scope:** `packages/ui`

---

## Overview

Migrate the uikit's headless primitive layer from `@radix-ui/*` to `@base-ui/react` (already in dependencies at `^1.0.0`), following the shadcn Base UI track pattern. Public API is preserved exactly — no consumer-facing breaking changes. The theming system, CSS outputs, and build pipeline remain unchanged.

---

## 1. Architecture & Component Migration

### Approach

In-place file-by-file rewrite (shadcn Base UI track style). Each component file that imports from `@radix-ui/*` is rewritten to import the equivalent from `@base-ui/react`. Exported names, prop interfaces, and ref forwarding remain byte-for-byte identical.

### Component categories

**Migrate to Base UI** (17 files, 15 distinct Base UI namespaces):

| File | Base UI namespace |
|---|---|
| `accordion.tsx` | `Accordion.*` |
| `alert-dialog.tsx` | `AlertDialog.*` |
| `checkbox.tsx` | `Checkbox.*` |
| `collapsible.tsx` | `Collapsible.*` |
| `dialog.tsx` | `Dialog.*` |
| `sheet.tsx` | `Dialog.*` (same Base UI primitive as dialog) |
| `command.tsx` | `Dialog.*` (uses local Dialog wrapper + `cmdk`; also has a direct `DialogProps` type import from `@radix-ui/react-dialog` that must be updated when `dialog.tsx` migrates) |
| `dropdown-menu.tsx` | `Menu.*` |
| `popover.tsx` | `Popover.*` |
| `progress.tsx` | `Progress.*` |
| `radio-group.tsx` | `RadioGroup.*` |
| `scroll-area.tsx` | `ScrollArea.*` |
| `select.tsx` | `Select.*` (consolidates with existing `base-select.tsx`) |
| `separator.tsx` | `Separator.*` |
| `switch.tsx` | `Switch.*` |
| `tabs.tsx` | `Tabs.*` |
| `tooltip.tsx` | `Tooltip.*` |

> **Note on `base-select.tsx`:** A partial Base UI Select migration already exists. During `select.tsx` migration, `base-select.tsx` will be consolidated into `select.tsx` and the separate file removed.

> **Note on `label.tsx` and `form.tsx`:** Both import `@radix-ui/react-label`. Base UI does not have a standalone Label primitive — it provides `Field.Label` as part of the Field composite. These files will keep the Radix Label dependency unless the Field composite approach is adopted in a future iteration.

**New components (Base UI only, no Radix equivalent):**

- `slider.tsx` — `Slider.*`
- `number-field.tsx` — `NumberField.*`
- `toggle-group.tsx` — `ToggleGroup.*`

**Keep Radix** (no Base UI equivalent):

| File | Radix package | Reason |
|---|---|---|
| `avatar.tsx` | `@radix-ui/react-avatar` | No Base UI equivalent |
| `aspect-ratio.tsx` | `@radix-ui/react-aspect-ratio` | No Base UI equivalent |
| `navigation-menu.tsx` | `@radix-ui/react-navigation-menu` | No Base UI equivalent |
| `visually-hidden.tsx` | `@radix-ui/react-visually-hidden` | No Base UI equivalent |
| `label.tsx`, `form.tsx` | `@radix-ui/react-label` | See note above |
| `button.tsx`, `breadcrumb.tsx`, `button-group.tsx`, `sidebar.tsx` | `@radix-ui/react-slot` | No Base UI equivalent for `Slot` |

**No changes needed** (no Radix primitives — pure Tailwind or third-party):

Alert, Badge, Card, Input, Textarea, Skeleton, Spinner, Stack, Grid, Section, PageHeader, PageContent, Field, Tag, Chip, Empty, Table, Carousel, Chart, Calendar, Combobox, DatePicker, Filter, Pagination, Resizable, Sonner, Tree, Drawer (uses `vaul`), all Widget components, all layout components (AppShell, AuthLayout, DashboardLayout, SplitLayout, SecondaryMenu).

### Data-attribute migration

Base UI uses boolean presence attributes and slightly different naming from Radix:

| Radix selector | Base UI selector | Components affected |
|---|---|---|
| `data-[state=open]` | `data-open` | All overlay/disclosure components |
| `data-[state=closed]` | `data-closed` | All overlay/disclosure components |
| `data-[state=checked]` | `data-checked` | Checkbox, Switch, RadioGroup |
| `data-[state=unchecked]` | `data-unchecked` | Checkbox, Switch, RadioGroup |
| `data-[state=active]` | `data-active` | Tabs |
| `data-[highlighted]` | `data-highlighted` (same) | Menu items, Select items |
| `data-[disabled]` | `data-disabled` (same) | All interactive components |
| `data-[side=bottom/top/left/right]` | `data-side` (same attribute name) | Popover, Tooltip, Menu, Select |

`data-side` works identically in Base UI — no change needed in positioning animation classes like `data-[side=bottom]:slide-in-from-top-2`.

### Radix CSS custom properties replacement

Several components use `--radix-*` CSS custom properties for layout calculations. These must be replaced with Base UI equivalents:

| Radix variable | Base UI variable | Used in |
|---|---|---|
| `--radix-popover-content-transform-origin` | `--base-ui-popover-transform-origin` | `popover.tsx` |
| `--radix-select-content-transform-origin` | `--base-ui-select-transform-origin` | `select.tsx` |
| `--radix-select-content-available-height` | `--base-ui-select-available-height` | `select.tsx` |
| `--radix-dropdown-menu-content-available-height` | `--base-ui-menu-available-height` | `dropdown-menu.tsx` |

> These variable names must be verified against `@base-ui/react` v1.0 documentation during implementation.

---

## 2. Dual CSS Output

### Internal authoring

No change to the styling system. Components continue to use Tailwind + CVA internally. CVA variant definitions stay the same structure; only `className` strings with data-attribute selectors change.

### Consumer output modes

| Export path | Description | Consumer requirement |
|---|---|---|
| `@acronis-platform/shadcn-uikit/styles` | Full compiled CSS (tokens + components + utilities) | None — drop-in import |
| `@acronis-platform/shadcn-uikit/styles/tokens` | CSS custom properties only | None |
| `@acronis-platform/shadcn-uikit/styles/components` | Per-component styles only | Tokens loaded separately |
| `@acronis-platform/shadcn-uikit/tailwind-preset` | Tailwind preset | Tailwind in consumer project |

**Tailwind consumers**: import the preset, Tailwind generates styles at their build time.
**CSS-only consumers**: import the full styles path. No Tailwind required in their project.

### Build pipeline

The Tailwind content scan (`src/**/*.tsx`) continues to work identically post-migration. The compiled CSS output will use `[data-open]` selectors instead of `[data-state=open]` — same visual coverage, different selector syntax. Drop-in replacement for consumers.

---

## 3. Theming

### No changes

The entire theming system is unchanged:

- SCSS theme files: `src/styles/themes/acronis-default.scss`, `acronis-electric.scss`, `acronis-ocean.scss`, `acronis-white-label.scss`
- CSS custom property naming: `--av-*` semantic tokens, `--color-*` primitives
- Theme switcher utility: `src/utils/theme-switcher.ts`
- Package exports: `./styles/themes`, `./styles/themes/acronis-default`, `./styles/themes/acronis-ocean`, `./styles/themes/cyber-chat` (as defined in `package.json`)
- Light/dark mode: `next-themes` integration unchanged

Base UI components are fully headless — they add no opinion on colors or spacing. Components reference `var(--av-primary)`, `var(--av-background)` etc. in Tailwind classes which compile to CSS referencing those same variables.

### Per-component verification

During migration of each component, verify that focus ring, disabled state, and hover state styles (which reference `--av-ring`, `--av-border`, etc.) are correctly mapped to Base UI's data-attributes.

---

## 4. Visual Regression in Docker

### Stack

Keep existing: Storybook + `@storybook/test-runner` + `jest-image-snapshot`. Add Docker wrapper for environment consistency.

### Files added

**`docker-compose.storybook.yml`** at repo root — two services:

```yaml
services:
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.storybook
    ports:
      - "6006:6006"
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:6006 || exit 1"]
      interval: 5s
      timeout: 3s
      retries: 20

  test-runner:
    build:
      context: .
      dockerfile: Dockerfile.storybook
    command: pnpm storybook:test:visual -- --url http://storybook:6006
    depends_on:
      storybook:
        condition: service_healthy
    environment:
      - TARGET_URL=http://storybook:6006
```

> Uses `wget` (not `curl`) in the healthcheck — the Playwright base image includes `wget` but not `curl`.

**`Dockerfile.storybook`** at repo root — based on `mcr.microsoft.com/playwright` (pinned to match the `@playwright/test` version in `package.json`). Installs pnpm, installs deps, builds Storybook static output.

### Snapshot storage

Baseline snapshots: `packages/ui/src/components/ui/__stories__/__snapshots__/`
Committed to git. Mismatch = CI failure.
Update baselines: `pnpm storybook:test:visual:docker:update`

### Scripts added to `packages/ui/package.json`

```json
"storybook:test:visual:docker": "docker compose -f ../../docker-compose.storybook.yml up --abort-on-container-exit --exit-code-from test-runner",
"storybook:test:visual:docker:update": "docker compose -f ../../docker-compose.storybook.yml run test-runner --updateSnapshot"
```

### GitHub Actions workflow

**`.github/workflows/visual-regression.yml`**:

```yaml
name: Visual Regression

on: [push, pull_request]

jobs:
  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run visual regression tests
        run: docker compose -f docker-compose.storybook.yml up --abort-on-container-exit --exit-code-from test-runner

      - name: Upload diff artifacts on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-regression-diffs
          path: packages/ui/src/components/ui/__stories__/__snapshots__/__diff_output__/
```

`ubuntu-latest` runners have Docker and `docker compose` pre-installed. No extra setup or secrets needed.

---

## 5. Migration Order

Recommended sequence to minimize risk:

1. **Docker + visual regression setup** — establish baseline snapshots before any component changes
2. **Simple stateless components** — Separator, Progress
3. **Form controls** — Checkbox, Switch, RadioGroup
4. **Overlay components** — Tooltip, Popover, Dialog, Sheet, AlertDialog
5. **Complex components** — Select (consolidate base-select.tsx), DropdownMenu, Accordion, Tabs, ScrollArea, Command, Collapsible
6. **New components** — Slider, NumberField, ToggleGroup
7. **Dependency cleanup** — remove unused `@radix-ui/*` packages; retain `@radix-ui/react-slot`, `@radix-ui/react-label`, `@radix-ui/react-avatar`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-visually-hidden`

Each step: migrate component → run visual regression → fix diffs → commit.

---

## Out of Scope

- Migrating Vue components (separate package/track)
- Changing theming architecture
- Changing the public component API or prop names
- Replacing CVA or Tailwind with a different styling approach
- Migrating `label.tsx` / `form.tsx` away from `@radix-ui/react-label` (no Base UI equivalent yet)
- Server components (React Server Components support)