# Base UI Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `packages/ui` headless primitives from `@radix-ui/*` to `@base-ui/react`, keeping the public component API identical and adding Docker-based visual regression CI.

**Architecture:** In-place file-by-file rewrite following the shadcn Base UI track pattern. Each component file that wraps a Radix primitive is rewritten to import from `@base-ui/react` instead, with data-attribute selectors updated from `data-[state=X]` to `data-X`. Pure-Tailwind components (Button, Badge, etc.) and Radix-only components (Avatar, NavigationMenu, etc.) are untouched.

**Tech Stack:** `@base-ui/react ^1.0.0` (already installed), Tailwind CSS + CVA, SCSS themes, Storybook + `@storybook/test-runner` + `jest-image-snapshot`, Docker (Playwright image), GitHub Actions.

---

## Import pattern reference

All Base UI imports use the namespace pattern:
```ts
import { Accordion } from '@base-ui/react'
// then: Accordion.Root, Accordion.Item, Accordion.Header, Accordion.Trigger, Accordion.Panel
```

Available namespaces: `Accordion`, `AlertDialog`, `Checkbox`, `Collapsible`, `Dialog`, `Menu`, `NumberField`, `Popover`, `Progress`, `Radio`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Slider`, `Switch`, `Tabs`, `Tooltip`, `ToggleGroup`.

## Data-attribute cheatsheet

| Replace in className strings | With |
|---|---|
| `data-[state=open]:` | `data-open:` |
| `data-[state=closed]:` | `data-closed:` |
| `data-[state=checked]:` | `data-checked:` |
| `data-[state=unchecked]:` | `data-unchecked:` |
| `data-[state=active]:` | `data-active:` |
| `data-[state=open]>svg` | `data-open>svg` (same, just no brackets) |
| `--radix-popover-content-transform-origin` | verify in Base UI docs |
| `--radix-dropdown-menu-content-available-height` | verify in Base UI docs |

`data-[side=*]`, `data-[highlighted]`, `data-[disabled]` — unchanged, same in Base UI.

---

## Task 1: Docker + visual regression baseline

**Files:**
- Create: `Dockerfile.storybook` (repo root)
- Create: `docker-compose.storybook.yml` (repo root)
- Create: `.github/workflows/visual-regression.yml`
- Modify: `packages/ui/package.json` (add 2 scripts)

- [ ] **Step 1: Create `Dockerfile.storybook`**

```dockerfile
# Dockerfile.storybook
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.27.0

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ui/package.json ./packages/ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/ui ./packages/ui

WORKDIR /app/packages/ui

# Default command — override in docker-compose
CMD ["pnpm", "storybook:build"]
```

- [ ] **Step 2: Create `docker-compose.storybook.yml`**

```yaml
# docker-compose.storybook.yml
services:
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.storybook
    command: sh -c "pnpm storybook:build && npx http-server storybook-static -p 6006 --silent"
    ports:
      - "6006:6006"
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:6006 || exit 1"]
      interval: 5s
      timeout: 3s
      retries: 30

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

- [ ] **Step 3: Add http-server dev dependency**

In `packages/ui/package.json`, add to `devDependencies`:
```json
"http-server": "^14.1.1"
```

Run: `pnpm install`

- [ ] **Step 4: Add Docker scripts to `packages/ui/package.json`**

In the `scripts` block add:
```json
"storybook:test:visual:docker": "docker compose -f ../../docker-compose.storybook.yml up --abort-on-container-exit --exit-code-from test-runner",
"storybook:test:visual:docker:update": "docker compose -f ../../docker-compose.storybook.yml run --rm test-runner pnpm storybook:test:visual -- --url http://storybook:6006 --updateSnapshot"
```

- [ ] **Step 5: Create GitHub Actions workflow**

```yaml
# .github/workflows/visual-regression.yml
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

- [ ] **Step 6: Build Storybook locally and capture baseline snapshots**

```bash
cd packages/ui
pnpm storybook:build
pnpm storybook:test:visual:update  # creates baseline snapshots in src/components/ui/__stories__/__snapshots__/
```

Expected: snapshot files created in `packages/ui/src/components/ui/__stories__/__snapshots__/`

- [ ] **Step 7: Commit baseline**

```bash
git add Dockerfile.storybook docker-compose.storybook.yml .github/workflows/visual-regression.yml packages/ui/package.json packages/ui/src/components/ui/__stories__/__snapshots__/
git commit -m "chore: add Docker visual regression setup with baseline snapshots"
```

---

## Task 2: Migrate `separator.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/separator.tsx`

**Note:** Base UI `Separator` does not have a `decorative` prop — it handles ARIA role automatically. The prop is dropped from the public interface (it was an internal accessibility hint, not part of the visual API).

- [ ] **Step 1: Rewrite `separator.tsx`**

```tsx
import * as React from 'react'
import { Separator as SeparatorPrimitive } from '@base-ui/react'

