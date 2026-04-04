# Feature: Extract demo components into a shared `packages/demos` package

## Objective

Create a new `packages/demos` package containing all demo components from `packages/demo/src/demos/`, making them reusable by both the demo app and the upcoming docs site.

## Behavior

### Package creation
- New package at `packages/demos/` with name `@acronis-platform/shadcn-uikit-demos`
- Private, ESM-only, exports each demo category via `"./*": "./src/*/index.ts"`
- Depends on `@acronis-platform/shadcn-uikit` (workspace), peers on React 18/19

### File moves
1. Copy all 41 demo category directories from `packages/demo/src/demos/` to `packages/demos/src/`
2. Copy `packages/demo/src/components/icons/missing-icons.tsx` to `packages/demos/src/icons/missing-icons.tsx`
3. Copy `packages/demo/src/lib/chart-colors.ts` to `packages/demos/src/lib/chart-colors.ts`

### Import rewrites inside `packages/demos/`
- `@/components/icons/missing-icons` -> `@/icons/missing-icons` (35 files)
- `@/lib/chart-colors` -> `@/lib/chart-colors` (stays the same, tsconfig paths handles it)

### Import rewrites inside `packages/demo/`
- Component imports `from '@/demos/<category>'` -> `from '@acronis-platform/shadcn-uikit-demos/<category>'`
- Raw source imports `from '../demos/<category>/<File>.tsx?raw'` remain unchanged (Vite ?raw loader needs filesystem access)

### Vite config update
- Add alias for `@acronis-platform/shadcn-uikit-demos` pointing to `../demos/src` so Vite resolves the workspace package source directly

### Workspace integration
- Add `@acronis-platform/shadcn-uikit-demos: "workspace:*"` to demo's dependencies
- `pnpm install` to link
- `pnpm --filter @acronis-platform/shadcn-uikit-demo build` must pass

## Definition of done

- [ ] `packages/demos/` exists with package.json, tsconfig.json, and all demo sources
- [ ] All `@/components/icons/missing-icons` imports updated to `@/icons/missing-icons` in demos package
- [ ] `chart-colors.ts` available in demos package
- [ ] Demo app component imports updated to `@acronis-platform/shadcn-uikit-demos/<category>`
- [ ] Raw `?raw` imports remain as relative paths to `packages/demo/src/demos/`
- [ ] `pnpm --filter @acronis-platform/shadcn-uikit-demo build` passes
- [ ] No broken imports

## Open questions

- The `?raw` imports for source code viewing still reference `packages/demo/src/demos/`. The old demos directory must be kept (or symlinked) for these imports to work. Decision: keep old directory as-is for `?raw` imports since they need filesystem-local files for Vite's raw loader.
