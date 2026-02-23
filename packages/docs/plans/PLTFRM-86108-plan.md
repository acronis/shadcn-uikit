# PLTFRM-86108: Clarify Requirements for Patterns, Layouts and Generic Components

## Jira Task

**[UI-Kit][React] Clarify requirements for patterns, layouts and generic components**

- Prepare requirements for patterns, layouts and generic components
- Cover generic components with demos

## Decisions (Finalized)

| Decision               | Choice                                                                         | Rationale                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Scope**              | **C) Full** — all generic components, all layout components, all pattern demos | Maximum reusability for consuming teams                                                            |
| **Design source**      | **Derive from shadcn/ui blocks**                                               | Follow shadcn/ui's block patterns (dashboard, sidebar, login) adapted to Acronis design tokens     |
| **Pattern demo depth** | **Semi-functional**                                                            | Real components with mock data, no routing/state management. Good balance of usefulness vs effort  |
| **AppShell approach**  | **Independent from Sidebar**                                                   | AppShell has its own sidebar slot, doesn't depend on the existing Sidebar component. More flexible |
| **Radix primitives**   | **Include**                                                                    | Collapsible, AspectRatio, VisuallyHidden — small (~20 lines each), standard in shadcn/ui           |

---

## 1. Definitions

| Term                  | Meaning                                                                                                                | Example                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Pattern**           | A reusable composition of multiple components that solves a common UX problem. Not a single component — it's a recipe. | "Page header with breadcrumb + title + actions", "Filter bar + data table + pagination" |
| **Layout**            | A structural shell that arranges content areas on screen. Provides slots for header, sidebar, content, footer.         | "Sidebar + main content", "Login centered card", "Dashboard grid"                       |
| **Generic Component** | A low-level, domain-agnostic building block that is used across many patterns and layouts.                             | Container, Stack, PageHeader, Section, Divider, AspectRatio                             |

---

## 2. Current State Audit

### What EXISTS in the codebase today

#### Layouts (in demo app, NOT in ui library)

| Layout                                 | Location                                  | Reusable?                   |
| -------------------------------------- | ----------------------------------------- | --------------------------- |
| Sidebar + Main                         | `demo/src/layouts/Layout.tsx`             | ❌ Demo-only, hardcoded nav |
| App Layout (sidebar + header + outlet) | `demo/src/app/layout/AppLayout.tsx`       | ❌ Demo-only                |
| Login (centered card)                  | `demo/src/app/routes/login/LoginPage.tsx` | ❌ Demo-only                |

#### Patterns (in demo app, NOT in ui library)

| Pattern                                       | Location                                           | Reusable?    |
| --------------------------------------------- | -------------------------------------------------- | ------------ |
| Dashboard (metrics cards + charts + activity) | `demo/src/app/routes/dashboard/DashboardPage.tsx`  | ❌ Demo-only |
| Settings (tabs + form sections)               | `demo/src/app/routes/settings/SettingsPage.tsx`    | ❌ Demo-only |
| Data management (table + CRUD dialogs)        | `demo/src/app/routes/data/DataTablePage.tsx`       | ❌ Demo-only |
| Container responsive                          | `demo/src/demos/container/ContainerResponsive.tsx` | ❌ Demo-only |

#### Generic Components (in ui library)

| Component                          | File                 | Status                   |
| ---------------------------------- | -------------------- | ------------------------ |
| Card (+ Header, Content, Footer)   | `ui/card.tsx`        | ✅ Exists                |
| Separator                          | `ui/separator.tsx`   | ✅ Exists                |
| Skeleton                           | `ui/skeleton.tsx`    | ✅ Exists                |
| ScrollArea                         | `ui/scroll-area.tsx` | ✅ Exists                |
| Resizable (panels)                 | `ui/resizable.tsx`   | ✅ Exists                |
| Sheet (slide-over panel)           | `ui/sheet.tsx`       | ✅ Exists                |
| Sidebar (full compound component)  | `ui/sidebar.tsx`     | ✅ Exists                |
| Widget (+ Header, Content, Footer) | `ui/widget.tsx`      | ✅ Exists (PLTFRM-86107) |

### What's MISSING

#### Missing Generic Components (should be in `packages/ui`)

