# Icon Management Guide

This document explains the different approaches to managing icons in the Acronis UIKit.

## Approaches

### 1. **Manual Icon Components** (Current - `icon-library.tsx`)

Best for: Small, curated icon sets with custom styling

```tsx
import { InfoIcon, SuccessIcon } from '@/components/icons';

<InfoIcon className="size-4" />;
```

**Pros:**

- Full control over implementation
- Can add custom logic per icon
- Type-safe
- Tree-shakeable

**Cons:**

- Manual maintenance
- Verbose for large icon sets

---

### 2. **Dynamic Icons** (Recommended for Large Sets)

Best for: Large icon libraries, runtime icon selection

```tsx
import { DynamicIcon, getIcon, Icons } from '@/components/icons'

// Method 1: Dynamic component
<DynamicIcon name="info" className="size-4" />

// Method 2: Get icon by name
const InfoIcon = getIcon('info')
<InfoIcon className="size-4" />

// Method 3: Direct access
const InfoIcon = Icons.info
<InfoIcon className="size-4" />
```

**Pros:**

- Automatic - just drop SVG files in `/svg` folder
- No code generation needed
- All icons loaded at build time
- Type-safe with TypeScript

**Cons:**

- All icons bundled (use lazy loading for large sets)
- Less explicit than manual imports

---

### 3. **Auto-Generated Components** (Best of Both Worlds)

Best for: Balance between automation and explicit imports

```bash
# Generate icon components from SVG files
npm run generate:icons
```

```tsx
import { InfoIcon, SuccessIcon } from '@/components/icons/auto-generated';

<InfoIcon className="size-4" />;
```

**Pros:**

- Explicit imports (tree-shakeable)
- Automated generation
- Type-safe
- Can be version controlled

**Cons:**

- Requires running script after adding new icons
- Generated code in repo

---

### 4. **Lazy Loading** (For Performance)

Best for: Very large icon sets, code splitting

```tsx
import { LazyIcon } from '@/components/icons';

<LazyIcon name="info" className="size-4" />;
```

**Pros:**

- Icons loaded on demand
- Smaller initial bundle
- Good for large icon libraries

**Cons:**

- Slight delay on first render
- More complex implementation

---

## Workflow Recommendations

### For Small Projects (< 50 icons)

Use **Manual Icon Components** (`icon-library.tsx`)

- Most straightforward
- Full control
- Easy to understand

### For Medium Projects (50-200 icons)

Use **Auto-Generated Components**

1. Add SVG files to `src/components/icons/svg/`
2. Run `npm run generate:icons`
3. Import from `@/components/icons/auto-generated`

### For Large Projects (> 200 icons)

Use **Dynamic Icons** with lazy loading

- Automatic discovery
- Better performance
- Runtime flexibility

---

## File Structure

```
src/components/icons/
├── svg/                      # Source SVG files
│   ├── info.svg
│   ├── success.svg
│   └── ...
├── alert-icons.tsx           # Legacy manual icons
├── icon-library.tsx          # Manual icon components
├── base-icon.tsx            # Base wrapper component
├── dynamic-icons.tsx        # Dynamic loading utilities
├── auto-generated.tsx       # Auto-generated components
└── index.ts                 # Main exports

scripts/
└── generate-icons.js        # Icon generation script
```

---

## Adding New Icons

### Method 1: Manual (icon-library.tsx)

```tsx
export function NewIcon({ className, ...props }: IconProps) {
  return (
    <BaseIcon className={className} {...props}>
      <path d="..." fill="currentColor" />
    </BaseIcon>
  );
}
```

### Method 2: Auto-Generated

1. Add `new-icon.svg` to `src/components/icons/svg/`
2. Run `npm run generate:icons`
3. Import: `import { NewIcon } from '@/components/icons/auto-generated'`

### Method 3: Dynamic (No Code Needed!)

1. Add `new-icon.svg` to `src/components/icons/svg/`
2. Use: `<DynamicIcon name="new-icon" />`

---

## Best Practices

1. **Use consistent naming**: kebab-case for SVG files (e.g., `info-circle.svg`)
2. **Optimize SVGs**: Remove unnecessary attributes, use `currentColor` for theme support
3. **Set viewBox**: Always use `viewBox="0 0 16 16"` for consistency
4. **Use BaseIcon**: Wrap custom icons with `BaseIcon` for consistent sizing
5. **Export from index**: Always export through `index.ts` for clean imports

---

## Examples

### Using with Alerts

```tsx
import { DynamicIcon } from '@/components/icons';

<Alert variant="info">
  <AlertIcon>
    <DynamicIcon name="info" />
  </AlertIcon>
  <AlertContent>...</AlertContent>
</Alert>;
```

### Theme-Aware Icons

```tsx
// Use currentColor in SVG
<BaseIcon>
  <path d="..." fill="currentColor" />
</BaseIcon>

// Then control color with className
<MyIcon className="text-primary" />
<MyIcon className="text-destructive" />
```

### Custom Sizes

```tsx
<DynamicIcon name="info" className="size-4" />  // 16px
<DynamicIcon name="info" className="size-6" />  // 24px
<DynamicIcon name="info" className="h-8 w-8" /> // 32px
```