import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive> & { decorative?: boolean }
>(({ className, orientation = 'horizontal', decorative: _decorative, ...props }, ref) => (
  <SeparatorPrimitive
    ref={ref}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-primary/10',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
))
Separator.displayName = 'Separator'

export { Separator }
```

- [ ] **Step 2: Type-check**

```bash
cd packages/ui && pnpm type-check
```
Expected: no errors

- [ ] **Step 3: Run visual regression**

```bash
pnpm storybook:build && pnpm storybook:test:visual
```
Expected: PASS (no visual change)

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/components/ui/separator.tsx
git commit -m "feat(separator): migrate to Base UI primitive"
```

---

## Task 3: Migrate `progress.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/progress.tsx`

**Note:** Base UI Progress structure is `Progress.Root > Progress.Track > Progress.Indicator`. The current component omits the Track wrapper — add it for correct Base UI usage.

- [ ] **Step 1: Rewrite `progress.tsx`**

```tsx
'use client'

import * as React from 'react'
import { Progress } from '@base-ui/react'

import { cn } from '@/lib/utils'

const ProgressBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Progress.Root>
>(({ className, value, ...props }, ref) => (
  <Progress.Root
    ref={ref}
    value={value}
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
    {...props}
  >
    <Progress.Track className="h-full w-full">
      <Progress.Indicator
        className="h-full bg-primary transition-all"
        style={{ width: `${value ?? 0}%` }}
      />
    </Progress.Track>
  </Progress.Root>
))
ProgressBar.displayName = 'Progress'

export { ProgressBar as Progress }
```

- [ ] **Step 2: Type-check**

```bash
cd packages/ui && pnpm type-check
```

- [ ] **Step 3: Run visual regression**

```bash
pnpm storybook:build && pnpm storybook:test:visual
```
Expected: PASS. If the indicator render differs visually (width vs translateX), update snapshot: `pnpm storybook:test:visual:update`

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/components/ui/progress.tsx
git commit -m "feat(progress): migrate to Base UI primitive"
```

---

## Task 4: Migrate `checkbox.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/checkbox.tsx`

**Note:** Base UI Checkbox uses `data-checked` / `data-unchecked` (not `data-[state=checked]`). The `checked='indeterminate'` value is preserved as Base UI also supports it.

- [ ] **Step 1: Rewrite `checkbox.tsx`**

```tsx
import * as React from 'react'
import { Checkbox } from '@base-ui/react'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'

const CheckboxComponent = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Checkbox.Root>
>(({ className, checked, ...props }, ref) => (
  <Checkbox.Root
    ref={ref}
    checked={checked}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border bg-background border-input/30 transition-colors',
      'hover:border-input/50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:bg-muted/10 disabled:border-muted/10',
      'data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground',
      'data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <Checkbox.Indicator className={cn('flex items-center justify-center text-current')}>
      {checked === 'indeterminate' ? (
        <Minus className="h-3 w-3" />
      ) : (
        <Check className="h-3 w-3" />
      )}
    </Checkbox.Indicator>
  </Checkbox.Root>
))
CheckboxComponent.displayName = 'Checkbox'

export { CheckboxComponent as Checkbox }
```

- [ ] **Step 2: Type-check**

```bash
cd packages/ui && pnpm type-check
```

- [ ] **Step 3: Run visual regression**

```bash
pnpm storybook:build && pnpm storybook:test:visual
```

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/components/ui/checkbox.tsx
git commit -m "feat(checkbox): migrate to Base UI primitive"
```

---

## Task 5: Migrate `switch.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/switch.tsx`

- [ ] **Step 1: Rewrite `switch.tsx`**

