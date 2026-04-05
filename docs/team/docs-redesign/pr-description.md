# feat: add Fumadocs documentation site with full component reference

## Summary

- **New `packages/demos` shared package** — extracts all 43 demo categories from `packages/demo` into a standalone `@acronis-platform/shadcn-uikit-demos` package consumed by both the demo app and the new docs site
- **New `packages/docs` documentation site** — Next.js + Fumadocs v15 app with full component reference documentation
- **41 component pages** — every component in the library has a dedicated page with live demos, source code toggles, and API reference tables
- **Foundation pages** — Getting Started, Theming, and Components index pages
- **Server-side source highlighting** — `DemoPreview` is an async RSC that reads demo source files at build time and highlights them with Shiki (`github-light`/`github-dark`) via `fumadocs-core/highlight`
- **AutoTypeTable API reference** — `fumadocs-typescript` generates props tables from TypeScript sources for components with exported Props interfaces

## What's included

### `packages/demos` (new)
Shared demo components package. Exports all 43 demo categories as `@acronis-platform/shadcn-uikit-demos/<category>`. Used by both `packages/demo` (existing demo app) and `packages/docs` (new docs site).

### `packages/docs` (new)
Fumadocs v15 + Next.js 15 documentation site.

| Page | URL |
|---|---|
| Overview | `/docs` |
| Getting Started | `/docs/getting-started` |
| Theming | `/docs/theming` |
| Components index | `/docs/components` |
| Component pages (×41) | `/docs/components/<name>` |

Each component page includes:
- **Usage** — import snippet
- **Demo sections** — all available demos rendered live with labeled sections and descriptions
- **View source** — expandable Shiki-highlighted source code per demo
- **API Reference** — auto-generated props table via `AutoTypeTable` where a typed Props interface exists

### Key technical decisions
- `@/` path alias in demos resolves to `packages/docs/src/` when transpiled by Next.js — solved by forwarding `@/icons/missing-icons` through a stub that re-exports from the demos package
- `fumadocs-typescript` pinned to `^3.1.0` for compatibility with `fumadocs-core@15.7.13` (v4 requires subpath exports not present in 15.x)
- CSS layer ordering: `@import "tailwindcss/utilities"` + unlayered `#nd-subnav` rule resolves conflict between UIKit's `@layer utilities` and Fumadocs' `md:hidden` class at desktop widths
- Storybook remains for visual regression testing only — no overlap with the docs site

## Test plan

- [ ] `pnpm --filter @acronis-platform/shadcn-uikit-docs dev` starts without errors
- [ ] All 41 component pages load (`/docs/components/<name>`) and render demos
- [ ] "View source" toggles show syntax-highlighted code
- [ ] API Reference tables render for components with Props interfaces (Button, Badge, Chip, Filter, Spinner, Tag, Tree, Widget, …)
- [ ] `/docs/getting-started` and `/docs/theming` load correctly
- [ ] Dark mode toggle applies correct theme to both Fumadocs UI and UIKit component demos
- [ ] `pnpm --filter @acronis-platform/shadcn-uikit-docs build` completes without errors
