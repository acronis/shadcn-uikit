# Token Migration Plan: From \_globals.scss to Semantic Tokens

## Executive Summary

**Goal**: Migrate all components from old token system (`_globals.scss` with 150+ tokens) to new semantic token system (~30 tokens).

**Current Status**:

- ✅ New token system implemented (primitives + semantic)
- ✅ Tailwind config updated
- ⏳ Components still using old tokens (52 direct usages found)
- ⏳ `_globals.scss` still active (549 lines)

**Timeline**: 12 phases, estimated 2-3 weeks for complete migration

---

## Phase 0: Pre-Migration Audit ✅

### Components Using Old Tokens (52 usages found):

| Component           | Old Token Count | Priority | Complexity |
| ------------------- | --------------- | -------- | ---------- |
| `sonner.tsx`        | 13              | HIGH     | Medium     |
| `button.vue`        | 12              | HIGH     | Low        |
| `dropdown-menu.tsx` | 7               | HIGH     | Medium     |
| `checkbox.tsx`      | 6               | MEDIUM   | Low        |
| `table.tsx`         | 6               | HIGH     | Medium     |
| `dialog.tsx`        | 4               | MEDIUM   | Low        |
| `tooltip.tsx`       | 2               | LOW      | Low        |
| `input.tsx`         | 1               | HIGH     | Low        |
| `textarea.tsx`      | 1               | MEDIUM   | Low        |

### Token Usage Patterns Identified:

1. **Direct CSS variable usage**: `bg-[hsl(var(--av-*))]`
2. **Opacity variants**: `border-[hsl(var(--checkbox-border)/0.3)]`
3. **Component-specific tokens**: `--checkbox-bg`, `--table-header-bg`, `--toast-*`
4. **Hardcoded rgba values**: `rgba(38,104,197,0.3)`

---

## Phase 1: Create Token Mapping Reference

**Duration**: 1 day  
**Status**: ⏳ Pending

### Complete Token Mapping:

```typescript
// Old Token → New Tailwind Class
const TOKEN_MAPPING = {
  // Backgrounds
  '--av-background': 'bg-background',
  '--av-card': 'bg-card',
  '--av-popover': 'bg-popover',
  '--av-input-bg': 'bg-background',
  '--av-textarea-bg': 'bg-background',
  '--checkbox-bg': 'bg-background',
  '--table-header-bg': 'bg-card',
  '--dialog-bg': 'bg-muted',
  '--dialog-header-bg': 'bg-card',
  '--av-tooltip-bg': 'bg-popover',
  '--toast-bg': 'bg-card',
  '--av-dropdown-bg': 'bg-popover',

  // Text/Foreground
  '--av-foreground': 'text-foreground',
  '--av-input-text': 'text-foreground',
  '--av-textarea-text': 'text-foreground',
  '--table-cell-text': 'text-foreground',
  '--table-header-text': 'text-foreground',
  '--dialog-foreground': 'text-foreground',
  '--av-tooltip-foreground': 'text-primary-foreground',
  '--toast-text': 'text-foreground',

  // Borders
  '--av-border': 'border-border',
  '--av-input-border': 'border-input',
  '--checkbox-border': 'border-input',
  '--checkbox-border-hover': 'border-input',
  '--av-textarea-border': 'border-input',
  '--table-border': 'border-border',

  // Interactive States
  '--checkbox-checked-bg': 'bg-primary',
  '--checkbox-checked-icon': 'text-primary-foreground',
  '--checkbox-focus': 'ring-ring',
  '--checkbox-disabled-bg': 'bg-muted',
  '--checkbox-disabled-border': 'border-muted',
  '--av-input-border-focus': 'border-primary',
  '--av-textarea-border-focus': 'border-primary',
  '--av-dropdown-item-hover': 'bg-accent',
  '--table-row-hover': 'bg-accent',
  '--table-row-selected': 'bg-accent',

  // Status Colors
  '--toast-success-icon': 'text-success',
  '--toast-success-bg': 'bg-success-light',
  '--toast-success-border': 'border-success',
  '--toast-info-icon': 'text-info',
  '--toast-info-bg': 'bg-info-light',
  '--toast-info-border': 'border-info',
  '--toast-warning-icon': 'text-warning',
  '--toast-warning-bg': 'bg-warning-light',
  '--toast-warning-border': 'border-warning',
  '--toast-danger-icon': 'text-destructive',
  '--toast-danger-bg': 'bg-destructive-light',
  '--toast-danger-border': 'border-destructive',
  '--toast-critical-icon': 'text-critical',
  '--toast-critical-bg': 'bg-critical-light',
  '--toast-critical-border': 'border-critical',

  // Hardcoded RGBA to Semantic
  'rgba(38,104,197,0.3)': 'border-input',
  'rgba(38,104,197,0.1)': 'border-border',
  'rgba(38,104,197,0.05)': 'bg-accent',
  'rgba(36,49,67,0.7)': 'text-muted-foreground',
  'rgba(36,49,67,0.4)': 'text-muted-foreground/40',
};
```

