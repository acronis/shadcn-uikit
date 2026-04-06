# CSS Export Strategy & Tailwind Preset Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Provide multiple CSS distribution strategies (full, optimized, modular) and a Tailwind preset for maximum flexibility.

**Architecture:** Generate 7 CSS bundles from separate SCSS entry files, create dual-format Tailwind preset (CJS/ESM), update package exports and documentation.

**Tech Stack:** Vite, Tailwind CSS, SCSS, TypeScript, PostCSS

---

## Task 1: Create SCSS Entry Files

**Files:**

- Create: `packages/ui/src/styles/tokens-only.scss`
- Create: `packages/ui/src/styles/full.scss`
- Create: `packages/ui/src/styles/base-only.scss`
- Create: `packages/ui/src/styles/components-only.scss`
- Create: `packages/ui/src/styles/utilities-only.scss`

**Step 1: Create tokens-only.scss**

```scss
@use './tokens';
```

**Step 2: Create full.scss**

```scss
@use './tokens';
@use './base';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 3: Create base-only.scss**

```scss
@use './tokens';
@use './base';

@tailwind base;
```

**Step 4: Create components-only.scss**

```scss
@tailwind components;
```

**Step 5: Create utilities-only.scss**

```scss
@tailwind utilities;
```

**Step 6: Verify files created**

Run: `ls -la packages/ui/src/styles/*.scss`
Expected: All 5 new files listed

**Step 7: Commit**

```bash
git add packages/ui/src/styles/tokens-only.scss packages/ui/src/styles/full.scss packages/ui/src/styles/base-only.scss packages/ui/src/styles/components-only.scss packages/ui/src/styles/utilities-only.scss
git commit -m "feat: add SCSS entry files for modular CSS builds"
```

---

## Task 2: Create Tailwind Config for Full Build

**Files:**

- Create: `packages/ui/tailwind.config.full.js`
- Reference: `packages/ui/tailwind.config.js`

**Step 1: Create tailwind.config.full.js**

Read the existing config first to understand the structure.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [], // Empty = no purging
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
        '3xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1920px',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'var(--av-font-sans)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        base: [
          'var(--av-font-size-base, 16px)',
          { lineHeight: 'var(--av-line-height-base, 1.5)' },
        ],
      },
      lineHeight: {
        base: 'var(--av-line-height-base, 1.5)',
      },
      letterSpacing: {
        base: 'var(--av-letter-spacing-base, 0)',
      },
      colors: {
        background: 'hsl(var(--av-background))',
        foreground: 'hsl(var(--av-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--av-primary))',
          foreground: 'hsl(var(--av-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--av-secondary))',
          foreground: 'hsl(var(--av-secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--av-muted))',
          foreground: 'hsl(var(--av-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--av-accent))',
          foreground: 'hsl(var(--av-accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--av-destructive))',
          foreground: 'hsl(var(--av-destructive-foreground))',
          light: 'hsl(var(--av-status-danger-bg))',
          accent: 'hsl(var(--av-status-danger))',
        },
        danger: {
          DEFAULT: 'hsl(var(--av-status-danger-bg))',
          foreground: 'hsl(var(--av-status-danger-text))',
          accent: 'hsl(var(--av-status-danger))',
        },
        success: {
          DEFAULT: 'hsl(var(--av-status-success-bg))',
          foreground: 'hsl(var(--av-status-success-text))',
          accent: 'hsl(var(--av-status-success))',
        },
        warning: {
          DEFAULT: 'hsl(var(--av-status-warning-bg))',
          foreground: 'hsl(var(--av-status-warning-text))',
          accent: 'hsl(var(--av-status-warning))',
        },
        info: {
          DEFAULT: 'hsl(var(--av-status-info-bg))',
          foreground: 'hsl(var(--av-status-info-text))',
          accent: 'hsl(var(--av-status-info))',
        },
        critical: {
          DEFAULT: 'hsl(var(--av-status-critical-bg))',
          foreground: 'hsl(var(--av-status-critical-text))',
          accent: 'hsl(var(--av-status-critical))',
        },
        neutral: {
          DEFAULT: 'hsl(var(--av-status-neutral-bg))',
          foreground: 'hsl(var(--av-status-neutral-text))',
          accent: 'hsl(var(--av-status-neutral))',
        },
        ai: {
          DEFAULT: 'hsl(var(--av-status-ai-bg))',
          foreground: 'hsl(var(--av-status-ai-text))',
          accent: 'hsl(var(--av-status-ai))',
        },
        popover: {
          DEFAULT: 'hsl(var(--av-popover))',
          foreground: 'hsl(var(--av-popover-foreground))',
        },
        tooltip: {
          DEFAULT: 'hsl(var(--av-tooltip))',
          foreground: 'hsl(var(--av-text-inverse))',
        },
        card: {
          DEFAULT: 'hsl(var(--av-elevated))',
          foreground: 'hsl(var(--av-foreground))',
        },
        border: 'hsl(var(--av-border))',
        input: 'hsl(var(--av-input))',
        ring: 'hsl(var(--av-ring)',
        sidebar: {
          DEFAULT: 'hsl(var(--av-nav-bg))',
          foreground: 'hsl(var(--av-nav-text))',
          primary: 'hsl(var(--av-nav-bg))',
          'primary-foreground': 'hsl(var(--av-text-inverse))',
          accent: 'hsl(var(--av-nav-active))',
          'accent-foreground': 'hsl(var(--av-text-inverse))',
          border: 'hsl(var(--av-nav-bg))',
          ring: 'hsl(var(--av-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--av-radius)',
        md: 'calc(var(--av-radius) - 2px)',
        sm: 'calc(var(--av-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**Step 2: Verify file created**

Run: `cat packages/ui/tailwind.config.full.js | head -10`
Expected: File content displayed with content: []

**Step 3: Commit**

```bash
git add packages/ui/tailwind.config.full.js
git commit -m "feat: add Tailwind config for unpurged full build"
```

---

## Task 3: Create Tailwind Preset (CJS)

**Files:**

- Create: `packages/ui/tailwind.preset.cjs`
- Reference: `packages/ui/tailwind.config.js`

**Step 1: Create tailwind.preset.cjs**

Copy theme configuration from existing config, but export as CommonJS and remove content array.

```javascript
module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
        '3xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1920px',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          'var(--av-font-sans)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        base: [
          'var(--av-font-size-base, 16px)',
          { lineHeight: 'var(--av-line-height-base, 1.5)' },
        ],
      },
      lineHeight: {
        base: 'var(--av-line-height-base, 1.5)',
      },
      letterSpacing: {
        base: 'var(--av-letter-spacing-base, 0)',
      },
      colors: {
        background: 'hsl(var(--av-background))',
        foreground: 'hsl(var(--av-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--av-primary))',
          foreground: 'hsl(var(--av-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--av-secondary))',
          foreground: 'hsl(var(--av-secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--av-muted))',
          foreground: 'hsl(var(--av-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--av-accent))',
          foreground: 'hsl(var(--av-accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--av-destructive))',
          foreground: 'hsl(var(--av-destructive-foreground))',
          light: 'hsl(var(--av-status-danger-bg))',
          accent: 'hsl(var(--av-status-danger))',
        },
        danger: {
          DEFAULT: 'hsl(var(--av-status-danger-bg))',
          foreground: 'hsl(var(--av-status-danger-text))',
          accent: 'hsl(var(--av-status-danger))',
        },
        success: {
          DEFAULT: 'hsl(var(--av-status-success-bg))',
          foreground: 'hsl(var(--av-status-success-text))',
          accent: 'hsl(var(--av-status-success))',
        },
        warning: {
          DEFAULT: 'hsl(var(--av-status-warning-bg))',
          foreground: 'hsl(var(--av-status-warning-text))',
          accent: 'hsl(var(--av-status-warning))',
        },
        info: {
          DEFAULT: 'hsl(var(--av-status-info-bg))',
          foreground: 'hsl(var(--av-status-info-text))',
          accent: 'hsl(var(--av-status-info))',
        },
        critical: {
          DEFAULT: 'hsl(var(--av-status-critical-bg))',
          foreground: 'hsl(var(--av-status-critical-text))',
          accent: 'hsl(var(--av-status-critical))',
        },
        neutral: {
          DEFAULT: 'hsl(var(--av-status-neutral-bg))',
          foreground: 'hsl(var(--av-status-neutral-text))',
          accent: 'hsl(var(--av-status-neutral))',
        },
        ai: {
          DEFAULT: 'hsl(var(--av-status-ai-bg))',
          foreground: 'hsl(var(--av-status-ai-text))',
          accent: 'hsl(var(--av-status-ai))',
        },
        popover: {
          DEFAULT: 'hsl(var(--av-popover))',
          foreground: 'hsl(var(--av-popover-foreground))',
        },
        tooltip: {
          DEFAULT: 'hsl(var(--av-tooltip))',
          foreground: 'hsl(var(--av-text-inverse))',
        },
        card: {
          DEFAULT: 'hsl(var(--av-elevated))',
          foreground: 'hsl(var(--av-foreground))',
        },
        border: 'hsl(var(--av-border))',
        input: 'hsl(var(--av-input))',
        ring: 'hsl(var(--av-ring)',
        sidebar: {
          DEFAULT: 'hsl(var(--av-nav-bg))',
          foreground: 'hsl(var(--av-nav-text))',
          primary: 'hsl(var(--av-nav-bg))',
          'primary-foreground': 'hsl(var(--av-text-inverse))',
          accent: 'hsl(var(--av-nav-active))',
          'accent-foreground': 'hsl(var(--av-text-inverse))',
          border: 'hsl(var(--av-nav-bg))',
          ring: 'hsl(var(--av-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--av-radius)',
        md: 'calc(var(--av-radius) - 2px)',
        sm: 'calc(var(--av-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**Step 2: Verify file created**

Run: `head -5 packages/ui/tailwind.preset.cjs`
Expected: `module.exports = {` on first line

**Step 3: Commit**

```bash
git add packages/ui/tailwind.preset.cjs
git commit -m "feat: add Tailwind preset as CommonJS module"
```

---

## Task 4: Create Preset Generation Script

**Files:**

- Create: `packages/ui/scripts/generate-preset.ts`

**Step 1: Create generate-preset.ts**

```typescript
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const outputPath = resolve(__dirname, '../dist/tailwind-preset.js');

// Ensure dist directory exists
mkdirSync(dirname(outputPath), { recursive: true });

const esmWrapper = `import preset from '../tailwind.preset.cjs';
export default preset;
`;

writeFileSync(outputPath, esmWrapper);

console.log('✓ Generated ESM wrapper for tailwind preset');
```

**Step 2: Verify file created**

Run: `cat packages/ui/scripts/generate-preset.ts`
Expected: File content displayed

**Step 3: Test script runs**

Run: `cd packages/ui && tsx scripts/generate-preset.ts`
Expected: "✓ Generated ESM wrapper for tailwind preset"

**Step 4: Verify output created**

Run: `cat packages/ui/dist/tailwind-preset.js`
Expected: ESM import/export wrapper

**Step 5: Clean up test output**

Run: `rm packages/ui/dist/tailwind-preset.js`

**Step 6: Commit**

```bash
git add packages/ui/scripts/generate-preset.ts
git commit -m "feat: add script to generate ESM wrapper for Tailwind preset"
```

---

## Task 5: Update Vite Configuration

**Files:**

- Modify: `packages/ui/vite.config.ts`

**Step 1: Read current vite.config.ts**

Understand the existing entry configuration.

**Step 2: Add new CSS entry points**

In the `build.lib.entry` object, add:

```typescript
'styles-tokens': resolve(__dirname, 'src/styles/tokens-only.scss'),
'styles-full': resolve(__dirname, 'src/styles/full.scss'),
'styles-base': resolve(__dirname, 'src/styles/base-only.scss'),
'styles-components': resolve(__dirname, 'src/styles/components-only.scss'),
'styles-utilities': resolve(__dirname, 'src/styles/utilities-only.scss'),
```

**Step 3: Update assetFileNames function**

Modify the `rollupOptions.output.assetFileNames` function to handle new CSS files:

```typescript
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

  // Main purged build (existing)
  if (name === 'style.css' || name === 'styles.css') {
    return 'shadcn-uikit.css';
  }

  // Theme CSS files are already named correctly by cssCodeSplit
  return assetInfo.name || 'assets/[name]-[hash][extname]';
};
```

**Step 4: Verify syntax**

Run: `cd packages/ui && pnpm type-check`
Expected: No TypeScript errors

**Step 5: Commit**

```bash
git add packages/ui/vite.config.ts
git commit -m "feat: add CSS entry points and asset naming for modular builds"
```

---

## Task 6: Update Package.json - Scripts

**Files:**

- Modify: `packages/ui/package.json`

**Step 1: Read current package.json**

Check existing build script structure.

**Step 2: Update build script**

Change:

```json
"build": "npm run build:lib && npm run build:llms"
```

To:

```json
"build": "pnpm run build:preset && pnpm run build:lib && pnpm run build:llms",
"build:preset": "tsx scripts/generate-preset.ts"
```

**Step 3: Verify JSON syntax**

Run: `cd packages/ui && cat package.json | jq .scripts.build`
Expected: New build command displayed

**Step 4: Commit**

```bash
git add packages/ui/package.json
git commit -m "feat: add build:preset script to generate ESM wrapper"
```

---

## Task 7: Update Package.json - Exports

**Files:**

- Modify: `packages/ui/package.json`

**Step 1: Read current exports**

Check existing export paths.

**Step 2: Add new CSS exports**

Add to `exports` object:

```json
"./styles/full": "./dist/shadcn-uikit-full.css",
"./styles/tokens": "./dist/tokens.css",
"./styles/base": "./dist/base.css",
"./styles/components": "./dist/components.css",
"./styles/utilities": "./dist/utilities.css",
"./tailwind-preset": {
  "require": "./tailwind.preset.cjs",
  "import": "./dist/tailwind-preset.js"
}
```

**Step 3: Verify JSON syntax**

Run: `cd packages/ui && cat package.json | jq .exports`
Expected: All exports displayed without errors

**Step 4: Commit**

```bash
git add packages/ui/package.json
git commit -m "feat: add package exports for new CSS bundles and Tailwind preset"
```

---

## Task 8: Update Package.json - Files & Peer Dependencies

**Files:**

- Modify: `packages/ui/package.json`

**Step 1: Add tailwind.preset.cjs to files array**

Add `"tailwind.preset.cjs"` to the `files` array.

**Step 2: Add tailwindcss-animate as optional peer dependency**

Add to `peerDependencies`:

```json
"tailwindcss-animate": "^1.0.7"
```

Add to `peerDependenciesMeta`:

```json
"tailwindcss-animate": { "optional": true }
```

**Step 3: Verify JSON syntax**

Run: `cd packages/ui && cat package.json | jq '.files, .peerDependencies, .peerDependenciesMeta'`
Expected: Updated fields displayed

**Step 4: Commit**

```bash
git add packages/ui/package.json
git commit -m "feat: add tailwind.preset.cjs to files and tailwindcss-animate as peer dep"
```

---

## Task 9: Build and Verify CSS Outputs

**Files:**

- Test: Build process generates all expected CSS files

**Step 1: Run build**

Run: `cd packages/ui && pnpm build`
Expected: Build completes without errors

**Step 2: Verify all CSS files exist**

Run: `ls -lh packages/ui/dist/*.css`
Expected:

- `tokens.css`
- `shadcn-uikit.css` (existing)
- `shadcn-uikit-full.css`
- `base.css`
- `components.css`
- `utilities.css`

**Step 3: Verify file sizes are reasonable**

Run: `du -h packages/ui/dist/*.css`
Expected approximate sizes:

- `tokens.css`: 5-10KB
- `base.css`: 20-30KB
- `components.css`: 30-40KB
- `utilities.css`: 150-200KB
- `shadcn-uikit.css`: ~96KB (existing)
- `shadcn-uikit-full.css`: 200-300KB

**Step 4: Verify preset files exist**

Run: `ls -la packages/ui/tailwind.preset.cjs packages/ui/dist/tailwind-preset.js`
Expected: Both files exist

**Step 5: Check for duplicate content**

Run: `head -20 packages/ui/dist/tokens.css && echo "---" && head -20 packages/ui/dist/base.css`
Expected: Different content, tokens should be CSS variables only

**Step 6: No commit needed**

This is verification only.

---

## Task 10: Test Package Exports Resolution

**Files:**

- Test: Package exports resolve correctly

**Step 1: Test CommonJS preset import**

Run: `cd packages/ui && node -e "console.log(require('./tailwind.preset.cjs').darkMode)"`
Expected: `[ 'class' ]`

**Step 2: Test ESM preset import**

Run: `cd packages/ui && node --input-type=module -e "import p from './dist/tailwind-preset.js'; console.log(p.darkMode)"`
Expected: `[ 'class' ]`

**Step 3: Check CSS files are accessible**

Run: `test -f packages/ui/dist/tokens.css && test -f packages/ui/dist/shadcn-uikit-full.css && echo "CSS files exist"`
Expected: "CSS files exist"

**Step 4: No commit needed**

This is verification only.

---

## Task 11: Update README - CSS Import Options

**Files:**

- Modify: `packages/ui/README.md`

**Step 1: Read current README structure**

Locate the "Styling" section.

**Step 2: Replace Styling section with CSS Import Options**

Replace the existing "Styling" section with:

````markdown
## CSS Import Options

The library provides multiple ways to import styles based on your needs:

### Full CSS Bundle (Recommended for Quick Start)

Includes all Tailwind utilities and component styles (not purged):

```tsx
import '@acronis-platform/shadcn-uikit/styles/full';
```
````

- **Size:** ~200-300KB (uncompressed)
- **Use when:** Rapid prototyping, small projects, or you want all utilities available

### Optimized Bundle (Recommended for Production)

Includes only the CSS used in your imported components:

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```

- **Size:** ~96KB (current bundle)
- **Use when:** Production builds where bundle size matters

### Modular Imports (Advanced)

Import only what you need:

```tsx
import '@acronis-platform/shadcn-uikit/styles/base'; // CSS variables + base styles
import '@acronis-platform/shadcn-uikit/styles/components'; // Component styles only
import '@acronis-platform/shadcn-uikit/styles/utilities'; // Utility classes only
```

### Tokens Only

Just CSS variables without any Tailwind utilities:

```tsx
import '@acronis-platform/shadcn-uikit/styles/tokens';
```

**Use when:** You're using the Tailwind preset and generating utilities yourself (see below).

### Theme Styles

Import individual theme files for specific color schemes:

```tsx
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-default';
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';
import '@acronis-platform/shadcn-uikit/styles/themes/cyber-chat';
```

````

**Step 3: Verify markdown renders correctly**

Check for proper code block formatting and list syntax.

**Step 4: Commit**

```bash
git add packages/ui/README.md
git commit -m "docs: add CSS Import Options section to README"
````

---

## Task 12: Update README - Using with Tailwind CSS

**Files:**

- Modify: `packages/ui/README.md`

**Step 1: Add new section after CSS Import Options**

Insert new section:

````markdown
## Using with Tailwind CSS

If you're building your own Tailwind setup, use our preset to get the design tokens:

```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@acronis-platform/shadcn-uikit/tailwind-preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@acronis-platform/shadcn-uikit/dist/**/*.js',
  ],
};
```
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

### Customization

You can override any preset values in your own config:

```javascript
module.exports = {
  presets: [require('@acronis-platform/shadcn-uikit/tailwind-preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(200 100% 50%)', // Override primary color
      },
    },
  },
};
```

````

**Step 2: Verify markdown syntax**

Check code blocks and list formatting.

**Step 3: Commit**

```bash
git add packages/ui/README.md
git commit -m "docs: add Tailwind CSS integration guide to README"
````

