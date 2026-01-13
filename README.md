# Shadcn UIKit

A monorepo containing custom shadcn UI components, multiple color schemes, and interactive demos.

## 📦 Packages

This monorepo contains the following packages:

### [@shadcn-uikit/ui](./packages/ui)
The core UI component library built on top of shadcn/ui principles.

**Components:**
- Button (with multiple variants and sizes)
- Card (with Header, Title, Description, Content, Footer)
- Input (styled form inputs)

### [@shadcn-uikit/demo](./packages/demo)
Interactive demo application showcasing all components with multiple color schemes.

**Features:**
- 6 pre-configured themes
- Component playground
- Live theme switching
- Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/acronis/shadcn-uikit.git
cd shadcn-uikit

# Install dependencies
npm install

# Build all packages
npm run build
```

### Running the Demo

```bash
# Start the demo application
cd packages/demo
npm run dev
```

The demo will be available at `http://localhost:3000`.

## 🎨 Color Schemes

The UI kit includes six pre-configured color schemes:

1. **Default Light** - Classic light theme
2. **Default Dark** - Dark mode variant
3. **Acronis Blue** - Brand blue theme
4. **Acronis Orange** - Brand orange theme
5. **Green** - Nature-inspired green theme
6. **Purple** - Modern purple theme

All themes are fully customizable through CSS variables.

## 📖 Usage

### Installing the UI Package

```bash
npm install @shadcn-uikit/ui
```

### Using Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@shadcn-uikit/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🏗️ Project Structure

```
shadcn-uikit/
├── packages/
│   ├── ui/              # Core UI components library
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utility functions
│   │   │   └── index.ts     # Package exports
│   │   └── package.json
│   └── demo/            # Demo application
│       ├── src/
│       │   ├── App.tsx      # Main demo app
│       │   ├── themes/      # Theme definitions
│       │   └── index.css    # Global styles
│       └── package.json
├── package.json         # Root workspace config
└── README.md
```

## 🛠️ Development

### Build All Packages

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📝 License

MIT License - Copyright (c) 2026 Acronis International GmbH

See [LICENSE](./LICENSE) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

- [UI Package Documentation](./packages/ui/README.md)
- [Demo Package Documentation](./packages/demo/README.md)

## 🔗 Links

- [shadcn/ui](https://ui.shadcn.com/) - The original inspiration
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components