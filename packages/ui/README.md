# @acronis-platform/shadcn-uikit

Custom shadcn UI components library with multiple color schemes.

## Installation

```bash
npm install @acronis-platform/shadcn-uikit
# or
yarn add @acronis-platform/shadcn-uikit
# or
pnpm add @acronis-platform/shadcn-uikit
```

## Usage

### React

```tsx
import { Button, Input, Dialog } from '@acronis-platform/shadcn-uikit/react';
import '@acronis-platform/shadcn-uikit/styles';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { AvButton } from '@acronis-platform/shadcn-uikit/vue';
import '@acronis-platform/shadcn-uikit/styles';
</script>

<template>
  <AvButton variant="primary">Click me</AvButton>
</template>
```

## Components

### React Components

- **Accordion** - Collapsible content sections
- **Alert** - Display important messages
- **Badge** - Small status indicators
- **Breadcrumb** - Navigation breadcrumbs
- **Button** - Interactive buttons with variants
- **Calendar** - Date selection calendar
- **Card** - Content containers
- **Carousel** - Image/content carousel
- **Checkbox** - Checkbox input
- **Chip** - Removable tags
- **Combobox** - Searchable select
- **Command** - Command palette
- **DataTable** - Feature-rich data tables
- **DatePicker** - Date picker input
- **Dialog** - Modal dialogs
- **Drawer** - Side panel drawer
- **DropdownMenu** - Dropdown menus
- **Empty** - Empty state displays
- **Filter** - Filter controls
- **Form** - Form components
- **Input** - Text input fields
- **Label** - Form labels
- **NavigationMenu** - Navigation menus
- **Pagination** - Pagination controls
- **Popover** - Popover tooltips
- **Progress** - Progress indicators
- **RadioGroup** - Radio button groups
- **ScrollArea** - Custom scroll areas
- **SecondaryMenu** - Secondary navigation
- **Select** - Select dropdowns
- **Separator** - Visual separators
- **Sidebar** - Sidebar navigation
- **Sonner** - Toast notifications
- **Spinner** - Loading spinners
- **Switch** - Toggle switches
- **Table** - Data tables
- **Tabs** - Tabbed interfaces
- **Tag** - Content tags
- **Textarea** - Multi-line text input
- **Tooltip** - Hover tooltips
- **Tree** - Hierarchical tree views

### Vue Components

- **AvButton** - Interactive buttons (more components coming soon)

## Styling

The library uses CSS variables for theming. Import the global styles:

```tsx
import '@acronis-platform/shadcn-uikit/styles';
```

### Customization

You can customize the theme by overriding CSS variables:

```css
:root {
  --av-primary: 213 65% 46%; /* Acronis blue */
  --av-background: 0 0% 100%;
  --av-foreground: 215 26% 20%;
  /* ... more variables */
}
```

## TypeScript

The library is written in TypeScript and includes type definitions out of the box.

```tsx
import type { ButtonProps } from '@acronis-platform/shadcn-uikit/react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Design Tokens

All components follow the Acronis Design System specifications with design tokens extracted from Figma:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- And more...

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © Acronis

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## Links

- [Documentation](https://github.com/acronis/shadcn-uikit)
- [GitHub Repository](https://github.com/acronis/shadcn-uikit)
- [Issue Tracker](https://github.com/acronis/shadcn-uikit/issues)
