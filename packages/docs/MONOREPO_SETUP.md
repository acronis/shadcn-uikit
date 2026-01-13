# Monorepo Setup Guide

This project is organized as a monorepo with two packages:

1. **@acronis-platform/shadcn-uikit** - The component library
2. **@acronis-platform/shadcn-uikit-demo** - The demo application

## Structure

```
shadcn-uikit/
├── packages/
│   ├── shadcn-uikit/          # Component library package
│   │   ├── src/
│   │   │   ├── components/    # UI components
│   │   │   ├── lib/           # Utilities
│   │   │   ├── hooks/         # React hooks
│   │   │   ├── types/         # TypeScript types
│   │   │   ├── styles/        # Global styles
│   │   │   ├── index.ts       # Main entry
│   │   │   ├── react.ts       # React exports
│   │   │   └── vue.ts         # Vue exports
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── demo-app/              # Demo application package
│       ├── src/
│       │   ├── components/    # Demo components
│       │   ├── pages/         # Demo pages
│       │   ├── store/         # State management
│       │   └── constants/     # Demo constants
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── pnpm-workspace.yaml        # Workspace configuration
└── package.json               # Root package.json

```

## Migration Steps

### 1. Move Component Library Files

Move the following from `src/` to `packages/shadcn-uikit/src/`:

```bash
# Components
mv src/components packages/shadcn-uikit/src/

# Utilities and types
mv src/lib packages/shadcn-uikit/src/
mv src/types packages/shadcn-uikit/src/
mv src/utils packages/shadcn-uikit/src/
mv src/hooks packages/shadcn-uikit/src/

# Styles
mv src/styles packages/shadcn-uikit/src/
```

### 2. Move Demo App Files

Move the following from `src/` to `packages/demo-app/src/`:

```bash
# Demo files
mv src/demos packages/demo-app/src/

# Demo-specific constants
mv src/constants packages/demo-app/src/
```

### 3. Update Import Paths

In the demo app, update imports from:

```tsx
import { Button } from '@/components/ui/button';
```

To:

```tsx
import { Button } from '@acronis-platform/shadcn-uikit/react';
```

### 4. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install
```

### 5. Build the Library

```bash
# Build the component library
cd packages/shadcn-uikit
pnpm run build
```

### 6. Run the Demo App

```bash
# Run the demo app
cd packages/demo-app
pnpm run dev
```

## Development Workflow

### Working on the Library

```bash
cd packages/shadcn-uikit

# Watch mode for development
pnpm run dev

# Build for production
pnpm run build

# Type checking
pnpm run type-check
```

### Working on the Demo App

```bash
cd packages/demo-app

# Start dev server
pnpm run dev

# Build for production
pnpm run build
```

### Working on Both Simultaneously

```bash
# Terminal 1: Watch library changes
cd packages/shadcn-uikit && pnpm run dev

# Terminal 2: Run demo app
cd packages/demo-app && pnpm run dev
```

## Publishing the Library

### 1. Build the Library

```bash
cd packages/shadcn-uikit
pnpm run build
```

### 2. Test the Build

```bash
# Check the dist folder
ls -la dist/

# Verify exports
node -e "console.log(require('./dist/index.js'))"
```

### 3. Update Version

```bash
# Update version in package.json
npm version patch  # or minor, or major
```

### 4. Publish to npm

```bash
# Dry run to see what would be published
npm publish --dry-run

# Publish to npm
npm publish --access public
```

## Package Scripts

### Library Package (@acronis-platform/shadcn-uikit)

- `pnpm run build` - Build the library
- `pnpm run dev` - Watch mode for development
- `pnpm run type-check` - Type checking
- `pnpm run lint` - Lint code

### Demo App Package (@acronis-platform/shadcn-uikit-demo)

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run type-check` - Type checking

## Workspace Benefits

1. **Shared Dependencies** - Common dependencies are hoisted to the root
2. **Local Development** - Demo app uses the local library package
3. **Type Safety** - TypeScript works across packages
4. **Faster Installs** - pnpm's efficient dependency management
5. **Isolated Builds** - Each package can be built independently

## Troubleshooting

### Library not found in demo app

```bash
# Rebuild the library
cd packages/shadcn-uikit && pnpm run build

# Reinstall dependencies
cd ../.. && pnpm install
```

### Type errors in demo app

```bash
# Rebuild library types
cd packages/shadcn-uikit && pnpm run build:types

# Restart TypeScript server in your IDE
```

### Changes not reflecting

```bash
# Make sure library is in watch mode
cd packages/shadcn-uikit && pnpm run dev

# Restart demo app
cd packages/demo-app && pnpm run dev
```

## CI/CD Considerations

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build library
        run: cd packages/shadcn-uikit && pnpm run build

      - name: Build demo
        run: cd packages/demo-app && pnpm run build

      - name: Publish library
        if: github.ref == 'refs/heads/main'
        run: cd packages/shadcn-uikit && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Next Steps

1. Complete the file migration
2. Update all import paths in demo app
3. Test the build process
4. Verify all components work correctly
5. Update documentation
6. Publish the first version to npm
