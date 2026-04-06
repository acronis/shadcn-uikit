# DESIGN: Documentation Site for shadcn-uikit

Date: 2026-04-02
Status: Draft
Based on: [Exploration: Documentation Site Options](../explore/researcher.md)

## Context

`@acronis-platform/shadcn-uikit` is a React component library with 70+ component files, 42 demo categories, and 1500+ icons. It currently has markdown docs in `packages/docs/` (static `.md` files) and a Storybook instance for visual regression testing. The goal is a proper documentation site -- component pages with descriptions, live examples, and auto-generated API tables -- similar to base-ui.com or basecn.dev.

The research artifact recommends **Fumadocs** as the framework. This design specifies how to build it.

---

## 1. Package structure

### Location

The docs site lives at `packages/docs/` -- replacing the current static markdown files there (those files move to `packages/docs/legacy/` or are incorporated into the new site content).

### `packages/docs/package.json`

```jsonc
{
  "name": "@acronis-platform/shadcn-uikit-docs",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "fumadocs-mdx"
  },
  "dependencies": {
    // Framework
    "fumadocs-core": "^16.0.0",
    "fumadocs-ui": "^16.0.0",
    "fumadocs-mdx": "^12.0.0",
    "fumadocs-typescript": "^4.0.0",
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",

    // UI library (workspace link)
    "@acronis-platform/shadcn-uikit": "workspace:*",

    // Styles
    "tailwindcss": "^4.2.2",
    "@tailwindcss/postcss": "^4.2.2",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.5.3",
    "@types/mdx": "^2.0.0"
  }
}
```

### Key dependency decisions

| Dependency | Purpose | Notes |
|------------|---------|-------|
| `fumadocs-core` | Content source, routing, search index | Headless layer |
| `fumadocs-ui` | Pre-built layout, sidebar, TOC, code blocks | Customizable via Tailwind |
| `fumadocs-mdx` | MDX file processing, frontmatter, `source.config.ts` | Generates `.source/` manifest |
| `fumadocs-typescript` | `AutoTypeTable` component for props extraction | Uses TS Compiler API at build time |
| `next` | App Router, SSG/SSR, image optimization | New dependency for the monorepo |
| `@acronis-platform/shadcn-uikit` | Component imports for live examples, type definitions for API tables | Workspace link |

### Directory layout inside `packages/docs/`

```
packages/docs/
  app/
    (home)/
      page.tsx                  # Landing page
    docs/
      [[...slug]]/
        page.tsx                # Catch-all for all docs pages
      layout.tsx                # Docs layout with sidebar
    layout.tsx                  # Root layout (fonts, global styles)
    global.css                  # Tailwind + uikit styles import
  content/
    docs/
      getting-started.mdx
      theming.mdx
      components/
        button.mdx
        dialog.mdx
        ...                     # One MDX file per component
      icons.mdx
  components/
    demo-preview.tsx            # <DemoPreview> wrapper (preview + source toggle)
    component-page.tsx          # Shared layout for component pages (optional)
  lib/
    source.ts                   # Fumadocs source configuration
    demos.ts                    # Demo source code loader (build-time)
  source.config.ts              # Fumadocs MDX content source config
  next.config.ts
  tsconfig.json
  postcss.config.mjs
```

---

## 2. URL / page structure

```
/                              Landing page (library overview, quick links)
/docs/getting-started          Installation, quick start, framework setup
/docs/theming                  Theme switching, CSS custom properties, dark mode
/docs/components/button        Per-component page
/docs/components/dialog        Per-component page
/docs/components/...           40+ component pages
/docs/icons                    Icon catalog with search (1500+ icons)
```

### Fumadocs `source.config.ts`

```ts
import { defineDocs } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  dir: 'content/docs',
})
```

### Fumadocs source loader (`lib/source.ts`)

```ts
import { loader } from 'fumadocs-core/source'
import { docs } from '@/.source'

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: '/docs',
})
```

### Sidebar structure

Defined via `content/docs/meta.json`:

```json
{
  "title": "Docs",
  "pages": [
    "getting-started",
    "theming",
    "---Components---",
    "components/..."
  ]
}
```

Components are auto-discovered from `content/docs/components/` via Fumadocs folder conventions. A `content/docs/components/meta.json` controls ordering:

```json
{
  "title": "Components",
  "pages": ["button", "dialog", "dropdown-menu", "..."]
}
```

---

## 3. Per-component page structure

### MDX template

Each component page follows a consistent template. Here is `content/docs/components/button.mdx`:

```mdx
---
title: Button
description: A clickable button element that triggers actions. Supports multiple visual variants, sizes, and can render as a child component via Slot.
---

import { AutoTypeTable } from 'fumadocs-typescript/ui'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { DemoPreview } from '@/components/demo-preview'
import { ButtonVariants } from '@acronis-platform/shadcn-uikit-demo/demos/button'
import { ButtonSizes } from '@acronis-platform/shadcn-uikit-demo/demos/button'
import { ButtonDisabled } from '@acronis-platform/shadcn-uikit-demo/demos/button'

## Variants

The Button component supports seven visual variants for different contexts.

<DemoPreview
  name="ButtonVariants"
  sourcePath="packages/demo/src/demos/button/ButtonVariants.tsx"
>
  <ButtonVariants />
</DemoPreview>

## Sizes

<DemoPreview
  name="ButtonSizes"
  sourcePath="packages/demo/src/demos/button/ButtonSizes.tsx"
>
  <ButtonSizes />
</DemoPreview>

## Disabled

<DemoPreview
  name="ButtonDisabled"
  sourcePath="packages/demo/src/demos/button/ButtonDisabled.tsx"
>
  <ButtonDisabled />
</DemoPreview>

## API Reference

### Button

<AutoTypeTable path="../../ui/src/components/ui/button.tsx" name="ButtonProps" />
```

### `<DemoPreview>` component

This is the central reusable component for the docs site. It renders the live example and provides a source code toggle.

```tsx
// packages/docs/components/demo-preview.tsx
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'

interface DemoPreviewProps {
  children: React.ReactNode
  name: string
  sourcePath: string // relative to monorepo root
}

export function DemoPreview({ children, name, sourcePath }: DemoPreviewProps) {
  // Read source at build time (this is a Server Component)
  const absolutePath = path.resolve(process.cwd(), '..', '..', sourcePath)
  const source = readFileSync(absolutePath, 'utf-8')

  return (
    <div className="demo-preview">
      <div className="demo-preview__render">
        {children}
      </div>
      <details className="demo-preview__source">
        <summary>View source</summary>
        <CodeBlock lang="tsx" title={`${name}.tsx`}>
          <Pre>{source}</Pre>
        </CodeBlock>
      </details>
    </div>
  )
}
```

Key design choices:
- **Server Component**: `readFileSync` works because this runs at build time (Next.js SSG). No client-side file reading needed.
- **Source path is explicit**: Each MDX author specifies the path. This avoids magic file resolution.
- **Fumadocs CodeBlock**: Reuses the built-in syntax highlighting with copy button.

---

## 4. Demo component strategy

### Decision: Option B -- New `packages/demos` shared package

**Confirmed by user.**

| Option | Pros | Cons |
|--------|------|------|
| A: Import from `packages/demo` | Zero migration work | Demo package has extra deps not needed by docs |
| **B: New `packages/demos` shared package** | Clean separation; no extra deps in docs; single source of truth for demos | Migration effort |
| C: Co-locate demos in `packages/docs` | No cross-package deps | Duplication; demos drift from demo app |

### Rationale

The existing 42 demo categories with 100+ demo components are self-contained React components that import from `@acronis-platform/shadcn-uikit/react`. They work as-is in any React context. The extra dependencies in `packages/demo` (react-router-dom, zustand, etc.) are used by the demo app shell, not by individual demo components -- Next.js will tree-shake them.

### Required changes to `packages/demo`

1. Add an `exports` map to `packages/demo/package.json` so docs can import specific demo groups:

```jsonc
{
  "name": "@acronis-platform/shadcn-uikit-demo",
  "exports": {
    "./demos/*": "./src/demos/*/index.ts"
  }
}
```

2. Ensure each demo category has an `index.ts` barrel file (most already do, e.g., `packages/demo/src/demos/button/index.ts`).

3. The docs package depends on the demo package:

```jsonc
// in packages/docs/package.json
{
  "dependencies": {
    "@acronis-platform/shadcn-uikit-demo": "workspace:*"
  }
}
```

### Weakest assumption

This approach assumes Next.js can transpile the demo package's TypeScript sources without issues. Next.js `transpilePackages` config handles this:

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: [
    '@acronis-platform/shadcn-uikit',
    '@acronis-platform/shadcn-uikit-demo',
  ],
}
```

If demo components use dependencies that conflict with Next.js (unlikely but possible with react-router-dom imports at the module level in some demos), those specific demos would need thin wrapper components in `packages/docs/components/demos/`. This is a fallback, not the default path.

### `packages/demos` structure

```
packages/demos/
  package.json       name: @acronis-platform/shadcn-uikit-demos (private)
  src/
    button/
      ButtonVariants.tsx
      ButtonSizes.tsx
      ...
      index.ts
    dialog/
      ...
    ...40+ categories
  tsconfig.json
