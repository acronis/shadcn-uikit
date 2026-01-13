# Token Migration Patterns

This document provides detailed patterns and examples for migrating from old token system to new semantic tokens.

## Basic Patterns

### Pattern 1: Simple Background Migration

**Before:**

```tsx
className = 'bg-[hsl(var(--av-card))]';
```

**After:**

```tsx
className = 'bg-card';
```

### Pattern 2: Opacity with CSS Variables

**Before:**

```tsx
className = 'border-[hsl(var(--checkbox-border)/0.3)]';
```

**After:**

```tsx
className = 'border-input/30';
```

Tailwind supports opacity modifiers. Convert decimal to percentage:

- `0.1` → `/10`
- `0.3` → `/30`
- `0.5` → `/50`

### Pattern 3: Hardcoded RGBA to Semantic

**Before:**

```tsx
className = 'border-[rgba(38,104,197,0.3)]';
```

**After:**

```tsx
className = 'border-input';
```

Common conversions:

- `rgba(38,104,197,0.3)` → `border-input`
- `rgba(38,104,197,0.1)` → `border-border`
- `rgba(36,49,67,0.7)` → `text-muted-foreground`

## State Variants

### Pattern 4: Hover States

**Before:**

```tsx
className = 'hover:bg-[hsl(var(--av-dropdown-item-hover))]';
```

**After:**

```tsx
className = 'hover:bg-accent';
```

### Pattern 5: Focus States

**Before:**

```tsx
className = 'focus-visible:border-[hsl(var(--av-input-border-focus))]';
```

**After:**

```tsx
className = 'focus-visible:border-primary';
```

### Pattern 6: Data State Attributes

**Before:**

```tsx
className = 'data-[state=checked]:bg-[hsl(var(--checkbox-checked-bg))]';
```

**After:**

```tsx
className = 'data-[state=checked]:bg-primary';
```

## Complex Examples

### Checkbox (Multiple States)

**Before:**

```tsx
className="bg-[hsl(var(--checkbox-bg))]
  border-[hsl(var(--checkbox-border)/0.3)]
  hover:border-[hsl(var(--checkbox-border-hover)/0.5)]
  disabled:bg-[hsl(var(--checkbox-disabled-bg)/0.1)]
  data-[state=checked]:bg-[hsl(var(--checkbox-checked-bg))]"
```

**After:**

```tsx
className="bg-background
  border-input/30
  hover:border-input/50
  disabled:bg-muted/10
  data-[state=checked]:bg-primary"
```

### Table Row (Hover and Selected)

**Before:**

```tsx
className="border-[hsl(var(--table-border)/0.1)]
  hover:bg-[hsl(var(--table-row-hover)/0.05)]
  data-[state=selected]:bg-[hsl(var(--table-row-selected)/0.1)]"
```

**After:**

```tsx
className="border-border/10
  hover:bg-accent/5
  data-[state=selected]:bg-accent/10"
```

## Testing Checklist

After migration:

- Visual appearance matches (light mode)
- Dark mode works
- All states work (hover, focus, disabled, active)
- No console warnings
- Tests pass
