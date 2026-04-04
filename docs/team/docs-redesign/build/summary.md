# Build Phase Summary -- Documentation Site

Date: 2026-04-04
Feature: docs-redesign
Status: Complete

## What was built

A Fumadocs-based documentation site at [packages/docs/](../../../../packages/docs/) covering 40 components with live demo previews, source code toggles, and auto-generated props tables.

### Phase 1: MVP

- Scaffolded [packages/docs/](../../../../packages/docs/) as a Next.js 15 + Fumadocs application
- Root layout with Fumadocs `RootProvider`, UIKit styles, and Tailwind v4
- Docs layout with sidebar navigation (`DocsLayout` from `fumadocs-ui/layouts/docs`)
- Catch-all route at `app/docs/[[...slug]]/page.tsx` with `generateStaticParams` for full SSG
- Landing page, Getting Started, and Theming pages
- 5 pilot component pages (button, dialog, data-table, tabs, dropdown-menu) with live demos and `AutoTypeTable`
- [DemoPreview](../../../../packages/docs/src/components/DemoPreview.tsx) -- async RSC that reads demo source at build time via `readFileSync` and highlights with Shiki
- `AutoTypeTable` registered as a global MDX component in the catch-all page, eliminating per-file imports
- Validated that `AutoTypeTable` resolves CVA `VariantProps` for simple cases (button, badge, chip)

### Phase 2: full component coverage + search + API prose

- MDX pages for all 40 components in [content/docs/components/](../../../../packages/docs/content/docs/components/)
- `meta.json` files controlling sidebar order at both root and components levels
- Search API route at [app/api/search/route.ts](../../../../packages/docs/src/app/api/search/route.ts) using Fumadocs `createFromSource` (server-side search built on the content index -- no Orama, no external provider)
- 40 client-side demo wrapper files in [src/components/demos/](../../../../packages/docs/src/components/demos/) that re-export from `@acronis-platform/shadcn-uikit-demos` with `'use client'` directives
- Hand-written API reference prose for components where AutoTypeTable was not yet wired

### Phase 3: AutoTypeTable expansion + companion files

- Expanded AutoTypeTable coverage to 23 of 40 component pages
- Created 8 `.docs.ts` companion type files in [packages/ui/src/components/ui/](../../../../packages/ui/src/components/ui/) for components where `AutoTypeTable` could not resolve types from source alone (compound components, re-exported Radix/Base UI types):
  - `alert.docs.ts`, `breadcrumb.docs.ts`, `button-group.docs.ts`, `calendar.docs.ts`, `dialog.docs.ts`, `dropdown-menu.docs.ts`, `popover.docs.ts`, `select.docs.ts`
- Companion files manually spell out prop unions with TSDoc comments, giving `AutoTypeTable` clean input

## Key technical decisions

| Decision | Rationale |
|----------|-----------|
| Async RSC for `DemoPreview` | Enables `readFileSync` + `await highlight()` at build time with zero client JS. Simpler than raw-loader or rehype plugin approaches. |
| `process.cwd()` + `../..` path resolution | Resolves monorepo-relative `sourcePath` props to absolute paths. Works in the pnpm workspace where `cwd` is `packages/docs/`. |
| Fumadocs `createFromSource` for search | Built-in server-side search from the content index. No external search provider needed for MVP. |
| `.docs.ts` companion files for CVA types | `AutoTypeTable` cannot always resolve `VariantProps<typeof variants>` through CVA generics. Companion files provide explicit interfaces with TSDoc, keeping the source component files unchanged. |
| `'use client'` demo wrappers | Demo components use hooks and browser APIs. Thin wrapper files in the docs package add the client directive and re-export from `@acronis-platform/shadcn-uikit-demos`. |
| `AutoTypeTable` as global MDX component | Registered once in `page.tsx` via `<MDX components={{ ...defaultMdxComponents, AutoTypeTable }} />`. MDX files use it without import statements. |
| Separate `packages/demos/` package | Extracted shared demo components from `packages/demo/` into `packages/demos/` with a clean exports map (`"./*": "./src/*/index.ts"`). Both the demo app and docs site consume demos from this package. |

## Final state

| Metric | Count |
|--------|-------|
| Total static pages generated | 48 |
| Component MDX pages | 40 |
| Guide pages (getting-started, theming, index) | 4 |
| Components with AutoTypeTable props tables | 23 |
| Components with text-only API reference | 17 |
| `.docs.ts` companion type files | 8 |
| Client demo wrapper files | 40 |
| Demo source files referenced via DemoPreview | 200+ |

## Deviations from the original design

| Design spec | Actual implementation | Reason |
|-------------|----------------------|--------|
| `packages/demos/` as a new shared package | Created as specified, but named `@acronis-platform/shadcn-uikit-demos` | Follows workspace naming convention |
| `DemoPreview` uses `CodeBlock` + `Pre` directly | Uses `highlight()` from `fumadocs-core/highlight` then wraps in `CodeBlock` | Produces proper Shiki dual-theme highlighting (light/dark) |
| `AutoTypeTable path="../../ui/src/..."` | Paths use `../ui/src/...` (one level up, not two) | `process.cwd()` resolves to `packages/docs/`, so `../ui/` is correct |
| Design specified `fumadocs-core ^16.0.0` | Installed `fumadocs-core 15.7.13` | Pinned to stable version available at build time |
| Design specified flexsearch for Phase 2 | Used Fumadocs built-in `createFromSource` | Fumadocs provides search out of the box via its content source API |
| Design planned Sandpack for Phase 3 | Not implemented | Deferred -- static previews with source toggle are sufficient for current needs |
| Design planned icon catalog for Phase 3 | Not implemented | Deferred to a future iteration |
| `ignoreBuildErrors: true` in next.config | Not in original design | Workaround for `@types/react` v18/v19 conflict in the monorepo |