### Deliverables:

- [ ] Create `scripts/token-mapper.ts` - Automated mapping utility
- [ ] Create `docs/MIGRATION_PATTERNS.md` - Complex pattern examples
- [ ] Add opacity mapping guide

---

## Phase 2: Migrate Core Input Components

**Duration**: 2 days  
**Status**: ⏳ Pending

### 2.1 Input Component (Priority: HIGH)

**File**: `src/components/ui/input.tsx`  
**Current**: 1 old token usage  
**Complexity**: Low

**Before**:

```tsx
className="border-[rgba(38,104,197,0.3)] bg-[hsl(var(--av-input-bg))]
  text-[hsl(var(--av-input-text))]
  placeholder:text-[rgba(36,49,67,0.7)]
  focus-visible:border-[hsl(var(--av-input-border-focus))]"
```

**After**:

```tsx
className="border-input bg-background
  text-foreground
  placeholder:text-muted-foreground
  focus-visible:border-primary"
```

**Tasks**:

- [ ] Update className in input.tsx
- [ ] Test all input states (default, focus, disabled, error)
- [ ] Verify placeholder styling
- [ ] Test in dark mode
- [ ] Update Storybook stories if needed

### 2.2 Textarea Component (Priority: MEDIUM)

**File**: `src/components/ui/textarea.tsx`  
**Current**: 1 old token usage  
**Complexity**: Low

**Before**:

```tsx
className="border-[rgba(38,104,197,0.3)] bg-[hsl(var(--av-textarea-bg))]
  text-[hsl(var(--av-textarea-text))]
  placeholder:text-[rgba(36,49,67,0.7)]
  focus-visible:border-[hsl(var(--av-textarea-border-focus))]
  disabled:border-[rgba(38,104,197,0.1)]
  disabled:bg-[rgba(38,104,197,0.05)]"
```

**After**:

```tsx
className="border-input bg-background
  text-foreground
  placeholder:text-muted-foreground
  focus-visible:border-primary
  disabled:border-border
  disabled:bg-muted"
```

**Tasks**:

- [ ] Update className in textarea.tsx
- [ ] Test all textarea states
- [ ] Verify disabled state styling
- [ ] Test in dark mode

---

## Phase 3: Migrate Checkbox Component

**Duration**: 1 day  
**Status**: ⏳ Pending

### 3.1 Checkbox Component (Priority: MEDIUM)

**File**: `src/components/ui/checkbox.tsx`  
**Current**: 6 old token usages  
**Complexity**: Low (multiple states but straightforward)

**Before**:

```tsx
className="bg-[hsl(var(--checkbox-bg))]
  border-[hsl(var(--checkbox-border)/0.3)]
  hover:border-[hsl(var(--checkbox-border-hover)/0.5)]
  focus-visible:ring-[hsl(var(--checkbox-focus))]
  disabled:bg-[hsl(var(--checkbox-disabled-bg)/0.1)]
  disabled:border-[hsl(var(--checkbox-disabled-border)/0.1)]
  data-[state=checked]:bg-[hsl(var(--checkbox-checked-bg))]
  data-[state=checked]:text-[hsl(var(--checkbox-checked-icon))]"
```

**After**:

```tsx
className="bg-background
  border-input/30
  hover:border-input/50
  focus-visible:ring-ring
  disabled:bg-muted/10
  disabled:border-muted/10
  data-[state=checked]:bg-primary
  data-[state=checked]:text-primary-foreground"
```

**Tasks**:

- [ ] Update all checkbox states
- [ ] Test unchecked state
- [ ] Test checked state
- [ ] Test indeterminate state
- [ ] Test disabled states (both checked and unchecked)
- [ ] Test hover and focus states
- [ ] Verify in dark mode

