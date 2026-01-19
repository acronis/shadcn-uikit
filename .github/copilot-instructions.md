# Shadcn UIKit

Shadcn UIKit is a React-based monorepo containing custom shadcn UI components, multiple color schemes, and interactive demos.
The main packages are `@acronis-platform/shadcn-uikit` (UI components) and `@acronis-platform/shadcn-uikit-demo` (demo application).

## AI Development Rules (read first)

These rules are the source of truth for AI-assisted changes. Follow them strictly before falling back to searches or ad-hoc commands.

- Safe tool usage
  - Do not run unsafe or destructive commands automatically. Always request approval for commands that mutate state, install dependencies, or make external requests.
  - Never include `cd` in commands. Use the command's working directory instead.
  - Prefer pnpm workspace filters: `pnpm --filter ./packages/<name> run <script>`.
  - For code edits, use structured edits only and keep imports at the top. Do not inline imports mid-file.
  - Use pnpm (v10.27.0) as the package manager for all operations.

- Monorepo workflows
  - Install: `pnpm install`.
  - Build everything: `pnpm run build`.
  - Lint everything: `pnpm run lint` or `pnpm run lint:fix`.
  - Type check: `pnpm run type-check`.
  - Test UI package: `pnpm --filter ./packages/ui run test` (Vitest + React Testing Library).
  - Demo dev: `pnpm --filter ./packages/demo run dev` (Vite + React).
  - Storybook: `pnpm --filter ./packages/ui run storybook` (component documentation and testing).

- Coding conventions (React + shadcn/ui)
  - Use React functional components with TypeScript. Use hooks for state management.
  - Component naming: PascalCase (e.g., `Button`, `Card`). File names in kebab-case (e.g., `button.tsx`, `card.tsx`).
  - Component structure: use `class-variance-authority` (CVA) for variant management, Radix UI primitives for accessibility.
  - Component directories contain: main `.tsx`, `__tests__/` for unit tests, `__stories__/` for Storybook stories.
  - CSS: use Tailwind CSS utility classes. Theme uses CSS variables with `--av-` prefix for colors. Follow shadcn/ui patterns.
  - TypeScript: define interfaces extending HTML attributes, use `VariantProps` for variant typing, use `React.forwardRef` for ref forwarding.

  - Testing
    - Unit tests: Vitest + React Testing Library. Place `*.spec.ts` or `*.test.tsx` in `__tests__/` directories.
    - Visual regression: Storybook with Playwright test runner. Run with `pnpm --filter ./packages/ui run storybook:test:visual`.
    - Accessibility: use `@storybook/addon-a11y` for accessibility testing in Storybook.
    - Coverage: `pnpm --filter ./packages/ui run test:coverage`.
    - See `.github/instructions/unit-tests.instructions.md` for detailed testing guidelines used in this repo.

  - Documentation
    - Component documentation is in Storybook stories (`__stories__/` directories).
    - Create comprehensive stories showing all variants, sizes, and states.
    - Use Storybook's MDX format for additional documentation when needed.
    - Demo application in `packages/demo/` showcases real-world usage.
    - See `.github/instructions/docs.instructions.md` for documentation guidelines if available.

  - Linting and styling
    - Use Tailwind CSS utility classes for styling. Use CSS variables (e.g., `var(--av-primary)`) for theme colors.
    - Follow shadcn/ui patterns: use `cn()` utility for conditional class names.
    - Run `pnpm run lint` before committing. Fix issues rather than disabling rules.
    - ESLint configuration includes React, TypeScript, and Storybook plugins.

- Commits and PRs
  - Use Conventional Commits. Include scope where helpful (e.g., `feat(button): add loading state`, `fix(card): correct padding`).
  - Update unit tests, Storybook stories, and visual tests as part of the same change where applicable.
  - Husky pre-commit hooks run lint-staged and type checking automatically.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Libraries and Frameworks

- React 18
- TypeScript 5
- Vite 6
- Tailwind CSS 3
- Radix UI (headless components)
- class-variance-authority (CVA)
- Vitest (unit testing)
- React Testing Library
- Storybook 10 (component documentation)
- Playwright (visual regression)
- pnpm 10

## Development setup