```

`packages/demo` and `packages/docs` both depend on `@acronis-platform/shadcn-uikit-demos` via `workspace:*`.
The demo app shell (`packages/demo/src/app/`, `pages/`, `layouts/`) stays in `packages/demo`.

---

## 5. API docs generation

### Primary approach: `fumadocs-typescript` AutoTypeTable

`AutoTypeTable` is a React Server Component that reads TypeScript source files at build time using the TypeScript Compiler API. It resolves types, expands interfaces, and renders a props table.

Usage in MDX:

```mdx
<AutoTypeTable path="../../ui/src/components/ui/button.tsx" name="ButtonProps" />
```

The `path` is relative to the docs package root. The `name` is the exported type/interface name.

### Challenge: `VariantProps<typeof buttonVariants>`

The `ButtonProps` interface extends `VariantProps<typeof buttonVariants>`:

```ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

`AutoTypeTable` resolves types via the TS Compiler API. Whether it expands `VariantProps` into `variant?: "default" | "destructive" | ...` or displays it as an opaque generic **requires testing** (this was flagged as an open question in the research).

### Fallback strategies (if VariantProps renders opaque)

**Strategy 1: Explicit interface (recommended fallback)**

Create a companion type file that manually spells out the variant props:

```ts
// packages/ui/src/components/ui/button.docs.ts
import type { ButtonProps } from './button'

/**
 * Props for the Button component.
 *
 * @remarks
 * Renders a clickable button with configurable visual style and size.
 */
export interface ButtonPropsDoc {
  /** The visual variant of the button. */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'translucent'
  /** The size of the button. */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** When true, the button renders its child as the root element (Radix Slot). */
  asChild?: boolean
  /** Additional CSS class names. */
  className?: string
}
```

Then in MDX:

```mdx
<AutoTypeTable path="../../ui/src/components/ui/button.docs.ts" name="ButtonPropsDoc" />
```

This is more maintenance but gives full control over the displayed API table. Only needed for components with CVA variants -- roughly 15-20 of the 70+ component files.

**Strategy 2: Custom remark/rehype plugin**

Write a build-time plugin that reads CVA `variants` definitions and injects them into the type. This is more complex and DEFERRED until we know whether Strategy 1 is even needed.

### Components that re-export Base UI types

Some components wrap `@base-ui/react` primitives. For these, `AutoTypeTable` can reference the original Base UI type files in `node_modules`:

```mdx
<AutoTypeTable
  path="../../node_modules/@base-ui/react/dist/types/dialog/DialogTrigger.d.ts"
  name="DialogTriggerProps"
/>
```

If this proves fragile (path changes between versions), create thin type re-exports in the UI package source.

---

## 6. Source code display

### Approach: Server Component reads file at build time

As shown in the `<DemoPreview>` component design above (Section 3), source code is read using `readFileSync` in a React Server Component. This is the simplest approach and works because:

1. Next.js App Router renders Server Components at build time for static pages.
2. `readFileSync` resolves the file path relative to the monorepo root.
3. Fumadocs' built-in `CodeBlock` component handles syntax highlighting (uses Shiki internally) and provides a copy button.

### Why not other approaches

| Approach | Verdict | Reason |
|----------|---------|--------|
| `readFileSync` in RSC | **Selected** | Simplest; zero config; works with SSG |
| Raw file import (`?raw`) | Rejected | Requires Webpack/Turbopack raw loader config; less explicit |
| rehype plugin | Rejected | Adds invisible build-time magic; harder to debug |
| `next/dynamic` | Rejected | Unnecessary complexity for static content |
| Custom API endpoint | Rejected | Over-engineered for build-time content |

### Source path convention

Demo source paths are specified as monorepo-relative paths in MDX:

```
sourcePath="packages/demo/src/demos/button/ButtonVariants.tsx"
```

The `<DemoPreview>` component resolves this to an absolute path using the monorepo root. This makes paths greppable and explicit.

---

## 7. Storybook coexistence

### Decision: Storybook stays for visual regression testing only

**Confidence: Corroborated** (research confirms this separation is standard practice)

The docs site and Storybook serve different audiences and purposes:

| Concern | Docs site | Storybook |
|---------|-----------|-----------|
| Audience | Library consumers, developers integrating components | Library maintainers, QA |
| Content | Descriptions, usage guides, API tables | Visual states, edge cases, accessibility |
| Examples | Curated demos showing recommended usage | Exhaustive matrix of prop combinations |
| Build | Next.js SSG, deployed to public URL | Vite-based, runs in CI for snapshot tests |