```tsx
import * as React from 'react'
import { Switch } from '@base-ui/react'

import { cn } from '@/lib/utils'

const SwitchComponent = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Switch.Root>
>(({ className, ...props }, ref) => (
  <Switch.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <Switch.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-checked:translate-x-5 data-unchecked:translate-x-0'
      )}
    />
  </Switch.Root>
))
SwitchComponent.displayName = 'Switch'

export { SwitchComponent as Switch }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/switch.tsx
git commit -m "feat(switch): migrate to Base UI primitive"
```

---

## Task 6: Migrate `radio-group.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/radio-group.tsx`

**Note:** Base UI splits this into two imports: `RadioGroup` (the group container) and `Radio` (individual item + indicator). `RadioGroup` is a flat export, `Radio` is a namespace (`Radio.Root`, `Radio.Indicator`).

- [ ] **Step 1: Rewrite `radio-group.tsx`**

```tsx
import * as React from 'react'
import { RadioGroup, Radio } from '@base-ui/react'
import { Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

const RadioGroupComponent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadioGroup>
>(({ className, ...props }, ref) => {
  return <RadioGroup className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroupComponent.displayName = 'RadioGroup'

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Radio.Root>
>(({ className, ...props }, ref) => {
  return (
    <Radio.Root
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Radio.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </Radio.Indicator>
    </Radio.Root>
  )
})
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroupComponent as RadioGroup, RadioGroupItem }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/radio-group.tsx
git commit -m "feat(radio-group): migrate to Base UI primitive"
```

---

## Task 7: Migrate `collapsible.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/collapsible.tsx`

**Note:** `Collapsible.Content` → `Collapsible.Panel`. `CollapsibleTrigger` stays as trigger name. The re-export names `CollapsibleTrigger` and `CollapsibleContent` remain the same for API compatibility.

- [ ] **Step 1: Rewrite `collapsible.tsx`**

```tsx
'use client'

import { Collapsible } from '@base-ui/react'

const CollapsibleComponent = Collapsible.Root
const CollapsibleTrigger = Collapsible.Trigger
const CollapsibleContent = Collapsible.Panel

export { CollapsibleComponent as Collapsible, CollapsibleTrigger, CollapsibleContent }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/collapsible.tsx
git commit -m "feat(collapsible): migrate to Base UI primitive"
```

---

## Task 8: Migrate `tabs.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/tabs.tsx`

**Note:** `Tabs.Trigger` → `Tabs.Tab`. `Tabs.Content` → `Tabs.Panel`. The `data-[state=active]` selector becomes `data-active`. Export names stay the same.

- [ ] **Step 1: Rewrite `tabs.tsx`**

```tsx
import * as React from 'react'
import { Tabs } from '@base-ui/react'

import { cn } from '@/lib/utils'

const TabsComponent = Tabs.Root

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.List>
>(({ className, ...props }, ref) => (
  <Tabs.List
    ref={ref}
    className={cn('inline-flex items-stretch rounded-md', className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Tab>
>(({ className, ...props }, ref) => (
  <Tabs.Tab
    ref={ref}
    className={cn(
      'inline-flex flex-1 items-center justify-center whitespace-nowrap border border-primary px-2 py-1 text-sm font-semibold text-primary transition-all -mr-px first:rounded-l-md last:rounded-r-md last:mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-primary/10 data-active:text-foreground',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tabs.Panel>
>(({ className, ...props }, ref) => (
  <Tabs.Panel
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'

export { TabsComponent as Tabs, TabsList, TabsTrigger, TabsContent }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/tabs.tsx
git commit -m "feat(tabs): migrate to Base UI primitive"
```

---

## Task 9: Migrate `tooltip.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/tooltip.tsx`

**Note:** Base UI Tooltip introduces `Tooltip.Positioner` between portal and popup. The `TooltipContent` in our API maps to `Positioner + Popup` together. `TooltipProvider` maps to `Tooltip.Provider`. The `sideOffset` prop moves to `Positioner`. The `TooltipArrow` maps to `Tooltip.Arrow` inside the Popup.

- [ ] **Step 1: Rewrite `tooltip.tsx`**

