# Token System Architecture

## Overview

This UI kit uses a **3-layer token architecture** for managing colors and design tokens:

```
Figma Design → Primitive Tokens → Semantic Tokens → Tailwind → Components
```

This approach provides:

- ✅ **Minimal token count** (~30 semantic tokens vs 150+ component-specific)
- ✅ **Single source of truth** for theming
- ✅ **Easy dark/light mode** switching
- ✅ **Simple customization** by overriding token layers
- ✅ **Consistent design** across all components

---

## Layer 1: Primitive Tokens (`primitives.scss`)

**Purpose**: Foundation color palette from Figma design system.

These are raw color values that should **never be used directly** in components. They serve as the source of truth for all colors.

### Categories:

- **Brand Colors**: `--color-brand-primary`, `--color-brand-secondary`, etc.
- **Text Colors**: `--color-text-primary`, `--color-text-secondary`, etc.
- **Surface Colors**: `--color-surface-primary`, `--color-surface-overlay`, etc.
- **Status Colors**: `--color-status-success`, `--color-status-danger`, etc.

### Example:

```scss
:root {
  --color-brand-primary: 213 65% 46%; /* #2668C5 */
  --color-text-primary: 215 26% 20%; /* #243143 */
  --color-status-success: 73 68% 45%; /* #9BC225 */
}
```

---

## Layer 2: Semantic Tokens (`semantic.scss`)

**Purpose**: Map primitive tokens to semantic purposes (what the color means/does).

These tokens define **intent and usage**, not specific colors. This is the **key layer** that makes theming and customization easy.

### Categories:

#### Backgrounds

- `--semantic-bg-base`: Main application background
- `--semantic-bg-elevated`: Cards, dialogs, popovers
- `--semantic-bg-muted`: Subtle/muted backgrounds
- `--semantic-bg-brand`: Brand-colored backgrounds
- `--semantic-bg-overlay`: Tooltips, modals

#### Text/Foreground

- `--semantic-text-primary`: Primary text
- `--semantic-text-secondary`: Secondary/muted text
- `--semantic-text-tertiary`: Disabled text
- `--semantic-text-inverse`: Text on dark backgrounds
- `--semantic-text-brand`: Brand-colored text (links)

#### Borders

- `--semantic-border-default`: Standard borders
- `--semantic-border-strong`: Prominent borders
- `--semantic-border-subtle`: Subtle borders

#### Interactive Elements

- `--semantic-interactive-default`: Default state
- `--semantic-interactive-hover`: Hover state
- `--semantic-interactive-active`: Active/pressed state
- `--semantic-interactive-disabled`: Disabled state
- `--semantic-interactive-focus`: Focus ring

#### Status

- `--semantic-status-success` / `-bg` / `-text`
- `--semantic-status-info` / `-bg` / `-text`
- `--semantic-status-warning` / `-bg` / `-text`
- `--semantic-status-danger` / `-bg` / `-text`
- `--semantic-status-critical` / `-bg` / `-text`

### Dark Mode Support

Dark mode is handled by overriding semantic tokens in the `.dark` class:

```scss
.dark {
  --semantic-bg-base: var(--color-text-primary);
  --semantic-text-primary: var(--color-surface-primary);
  /* ... other overrides */
}
```

---

## Layer 3: Tailwind Integration (`tailwind.config.js`)

**Purpose**: Expose semantic tokens as Tailwind utility classes.

Components use Tailwind classes like `bg-background`, `text-foreground`, `border-border` which map to semantic tokens.

### Mapping:

```js
colors: {
  background: 'hsl(var(--semantic-bg-base))',
  foreground: 'hsl(var(--semantic-text-primary))',
  primary: 'hsl(var(--semantic-interactive-default))',
  border: 'hsl(var(--semantic-border-default))',
  // ... etc
}
```

---

## Usage in Components

### ✅ Correct Usage (via Tailwind)

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>

<div className="bg-background text-foreground border border-border">
  Content
</div>

<span className="text-muted-foreground">Secondary text</span>
```

### ❌ Incorrect Usage (direct CSS variables)

```tsx
// Don't do this - bypasses the token system
<div style={{ color: 'var(--color-brand-primary)' }}>
  Text
</div>

// Don't do this - component-specific tokens
<div style={{ background: 'var(--av-input-bg)' }}>
  Input
</div>
```

---

## Customization Guide

### Option 1: Override Primitive Tokens

Change the base colors from Figma:

```scss
:root {
  --color-brand-primary: 220 80% 50%; /* Change brand color */
  --color-text-primary: 0 0% 10%; /* Change text color */
}
```

### Option 2: Override Semantic Tokens

Change how colors are used semantically:

```scss
:root {
  --semantic-interactive-default: var(
    --color-status-success
  ); /* Green buttons */
  --semantic-bg-muted: var(--color-neutral-light); /* Different muted bg */
}
```

### Option 3: Create Theme Variants

Add new theme classes:

```scss
.theme-ocean {
  --color-brand-primary: 200 90% 45%;
  --color-brand-secondary: 190 85% 50%;
  /* ... other overrides */
}
```

---

## Migration from Old System

### Before (Component-Specific Tokens)

```scss
:root {
  --av-input-bg: 0 0% 100%;
  --av-input-border: 213 65% 46%;
  --av-checkbox-bg: 0 0% 100%;
  --av-checkbox-border: 213 65% 46%;
  --av-table-header-bg: 0 0% 100%;
  /* ... 150+ more tokens */
}
```

### After (Semantic Tokens)

```scss
:root {
  --semantic-bg-elevated: var(--color-surface-primary);
  --semantic-border-default: var(--color-brand-primary);
  /* ... ~30 semantic tokens */
}
```

Components that previously used different tokens but had the same visual appearance now use the same semantic token, ensuring consistency.

---

## Benefits Summary

| Aspect            | Old System                    | New System                         |
| ----------------- | ----------------------------- | ---------------------------------- |
| **Token Count**   | 150+ component-specific       | ~30 semantic                       |
| **Consistency**   | Same colors, different tokens | Same semantic meaning = same token |
| **Theming**       | Override 150+ variables       | Override ~30 semantic tokens       |
| **Dark Mode**     | Duplicate all tokens          | Override semantic layer only       |
| **Customization** | Complex, error-prone          | Simple, predictable                |
| **Maintenance**   | High (many tokens to update)  | Low (few tokens to manage)         |

---

## File Structure

```
src/styles/tokens/
├── primitives.scss    # Layer 1: Figma color palette
├── semantic.scss      # Layer 2: Semantic mappings
├── index.scss         # Import orchestration
└── README.md          # This file
```

---

## Best Practices

1. **Never use primitive tokens directly** in components
2. **Always use Tailwind classes** (`bg-primary`, `text-foreground`, etc.)
3. **Add new semantic tokens** if you need a new color purpose
4. **Don't create component-specific tokens** unless absolutely necessary
5. **Document any new semantic tokens** with clear purpose
6. **Test in both light and dark modes** when adding tokens

---

## Questions?

- **Q: Can I add more primitive colors?**  
  A: Yes, add them to `primitives.scss` and reference in semantic tokens.

- **Q: What if I need a component-specific color?**  
  A: First check if an existing semantic token fits. If truly unique, add a new semantic token with clear purpose.

- **Q: How do I create a new theme?**  
  A: Override primitive or semantic tokens in a new class (e.g., `.theme-custom`).

- **Q: Why HSL format?**  
  A: HSL works with Tailwind's opacity modifiers (e.g., `bg-primary/50` for 50% opacity).