| Component          | Purpose                                                             | Priority  |
| ------------------ | ------------------------------------------------------------------- | --------- |
| **PageHeader**     | Title + description + breadcrumb + actions row. Used on every page. | 🔴 High   |
| **PageContent**    | Wrapper with consistent padding/max-width for page body.            | 🔴 High   |
| **Section**        | Titled content section with optional description and divider.       | 🔴 High   |
| **Stack**          | Vertical/horizontal flex container with gap control.                | 🟡 Medium |
| **Grid**           | Responsive CSS grid wrapper with preset column configs.             | 🟡 Medium |
| **AspectRatio**    | Maintains aspect ratio for media/chart containers.                  | 🟢 Low    |
| **Collapsible**    | Expandable/collapsible content section.                             | 🟡 Medium |
| **VisuallyHidden** | Accessibility helper for screen-reader-only content.                | 🟢 Low    |

#### Missing Layout Components (should be in `packages/ui`)

| Layout              | Purpose                                                                                               | Priority  |
| ------------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| **AppShell**        | Full-page shell: sidebar + header + main content area. Configurable sidebar position, collapsibility. | 🔴 High   |
| **AuthLayout**      | Centered card layout for login/signup/forgot-password flows.                                          | 🟡 Medium |
| **DashboardLayout** | Grid-based layout for widget/card placement with responsive breakpoints.                              | 🟡 Medium |
| **SplitLayout**     | Two-panel layout (master-detail, list-detail).                                                        | 🟢 Low    |

#### Missing Patterns (should be demos showing composition)

| Pattern                  | Components Used                                                        | Priority  |
| ------------------------ | ---------------------------------------------------------------------- | --------- |
| **Dashboard Page**       | AppShell + PageHeader + Grid + Widget cards + Charts                   | 🔴 High   |
| **Settings Page**        | AppShell + PageHeader + Tabs + Form sections + Card                    | 🔴 High   |
| **Data Management Page** | AppShell + PageHeader + Filter + DataTable + Pagination + CRUD dialogs | 🔴 High   |
| **Login Page**           | AuthLayout + Card + Form + Input + Button                              | 🟡 Medium |
| **Signup Page**          | AuthLayout + Card + Form + Steps/Progress                              | 🟡 Medium |
| **Profile Page**         | AppShell + PageHeader + Card + Avatar + Form                           | 🟡 Medium |
| **Error Pages**          | AuthLayout or AppShell + Empty state (404, 500, 403)                   | 🟡 Medium |
| **Onboarding / Wizard**  | Dialog or full-page + Steps + Form + Progress                          | 🟢 Low    |
| **Notification Center**  | Sheet or Popover + List + Badge + Alert items                          | 🟢 Low    |
| **Command Palette**      | Command + Dialog + Keyboard shortcuts                                  | 🟢 Low    |

---

## 3. Proposed Deliverables

### 3A. Generic Components → `packages/ui/src/components/ui/`

```
page-header.tsx      — PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderActions, PageHeaderBreadcrumb
page-content.tsx     — PageContent (max-width + padding wrapper)
section.tsx          — Section, SectionHeader, SectionTitle, SectionDescription, SectionContent
stack.tsx            — Stack (vertical/horizontal, gap, align, justify)
grid.tsx             — Grid (responsive columns, gap)
collapsible.tsx      — Collapsible, CollapsibleTrigger, CollapsibleContent (Radix-based)
aspect-ratio.tsx     — AspectRatio (Radix-based)
visually-hidden.tsx  — VisuallyHidden (Radix-based)
```

### 3B. Layout Components → `packages/ui/src/components/ui/`

```
app-shell.tsx        — AppShell, AppShellSidebar, AppShellHeader, AppShellMain, AppShellFooter
auth-layout.tsx      — AuthLayout, AuthLayoutCard, AuthLayoutLogo, AuthLayoutFooter
dashboard-layout.tsx — DashboardLayout, DashboardGrid (responsive widget grid)
split-layout.tsx     — SplitLayout, SplitLayoutPanel
```

### 3C. Pattern Demos → `packages/demo/src/demos/patterns/`

Each pattern is a **demo-only** file that composes library components:

```
patterns/
├── DashboardPattern.tsx       — Full dashboard page example
├── SettingsPattern.tsx        — Settings page with tabs + forms
├── DataManagementPattern.tsx  — Table + CRUD + filters
├── LoginPattern.tsx           — Login page with form
├── SignupPattern.tsx          — Signup page with form
├── ProfilePattern.tsx         — Profile page with avatar + form
├── ErrorPagesPattern.tsx      — 404, 500, 403 error pages
├── NotificationPattern.tsx    — Notification center
├── WizardPattern.tsx          — Multi-step onboarding
└── index.ts
```

### 3D. Demo Page → `packages/demo/src/components/PatternsDemo.tsx`

A tabbed demo page accessible at `/patterns` showing all pattern demos with source code.

---

## 4. Implementation Phases

### Phase 1: Generic Components (High Priority)

