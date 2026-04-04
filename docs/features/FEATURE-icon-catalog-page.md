# Feature: Icon catalog page

## Objective

Provide a browsable, searchable page in the Fumadocs documentation site that displays all ~1,148 internal icons from the Acronis design system, enabling developers to discover and copy import snippets.

## Behavior

### Page structure

The page lives at `/docs/icons` and is defined as an MDX file that imports a single `<IconCatalog />` client component.

### Icon loading

The `AutoIcons` object exported from `@acronis-platform/shadcn-uikit` maps kebab-case icon slugs (e.g. `"chevron-down"`) to React component references. The client component uses `Object.entries(AutoIcons)` to get the full list at runtime. Each entry's key is the slug; the PascalCase component name is derived by converting the slug (e.g. `chevron-down` -> `ChevronDownIcon`).

### Search and filtering

A text input at the top of the page filters icons by matching the search term (case-insensitive) against both the kebab-case slug and the PascalCase name. The counter above the grid shows "Showing X of Y icons".

### Grid display

Icons render in a responsive CSS grid (repeat auto-fill, minmax 120px). Each cell contains:
- The icon component rendered at 24x24 (`className="size-6"`)
- The PascalCase name below in small text, truncated with ellipsis if long

### Copy to clipboard

Clicking a cell copies `import { ChevronDownIcon } from '@acronis-platform/shadcn-uikit'` to the clipboard. A brief "Copied!" overlay appears on the cell for 1.5 seconds.

### Category grouping

Deferred. The flat grid is sufficient for v1. Categories from `categories.json` use SVG-filename-based keys that don't directly map to component names, making the mapping non-trivial for minimal UX gain.

## Definition of done

- [ ] `/docs/icons` page renders in the docs site
- [ ] All ~1,148 icons visible in the grid
- [ ] Search input filters icons in real time
- [ ] "Showing X of Y icons" counter updates with search
- [ ] Clicking an icon cell copies the import statement to clipboard
- [ ] Visual "Copied!" feedback appears on click
- [ ] `pnpm --filter @acronis-platform/shadcn-uikit-docs build` succeeds

## Open questions

None — the `AutoIcons` export from dist provides everything needed.