```tsx
import * as React from 'react'
import { Tooltip } from '@base-ui/react'

import { cn } from '@/lib/utils'

const TooltipProvider = Tooltip.Provider

const TooltipComponent = Tooltip.Root

const TooltipTrigger = Tooltip.Trigger

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tooltip.Popup> & {
    sideOffset?: number
    side?: React.ComponentPropsWithoutRef<typeof Tooltip.Positioner>['side']
    align?: React.ComponentPropsWithoutRef<typeof Tooltip.Positioner>['alignment']
  }
>(({ className, sideOffset = 5, side = 'top', align, children, ...props }, ref) => (
  <Tooltip.Portal>
    <Tooltip.Positioner side={side} alignment={align} sideOffset={sideOffset}>
      <Tooltip.Popup
        ref={ref}
        className={cn(
          'z-50 overflow-hidden rounded bg-popover px-4 py-4 text-xs font-medium leading-4 text-popover-foreground shadow-[0px_10px_20px_rgba(36,49,67,0.2)] animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
))
TooltipContent.displayName = 'TooltipContent'

const TooltipArrow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Tooltip.Arrow>
>(({ className, ...props }, ref) => (
  <Tooltip.Arrow
    ref={ref}
    className={cn('fill-popover', className)}
    width={10}
    height={5}
    {...props}
  />
))
TooltipArrow.displayName = 'TooltipArrow'

export { TooltipComponent as Tooltip, TooltipTrigger, TooltipContent, TooltipArrow, TooltipProvider }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/tooltip.tsx
git commit -m "feat(tooltip): migrate to Base UI primitive"
```

---

## Task 10: Migrate `popover.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/popover.tsx`

**Note:** Base UI Popover uses `Positioner > Popup` instead of `Content`. Remove `origin-[--radix-popover-content-transform-origin]` — check Base UI docs for equivalent or just remove it (Base UI handles transform origin internally).

- [ ] **Step 1: Rewrite `popover.tsx`**

```tsx
import * as React from 'react'
import { Popover } from '@base-ui/react'

import { cn } from '@/lib/utils'

const PopoverComponent = Popover.Root

const PopoverTrigger = Popover.Trigger

const PopoverPortal = Popover.Portal

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Popover.Popup> & {
    align?: React.ComponentPropsWithoutRef<typeof Popover.Positioner>['alignment']
    sideOffset?: number
    portal?: boolean
    side?: React.ComponentPropsWithoutRef<typeof Popover.Positioner>['side']
  }
>(({ className, align = 'center', sideOffset = 4, portal = true, side, children, ...props }, ref) => {
  const content = (
    <Popover.Positioner side={side} alignment={align} sideOffset={sideOffset}>
      <Popover.Popup
        ref={ref}
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
      </Popover.Popup>
    </Popover.Positioner>
  )

  return portal ? <Popover.Portal>{content}</Popover.Portal> : content
})
PopoverContent.displayName = 'PopoverContent'

export { PopoverComponent as Popover, PopoverTrigger, PopoverPortal, PopoverContent }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/popover.tsx
git commit -m "feat(popover): migrate to Base UI primitive"
```

---

## Task 11: Migrate `dialog.tsx` and update `command.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/dialog.tsx`
- Modify: `packages/ui/src/components/ui/command.tsx` (update `DialogProps` type import)

**Note:** Base UI Dialog maps: `Overlay` → `Backdrop`, `Content` → `Popup`. No separate `Portal` component needed (Base UI Dialog renders in a portal by default; use `Dialog.Portal` only if you need to specify container). `DialogClose` maps to `Dialog.Close`. There is no Base UI equivalent for `AlertDialogAction`/`AlertDialogCancel` — those are just styled `<button>` / `Dialog.Close`.

- [ ] **Step 1: Rewrite `dialog.tsx`**

```tsx
import * as React from 'react'
import { Dialog } from '@base-ui/react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const DialogComponent = Dialog.Root

const DialogTrigger = Dialog.Trigger

const DialogPortal = Dialog.Portal

const DialogClose = Dialog.Close

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup> & { portal?: boolean }
>(({ className, children, portal = true, ...props }, ref) => {
  const element = (
    <>
      <DialogOverlay />
      <Dialog.Popup
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded bg-muted shadow-[0px_10px_20px_rgba(36,49,67,0.9)] duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-closed:slide-out-to-left-1/2 data-closed:slide-out-to-top-dialog-offset data-open:slide-in-from-left-1/2 data-open:slide-in-from-top-dialog-offset',
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </>
  )

  return portal ? <Dialog.Portal>{element}</Dialog.Portal> : element
})
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex h-16 items-center gap-4 border-b border-border bg-card px-5 py-4', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex h-16 items-center justify-end gap-4 border-t border-border bg-card px-6 py-4', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('flex-1 text-2xl font-normal leading-8 text-foreground', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ className, ...props }, ref) => (
  <Dialog.Close
    ref={ref}
    className={cn(
      'rounded p-1 text-[#2668C5] opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      className
    )}
    {...props}
  >
    <X className="h-6 w-6" />
    <span className="sr-only">Close</span>
  </Dialog.Close>
))
DialogCloseButton.displayName = 'DialogCloseButton'

const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-auto p-6', className)} {...props} />
)
DialogBody.displayName = 'DialogBody'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

export {
  DialogComponent as Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogCloseButton,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogBody,
  DialogDescription,
}
```

