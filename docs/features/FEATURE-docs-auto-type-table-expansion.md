# Feature: AutoTypeTable expansion (Phase 2)

## Objective

Expand AutoTypeTable coverage across all component documentation pages and fix import inconsistencies, improving API reference quality and consistency across the Fumadocs site.

## Behavior

### Task 1: Remove redundant AutoTypeTable imports

Four MDX files (button.mdx, badge.mdx, chip.mdx, filter.mdx) had explicit `import { AutoTypeTable } from 'fumadocs-typescript/ui'` despite AutoTypeTable being globally registered in `page.tsx`. Remove these redundant imports.

### Task 2: Expand API Reference sections

For each component MDX page without an existing AutoTypeTable:

1. Check the corresponding source file in `packages/ui/src/components/ui/<name>.tsx` for exported Props interfaces
2. If an exported Props interface exists: add `<AutoTypeTable path="..." name="..." />` to the API Reference section
3. If no exported Props interface exists: keep descriptive prose documenting the component's props and add an MDX comment explaining why AutoTypeTable is not used

### Findings

After auditing all component source files, **none of the 32 target components** export named Props interfaces. The existing 8 pages with AutoTypeTable (badge, button, chip, filter, spinner, tag, tree, widget) are the only components that export `*Props` interfaces.

The remaining components fall into these categories:
- **Inline types on forwardRef**: Components like Card, Table, Input define their props inline as `React.HTMLAttributes<HTMLDivElement>` without named exports
- **Non-exported internal types**: Components like Checkbox, Carousel, Sheet, Tooltip, SecondaryMenu define Props types/interfaces but do not export them
- **Composition patterns**: Components like Combobox, DatePicker are not reusable components but demo compositions
- **Wrapper re-exports**: Components like Dialog, Select, Tabs re-export Base UI primitives with styling
- **No source file**: Components like Container, DataTable, Toast, Toggle have no corresponding source file or different file structures

### MDX pages that don't exist

The following pages from the original task list have no corresponding MDX files: label, resizable, scroll-area, sheet, skeleton, slider, toast, toggle, toggle-group.

## Definition of done

- [x] Redundant AutoTypeTable imports removed from badge.mdx, button.mdx, chip.mdx, filter.mdx
- [x] All existing MDX pages have improved API Reference sections with specific props documentation
- [x] MDX comment added to each page explaining why AutoTypeTable is not used
- [x] Build succeeds with no errors (`pnpm build` in packages/docs)
- [x] No broken AutoTypeTable calls added (only added where exported Props exist)

## Open questions

- Phase 3 should consider exporting Props interfaces from component source files to enable AutoTypeTable coverage. Many components (SecondaryMenu, Checkbox, Carousel, Sheet, Tooltip, Pagination) have well-defined internal Props types that could be exported.
- Alternatively, companion `.docs.ts` files could re-export types, but this only works for exported types.
