# CSS Export Strategy & Tailwind Preset Design

**Date:** 2026-01-28
**Status:** Approved
**Author:** Claude Code

## Problem Statement

The current UI package build purges unused Tailwind styles, which causes issues when consumers need utility classes that weren't used in the library components. Users need:

1. Access to all design tokens and Tailwind utility classes
2. A Tailwind preset for custom builds
3. Modular CSS imports for granular control
4. Backward compatibility with existing imports

## Solution Overview

Provide three CSS distribution strategies with comprehensive documentation:

1. **Full CSS Bundle** - All Tailwind utilities (unpurged) + components
2. **Optimized Bundle** - Current behavior (purged for production)
3. **Modular Imports** - Feature-level splits (tokens, base, components, utilities)
4. **Tailwind Preset** - Consumable configuration for custom builds

## Architecture

### CSS Output Files

| File                    | Content                             | Size Estimate | Use Case                      |
| ----------------------- | ----------------------------------- | ------------- | ----------------------------- |
| `tokens.css`            | CSS variables only                  | ~5-10KB       | Custom Tailwind builds        |
| `shadcn-uikit.css`      | Purged Tailwind + components        | ~96KB         | Current behavior (production) |
| `shadcn-uikit-full.css` | All Tailwind utilities + components | ~200-300KB    | Quick start, prototyping      |
| `base.css`              | @tailwind base + CSS variables      | ~20-30KB      | Modular: base layer           |
| `components.css`        | @tailwind components                | ~30-40KB      | Modular: component layer      |
| `utilities.css`         | @tailwind utilities                 | ~150-200KB    | Modular: utilities layer      |
| `themes/*.css`          | Individual themes                   | ~5-10KB each  | Existing theme system         |

### Package Exports

```json
{
  "exports": {
    "./styles": "./dist/shadcn-uikit.css",
    "./styles/full": "./dist/shadcn-uikit-full.css",
    "./styles/tokens": "./dist/tokens.css",
    "./styles/base": "./dist/base.css",
    "./styles/components": "./dist/components.css",
    "./styles/utilities": "./dist/utilities.css",
    "./styles/themes/acronis-default": "./dist/themes/acronis-default.css",
    "./styles/themes/acronis-ocean": "./dist/themes/acronis-ocean.css",
    "./styles/themes/cyber-chat": "./dist/themes/cyber-chat.css",
    "./tailwind-preset": {
      "require": "./tailwind.preset.cjs",
      "import": "./dist/tailwind-preset.js"
    }
  }
}
```

## Implementation Details

### 1. Source File Structure

Create new SCSS entry files:

```
packages/ui/src/styles/
├── index.scss              (existing - purged build)
├── tokens-only.scss        (new - CSS variables only)
├── full.scss               (new - unpurged Tailwind)
├── base-only.scss          (new - @tailwind base)
├── components-only.scss    (new - @tailwind components)
└── utilities-only.scss     (new - @tailwind utilities)
```

**File Contents:**

```scss
// tokens-only.scss
@use './tokens';
// No @tailwind directives

// full.scss
@use './tokens';
@use './base';
@tailwind base;
@tailwind components;
@tailwind utilities;

// base-only.scss
@use './tokens';
@use './base';
@tailwind base;

// components-only.scss
@tailwind components;

// utilities-only.scss
@tailwind utilities;
```

### 2. Tailwind Preset

**File:** `tailwind.preset.cjs`

```javascript
module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        /* existing config */
      },
      screens: {
        /* existing config */
      },
    },
    extend: {
      fontFamily: {
        /* existing config */
      },
      fontSize: {
        /* existing config */
      },
      colors: {
        /* all semantic color mappings */
      },
      borderRadius: {
        /* existing config */
      },
      keyframes: {
        /* existing animations */
      },
      animation: {
        /* existing animations */
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**Key Design Decisions:**

- Use `.cjs` extension for CommonJS compatibility (package.json has `"type": "module"`)
- Include `tailwindcss-animate` plugin
- NO `content` array - consumers define their own
- Export as CommonJS module for maximum compatibility

**ESM Wrapper:** `dist/tailwind-preset.js`

```javascript
import preset from '../tailwind.preset.cjs';
export default preset;
```

### 3. Build Configuration

**Vite Config Updates:**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: {
        // Existing entries
        index: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/react.ts'),
        styles: resolve(__dirname, 'src/styles/index.scss'),

        // New CSS entries
        'styles-tokens': resolve(__dirname, 'src/styles/tokens-only.scss'),
        'styles-full': resolve(__dirname, 'src/styles/full.scss'),
        'styles-base': resolve(__dirname, 'src/styles/base-only.scss'),
        'styles-components': resolve(
          __dirname,
          'src/styles/components-only.scss'
        ),
        'styles-utilities': resolve(
          __dirname,
          'src/styles/utilities-only.scss'
        ),

        // Existing theme entries
        'themes/acronis-default': resolve(
          __dirname,
          'src/styles/theme-acronis-default.scss'
        ),
        'themes/acronis-ocean': resolve(
          __dirname,
          'src/styles/theme-acronis-ocean.scss'
        ),
        'themes/cyber-chat': resolve(
          __dirname,
          'src/styles/theme-cyber-chat.scss'
        ),
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name;

          // Tokens CSS
          if (name === 'styles-tokens.css') return 'tokens.css';

          // Full unpurged build
          if (name === 'styles-full.css') return 'shadcn-uikit-full.css';

          // Modular builds
          if (name === 'styles-base.css') return 'base.css';
          if (name === 'styles-components.css') return 'components.css';
          if (name === 'styles-utilities.css') return 'utilities.css';

          // Main purged build
          if (name === 'styles.css') return 'shadcn-uikit.css';

          // Themes (existing logic)
          return assetInfo.name || 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
```

