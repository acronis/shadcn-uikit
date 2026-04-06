# CLAUDE.md

Project-level guidance for AI assistants working in this repository.

## Repository overview

`@acronis/shadcn-uikit` is a pnpm monorepo containing a React component library, a demo app, shared demo components, and a documentation site.

## Packages

| Package | Path | Name |
|---------|------|------|
| UI library | `packages/ui/` | `@acronis-platform/shadcn-uikit` |
| Demo app | `packages/demo/` | `@acronis-platform/shadcn-uikit-demo` |
| Shared demos | `packages/demos/` | `@acronis-platform/shadcn-uikit-demos` |
| Documentation site | `packages/docs/` | `@acronis-platform/shadcn-uikit-docs` |

## Documentation site

The docs site lives at `packages/docs/`. It is a Next.js 15 application built with [Fumadocs](https://www.fumadocs.dev/).

### Running locally

```bash
pnpm --filter @acronis-platform/shadcn-uikit-docs dev
```

### Key conventions

**DemoPreview sourcePath format** -- The `<DemoPreview>` component accepts a `sourcePath` prop that is relative to the monorepo root. Example:

```
sourcePath="packages/demos/src/button/ButtonVariants.tsx"
```

The component resolves this via `resolve(process.cwd(), '..', '..', sourcePath)` because `process.cwd()` is `packages/docs/` at build time.

**AutoTypeTable path convention** -- `<AutoTypeTable>` paths are relative to `packages/docs/`. To reference a UI component source file:

```
<AutoTypeTable path="../ui/src/components/ui/button.tsx" name="ButtonProps" />
```

For compound components or types that `AutoTypeTable` cannot resolve (e.g., re-exported Radix/Base UI types, complex CVA generics), use a `.docs.ts` companion file:

```
<AutoTypeTable path="../ui/src/components/ui/dialog.docs.ts" name="DialogContentProps" />
```

**`.docs.ts` companion files** -- Located alongside component source files in `packages/ui/src/components/ui/`. These files define explicit interfaces with TSDoc comments for components where `AutoTypeTable` cannot resolve types from the source alone. Currently 8 companion files exist. Only create one when `AutoTypeTable` fails to produce a useful table from the original source.

**AutoTypeTable global registration** -- `AutoTypeTable` is registered as a global MDX component in `packages/docs/src/app/docs/[[...slug]]/page.tsx`. MDX files do not need to import it.

**Client demo wrappers** -- Demo components use hooks and browser APIs, so they need `'use client'`. Thin wrapper files in `packages/docs/src/components/demos/` add the directive and re-export from `@acronis-platform/shadcn-uikit-demos`.

### Search

The search API route at `packages/docs/src/app/api/search/route.ts` uses Fumadocs `createFromSource` to provide server-side search over the content index. No external search provider is required.

### Content structure

- `packages/docs/content/docs/` -- MDX pages and `meta.json` files controlling sidebar order
- `packages/docs/content/docs/components/` -- one MDX file per UI component (40 components)
- `packages/docs/src/components/DemoPreview.tsx` -- async RSC for live preview + source toggle
- `packages/docs/src/components/demos/` -- 40 client wrapper files for demo components