### Prerequisites and Setup
- Node.js version: **22.x** (specified in CI workflow)
- Package Manager: **pnpm@10.27.0** (exact version in `package.json`)
- Install pnpm globally: `npm install -g pnpm@10.27.0` or use `corepack enable`

### Bootstrap and Build Process

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Build all packages**:
   ```bash
   pnpm run build
   ```

3. **Run linting**:
   ```bash
   pnpm run lint
   ```

4. **Run type checking**:
   ```bash
   pnpm run type-check
   ```

5. **Run tests**:
   ```bash
   pnpm run test
   ```

### Development Workflows

#### Demo Application Development
- Start demo application (Vite + React):
  ```bash
  pnpm --filter ./packages/demo run dev
  ```
  Access at: `http://localhost:3000`

- Build demo:
  ```bash
  pnpm --filter ./packages/demo run build
  pnpm --filter ./packages/demo run preview
  ```

#### Component Development
- Build UI components in watch mode:
  ```bash
  pnpm --filter ./packages/ui run dev
  ```

- Run Storybook for component development:
  ```bash
  pnpm --filter ./packages/ui run storybook
  ```
  Access at: `http://localhost:6006`

- Build Storybook:
  ```bash
  pnpm --filter ./packages/ui run storybook:build
  ```

#### Testing and Quality
- Run linting with auto-fix:
  ```bash
  pnpm run lint:fix
  ```

- Run tests with coverage:
  ```bash
  pnpm --filter ./packages/ui run test:coverage
  ```

- Run Storybook visual regression tests:
  ```bash
  pnpm --filter ./packages/ui run storybook:test:visual
  ```

- Update visual snapshots:
  ```bash
  pnpm --filter ./packages/ui run storybook:test:visual:update
  ```

## Code Standards for development

### Always Run Before Committing
1. `pnpm run build` - Build must complete successfully.
2. `pnpm run lint` - All linting must pass.
3. `pnpm run type-check` - TypeScript type checking must pass.
4. `pnpm run test` - All unit tests must pass.

Note: Husky pre-commit hooks automatically run lint-staged and type checking.

### Development Workflow

- **UI Components**: Edit files in `packages/ui/src/components/ui/`
- **React Components**: Additional components in `packages/ui/src/components/react/`
- **Icons**: Auto-generated icons in `packages/ui/src/components/icons/`
- **Styles**: Theme files in `packages/ui/src/styles/`
- **Demo**: Demo application in `packages/demo/src/`
- **Documentation**: Markdown docs in `packages/docs/`

Workflow:
1. Implement features in components
2. Add Storybook stories
3. Write unit tests
4. Test in demo application
5. Run linting and tests
6. Build and verify

### Manual Validation Scenarios
After making changes, validate with these scenarios:

1. **Storybook Validation**:
   - Run `pnpm --filter ./packages/ui run storybook`
   - Access `http://localhost:6006`
   - Navigate to component stories affected by your changes
   - Verify all variants and states render correctly
   - Check accessibility panel for issues

2. **Demo Application Validation**:
   - Run `pnpm --filter ./packages/demo run dev`
   - Access `http://localhost:3000`
   - Test components in real-world scenarios
   - Verify theme switching works
   - Test responsive behavior

3. **Build Validation**:
   - Run `pnpm run build`
   - Verify all packages build successfully
   - Check `packages/ui/dist/` contains expected output
   - Verify TypeScript types are generated correctly

## Repository Structure

### Key Packages
```
packages/
├── ui/                           - Main UI component library (@acronis-platform/shadcn-uikit)
│   ├── src/components/ui/        - shadcn/ui React components
│   ├── src/components/react/     - Additional React components
│   ├── src/components/icons/     - Icon components (auto-generated)
│   ├── src/styles/               - Styles, themes, CSS variables
│   ├── src/lib/                  - Utility functions (cn, etc.)
│   ├── src/hooks/                - React hooks
│   ├── __tests__/                - Unit tests
│   └── __stories__/              - Storybook stories
├── demo/                         - Demo application (@acronis-platform/shadcn-uikit-demo)
│   ├── src/app/                  - Demo pages and examples
│   ├── src/components/           - Demo-specific components
│   └── src/styles/               - Demo styles
└── docs/                         - Documentation markdown files
```