---

## Phase 4: Migrate Table Component

**Duration**: 1 day  
**Status**: ⏳ Pending

### 4.1 Table Component (Priority: HIGH)

**File**: `src/components/ui/table.tsx`  
**Current**: 6 old token usages  
**Complexity**: Medium (multiple sub-components)

**Migration Map**:

| Element     | Before                                                          | After                                |
| ----------- | --------------------------------------------------------------- | ------------------------------------ |
| Table       | `text-[hsl(var(--table-cell-text))]`                            | `text-foreground`                    |
| Header      | `bg-[hsl(var(--table-header-bg))]`                              | `bg-card`                            |
| Header      | `border-[hsl(var(--table-border)/0.1)]`                         | `border-border/10`                   |
| Row         | `border-[hsl(var(--table-border)/0.1)]`                         | `border-border/10`                   |
| Row         | `hover:bg-[hsl(var(--table-row-hover)/0.05)]`                   | `hover:bg-accent/5`                  |
| Row         | `data-[state=selected]:bg-[hsl(var(--table-row-selected)/0.1)]` | `data-[state=selected]:bg-accent/10` |
| Header Cell | `text-[hsl(var(--table-header-text))]`                          | `text-foreground`                    |
| Cell        | `text-[hsl(var(--table-cell-text))]`                            | `text-foreground`                    |

**Tasks**:

- [ ] Update Table root component
- [ ] Update TableHeader
- [ ] Update TableRow (with hover and selected states)
- [ ] Update TableHead
- [ ] Update TableCell
- [ ] Test with data-table examples
- [ ] Verify sorting indicators still work
- [ ] Test in dark mode

---

## Phase 5: Migrate Dialog Component

**Duration**: 1 day  
**Status**: ⏳ Pending

### 5.1 Dialog Component (Priority: MEDIUM)

**File**: `src/components/ui/dialog.tsx`  
**Current**: 4 old token usages  
**Complexity**: Low

**Migration Map**:

| Element | Before                                 | After             |
| ------- | -------------------------------------- | ----------------- |
| Content | `bg-[hsl(var(--dialog-bg))]`           | `bg-muted`        |
| Header  | `bg-[hsl(var(--dialog-header-bg))]`    | `bg-card`         |
| Header  | `border-[rgba(38,104,197,0.1)]`        | `border-border`   |
| Footer  | `bg-[hsl(var(--dialog-header-bg))]`    | `bg-card`         |
| Footer  | `border-[rgba(38,104,197,0.1)]`        | `border-border`   |
| Title   | `text-[hsl(var(--dialog-foreground))]` | `text-foreground` |

**Tasks**:

- [ ] Update DialogContent
- [ ] Update DialogHeader
- [ ] Update DialogFooter
- [ ] Update DialogTitle
- [ ] Test modal overlay
- [ ] Test close button
- [ ] Verify animations work
- [ ] Test in dark mode

---

## Phase 6: Migrate Dropdown Menu Component

**Duration**: 1 day  
**Status**: ⏳ Pending

### 6.1 Dropdown Menu Component (Priority: HIGH)

**File**: `src/components/ui/dropdown-menu.tsx`  
**Current**: 7 old token usages  
**Complexity**: Medium (many sub-components)

**Migration Pattern**:

```tsx
// Before
hover:bg-[hsl(var(--av-dropdown-item-hover))]
focus:bg-[hsl(var(--av-dropdown-item-hover))]
bg-[hsl(var(--av-border))]

// After
hover:bg-accent
focus:bg-accent
bg-border
```

**Tasks**:

- [ ] Update DropdownMenuSubTrigger
- [ ] Update DropdownMenuSubContent
- [ ] Update DropdownMenuContent
- [ ] Update DropdownMenuItem
- [ ] Update DropdownMenuCheckboxItem
- [ ] Update DropdownMenuRadioItem
- [ ] Update DropdownMenuSeparator
- [ ] Test all menu item states
- [ ] Test keyboard navigation
- [ ] Test in dark mode

---

## Phase 7: Migrate Tooltip Component

**Duration**: 0.5 days  
**Status**: ⏳ Pending

### 7.1 Tooltip Component (Priority: LOW)

