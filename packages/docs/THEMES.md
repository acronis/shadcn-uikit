# Theme System

The shadcn-uikit provides a flexible theme system with multiple pre-built color schemes and support for custom themes.

## Overview

The theme system uses CSS class-based themes that can be switched programmatically or by applying CSS classes. This approach provides:

- ✅ Zero JavaScript overhead
- ✅ SSR-compatible
- ✅ Fast theme switching
- ✅ Tree-shakeable (import only themes you need)
- ✅ Easy customization

## Available Themes

### Acronis Default

The standard Acronis brand theme with the official color palette.

```typescript
import { applyTheme } from '@acronis/shadcn-uikit';

applyTheme('acronis-default');
```

### Acronis Ocean

An alternative blue-focused theme with deeper ocean tones.

```typescript
import { applyTheme } from '@acronis/shadcn-uikit';

applyTheme('acronis-ocean');
```

## Quick Start

### 1. Import Styles

Import the theme styles in your application:

```typescript
// Import all themes (larger bundle)
import '@acronis/shadcn-uikit/styles/themes';

// OR import specific themes (smaller bundle)
import '@acronis/shadcn-uikit/styles/themes/acronis-default';
import '@acronis/shadcn-uikit/styles/themes/acronis-ocean';
```

### 2. Initialize Theme System

Initialize the theme system on application startup:

```typescript
import { initializeThemeSystem } from '@acronis/shadcn-uikit';

// In your app initialization (e.g., main.tsx or App.tsx)
const cleanup = initializeThemeSystem();

// Call cleanup when unmounting (optional)
// return cleanup
```

This will:

- Load the user's persisted theme preference
- Load the user's persisted color mode (light/dark)
- Set up system color scheme watcher

### 3. Switch Themes

Use the theme switcher API to change themes:

```typescript
import { applyTheme, applyColorMode } from '@acronis/shadcn-uikit';

// Switch theme
applyTheme('acronis-ocean');

// Switch color mode
applyColorMode('dark');
applyColorMode('light');
applyColorMode('system'); // Follows system preference
```

## API Reference

### `applyTheme(theme, persist?)`

Apply a theme to the document root element.

**Parameters:**

- `theme: ThemeName` - The theme name to apply (`'acronis-default'` | `'acronis-ocean'` | `'custom'`)
- `persist?: boolean` - Whether to persist the theme choice to localStorage (default: `true`)

**Example:**

```typescript
applyTheme('acronis-ocean');
applyTheme('acronis-default', false); // Don't persist
```

### `getCurrentTheme()`

Get the currently applied theme.

**Returns:** `ThemeName | null`

**Example:**

```typescript
const currentTheme = getCurrentTheme();
console.log(currentTheme); // 'acronis-ocean'
```

### `loadPersistedTheme()`

Load the persisted theme from localStorage and apply it.

**Returns:** `ThemeName | null`

**Example:**

```typescript
const loadedTheme = loadPersistedTheme();
```

### `applyColorMode(mode, persist?)`

Apply a color mode (light/dark/system) to the document root element.

**Parameters:**

- `mode: ColorMode` - The color mode to apply (`'light'` | `'dark'` | `'system'`)
- `persist?: boolean` - Whether to persist the mode choice to localStorage (default: `true`)

**Example:**

```typescript
applyColorMode('dark');
applyColorMode('system'); // Follows system preference
```

### `getCurrentColorMode()`

Get the currently applied color mode.

**Returns:** `'light' | 'dark'`

**Example:**

```typescript
const mode = getCurrentColorMode();
console.log(mode); // 'dark'
```

### `toggleColorMode(persist?)`

Toggle between light and dark mode.

**Parameters:**

- `persist?: boolean` - Whether to persist the mode choice to localStorage (default: `true`)

**Returns:** `'light' | 'dark'` - The new color mode after toggling

**Example:**

```typescript
const newMode = toggleColorMode();
console.log(newMode); // 'dark' or 'light'
```

### `initializeThemeSystem()`

Initialize the theme system on application startup.

**Returns:** `() => void` - A cleanup function to remove event listeners

**Example:**

```typescript
const cleanup = initializeThemeSystem();

// Later, when unmounting
cleanup();
```

## React Integration

### Basic Setup

```tsx
import { useEffect } from 'react';
import { initializeThemeSystem } from '@acronis/shadcn-uikit';

function App() {
  useEffect(() => {
    const cleanup = initializeThemeSystem();
    return cleanup;
  }, []);

  return <div>Your app</div>;
}
```

### Theme Switcher Component

```tsx
import { useState, useEffect } from 'react';
import {
  applyTheme,
  getCurrentTheme,
  type ThemeName,
} from '@acronis/shadcn-uikit';

function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>('acronis-default');

  useEffect(() => {
    const current = getCurrentTheme();
    if (current) setTheme(current);
  }, []);

  const handleThemeChange = (newTheme: ThemeName) => {
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <select
      value={theme}
      onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
    >
      <option value="acronis-default">Acronis Default</option>
      <option value="acronis-ocean">Acronis Ocean</option>
    </select>
  );
}
```