### Config sharing opportunities

- **Tailwind config**: Both consume `@acronis-platform/shadcn-uikit/tailwind-preset`. No duplication.
- **Theme CSS**: Both import `@acronis-platform/shadcn-uikit/styles`. No duplication.
- **Component imports**: Both import from `@acronis-platform/shadcn-uikit/react`. Same workspace link pattern.
- **TypeScript config**: Both can extend a shared `tsconfig.base.json` at the monorepo root if one exists.

### What does NOT overlap

- Build pipeline (Next.js vs Vite+Storybook)
- Content format (MDX docs vs CSF stories)
- Test infrastructure (none for docs vs Playwright visual snapshots for Storybook)

---

## 8. Phased delivery

### Phase 1: MVP (Target: 5-7 working days)

**Goal**: Working docs site with 5 pilot component pages, deployed and reviewable.

Deliverables:
1. `packages/docs/` scaffolded with Next.js + Fumadocs
2. Root layout, global styles (uikit CSS + Tailwind), sidebar navigation
3. Landing page (`/`) with library overview
4. Getting Started page (`/docs/getting-started`)
5. 5 pilot component pages:
   - `/docs/components/button` -- simplest, validates the template
   - `/docs/components/dialog` -- validates compound components (Dialog, DialogTrigger, DialogContent, etc.)
   - `/docs/components/data-table` -- validates complex component with sub-components
   - `/docs/components/tabs` -- validates Base UI wrapper component
   - `/docs/components/dropdown-menu` -- validates Radix primitive wrapper
