# Architecture Guide

## Overview

Shadcn UIKit is built on top of [shadcn/ui](https://ui.shadcn.com/) for React and [shadcn-vue](https://www.shadcn-vue.com/) for Vue, providing a consistent design system styled with Acronis brand colors and design tokens.

## Design Philosophy

### Base Layer: shadcn/ui

- **React**: Uses Radix UI primitives with Tailwind CSS
- **Vue**: Uses Radix Vue primitives with Tailwind CSS
- **Unstyled by default**: Components are accessible and unstyled, allowing full customization

### Acronis Theme Layer

- Custom CSS variables with Acronis brand colors
- Extended Tailwind configuration with Acronis design tokens
- Additional variant options (success, warning, info)
- Consistent spacing, typography, and border radius

## Component Structure

### React Components (`src/components/react/`)

```
src/components/react/
├── components/
│   └── button/
│       ├── button.tsx          # Component implementation
│       ├── __tests__/          # Unit tests
│       └── __stories__/        # Storybook stories
├── lib/
│   └── utils.ts               # Utility functions (cn)
└── index.ts                   # Public exports
```

**Key Features:**

- Uses `class-variance-authority` (CVA) for variant management
- Radix UI Slot for composition
- Full TypeScript support with VariantProps
- Forwarded refs for component composition

### Vue Components (`src/vue/`)

```
src/vue/
├── components/
│   └── button/
│       ├── button.vue          # Component implementation
│       ├── button.ts           # Types and variants
│       ├── __tests__/          # Unit tests
│       └── __stories__/        # Storybook stories
├── lib/
│   └── utils.ts               # Utility functions (cn)
└── index.ts                   # Public exports
```

**Key Features:**

- Uses Radix Vue primitives
- Composition API with `<script setup>`
- Shared CVA variants with React
- TypeScript support

## Theming System

### CSS Variables (`src/styles/_variables.scss`)

All colors use HSL format for easy manipulation:

```scss
:root {
  --av-primary: 213 94% 51%; /* Acronis Blue */
  --av-success: 142 76% 36%; /* Success Green */
  --av-warning: 38 92% 50%; /* Warning Orange */
  --av-info: 199 89% 48%; /* Info Blue */
  // ... more variables
}
```

### Tailwind Configuration

Extended with Acronis-specific tokens:

```js
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--av-primary))',
      success: 'hsl(var(--av-success))',
      // ... more colors
    }
  }
}
```

## Adding New Components

### 1. For React

```tsx
// src/components/react/[component]/[component].tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'variant-classes',
    },
    size: {
      default: 'size-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ComponentProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };
```

### 2. For Vue

```vue
<!-- src/vue/components/[component]/[component].vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ComponentVariants, componentVariants } from './[component]';
import { cn } from '../../lib/utils';

interface ComponentProps extends PrimitiveProps {
  variant?: ComponentVariants['variant'];
  size?: ComponentVariants['size'];
  class?: string;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  as: 'element',
  variant: 'default',
  size: 'default',
});

const componentClass = computed(() =>
  cn(
    componentVariants({ variant: props.variant, size: props.size }),
    props.class
  )
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="componentClass">
    <slot />
  </Primitive>
</template>
```

```ts
// src/vue/components/[component]/[component].ts
import { cva, type VariantProps } from 'class-variance-authority';

export const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'variant-classes',
    },
    size: {
      default: 'size-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ComponentVariants = VariantProps<typeof componentVariants>;
```

## Best Practices

### 1. Use shadcn/ui CLI

For React components, use the shadcn CLI to scaffold:

```bash
npx shadcn-ui@latest add button
```

Then customize with Acronis styling.

### 2. Maintain Variant Consistency

Keep variants consistent between React and Vue:

- `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`
- Acronis-specific: `success`, `warning`, `info`

### 3. Accessibility First

- Use Radix UI/Radix Vue primitives for built-in accessibility
- Test with keyboard navigation
- Ensure proper ARIA attributes

### 4. TypeScript Strict Mode

- All components must have proper TypeScript types
- Use `VariantProps` for variant typing
- Export all public types

### 5. Testing

- Write unit tests for all components
- Test all variants and sizes
- Test accessibility features
- Test event handlers

### 6. Documentation

- Create Storybook stories for all components
- Document all props and variants
- Provide usage examples
- Show different states

## Build Process

### React Build

```bash
npm run build:react
```

Output: `dist/react/`

### Vue Build

```bash
npm run build:vue
```

Output: `dist/vue/`

### Both

```bash
npm run build
```

## Import Paths

Users import from framework-specific paths:

**React:**

```tsx
import { Button } from '@acronis-platform/shadcn-uikit/react';
```

**Vue:**

```vue
import { AvButton } from '@acronis-platform/shadcn-uikit/vue'
```

**Styles:**

```ts
import '@acronis-platform/shadcn-uikit/styles';
```