**File**: `src/components/ui/tooltip.tsx`  
**Current**: 2 old token usages  
**Complexity**: Low

**Before**:

```tsx
className="bg-[hsl(var(--av-tooltip-bg))]
  text-[hsl(var(--av-tooltip-foreground))]"
// Arrow
className="fill-[hsl(var(--av-tooltip-bg))]"
```

**After**:

```tsx
className="bg-popover
  text-popover-foreground"
// Arrow
className="fill-popover"
```

**Tasks**:

- [ ] Update TooltipContent background and text
- [ ] Update TooltipArrow fill color
- [ ] Test tooltip positioning
- [ ] Test in dark mode

---

## Phase 8: Migrate Toast/Sonner Component

**Duration**: 2 days  
**Status**: ⏳ Pending

### 8.1 Sonner Component (Priority: HIGH)

**File**: `src/components/ui/sonner.tsx`  
**Current**: 13 old token usages  
**Complexity**: Medium (most complex component)

**Migration Strategy**:

1. **Icon Colors** (5 usages):

```tsx
// Before
success: <Icon className="text-[hsl(var(--toast-success-icon))]" />;
info: <Icon className="text-[hsl(var(--toast-info-icon))]" />;
warning: <Icon className="text-[hsl(var(--toast-warning-icon))]" />;
error: <Icon className="text-[hsl(var(--toast-danger-icon))]" />;

// After
success: <Icon className="text-success" />;
info: <Icon className="text-info" />;
warning: <Icon className="text-warning" />;
error: <Icon className="text-destructive" />;
```

2. **Toast Styles** (8 usages in toastOptions):

```tsx
// Before
classNames: {
  toast: 'bg-[hsl(var(--toast-bg))]',
  success: 'bg-[hsl(var(--toast-success-bg))] border-[hsl(var(--toast-success-border))]',
  info: 'bg-[hsl(var(--toast-info-bg))] border-[hsl(var(--toast-info-border))]',
  // ... etc
}

// After
classNames: {
  toast: 'bg-card',
  success: 'bg-success-light border-success',
  info: 'bg-info-light border-info',
  // ... etc
}
```

**Tasks**:

- [ ] Update icon colors
- [ ] Update base toast styles
- [ ] Update success variant
- [ ] Update info variant
- [ ] Update warning variant
- [ ] Update error/danger variant
- [ ] Update critical variant (if exists)
- [ ] Test all toast variants
- [ ] Test toast actions
- [ ] Test in dark mode

---

## Phase 9: Migrate Vue Button Component

**Duration**: 1 day  
**Status**: ⏳ Pending

### 9.1 Button Vue Component (Priority: HIGH)

**File**: `src/components/vue/button/button.vue`  
**Current**: 12 old token usages  
**Complexity**: Low (but many variants)

**Note**: This is a Vue component, migration pattern is similar but syntax differs.

**Tasks**:

- [ ] Identify all old token usages in template
- [ ] Map to new Tailwind classes
- [ ] Update all button variants
- [ ] Test all button states
- [ ] Verify Vue reactivity still works
- [ ] Test in dark mode

---

## Phase 10: Verify and Test All Migrations

**Duration**: 2 days  
**Status**: ⏳ Pending

### 10.1 Visual Regression Testing

- [ ] Run Storybook visual tests
- [ ] Compare screenshots before/after
- [ ] Check all component variants
- [ ] Verify dark mode consistency

### 10.2 Functional Testing

- [ ] Run all component unit tests
- [ ] Run integration tests
- [ ] Test keyboard navigation
- [ ] Test accessibility (ARIA attributes)

### 10.3 Browser Testing

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

---

## Phase 11: Clean Up \_globals.scss

**Duration**: 2 days  
**Status**: ⏳ Pending

### 11.1 Identify Unused Tokens

**Strategy**: After all components are migrated, identify which tokens are no longer used.

```bash
# Search for remaining old token usage
grep -r "var(--av-" src/components/
grep -r "var(--search-" src/components/
grep -r "var(--dialog-" src/components/
grep -r "var(--checkbox-" src/components/
grep -r "var(--table-" src/components/
grep -r "var(--toast-" src/components/
```

### 11.2 Remove Unused Tokens Incrementally