- [ ] **Step 2: Update `command.tsx` — remove Radix type import**

In `packages/ui/src/components/ui/command.tsx`, find the line:
```ts
import { type DialogProps } from '@radix-ui/react-dialog'
```
Replace with:
```ts
import { type Dialog } from '@base-ui/react'
type DialogProps = React.ComponentPropsWithoutRef<typeof Dialog.Root>
```

- [ ] **Step 3: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/dialog.tsx packages/ui/src/components/ui/command.tsx
git commit -m "feat(dialog): migrate to Base UI primitive, update command.tsx type import"
```

---

## Task 12: Migrate `sheet.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/sheet.tsx`

**Note:** Sheet uses Dialog primitives (same as `dialog.tsx`). `SheetOverlay` → `Dialog.Backdrop`. `SheetPrimitive.Content` → `Dialog.Popup`. `data-[state=open]` → `data-open`, `data-[state=closed]` → `data-closed`.

- [ ] **Step 1: Rewrite `sheet.tsx`**

```tsx
'use client'

import * as React from 'react'
import { Dialog } from '@base-ui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Sheet = Dialog.Root

const SheetTrigger = Dialog.Trigger

const SheetClose = Dialog.Close

const SheetPortal = Dialog.Portal

const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-open:animate-in data-closed:animate-out data-closed:duration-300 data-open:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-closed:slide-out-to-top data-open:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-closed:slide-out-to-bottom data-open:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-closed:slide-out-to-left data-open:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-closed:slide-out-to-right data-open:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Popup>,
    VariantProps<typeof sheetVariants> {
  portal?: boolean
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = 'right', className, children, portal = true, ...props }, ref) => {
    const element = (
      <>
        <SheetOverlay />
        <Dialog.Popup ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
          {children}
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Popup>
      </>
    )

    return portal ? <Dialog.Portal>{element}</Dialog.Portal> : element
  }
)
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/sheet.tsx
git commit -m "feat(sheet): migrate to Base UI Dialog primitive"
```

---

## Task 13: Migrate `alert-dialog.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/alert-dialog.tsx`

**Note:** Base UI `AlertDialog` re-uses Dialog primitives internally (Backdrop, Popup, Title, Description, Close, Portal, Trigger). There is no `AlertDialogAction` or `AlertDialogCancel` in Base UI — replace with `Dialog.Close` styled with `buttonVariants`. `AlertDialogOverlay` → `AlertDialog.Backdrop`.

- [ ] **Step 1: Rewrite `alert-dialog.tsx`**

```tsx
import * as React from 'react'
import { AlertDialog } from '@base-ui/react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const AlertDialogComponent = AlertDialog.Root

const AlertDialogTrigger = AlertDialog.Trigger