---

## Task 13: Update README - Migration Guide

**Files:**

- Modify: `packages/ui/README.md`

**Step 1: Add Migration Guide section before License**

Insert new section:

````markdown
## Migration Guide

### v0.14.x → v0.15.0

**No Breaking Changes** - All existing imports continue to work.

**Before:**

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```
````

**After (same behavior):**

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```

**New Options Available:**

- `styles/full` - Complete unpurged CSS bundle (~200-300KB)
- `styles/tokens` - CSS variables only (~5-10KB)
- `styles/base` - Base styles + tokens (~20-30KB)
- `styles/components` - Component layer (~30-40KB)
- `styles/utilities` - Utility classes (~150-200KB)
- `tailwind-preset` - Tailwind configuration preset

Choose the import strategy that best fits your needs. The default `styles` import remains unchanged and continues to provide the optimized, purged CSS bundle.

````

**Step 2: Verify formatting**

Check markdown syntax.

**Step 3: Commit**

```bash
git add packages/ui/README.md
git commit -m "docs: add migration guide for v0.15.0"
````

---

## Task 14: Run Tests

**Files:**

- Test: Ensure all existing tests still pass

**Step 1: Run test suite**

Run: `cd packages/ui && pnpm test --run`
Expected: All tests pass (26 tests from button component)

**Step 2: Run type checking**

Run: `cd packages/ui && pnpm type-check`
Expected: No TypeScript errors

**Step 3: Build and check output**

Run: `cd packages/ui && pnpm build`
Expected: Build succeeds, all CSS files generated

**Step 4: No commit needed**

This is verification only.

---

## Task 15: Final Verification & Documentation

**Files:**

- Verify: All success criteria met

**Step 1: Verify all 7 CSS bundles exist**

Run: `ls -1 packages/ui/dist/*.css | wc -l`
Expected: At least 6 CSS files (tokens, base, components, utilities, shadcn-uikit, shadcn-uikit-full) + 3 theme files

**Step 2: Verify preset files**

Run: `test -f packages/ui/tailwind.preset.cjs && test -f packages/ui/dist/tailwind-preset.js && echo "Preset files OK"`
Expected: "Preset files OK"

**Step 3: Verify package.json exports**

Run: `cd packages/ui && cat package.json | jq '.exports | keys'`
Expected: All export paths listed

**Step 4: Check README sections**

Run: `grep -E "^## (CSS Import Options|Using with Tailwind CSS|Migration Guide)" packages/ui/README.md`
Expected: All three new sections found

**Step 5: Verify no breaking changes**

Run: `cd packages/ui && cat package.json | jq .exports'["./styles"]'`
Expected: `"./dist/shadcn-uikit.css"` (unchanged)

**Step 6: Check build times**

Time the build and compare to baseline. Should not be more than 2x slower.

**Step 7: Create completion commit**

```bash
git add -A
git commit -m "chore: verify all CSS export strategy implementation complete"
```

---

## Success Criteria Checklist

- [ ] All 7 CSS bundles generated successfully
- [ ] Tailwind preset works (both CJS and ESM)
- [ ] Package exports resolve correctly for all paths
- [ ] Documentation comprehensive and clear
- [ ] No breaking changes to existing API
- [ ] Build times remain reasonable (<2x increase)
- [ ] All tests pass

## Implementation Notes

- Use @superpowers:verification-before-completion before claiming any task complete
- Frequent commits after each task
- Test imports after each package.json change
- Verify CSS file sizes are reasonable
- Check for duplicate CSS content across modular files
