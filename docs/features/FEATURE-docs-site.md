# Feature: Documentation Site with Fumadocs

## Objective

Provide an interactive documentation site for `@acronis-platform/shadcn-uikit` using Fumadocs + Next.js.
The site renders MDX component pages with live demo previews (via `@acronis-platform/shadcn-uikit-demos`)
and TypeScript API tables (via `fumadocs-typescript` AutoTypeTable).

## Behavior

### Package structure

`packages/docs` hosts a Next.js App Router application powered by Fumadocs.
It depends on the workspace packages `@acronis-platform/shadcn-uikit` (styles + components)
and `@acronis-platform/shadcn-uikit-demos` (demo components).

### Routing

- `/` redirects to `/docs`
- `/docs` renders the index MDX page (library overview + quick start)
- `/docs/components/<name>` renders individual component documentation

### MDX content pipeline

- MDX files live in `content/docs/`
- `fumadocs-mdx` processes them via `source.config.ts`
- Navigation tree is auto-generated from `meta.json` files

### Demo previews

A `DemoPreview` client component wraps demo components in a bordered card
with an optional "View source" toggle. MDX pages import demos directly from
`@acronis-platform/shadcn-uikit-demos/<component>`.

### API tables

`fumadocs-typescript`'s `AutoTypeTable` is used to render prop types.
Path references point to the source `.tsx` files in `packages/ui/src/`.
If a type cannot be resolved (e.g., CVA VariantProps wrappers), a TODO comment
is left in the MDX.

### Pilot pages

Five component pages are created as pilots: button, badge, alert, card, input.

## Definition of done

- [ ] `packages/docs/package.json` exists with correct dependencies
- [ ] `pnpm install` succeeds from monorepo root
- [ ] Next.js + Fumadocs config files are in place (next.config.mjs, source.config.ts, tsconfig.json)
- [ ] App Router layout renders with Fumadocs UI provider and uikit styles
- [ ] 5 pilot MDX pages exist under `content/docs/components/`
- [ ] `DemoPreview` component exists with source toggle
- [ ] `pnpm --filter @acronis-platform/shadcn-uikit-docs build` completes without errors
- [ ] `.next` and `.source` directories are gitignored

## Open questions

- AutoTypeTable may not resolve CVA-wrapped types — leave TODO if so
- CSS isolation between fumadocs-ui and uikit styles may need tuning later
