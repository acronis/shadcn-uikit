# Getting Started

## Quick Start

### 1. Installation

```bash
npm install @acronis-platform/shadcn-uikit
```

Install peer dependencies based on your framework:

**React:**

```bash
npm install react react-dom
```

**Vue:**

```bash
npm install vue
```

### 2. Configure Tailwind CSS

Add the library to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
    // Add this line to include the library components
    './node_modules/@acronis-platform/shadcn-uikit/dist/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--av-border))',
        input: 'hsl(var(--av-input))',
        ring: 'hsl(var(--av-ring))',
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
        destructive: {
          DEFAULT: 'hsl(var(--av-destructive))',
          foreground: 'hsl(var(--av-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--av-muted))',
          foreground: 'hsl(var(--av-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--av-accent))',
          foreground: 'hsl(var(--av-accent-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--av-success))',
          foreground: 'hsl(var(--av-success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--av-warning))',
          foreground: 'hsl(var(--av-warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--av-info))',
          foreground: 'hsl(var(--av-info-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--av-radius)',
        md: 'calc(var(--av-radius) - 2px)',
        sm: 'calc(var(--av-radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### 3. Import Styles

Import the CSS variables in your main CSS/SCSS file or entry point:

```css
@import '@acronis-platform/shadcn-uikit/styles';
```

Or in your JavaScript/TypeScript entry:

```ts
import '@acronis-platform/shadcn-uikit/styles';
```

### 4. Use Components

#### React Example

```tsx
import { Button } from '@acronis-platform/shadcn-uikit/react';

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="success">Success</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

#### Vue Example

```vue
<script setup lang="ts">
import { AvButton } from '@acronis-platform/shadcn-uikit/vue';
</script>

<template>
  <div>
    <AvButton variant="default">Click me</AvButton>
    <AvButton variant="success">Success</AvButton>
    <AvButton variant="destructive">Delete</AvButton>
  </div>
</template>
```

## Customization

### Changing Colors

Override CSS variables in your global CSS:

```css
:root {
  /* Change primary color to custom Acronis blue */
  --av-primary: 213 94% 51%;

  /* Change border radius */
  --av-radius: 0.75rem;
}
```

### Dark Mode

Add the `dark` class to your root element:

```tsx
// React
<html className="dark">{/* Your app */}</html>
```

```vue
<!-- Vue -->
<html class="dark">
  <!-- Your app -->
</html>
```

### Extending Components

Since this is based on shadcn/ui, you can extend components easily:

**React:**

```tsx
import { Button, buttonVariants } from '@acronis-platform/shadcn-uikit/react';
import { cn } from '@/lib/utils';

function CustomButton({ className, ...props }) {
  return (
    <Button
      className={cn(
        buttonVariants({ variant: 'default' }),
        'custom-class',
        className
      )}
      {...props}
    />
  );
}
```

**Vue:**

```vue
<script setup lang="ts">
import { AvButton } from '@acronis-platform/shadcn-uikit/vue';
import { cn } from '@/lib/utils';
</script>

<template>
  <AvButton :class="cn('custom-class', $attrs.class)">
    <slot />
  </AvButton>
</template>
```

## Next Steps

- 📚 Browse the [Component Documentation](../README.md#component-naming-convention)
- 🏗️ Read the [Architecture Guide](ARCHITECTURE.md)
- 🎨 Explore [Storybook demos](#storybook)
- 🔧 Check out [shadcn/ui documentation](https://ui.shadcn.com/) for more patterns

## Troubleshooting

### Styles not applying

Make sure you:

1. Imported the CSS variables
2. Added the library to Tailwind content paths
3. Installed `tailwindcss-animate` plugin

### TypeScript errors

Ensure you have the correct peer dependencies installed and your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx", // For React
    "moduleResolution": "bundler"
  }
}
```