1. `page-header.tsx` — PageHeader compound component
2. `page-content.tsx` — PageContent wrapper
3. `section.tsx` — Section compound component
4. Export from `react.ts`
5. Demo: `GenericComponentsDemo.tsx` at `/generic-components`

### Phase 2: Layout Components

6. `app-shell.tsx` — AppShell compound component
7. `auth-layout.tsx` — AuthLayout
8. `dashboard-layout.tsx` — DashboardLayout
9. Export from `react.ts`
10. Demo: `LayoutsDemo.tsx` at `/layouts`

### Phase 3: Pattern Demos

11. Dashboard pattern demo
12. Settings pattern demo
13. Data management pattern demo
14. Login/Signup pattern demos
15. Error pages pattern demo
16. Demo page: `PatternsDemo.tsx` at `/patterns`

### Phase 4: Medium/Low Priority Components

17. `stack.tsx`, `grid.tsx`
18. `collapsible.tsx`, `aspect-ratio.tsx`, `visually-hidden.tsx`
19. `split-layout.tsx`
20. Additional pattern demos (Wizard, Notification, Command Palette)

---

## 5. Design Principles

1. **Composition over configuration** — Layouts and patterns are built by composing small generic components, not by passing dozens of props to a monolithic component.
2. **Slot-based API** — Each layout provides named slots (header, sidebar, content, footer) as compound components.
3. **Responsive by default** — All layouts and grids adapt to mobile/tablet/desktop.
4. **Theme-aware** — Use existing design tokens (`--av-*` CSS variables) for colors, spacing, typography.
5. **Accessible** — Proper ARIA landmarks (`<main>`, `<nav>`, `<aside>`, `<header>`), keyboard navigation, focus management.
6. **Patterns are demos, not library code** — Patterns show how to compose library components. They live in `packages/demo`, not `packages/ui`.

---

## 7. Dependencies

- All existing `packages/ui` components (Card, Sidebar, Tabs, Form, etc.)
- Radix UI primitives (for Collapsible, AspectRatio, VisuallyHidden)
- No new external dependencies expected

## 8. Acceptance Criteria

### Generic Components

- [ ] `page-header.tsx` — PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderActions, PageHeaderBreadcrumb
- [ ] `page-content.tsx` — PageContent wrapper
- [ ] `section.tsx` — Section, SectionHeader, SectionTitle, SectionDescription, SectionContent
- [ ] `stack.tsx` — Stack (vertical/horizontal, gap, align, justify)
- [ ] `grid.tsx` — Grid (responsive columns, gap)
- [ ] `collapsible.tsx` — Collapsible, CollapsibleTrigger, CollapsibleContent
- [ ] `aspect-ratio.tsx` — AspectRatio
- [ ] `visually-hidden.tsx` — VisuallyHidden

### Layout Components

- [ ] `app-shell.tsx` — AppShell (independent sidebar slot, header, main, footer)
- [ ] `auth-layout.tsx` — AuthLayout, AuthLayoutCard, AuthLayoutLogo, AuthLayoutFooter
- [ ] `dashboard-layout.tsx` — DashboardLayout, DashboardGrid
- [ ] `split-layout.tsx` — SplitLayout, SplitLayoutPanel

### Pattern Demos (semi-functional with mock data)

- [ ] Dashboard pattern demo
- [ ] Settings pattern demo
- [ ] Data management pattern demo
- [ ] Login pattern demo
- [ ] Signup pattern demo
- [ ] Profile pattern demo
- [ ] Error pages pattern demo (404, 500, 403)
- [ ] Wizard/Onboarding pattern demo
- [ ] Notification center pattern demo
- [ ] Command palette pattern demo

### Integration

- [ ] All components exported from `react.ts`
- [ ] Route `/patterns` accessible in demo app
- [ ] Route `/layouts` accessible in demo app
- [ ] Route `/generic-components` accessible in demo app
- [ ] Sidebar navigation entries added
- [ ] Home page navigation cards added
- [ ] All builds pass (`pnpm build` in both `packages/ui` and `packages/demo`)

---

## 9. Estimation

| Phase                         | Items                                     | Est. Effort |
| ----------------------------- | ----------------------------------------- | ----------- |
| Phase 1: Generic Components   | 8 components + demo page                  | ~1 day      |
| Phase 2: Layout Components    | 4 components + demo page                  | ~1 day      |
| Phase 3: Pattern Demos (High) | 3 patterns + demo page                    | ~1 day      |
| Phase 4: Remaining            | 7 pattern demos + low-priority components | ~2 days     |
| **Total**                     |                                           | **~5 days** |
