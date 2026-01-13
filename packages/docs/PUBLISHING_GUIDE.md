# Publishing Guide

This guide explains how to prepare and publish the @acronis-platform/shadcn-uikit library to npm.

## Prerequisites

1. **npm Account** - You need an npm account with publish permissions
2. **pnpm** - Install pnpm globally: `npm install -g pnpm`
3. **Access Token** - For automated publishing, generate an npm access token

## Quick Start

### 1. Complete Migration

Run the migration script to move files to the monorepo structure:

```bash
chmod +x scripts/migrate-to-monorepo.sh
./scripts/migrate-to-monorepo.sh
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Build the Library

```bash
cd packages/shadcn-uikit
pnpm run build
```

### 4. Test Locally

```bash
# Link the package locally
npm link

# In another project, test the linked package
npm link @acronis-platform/shadcn-uikit
```

### 5. Publish to npm

```bash
cd packages/shadcn-uikit

# Login to npm (first time only)
npm login

# Dry run to verify what will be published
npm publish --dry-run

# Publish to npm
npm publish --access public
```

## Package Structure

The published package will include:

```
@acronis-platform/shadcn-uikit/
├── dist/
│   ├── index.js              # Main entry point
│   ├── index.d.ts            # TypeScript definitions
│   ├── react/
│   │   ├── index.js          # React components
│   │   └── index.d.ts
│   ├── vue/
│   │   ├── index.js          # Vue components
│   │   └── index.d.ts
│   ├── components/           # Individual component files
│   └── styles/
│       └── globals.css       # Global styles
├── package.json
├── README.md
└── LICENSE
```

## Usage After Publishing

### React

```tsx
import { Button, Input, Dialog } from '@acronis-platform/shadcn-uikit/react';
import '@acronis-platform/shadcn-uikit/styles';

function App() {
  return <Button variant="primary">Click me</Button>;
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

## Version Management

### Semantic Versioning

Follow semantic versioning (semver):

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features, backwards compatible
- **PATCH** (0.0.1) - Bug fixes, backwards compatible

### Updating Version

```bash
cd packages/shadcn-uikit

# Patch release (0.1.0 -> 0.1.1)
npm version patch

# Minor release (0.1.0 -> 0.2.0)
npm version minor

# Major release (0.1.0 -> 1.0.0)
npm version major
```

## Pre-publish Checklist

- [ ] All tests pass
- [ ] Build completes without errors
- [ ] TypeScript types are generated correctly
- [ ] README.md is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped
- [ ] All files are properly exported
- [ ] Dependencies are correctly specified
- [ ] License file is included

## Build Verification

Before publishing, verify the build:

```bash
cd packages/shadcn-uikit

# Build the library
pnpm run build

# Check dist folder
ls -la dist/

# Verify exports work
node -e "console.log(require('./dist/index.js'))"

# Check package size
npm pack --dry-run
```

## Publishing Workflow

### Manual Publishing

```bash
cd packages/shadcn-uikit

# 1. Update version
npm version patch

# 2. Build
pnpm run build

# 3. Test build
npm pack --dry-run

# 4. Publish
npm publish --access public

# 5. Tag the release
git tag v0.1.1
git push origin v0.1.1
```

### Automated Publishing (CI/CD)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build library
        run: cd packages/shadcn-uikit && pnpm run build

      - name: Publish to npm
        run: cd packages/shadcn-uikit && npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Troubleshooting

### Build Errors

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm run build
```

### Type Errors

```bash
# Regenerate types
pnpm run build:types
```

### Package Not Found After Publishing

Wait a few minutes for npm registry to update, then:

```bash
npm cache clean --force
npm install @acronis-platform/shadcn-uikit
```

### Wrong Files Published

Check `.npmignore` and `package.json` `files` field:

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

## Post-publish Tasks

1. **Create GitHub Release** - Document changes and new features
2. **Update Documentation** - Ensure docs reflect the new version
3. **Announce** - Share the release on relevant channels
4. **Monitor** - Watch for issues and bug reports

## Unpublishing (Emergency Only)

If you need to unpublish a version (only within 72 hours):

```bash
npm unpublish @acronis-platform/shadcn-uikit@0.1.0
```

**Note:** Unpublishing is discouraged. Consider deprecating instead:

```bash
npm deprecate @acronis-platform/shadcn-uikit@0.1.0 "This version has critical bugs, please upgrade"
```

## Beta/Alpha Releases

For pre-release versions:

```bash
# Create beta version
npm version prerelease --preid=beta
# Results in: 0.1.0-beta.0

# Publish with beta tag
npm publish --tag beta

# Users install with:
npm install @acronis-platform/shadcn-uikit@beta
```

## Support

For issues with publishing:

- Check [npm documentation](https://docs.npmjs.com/)
- Review [pnpm workspace docs](https://pnpm.io/workspaces)
- Open an issue in the repository