### Important Files
- `pnpm-workspace.yaml` - Workspace configuration
- `package.json` - Root package with pnpm version (10.27.0)
- `.github/workflows/ci.yml` - Main CI pipeline
- `.github/workflows/demo-deploy.yml` - Demo deployment
- `packages/ui/vite.config.ts` - UI library build configuration
- `packages/ui/package.json` - Main component library package
- `packages/ui/tailwind.config.ts` - Tailwind CSS configuration
- `packages/demo/vite.config.ts` - Demo app configuration

### CI/CD Workflows
- **ci.yml** - Main CI: build, lint, test
- **demo-deploy.yml** - Demo application deployment
- **ui-github-publish.yml** - UI package publishing to npm
- **storybook-deploy.yml** - Storybook deployment (if configured)

## Key guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages
- Use [Semantic Versioning](https://semver.org/) for releases
- Follow React best practices and shadcn/ui patterns
- Maintain existing code structure and organization
- Use composition patterns with React hooks
- Write unit tests for new functionality using Vitest + React Testing Library
- Document components in Storybook stories with all variants and states
- Use TypeScript for all new code
- Follow accessibility best practices using Radix UI primitives

## Common Issues and Troubleshooting

### Peer Dependency Warnings
React and react-dom are peer dependencies. Install them in your project:
```bash
pnpm add react react-dom
```

### Tailwind CSS Not Working
Ensure you've:
1. Imported the styles: `import '@acronis-platform/shadcn-uikit/styles'`
2. Added the library to Tailwind content paths in `tailwind.config.js`
3. Installed `tailwindcss-animate` plugin

### TypeScript Issues
Run type checking:
```bash
pnpm run type-check
```

For UI package only:
```bash
pnpm --filter ./packages/ui run type-check
```

### Dependency Issues
If packages fail to resolve:
```bash
pnpm install --frozen-lockfile
```

## Development Tips

### Making Changes
- **Components**: Edit files in `packages/ui/src/components/ui/`
- **Styles**: Edit theme files in `packages/ui/src/styles/themes/`
- **Documentation**: Edit markdown files in `packages/docs/`
- **Icons**: Auto-generated in `packages/ui/src/components/icons/`
- **Demo**: Add examples in `packages/demo/src/app/`

### Testing Changes
- Unit tests: `pnpm --filter ./packages/ui run test`
- Visual regression: `pnpm --filter ./packages/ui run storybook:test:visual`
- Manual testing: Use Storybook or demo application
- Accessibility: Check Storybook a11y addon

### Component Architecture
- Based on shadcn/ui principles (copy-paste, not npm install components internally)
- Uses Radix UI primitives for accessibility
- Styled with Tailwind CSS utility classes
- Variants managed with class-variance-authority (CVA)
- Full TypeScript support with proper type inference
- Tree-shakeable exports

## Package Scripts Reference

### Root Package Scripts
- `pnpm run build` - Build all packages
- `pnpm run test` - Run all tests
- `pnpm run lint` - Lint all packages
- `pnpm run lint:fix` - Auto-fix linting issues

### UI Package Scripts
- `pnpm --filter ./packages/ui run dev` - Watch mode build
- `pnpm --filter ./packages/ui run build` - Production build
- `pnpm --filter ./packages/ui run test` - Run unit tests
- `pnpm --filter ./packages/ui run test:coverage` - Tests with coverage
- `pnpm --filter ./packages/ui run test:ui` - Vitest UI
- `pnpm --filter ./packages/ui run storybook` - Start Storybook
- `pnpm --filter ./packages/ui run storybook:build` - Build Storybook
- `pnpm --filter ./packages/ui run storybook:test:visual` - Visual regression tests
- `pnpm --filter ./packages/ui run lint` - Lint UI package
- `pnpm --filter ./packages/ui run type-check` - TypeScript checks

### Demo Package Scripts
- `pnpm --filter ./packages/demo run dev` - Dev server (http://localhost:3000)
- `pnpm --filter ./packages/demo run build` - Build demo
- `pnpm --filter ./packages/demo run preview` - Preview built demo
- `pnpm --filter ./packages/demo run lint` - Lint demo package
- `pnpm --filter ./packages/demo run type-check` - TypeScript checks
