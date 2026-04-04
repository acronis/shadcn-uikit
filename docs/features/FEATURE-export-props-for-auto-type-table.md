# Feature: Export Props interfaces for AutoTypeTable

## Objective

Enable AutoTypeTable to generate API Reference tables in docs by exporting Props interfaces from UI component source files. Components that define custom Props interfaces need `export` added; components with only inline types or thin Radix/Base UI wrappers will get `.docs.ts` companion files where useful, or remain with prose descriptions.

## Behavior

For each component in `packages/ui/src/components/ui/`:

1. If a named Props `interface` or `type` exists but is not exported, add `export` keyword
2. If the component uses CVA `VariantProps` inline (no named type), create a `.docs.ts` file with an explicit interface that spells out the variant values
3. If the component is a thin wrapper around a Radix/Base UI primitive with no custom props beyond className, skip AutoTypeTable (the types come from the primitive library)
4. Update the corresponding MDX file's `## API Reference` section to use `<AutoTypeTable>` pointing at the source (or `.docs.ts`) file

### Component classification

**Has named Props interface to export:**
- `carousel.tsx` — `CarouselProps` (already a `type`, add `export`)
- `checkbox.tsx` — `CheckboxProps` (already a `type`, add `export`)
- `pagination.tsx` — `PaginationLinkProps` (already a `type`, add `export`)
- `secondary-menu.tsx` — `SecondaryMenuProps`, `SecondaryMenuGroupProps`, `SecondaryMenuItemProps` (interfaces, add `export`)
- `tooltip.tsx` — `TooltipContentProps` (interface, add `export`)
- `sonner.tsx` — `ToasterProps` (type, add `export`)
- `data-table/data-table.tsx` — `DataTableProps` (interface, add `export`)

**Needs `.docs.ts` companion file (CVA VariantProps or complex inline types):**
- `alert.tsx` — uses `VariantProps<typeof alertVariants>` inline
- `button-group.tsx` — uses `VariantProps<typeof buttonGroupVariants>` inline

**Thin wrappers / no custom Props (skip AutoTypeTable, keep prose):**
- `breadcrumb.tsx` — all inline `ComponentPropsWithoutRef<'element'>`, only `separator` and `asChild` are custom
- `card.tsx` — all `React.HTMLAttributes<HTMLDivElement>`, no custom props
- `calendar.tsx` — wraps `DayPicker` with one extra `buttonVariant` prop
- `combobox.tsx` — demo component, not a reusable component
- `date-picker.tsx` — demo component, not a reusable component
- `dialog.tsx` — thin Base UI wrappers, only `portal` prop is custom on DialogContent
- `dropdown-menu.tsx` — thin Base UI wrappers with inline custom props
- `form.tsx` — wraps react-hook-form with generic types
- `input.tsx` — extends HTML input directly
- `navigation-menu.tsx` — thin Radix wrappers, no custom props
- `popover.tsx` — thin Base UI wrapper with inline custom props
- `progress.tsx` — thin Base UI wrapper
- `radio-group.tsx` — thin Base UI wrapper
- `select.tsx` — thin Base UI wrapper
- `separator.tsx` — thin Base UI wrapper
- `sidebar.tsx` — complex component with many sub-components
- `switch.tsx` — thin Base UI wrapper
- `table.tsx` — all HTML element wrappers
- `tabs.tsx` — thin Base UI wrapper
- `textarea.tsx` — extends HTML textarea directly

For the "thin wrapper" category, we still create `.docs.ts` files for those that have meaningful custom props worth documenting (dialog `portal`, popover `align`/`side`/`sideOffset`/`portal`, dropdown-menu `inset`/`portal`/`align`/`side`/`sideOffset`, select `portal`/`side`/`sideOffset`/`alignItemWithTrigger`).

## Definition of done

- [ ] All named Props interfaces/types that were not exported are now exported
- [ ] `.docs.ts` companion files created for CVA-based components
- [ ] MDX API Reference sections updated with `<AutoTypeTable>` for components with exported interfaces
- [ ] `pnpm build` in `packages/docs` passes without errors
- [ ] Components with no meaningful custom props retain prose API Reference sections

## Open questions

- Should we create `.docs.ts` files for every thin wrapper that has even one custom prop (like `portal` on Dialog)?
  Decision: Yes for the most commonly used components, skip for trivial ones.
