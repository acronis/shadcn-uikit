# Feature: Docs Search and Sidebar Grouping

## Objective

Enable full-text search in the Fumadocs documentation site and reorganize the
component sidebar from a flat alphabetical list into logical category groups.
Also ensure dark mode toggle is present.

## Behavior

### Search

Fumadocs v15 uses Orama-based search via `fumadocs-core/search/server`.
The `createFromSource` helper builds a search index from the loader output
at build time.

- A Next.js API route at `app/api/search/route.ts` exports `GET` from a
  `SearchAPI` created by `createFromSource(source)`.
- `fumadocs-ui` `DocsLayout` automatically renders a search dialog when
  it detects the default `/api/search` endpoint. No explicit `search` prop
  is needed on `DocsLayout`.

### Sidebar grouping

The `meta.json` `pages` array supports separator entries using the
`---Group Name---` syntax (regex: `/^---(?:\[icon\])?(name)---$/`).
Separators render as non-clickable section headers in the sidebar.

Components are organized into five groups:
1. **Inputs & Forms** - interactive form controls
2. **Overlay & Dialogs** - popover/modal layers
3. **Data Display** - presentational/read-only components
4. **Navigation** - wayfinding components
5. **Layout & Utils** - structural and utility components

The `index` page stays first (before any separator).

### Dark mode

`RootProvider` from `fumadocs-ui/provider` already includes `next-themes`
integration. The `DocsLayout` renders a theme toggle in the header by default.
No additional configuration needed -- just verify it's working.

## Definition of done

- [ ] `packages/docs/src/app/api/search/route.ts` exists and exports GET
- [ ] Search index is generated during `pnpm build` (no build errors)
- [ ] `meta.json` uses `---Group Name---` separators for five groups
- [ ] All existing component pages remain listed (no pages dropped)
- [ ] `pnpm build` succeeds in packages/docs
- [ ] Dark mode toggle is present (provided by RootProvider + DocsLayout defaults)

## Open questions

- None -- all patterns confirmed from fumadocs-core source.