- [ ] Create backup of \_globals.scss
- [ ] Remove migrated input tokens
- [ ] Remove migrated checkbox tokens
- [ ] Remove migrated table tokens
- [ ] Remove migrated dialog tokens
- [ ] Remove migrated dropdown tokens
- [ ] Remove migrated tooltip tokens
- [ ] Remove migrated toast tokens
- [ ] Remove migrated button tokens (Vue)
- [ ] Test after each removal

### 11.3 Keep Backward Compatibility Tokens (Temporary)

Keep these tokens temporarily for any external consumers:

- Core shadcn tokens that might be used externally
- Document which tokens are deprecated

---

## Phase 12: Final Cleanup

**Duration**: 1 day  
**Status**: ⏳ Pending

### 12.1 Delete Duplicate Files

- [ ] Delete `_variables.scss` (82 lines, duplicate of \_globals.scss)
- [ ] Update imports if needed

### 12.2 Consolidate \_globals.scss

After removing all migrated tokens, \_globals.scss should only contain:

- Legacy tokens for backward compatibility (if any)
- Component-specific tokens that can't be mapped to semantic tokens (if any)

**Goal**: Reduce \_globals.scss from 549 lines to <50 lines or delete entirely.

### 12.3 Update Documentation

- [ ] Update README with new token system
- [ ] Add deprecation notices for old tokens
- [ ] Update component documentation
- [ ] Create migration guide for external consumers

### 12.4 Final Verification

- [ ] All tests pass
- [ ] No console warnings
- [ ] Storybook builds successfully
- [ ] Production build works
- [ ] Bundle size check (should be smaller)

---

## Success Metrics

| Metric                      | Before   | Target   | Status |
| --------------------------- | -------- | -------- | ------ |
| Total CSS Variables         | 150+     | ~30      | ⏳     |
| \_globals.scss Lines        | 549      | <50 or 0 | ⏳     |
| Components Using Old Tokens | 9        | 0        | ⏳     |
| Old Token Usages            | 52       | 0        | ⏳     |
| Test Pass Rate              | 100%     | 100%     | ⏳     |
| Bundle Size                 | Baseline | -5%      | ⏳     |

---

## Risk Mitigation

### Risks:

1. **Visual Regressions**: Colors might not match exactly
2. **Breaking Changes**: External consumers using old tokens
3. **Dark Mode Issues**: Semantic tokens might not cover all cases
4. **Performance**: Build time might increase temporarily

### Mitigation Strategies:

1. **Visual Testing**: Screenshot comparison before/after
2. **Deprecation Period**: Keep old tokens for 1-2 releases
3. **Dark Mode Testing**: Test every component in dark mode
4. **Incremental Migration**: One component at a time, test thoroughly

---

## Rollback Plan

If critical issues are found:

1. **Immediate**: Revert Tailwind config to use old tokens
2. **Short-term**: Keep both token systems running in parallel
3. **Long-term**: Fix issues and resume migration

---

## Timeline Summary

| Phase                 | Duration | Dependencies |
| --------------------- | -------- | ------------ |
| 0. Audit              | ✅ Done  | None         |
| 1. Mapping Reference  | 1 day    | Phase 0      |
| 2. Input Components   | 2 days   | Phase 1      |
| 3. Checkbox           | 1 day    | Phase 1      |
| 4. Table              | 1 day    | Phase 1      |
| 5. Dialog             | 1 day    | Phase 1      |
| 6. Dropdown Menu      | 1 day    | Phase 1      |
| 7. Tooltip            | 0.5 days | Phase 1      |
| 8. Toast/Sonner       | 2 days   | Phase 1      |
| 9. Vue Button         | 1 day    | Phase 1      |
| 10. Testing           | 2 days   | Phases 2-9   |
| 11. Cleanup \_globals | 2 days   | Phase 10     |
| 12. Final Cleanup     | 1 day    | Phase 11     |

**Total Estimated Time**: 15.5 days (~3 weeks)

---

## Next Steps

1. **Review this plan** with the team
2. **Create tracking issues** for each phase
3. **Set up visual regression testing** infrastructure
4. **Begin Phase 1**: Create token mapping reference
5. **Start Phase 2**: Migrate input components (quick win)

---

## Notes

- Migration can be done in parallel by multiple developers
- Each phase is independent after Phase 1
- Priority should be given to high-traffic components
- Keep old \_globals.scss until all migrations are complete
- Document any edge cases or special patterns discovered during migration
