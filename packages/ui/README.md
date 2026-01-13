# @shadcn-uikit/ui

Custom shadcn UI components library with multiple color schemes.

## Components

This package includes the following components:

- **Button** - Versatile button component with multiple variants (default, destructive, outline, secondary, ghost, link) and sizes
- **Card** - Flexible card component with Header, Title, Description, Content, and Footer sub-components
- **Input** - Styled input component with focus states and accessibility features

## Installation

```bash
npm install @shadcn-uikit/ui
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@shadcn-uikit/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Styling

This library uses Tailwind CSS for styling. Make sure to configure your Tailwind CSS setup to include the component styles.

## Color Schemes

The components support custom color schemes through CSS variables. See the demo package for examples.
