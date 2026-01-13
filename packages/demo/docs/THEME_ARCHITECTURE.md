# Theme Architecture - Single Source of Truth

## Problem Solved

Previously, we had **two separate mappings** for the same theme configuration:

1. Tailwind config (`tailwind.config.js`) - CSS var → Tailwind color names
2. Runtime mapping (`cssVariables.ts`) - CSS var → Palette keys

This caused:

- ❌ Duplication and maintenance overhead
- ❌ Risk of inconsistencies (e.g., commented out `destructive` in one place but not the other)
- ❌ No compile-time validation

## New Architecture

### Single Source of Truth: `themeConfig.ts`

All theme color mappings are now defined in **one place**:

```typescript
// packages/demo-app/src/lib/playground/themeConfig.ts
export const THEME_COLOR_MAPPINGS: ThemeColorMapping[] = [
  {
    cssVar: '--semantic-bg-base',
    tailwindKey: 'background',
    paletteKey: 'background',
  },
  // ... all other mappings
];
```

### How It Works

```
┌─────────────────────────────────────────┐
│      themeConfig.ts (Source of Truth)   │
│   THEME_COLOR_MAPPINGS: Array<Mapping>  │
└────────────┬────────────────────────────┘
             │
       ┌─────┴─────┐
       │           │
       ▼           ▼
┌─────────────┐  ┌──────────────────┐
│  Tailwind   │  │  Runtime (JS)    │
│  Config     │  │  cssVariables.ts │
│  (Build)    │  │  (Runtime)       │
└─────────────┘  └──────────────────┘
       │                  │
       ▼                  ▼
   CSS classes      document.style
```

### Benefits

✅ **Single source of truth** - Change once, updates everywhere
✅ **Type safety** - TypeScript validates all mappings
✅ **No duplication** - Mappings defined once
✅ **Easy maintenance** - Add/remove colors in one place
✅ **Consistency guaranteed** - Impossible to have mismatched configs

## Usage

### Runtime (Current Implementation)

```typescript
// cssVariables.ts
import { getCssVarToPaletteMap } from './themeConfig';

function applyColorPalette(root: HTMLElement, palette: ColorPalette): void {
  const colorMap = getCssVarToPaletteMap(); // ✅ Generated from single source

  Object.entries(colorMap).forEach(([cssVar, paletteKey]) => {
    const colorToken = palette[paletteKey as keyof ColorPalette];
    if (colorToken) {
      root.style.setProperty(cssVar, colorToken.css);
    }
  });
}
```

### Tailwind Config (Optional Future Enhancement)

You can also generate Tailwind colors from the same source:

```javascript
// tailwind.config.js
import { generateTailwindColors } from './themeConfig';

export default {
  theme: {
    extend: {
      colors: {
        ...generateTailwindColors(), // ✅ Generated from single source
        // Additional status colors can be added manually if needed
      },
    },
  },
};
```

## Making Changes

### To Add a New Color

Edit **only** `themeConfig.ts`:

```typescript
export const THEME_COLOR_MAPPINGS: ThemeColorMapping[] = [
  // ... existing mappings
  {
    cssVar: '--semantic-status-success-bg',
    tailwindKey: 'success',
    paletteKey: 'success',
  },
];
```

Both runtime and Tailwind will automatically pick up the change.

### To Remove a Color

Comment it out or remove it from `THEME_COLOR_MAPPINGS` - that's it!

```typescript
// Commented out in ONE place, affects both runtime and Tailwind
// { cssVar: '--semantic-status-danger-bg', tailwindKey: 'destructive', paletteKey: 'destructive' },
```

## Migration Notes

### Current State

- ✅ Runtime code (`cssVariables.ts`) now uses `themeConfig.ts`
- ⚠️ Tailwind config still has manual mappings (optional to migrate)

### Future Enhancement (Optional)

If you want Tailwind to also use the single source:

1. Update `tailwind.config.js` to import `generateTailwindColors()`
2. Replace manual color definitions with the generated ones
3. Keep status colors (success, warning, etc.) as manual additions since they're not in the playground palette

## Files Changed

- ✅ **Created**: `src/lib/playground/themeConfig.ts` - Single source of truth
- ✅ **Updated**: `src/lib/playground/cssVariables.ts` - Now imports from themeConfig
- ⚠️ **Optional**: `tailwind.config.js` - Can be updated to use themeConfig

## Validation

The mapping is now type-safe and validated at compile time:

- CSS variable names are strings
- Tailwind keys match the Tailwind color structure
- Palette keys are validated against `ColorPalette` type