6. `<DemoPreview>` component with source code toggle
7. `AutoTypeTable` integration for props tables
8. Validate VariantProps rendering (resolve open question #1)
9. `packages/demo` exports map added
10. CI build step (`pnpm --filter docs build`)

**Exit criteria**: A reviewer can visit 5 component pages, see live demos, toggle source code, and read auto-generated props tables.

### Phase 2: Full component coverage (Target: 8-12 working days)

**Goal**: All 40+ components documented, search working.

Deliverables:
1. MDX pages for all remaining components (using the validated template from Phase 1)
2. Fumadocs built-in search enabled (flexsearch)
3. Theming guide page (`/docs/theming`)
4. Responsive layout polish
5. Component page metadata (description, keywords) for SEO
6. Dark mode toggle in docs site header
7. Navigation polish: component grouping in sidebar (Inputs, Layout, Feedback, Data Display, etc.)

**Exit criteria**: Every component in the library has a docs page. Search returns relevant results. Site is navigable on mobile.

### Phase 3: Advanced features (Target: 5-8 working days)

**Goal**: Icon catalog, interactive editing, migration of existing guides.

Deliverables:
1. Icon catalog page (`/docs/icons`) with search and copy-to-clipboard
   - Renders all 1500+ icons in a filterable grid
   - Each icon shows name, import path, and preview
   - Server-side rendered grid with client-side filter (search input)
2. Sandpack integration for live code editing on select component pages
3. Migrate existing markdown guides from `packages/docs/` (ARCHITECTURE, MIGRATION_GUIDE, etc.) into new site
4. Changelog page (auto-generated from git tags or CHANGELOG.md)
5. "Edit this page" links to GitHub source

**Exit criteria**: Icon catalog is searchable. At least 5 component pages have Sandpack live editing. All legacy docs are migrated.

---

## 9. Open questions resolution

### OQ1: CVA variant resolution with AutoTypeTable

**Status: Requires testing in Phase 1**

Does `fumadocs-typescript`'s `AutoTypeTable` correctly resolve `VariantProps<typeof buttonVariants>` into `"default" | "destructive" | ...`?

**Action**: Phase 1 includes this as an explicit validation step. If it renders opaque, implement the `.docs.ts` companion type fallback (Section 5, Strategy 1). This fallback is low-effort (15-20 files) and provides better control over docs anyway.

**Blast radius if wrong**: Low. The fallback is straightforward and does not affect architecture.

### OQ2: Next.js in the monorepo

**Status: Resolved -- acceptable trade-off**

Adding Next.js introduces a different build pipeline. However:
- It is isolated to `packages/docs/` -- no other package is affected.
- CI builds are independent (`pnpm --filter docs build` runs only when docs change, via path filters).
- The demo package already uses Vite; docs using Next.js is a separate concern.
- Fumadocs requires Next.js; this is non-negotiable given the framework choice.

**Blast radius**: Contained to `packages/docs/`. No impact on library build, Storybook, or demo app.

### OQ3: Demo component reuse strategy

**Status: Resolved -- Option A (import from `packages/demo`)**

See Section 4 for full rationale. Key point: demo components are self-contained React components with no framework-specific code. They import cleanly into any React context.

### OQ4: Sandpack vs static render for v1

**Status: Resolved -- static render for v1, Sandpack deferred to Phase 3**

Static rendering (direct import + server-rendered output) is sufficient for v1. Users can see the component and read the source code. Live editing is a nice-to-have that adds significant complexity (Sandpack configuration, dependency bundling, sandbox environment setup).

**Blast radius if deferred too long**: None. Static examples are the standard for most component library docs (shadcn/ui, Radix, Ark UI all use static examples). Sandpack is additive.

### OQ5: Storybook coexistence

**Status: Resolved -- Storybook stays for visual regression**

See Section 7. Storybook and the docs site serve different purposes. No retirement needed.

### OQ6: basecn.dev deep dive

**Status: Deferred -- not blocking**

A detailed examination of basecn.dev's source could accelerate Phase 1 by providing copy-paste templates. However, the Fumadocs official documentation and component library guide provide sufficient information to proceed. If the team encounters friction during Phase 1 setup, a researcher can be dispatched to extract specific patterns from the basecn repo.

**Recommendation**: Spawn a researcher with the question "Extract the MDX template, source.config.ts, and AutoTypeTable usage patterns from the basecn.dev GitHub repo" if Phase 1 setup takes longer than expected.

---

## 10. Risks

### Technical risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `AutoTypeTable` cannot resolve CVA `VariantProps` | Medium | Low | Companion `.docs.ts` type files as fallback |
| Next.js + workspace package transpilation issues | Low | Medium | `transpilePackages` config; well-documented pattern |
| Demo components with router/zustand deps cause import errors in Next.js | Low | Low | Wrap problematic demos in docs-specific thin components |
| Fumadocs major version breaks during development | Low | Medium | Pin to exact minor version; Fumadocs has stable release cadence |
| Build time for 40+ MDX pages with TypeScript compilation | Low | Low | Fumadocs uses incremental builds; dev mode is fast |

### Operational risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Docs drift from component source (props change, docs not updated) | Medium | Medium | CI check: build docs on every PR that touches `packages/ui/` |
| Icon catalog page performance (1500+ SVGs) | Medium | Low | Virtualized list or pagination; lazy load SVGs |

### Integration risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tailwind v4 compatibility with Fumadocs UI | Low | High | Fumadocs UI supports Tailwind v4; test during Phase 1 setup |
| CSS conflicts between uikit styles and Fumadocs UI styles | Medium | Medium | Scope uikit styles to demo preview containers; test early |

---

## 11. Anti-pattern check

| Anti-pattern           | Applies?  | Notes                                                                    |
|------------------------|-----------|--------------------------------------------------------------------------|
| Premature abstraction  | No        | We use existing Fumadocs primitives, not custom abstractions             |
| Golden hammer          | Mild      | Fumadocs is the "hammer" but it is purpose-built for this exact use case |
| Big ball of mud        | No        | Clear boundaries: docs package is isolated, imports from ui and demo     |
| Tight coupling         | Low risk  | Docs depend on ui and demo packages, but only via public exports         |
| Magic                  | Low       | Source paths are explicit in MDX; AutoTypeTable paths are explicit       |
| Over-engineering       | No        | Phase 1 is minimal; Sandpack and advanced features deferred              |

---

## Deferred decisions

- **Hosting platform**: DEFER until Phase 1 is built. Vercel, Netlify, or GitHub Pages are all viable for Next.js SSG output. No architectural impact.
- **Search provider**: DEFER until Phase 2. Fumadocs includes flexsearch out of the box. Algolia or Orama can replace it later without structural changes.
- **Custom domain**: DEFER. Orthogonal to implementation.
- **Versioned docs**: DEFER until the library ships a breaking major version. Fumadocs supports versioned docs but adding it now is premature.
- **i18n**: DEFER. No current requirement.
- **Sandpack dependency bundling strategy**: DEFER to Phase 3. Requires research into how to make `@acronis-platform/shadcn-uikit` available inside a Sandpack sandbox.

---

## Summary

The docs site is a new `packages/docs/` Next.js application using Fumadocs. It imports demo components directly from `packages/demo` and generates API tables from TypeScript sources in `packages/ui` using `fumadocs-typescript`. Source code display uses Server Component file reading. Storybook remains separate for visual regression testing.

Phase 1 validates the core architecture with 5 pilot pages. Phase 2 scales to full coverage. Phase 3 adds the icon catalog and live editing. The biggest technical uncertainty -- CVA VariantProps resolution in AutoTypeTable -- has a straightforward fallback that does not affect the overall architecture.