### Dark Mode Toggle

```tsx
import { useState, useEffect } from 'react';
import { toggleColorMode, getCurrentColorMode } from '@acronis/shadcn-uikit';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getCurrentColorMode() === 'dark');
  }, []);

  const handleToggle = () => {
    const newMode = toggleColorMode();
    setIsDark(newMode === 'dark');
  };

  return (
    <button onClick={handleToggle}>{isDark ? '🌙 Dark' : '☀️ Light'}</button>
  );
}
```

## Creating Custom Themes

### 1. Copy the Template

Copy the template file from `packages/ui/src/styles/themes/_template.scss` to create your custom theme:

```bash
cp packages/ui/src/styles/themes/_template.scss packages/ui/src/styles/themes/my-custom-theme.scss
```

### 2. Customize Colors

Edit your new theme file and replace the color values with your brand colors:

```scss
@mixin theme-my-custom {
  /* Brand Colors - Replace with your colors */
  --color-brand-primary: 210 100% 50%; /* Your primary color */
  --color-brand-secondary: 205 87% 52%; /* Your secondary color */

  /* ... customize other colors ... */
}

.theme-my-custom {
  @include theme-my-custom;

  &.dark {
    @include theme-my-custom-dark;
  }
}
```

### 3. Import Your Theme

Import your custom theme in your application:

```typescript
import '@acronis/shadcn-uikit/styles/themes/my-custom-theme';
```

### 4. Apply Your Theme

```typescript
import { applyTheme } from '@acronis/shadcn-uikit';

applyTheme('my-custom');
```

### 5. Update TypeScript Types (Optional)

For better type safety, extend the `ThemeName` type:

```typescript
declare module '@acronis/shadcn-uikit' {
  export type ThemeName = 'acronis-default' | 'acronis-ocean' | 'my-custom';
}
```

## Color Format

All colors must use the HSL format **without** the `hsl()` wrapper:

```scss
/* ✅ Correct */
--color-brand-primary: 210 100% 50%;

/* ❌ Wrong */
--color-brand-primary: hsl(210, 100%, 50%);
```

This format is required for Tailwind CSS compatibility.

## CSS-Only Usage

You can also apply themes using CSS classes without JavaScript:

```html
<!-- Apply theme via class -->
<html class="theme-acronis-ocean dark">
  <!-- Your app -->
</html>
```

## SSR Support

The theme system is fully SSR-compatible. Apply the theme class on the server:

```tsx
// Next.js example
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="theme-acronis-default">
      <body>{children}</body>
    </html>
  );
}
```

Then hydrate the theme on the client:

```tsx
'use client';

import { useEffect } from 'react';
import {
  loadPersistedTheme,
  loadPersistedColorMode,
} from '@acronis/shadcn-uikit';

export function ThemeProvider({ children }) {
  useEffect(() => {
    loadPersistedTheme();
    loadPersistedColorMode();
  }, []);

  return <>{children}</>;
}
```

## Best Practices

1. **Import only needed themes** - Import specific theme files instead of the index to reduce bundle size
2. **Initialize on startup** - Call `initializeThemeSystem()` early in your app lifecycle
3. **Persist preferences** - The theme system automatically persists user preferences to localStorage
4. **Use semantic tokens** - Reference semantic tokens (e.g., `--av-primary`) instead of primitive tokens (e.g., `--color-brand-primary`) in your components
5. **Test both modes** - Always test your custom themes in both light and dark modes

## Troubleshooting

### Theme not applying

Make sure you've imported the theme styles:

```typescript
import '@acronis/shadcn-uikit/styles/themes/acronis-default';
```

### Dark mode not working

Ensure you're applying the color mode after the DOM is ready:

```typescript
useEffect(() => {
  applyColorMode('dark');
}, []);
```

### Custom theme not found

Check that:

1. Your theme file exports a class with the correct name (e.g., `.theme-my-custom`)
2. You've imported the theme file in your application
3. The theme name matches the class name (without the `theme-` prefix)

## Migration from Old System

If you're migrating from the old `_variables.scss` system:

1. The default theme is automatically applied via `semantic.scss`
2. No changes needed in your components - they continue to use the same CSS variables
3. To switch themes, use the new `applyTheme()` API
4. The old `_variables.scss` file is now deprecated and can be removed

## Related Documentation

- [Theme Architecture](./THEME_ARCHITECTURE.md) - Technical details about the token system
- [Design Tokens](./DESIGN_TOKENS.md) - Complete list of available tokens
- [Component Styling](./COMPONENT_STYLING.md) - How to style components with themes