**Tailwind Configs:**

```javascript
// tailwind.config.full.js
import baseConfig from './tailwind.config.js';

export default {
  ...baseConfig,
  content: [], // Empty = no purging
};
```

**PostCSS Configuration:**

Need to detect which entry is being processed and apply appropriate config:

- `full.scss` → `tailwind.config.full.js` (no purging)
- Other entries → `tailwind.config.js` (with purging)

### 4. Build Scripts

**Update package.json scripts:**

```json
{
  "scripts": {
    "build": "npm run build:preset && npm run build:lib && npm run build:llms",
    "build:preset": "tsx scripts/generate-preset.ts",
    "build:lib": "vite build"
  }
}
```

**Create:** `scripts/generate-preset.ts`

```typescript
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const esmWrapper = `import preset from '../tailwind.preset.cjs';
export default preset;
`;

writeFileSync(resolve(__dirname, '../dist/tailwind-preset.js'), esmWrapper);

console.log('✓ Generated ESM wrapper for tailwind preset');
```

### 5. Package.json Updates

**Peer Dependencies:**

```json
{
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true },
    "react-dom": { "optional": true },
    "tailwindcss-animate": { "optional": true }
  }
}
```

**Files:**

```json
{
  "files": ["dist", "tailwind.preset.cjs", "README.md", "LICENSE"]
}
```

## Documentation Updates

### README.md Sections

#### 1. CSS Import Options (New Section)

````markdown
## CSS Import Options

### Full CSS Bundle (Recommended for Quick Start)

```tsx
import '@acronis-platform/shadcn-uikit/styles/full';
```
````

- Size: ~200-300KB (uncompressed)
- Includes all Tailwind utilities (not purged)
- Best for: Rapid prototyping, small projects

### Optimized Bundle (Recommended for Production)

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```

- Size: ~96KB (current bundle)
- Includes only CSS used in imported components
- Best for: Production builds

### Modular Imports (Advanced)

```tsx
import '@acronis-platform/shadcn-uikit/styles/base';
import '@acronis-platform/shadcn-uikit/styles/components';
import '@acronis-platform/shadcn-uikit/styles/utilities';
```

### Tokens Only

```tsx
import '@acronis-platform/shadcn-uikit/styles/tokens';
```

- Just CSS variables
- Use with Tailwind preset for custom builds

````

#### 2. Using with Tailwind CSS (New Section)

```markdown
## Using with Tailwind CSS

If you're building your own Tailwind setup:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@acronis-platform/shadcn-uikit/tailwind-preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@acronis-platform/shadcn-uikit/dist/**/*.js'
  ],
}
````

Then import only the tokens:

```tsx
import '@acronis-platform/shadcn-uikit/styles/tokens';
```

This approach:

- Gives you all design tokens as CSS variables
- Tailwind generates utilities based on preset configuration
- Smallest bundle size (only utilities you actually use)
- Full control over Tailwind configuration

````

#### 3. Migration Guide (New Section)

```markdown
## Migration Guide

### v0.14.x → v0.15.0

**No Breaking Changes** - All existing imports continue to work.

**Before:**
```tsx
import '@acronis-platform/shadcn-uikit/styles';
````

**After (same behavior):**

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```

**New Options Available:**

- `styles/full` - Complete unpurged CSS
- `styles/tokens` - CSS variables only
- `styles/base`, `styles/components`, `styles/utilities` - Modular imports
- `tailwind-preset` - Tailwind configuration preset

```

## Testing Strategy

1. **Build Verification**
   - All CSS files generated with correct names
   - File sizes within expected ranges
   - No duplicate CSS across modular files

2. **Package Exports**
   - All export paths resolve correctly
   - Both CommonJS and ESM imports work
   - Tailwind preset loadable in consumer projects

3. **Integration Testing**
   - Create test project using full bundle
   - Create test project using modular imports
   - Create test project using Tailwind preset
   - Verify CSS variables available in all scenarios

4. **Bundle Size Analysis**
   - `tokens.css` < `base.css` < `components.css` < `shadcn-uikit.css` < `shadcn-uikit-full.css`
   - Modular files combined ≈ full bundle size
   - No significant regressions in existing bundle

5. **Backward Compatibility**
   - Existing imports still work
   - No changes to component behavior
   - CSS variable names unchanged

## Success Criteria

- [ ] All 7 CSS bundles generated successfully
- [ ] Tailwind preset works in consumer project (both CJS and ESM)
- [ ] Package exports resolve correctly for all paths
- [ ] Documentation comprehensive and clear
- [ ] No breaking changes to existing API
- [ ] Build times remain reasonable (<2x increase)
- [ ] All tests pass

## Future Considerations

1. **Tree-shaking CSS** - Investigate automatic per-component CSS extraction
2. **CSS-in-JS Option** - Consider adding styled-components/emotion builds
3. **CDN Distribution** - Publish full bundle to CDN for quick prototyping
4. **Theme Builder** - Tool to generate custom theme files from design tokens

## Related Issues

- Tailwind purging unused utility classes from library bundle
- Consumers need design tokens for custom components
- Request for Tailwind preset to maintain consistency
```