const AlertDialogPortal = AlertDialog.Portal

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <AlertDialog.Backdrop
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = 'AlertDialogOverlay'

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Popup> & { portal?: boolean }
>(({ className, portal = true, ...props }, ref) => {
  const element = (
    <>
      <AlertDialogOverlay />
      <AlertDialog.Popup
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-closed:slide-out-to-left-1/2 data-closed:slide-out-to-top-dialog-offset data-open:slide-in-from-left-1/2 data-open:slide-in-from-top-dialog-offset sm:rounded-lg',
          className
        )}
        {...props}
      />
    </>
  )

  return portal ? <AlertDialog.Portal>{element}</AlertDialog.Portal> : element
})
AlertDialogContent.displayName = 'AlertDialogContent'

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Title>
>(({ className, ...props }, ref) => (
  <AlertDialog.Title ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Description>
>(({ className, ...props }, ref) => (
  <AlertDialog.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

// AlertDialogAction and AlertDialogCancel are now styled AlertDialog.Close buttons
// (Base UI AlertDialog has no separate Action/Cancel primitives)
const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Close>
>(({ className, ...props }, ref) => (
  <AlertDialog.Close ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = 'AlertDialogAction'

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AlertDialog.Close>
>(({ className, ...props }, ref) => (
  <AlertDialog.Close
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
    {...props}
  />
))
AlertDialogCancel.displayName = 'AlertDialogCancel'

export {
  AlertDialogComponent as AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/alert-dialog.tsx
git commit -m "feat(alert-dialog): migrate to Base UI primitive"
```

---

## Task 14: Migrate `accordion.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/accordion.tsx`

**Note:** `Accordion.Content` → `Accordion.Panel`. `Accordion.Header` is now a separate sub-component (required in Base UI). `data-[state=open]>svg` → `data-open>svg`.

- [ ] **Step 1: Rewrite `accordion.tsx`**

```tsx
'use client'

import * as React from 'react'
import { Accordion } from '@base-ui/react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

const AccordionComponent = Accordion.Root

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ className, ...props }, ref) => (
  <Accordion.Item ref={ref} className={cn('border-b', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Accordion.Trigger>
  </Accordion.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Panel>
>(({ className, children, ...props }, ref) => (
  <Accordion.Panel
    ref={ref}
    className="overflow-hidden text-sm transition-all data-closed:animate-accordion-up data-open:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </Accordion.Panel>
))
AccordionContent.displayName = 'AccordionContent'

export { AccordionComponent as Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/accordion.tsx
git commit -m "feat(accordion): migrate to Base UI primitive"
```

---

## Task 15: Migrate `dropdown-menu.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/dropdown-menu.tsx`

**Note:** Base UI `Menu` is the equivalent. Key mappings:
- `DropdownMenu.Root` → `Menu.Root`
- `DropdownMenu.Trigger` → `Menu.Trigger`
- `DropdownMenu.Content` → `Menu.Positioner > Menu.Popup`
- `DropdownMenu.Item` → `Menu.Item`
- `DropdownMenu.CheckboxItem` → `Menu.CheckboxItem` + `Menu.CheckboxItemIndicator`
- `DropdownMenu.RadioGroup` → `Menu.RadioGroup`
- `DropdownMenu.RadioItem` → `Menu.RadioItem` + `Menu.RadioItemIndicator`
- `DropdownMenu.Label` → `Menu.GroupLabel`
- `DropdownMenu.Separator` → no Base UI equivalent — use a styled `<div>` with the original Radix separator classes: `className={cn('-mx-1 my-1 h-px bg-muted', className)}`
- `DropdownMenu.Sub` → `Menu.SubmenuRoot`
- `DropdownMenu.SubTrigger` → `Menu.SubmenuTrigger`
- `DropdownMenu.SubContent` → `Menu.Positioner > Menu.Popup` (nested)
- `--radix-dropdown-menu-content-available-height` → check Base UI docs; use `max-h-[var(--available-height)]` or remove

Read the full current `dropdown-menu.tsx` before rewriting — it is 180+ lines. Follow the same component-by-component pattern, swapping each primitive. Keep all exported names identical.

- [ ] **Step 1: Read the full current file**

```bash
cat packages/ui/src/components/ui/dropdown-menu.tsx
```

- [ ] **Step 2: Rewrite `dropdown-menu.tsx`** (following mapping above, check Base UI docs for `DropdownMenuSeparator` equivalent and CSS variable name)

- [ ] **Step 3: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/dropdown-menu.tsx
git commit -m "feat(dropdown-menu): migrate to Base UI Menu primitive"
```

---

## Task 16: Migrate `scroll-area.tsx`

**Files:**
- Modify: `packages/ui/src/components/ui/scroll-area.tsx`

**Note:** Base UI `ScrollArea` adds `ScrollArea.Content` between `Viewport` and children. Structure: `Root > Viewport > Content > {children}`. `ScrollAreaScrollbar` → `ScrollArea.Scrollbar`. `ScrollAreaThumb` → `ScrollArea.Thumb`.

- [ ] **Step 1: Rewrite `scroll-area.tsx`**

```tsx
import * as React from 'react'
import { ScrollArea } from '@base-ui/react'

import { cn } from '@/lib/utils'

const ScrollAreaComponent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollArea.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollArea.Viewport className="h-full w-full rounded-[inherit]">
      <ScrollArea.Content>
        {children}
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollBar />
    <ScrollArea.Corner />
  </ScrollArea.Root>
))
ScrollAreaComponent.displayName = 'ScrollArea'

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ScrollArea.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-border" />
  </ScrollArea.Scrollbar>
))
ScrollBar.displayName = 'ScrollBar'

export { ScrollAreaComponent as ScrollArea, ScrollBar }
```

- [ ] **Step 2: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/scroll-area.tsx
git commit -m "feat(scroll-area): migrate to Base UI primitive"
```

---

## Task 17: Migrate `select.tsx` (consolidate `base-select.tsx`)

**Files:**
- Modify: `packages/ui/src/components/ui/select.tsx`
- Delete: `packages/ui/src/components/ui/base-select.tsx`
- Check: any files importing from `./base-select` — update to `./select`

**Note:** `base-select.tsx` already uses `@base-ui/react/select`. Use it as a reference for the Base UI Select API. The final `select.tsx` must export the same names as the original Radix-based `select.tsx`. Read both files before starting. Base UI Select uses `Select.Positioner > Select.Popup > Select.List` instead of Radix `Select.Content`.

- [ ] **Step 1: Read both files**

```bash
cat packages/ui/src/components/ui/select.tsx
cat packages/ui/src/components/ui/base-select.tsx
```

- [ ] **Step 2: Check for imports of base-select**

```bash
grep -r "base-select" packages/ui/src --include="*.tsx" --include="*.ts" -l
```

Update any found files to import from `./select` instead.

- [ ] **Step 3: Rewrite `select.tsx`** using Base UI Select API (reference `base-select.tsx` for the correct component structure and class names). Export all original names: `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectItemText`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`.

- [ ] **Step 4: Delete `base-select.tsx`**

```bash
git rm packages/ui/src/components/ui/base-select.tsx
```

- [ ] **Step 5: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual
git add packages/ui/src/components/ui/select.tsx
git commit -m "feat(select): consolidate base-select.tsx, migrate to Base UI primitive"
```

---

## Task 18: Add new component `slider.tsx`

**Files:**
- Create: `packages/ui/src/components/ui/slider.tsx`
- Create: `packages/ui/src/components/ui/__stories__/slider.stories.tsx`
- Modify: `packages/ui/src/react.ts` (add export)

**Note:** Base UI Slider structure: `Slider.Root > Slider.Control > Slider.Track > Slider.Indicator` + `Slider.Thumb`. `Slider.Value` for accessible value display.

- [ ] **Step 1: Create `slider.tsx`**

```tsx
import * as React from 'react'
import { Slider } from '@base-ui/react'

import { cn } from '@/lib/utils'

interface SliderProps extends React.ComponentPropsWithoutRef<typeof Slider.Root> {
  className?: string
}

const SliderComponent = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <Slider.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
      <Slider.Control className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <Slider.Track className="h-full w-full">
          <Slider.Indicator className="absolute h-full bg-primary" />
        </Slider.Track>
      </Slider.Control>
      <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  )
)
SliderComponent.displayName = 'Slider'

export { SliderComponent as Slider }
```

- [ ] **Step 2: Add story `slider.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { defaultValue: [50], min: 0, max: 100, step: 1 },
}

export const Range: Story = {
  args: { defaultValue: [20, 80], min: 0, max: 100 },
}
```

- [ ] **Step 3: Add export to `packages/ui/src/react.ts`**

Add: `export { Slider } from './components/ui/slider'`

- [ ] **Step 4: Type-check + visual regression + commit**

```bash
cd packages/ui && pnpm type-check && pnpm storybook:build && pnpm storybook:test:visual:update
git add packages/ui/src/components/ui/slider.tsx packages/ui/src/components/ui/__stories__/slider.stories.tsx packages/ui/src/react.ts
git commit -m "feat(slider): add new Slider component using Base UI primitive"
```

---

## Task 19: Add new component `number-field.tsx`

**Files:**
- Create: `packages/ui/src/components/ui/number-field.tsx`
- Create: `packages/ui/src/components/ui/__stories__/number-field.stories.tsx`
- Modify: `packages/ui/src/react.ts`

**Base UI NumberField structure:** `NumberField.Root > NumberField.Group > [NumberField.Decrement, NumberField.Input, NumberField.Increment]`

- [ ] **Step 1: Create `number-field.tsx`**

```tsx
import * as React from 'react'
import { NumberField } from '@base-ui/react'

import { cn } from '@/lib/utils'

const NumberFieldRoot = NumberField.Root
const NumberFieldGroup = NumberField.Group
const NumberFieldInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Input>
>(({ className, ...props }, ref) => (
  <NumberField.Input
    ref={ref}
    className={cn(
      'flex h-8 w-full rounded border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))
NumberFieldInput.displayName = 'NumberFieldInput'

const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Decrement>
>(({ className, ...props }, ref) => (
  <NumberField.Decrement
    ref={ref}
    className={cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-l border border-input bg-background text-sm disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
NumberFieldDecrement.displayName = 'NumberFieldDecrement'

const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof NumberField.Increment>
>(({ className, ...props }, ref) => (
  <NumberField.Increment
    ref={ref}
    className={cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-r border border-input bg-background text-sm disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
NumberFieldIncrement.displayName = 'NumberFieldIncrement'

export { NumberFieldRoot, NumberFieldGroup, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement }
```

- [ ] **Step 2: Add story + export + type-check + commit** (same pattern as Slider task)

---

## Task 20: Add new component `toggle-group.tsx`

**Files:**
- Create: `packages/ui/src/components/ui/toggle-group.tsx`
- Create: `packages/ui/src/components/ui/__stories__/toggle-group.stories.tsx`
- Modify: `packages/ui/src/react.ts`

**Note:** Base UI `ToggleGroup` is a flat export (not a namespace). Check `node_modules/@base-ui/react/toggle-group/ToggleGroup.d.ts` for props. Individual items use `Toggle` from `@base-ui/react/toggle`.

- [ ] **Step 1: Read Base UI ToggleGroup types**

```bash
cat packages/ui/node_modules/@base-ui/react/toggle-group/ToggleGroup.d.ts | head -40
cat packages/ui/node_modules/@base-ui/react/toggle/index.d.ts | head -20
```

- [ ] **Step 2: Create `toggle-group.tsx`** based on types found above, following the same `forwardRef` + Tailwind class pattern as other components.

- [ ] **Step 3: Add story + export + type-check + visual regression + commit**

---

## Task 21: Dependency cleanup

**Files:**
- Modify: `packages/ui/package.json`

- [ ] **Step 1: Identify which `@radix-ui/*` packages are still imported**

```bash
grep -r "from '@radix-ui" packages/ui/src --include="*.tsx" --include="*.ts" | grep -v "node_modules" | sort | uniq
```

- [ ] **Step 2: Identify packages that can be removed**

Based on Step 1, remove from `packages/ui/package.json` `dependencies` any `@radix-ui/*` packages that are no longer imported. The following must **stay** (used by files that keep Radix):
- `@radix-ui/react-slot` (button, breadcrumb, button-group, sidebar)
- `@radix-ui/react-label` (label, form)
- `@radix-ui/react-avatar` (avatar)
- `@radix-ui/react-aspect-ratio` (aspect-ratio)
- `@radix-ui/react-navigation-menu` (navigation-menu)
- `@radix-ui/react-visually-hidden` (visually-hidden)

- [ ] **Step 3: Run `pnpm install` to update lockfile**

```bash
pnpm install
```

- [ ] **Step 4: Type-check + build**

```bash
cd packages/ui && pnpm type-check && pnpm build
```

Expected: clean build, no missing dependency errors.

- [ ] **Step 5: Run full visual regression**

```bash
pnpm storybook:build && pnpm storybook:test:visual
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/package.json pnpm-lock.yaml
git commit -m "chore(deps): remove unused @radix-ui/* packages after Base UI migration"
```

---

## Completion checklist

- [ ] All 17 migrated component files pass `pnpm type-check`
- [ ] All 3 new component files pass `pnpm type-check`
- [ ] Visual regression passes for all stories
- [ ] `pnpm build` produces clean output
- [ ] No consumer-facing exports were removed or renamed
- [ ] Docker visual regression runs successfully (`pnpm storybook:test:visual:docker`)
- [ ] GitHub Actions workflow added
- [ ] Unused `@radix-ui/*` packages removed from `package.json`