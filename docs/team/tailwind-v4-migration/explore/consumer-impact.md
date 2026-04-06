# Exploration: Does the Tailwind CSS v4 migration force consumers to use Tailwind v4?

Date: 2026-04-02

## Research question

After `packages/ui` migrated from Tailwind CSS v3 to v4, are consumers of `@acronis-platform/shadcn-uikit` forced to adopt Tailwind v4 in their own projects? What are the integration paths, and which ones require Tailwind at all?

## Scope

**In scope:** The published package exports, build output, peer dependencies, demo package integration, and the `tailwind-preset` export. Analysis is based on the `copilot/fix-tailwind-css-postcss-issue` branch at commit `4dee98e`.

**Out of scope:** Internal Storybook configuration, CI/CD pipelines, visual regression testing infrastructure.

## Findings

### How the package ships CSS

The `dist/` directory contains fully compiled, standalone CSS files. All Tailwind processing happens at build time inside the `packages/ui` build pipeline. The published CSS contains no `@tailwind` directives, no `@import "tailwindcss/..."` statements, and no `@config` references -- it is plain CSS with resolved `@layer` blocks.

Two build steps produce CSS:

1. **`vite build`** compiles SCSS source through PostCSS with `@tailwindcss/postcss` v4.2.2. This produces `shadcn-uikit.css` (~120 KB), `tokens.css` (~15 KB), `base.css`, `components.css`, `utilities.css`, and theme files. The main `shadcn-uikit.css` is tree-shaken -- it only includes Tailwind utilities referenced by library components.

2. **`build-full-css`** runs Sass then the `@tailwindcss/cli` v4.2.2 to produce `shadcn-uikit-full.css` (~131 KB). This is an unpurged bundle containing all Tailwind utilities used by `full.scss` plus the `_globals.scss` layer.

Both output files begin with `/*! tailwindcss v4.2.2 */` and contain resolved `@layer properties`, `@layer theme`, `@layer base`, and `@layer utilities` blocks. These are self-contained CSS -- no build tool is needed to consume them.

**Confidence:** Corroborated -- verified by inspecting `dist/` file contents, `vite.config.ts`, and `build-full-css.ts`.

### Package exports

`package.json` defines these CSS-relevant exports:

| Export path | Resolves to | Content |
|---|---|---|
| `./styles` | `dist/shadcn-uikit.css` | Tree-shaken Tailwind v4 output, library components only |
| `./styles/full` | `dist/shadcn-uikit-full.css` | Unpurged Tailwind v4 output |
| `./styles/tokens` | `dist/tokens.css` | CSS custom properties only |
| `./styles/base` | `dist/base.css` | Preflight + base layer |
| `./styles/components` | `dist/components.css` | Component-scoped styles |
| `./styles/utilities` | `dist/utilities.css` | Utility classes |
| `./styles/themes/*` | `dist/themes/*.css` | Theme variable overrides |
| `./tailwind-preset` | `tailwind.preset.js` | Tailwind config preset (v3 format) |

**Confidence:** Corroborated -- read directly from `packages/ui/package.json`.

### Peer dependency requirements

The `peerDependencies` field lists:

- `react`: `^18.2.0 || ^19.0.0` (optional)
- `react-dom`: `^18.2.0 || ^19.0.0` (optional)
- `tw-animate-css`: `^1.4.0` (optional)

**`tailwindcss` is not listed as a peer dependency.** It appears only in `devDependencies` at `^4.2.2`, meaning it is a build-time dependency of the library, not a runtime requirement for consumers.

**Confidence:** Corroborated -- read directly from `packages/ui/package.json`.

### Consumer integration paths

The README documents three tiers:

**Path 1: Pre-built CSS (no Tailwind required)**
```tsx
import '@acronis-platform/shadcn-uikit/styles';      // tree-shaken
// or
import '@acronis-platform/shadcn-uikit/styles/full';  // unpurged
```
The consumer imports a compiled CSS file. No Tailwind installation, no PostCSS plugin, no config file needed. This path works regardless of whether the consumer uses Tailwind v3, v4, or no Tailwind at all.

**Path 2: Modular CSS imports (no Tailwind required)**
```tsx
import '@acronis-platform/shadcn-uikit/styles/tokens';
import '@acronis-platform/shadcn-uikit/styles/base';
import '@acronis-platform/shadcn-uikit/styles/components';
import '@acronis-platform/shadcn-uikit/styles/utilities';
```
Same as Path 1 but with finer granularity. Still pre-built CSS, no Tailwind needed.

**Path 3: Custom Tailwind build (Tailwind required)**
```js
import preset from '@acronis-platform/shadcn-uikit/tailwind-preset';
export default { presets: [preset], content: [...] };
```
The consumer imports only `styles/tokens` for CSS variables and uses the preset to generate their own Tailwind utilities. This is the only path that requires Tailwind in the consumer's project.

**Confidence:** Substantiated -- based on README documentation and verified against actual exports and file contents.

### The tailwind-preset is a v3-format config

The exported `tailwind.preset.js` uses the v3 config object format (`theme.extend`, `darkMode`, `content`, etc.). It is not a v4 CSS-based config. Tailwind v4 has backward compatibility for JS config files via `@config` directives, but a consumer on Tailwind v3 can also use this preset directly, since it is standard v3 config syntax.

However, there is a nuance: if a consumer uses Path 3, they would need to scan `node_modules/@acronis-platform/shadcn-uikit/dist/**/*.js` in their `content` array (as the README suggests). The utility classes in those JS files were generated by Tailwind v4. The class names themselves (`flex`, `p-4`, `text-primary`, etc.) are the same between v3 and v4 for standard utilities, so a v3 consumer's Tailwind build would still generate matching CSS for those class names.

**Confidence:** Substantiated -- the preset file is verified v3 format. The claim about v3/v4 class name compatibility for standard utilities is substantiated by Tailwind v4 documentation stating backward compatibility, but edge cases (e.g., new v4-only utilities like `@starting-style` or changed defaults) could cause mismatches.

### How the demo package consumes ui

The demo package (`packages/demo`) does **not** use pre-built CSS. It:

1. Has its own `postcss.config.js` using `@tailwindcss/postcss` (v4).
2. Has its own `tailwind.config.js` that extends the library's config via `presets: [libraryConfig]`.
3. Has its own `src/styles/index.scss` with Tailwind v4 directives (`@import "tailwindcss/theme.css" layer(theme)`, etc.).
4. Imports source SCSS directly from `../ui/src/styles/` via relative paths and Vite aliases.
5. Lists `tailwindcss: ^4.2.2` and `@tailwindcss/postcss: ^4.2.2` in `devDependencies`.

The demo is a development-time consumer that builds from source -- it is not representative of how external consumers would integrate via npm. The demo's approach is equivalent to Path 3 but using workspace-linked source files instead of `dist/`.

**Confidence:** Corroborated -- verified from `packages/demo/package.json`, `postcss.config.js`, `vite.config.ts`, `tailwind.config.js`, and `src/styles/index.scss`.

### Tailwind v4 artifacts in pre-built CSS

The compiled CSS files contain Tailwind v4-specific constructs:

- `@layer properties` block with `--tw-*` custom properties (v4 internal implementation detail)
- `@supports` hacks for older browser fallbacks specific to v4's output
- The `/*! tailwindcss v4.2.2 */` comment header

These are **output artifacts**, not input requirements. A consumer loading this CSS does not need Tailwind to interpret it -- browsers handle `@layer` and `@supports` natively. However, if a consumer runs their own Tailwind v3 build alongside this CSS, there could be `@layer` ordering conflicts or duplicate `--tw-*` property declarations, since v3 and v4 use different layer structures.

**Confidence:** Substantiated -- verified v4-specific constructs in `dist/` output. The conflict scenario with v3 co-existence is a reasonable inference but has not been tested.

## Key takeaways

- The package ships fully compiled CSS. Consumers using `./styles` or `./styles/full` do not need Tailwind at all -- v3 or v4. (Corroborated)
- `tailwindcss` is not a peer dependency. It is only a build-time `devDependency` of the library. (Corroborated)
- The only consumer path that requires Tailwind is Path 3 (custom Tailwind build with the preset). The preset itself is v3-format and could work with either v3 or v4, though v4-only utility edge cases are untested. (Substantiated)
- The demo package is **not** representative of external consumer integration -- it builds from source with Tailwind v4 and relative path imports. (Corroborated)
- Consumers who run their own Tailwind v3 alongside the pre-built v4 CSS may encounter `@layer` ordering conflicts or duplicate `--tw-*` declarations. (Conjecture -- depends on the assumption that both CSS outputs would be loaded simultaneously)

## Open questions

1. **Layer conflict testing:** Has anyone tested loading `shadcn-uikit.css` (v4 output) alongside a consumer's own Tailwind v3-generated CSS? The different `@layer` structures could cause specificity or ordering issues.
2. **Preset compatibility with v3:** The README shows `content: ['./node_modules/@acronis-platform/shadcn-uikit/dist/**/*.js']` for Path 3. Do any library components use v4-only utility classes that Tailwind v3 would not recognize?
3. **`tw-animate-css` peer dependency:** This is listed as an optional peer dependency. Under what circumstances does a consumer need to install it? If they use only pre-built CSS, the animations are already baked in.
4. **Documentation gap:** The README does not mention Tailwind version requirements for Path 3. If a consumer follows Path 3, should it note that v4 is the tested/supported version?
5. **Size regression:** The pre-built `shadcn-uikit.css` is ~120 KB and `shadcn-uikit-full.css` is ~131 KB. Were these sizes comparable under v3? The v4 output includes a large `@layer properties` fallback block that may inflate size.

## Sources

1. `packages/ui/package.json` -- exports, peer dependencies, build scripts, dev dependencies
2. `packages/ui/vite.config.ts` -- build configuration, CSS entry points, code splitting
3. `packages/ui/scripts/build-full-css.ts` -- full CSS build pipeline (Sass then Tailwind CLI)
4. `packages/ui/postcss.config.js` -- confirms `@tailwindcss/postcss` v4 plugin usage
5. `packages/ui/tailwind.preset.js` -- the exported preset, v3 config format
6. `packages/ui/tailwind.config.js` -- internal build config extending preset
7. `packages/ui/src/styles/index.scss` -- source styles with Tailwind v4 directives
8. `packages/ui/src/styles/full.scss` -- source for the unpurged build
9. `packages/ui/README.md` -- consumer integration documentation
10. `packages/ui/dist/` -- verified compiled CSS output files
11. `packages/demo/package.json` -- demo dev dependencies (`tailwindcss: ^4.2.2`)
12. `packages/demo/postcss.config.js` -- demo PostCSS config (`@tailwindcss/postcss`)
13. `packages/demo/vite.config.ts` -- demo Vite config with source aliases
14. `packages/demo/tailwind.config.js` -- demo Tailwind config extending library
15. `packages/demo/src/styles/index.scss` -- demo styles with v4 directives and `@source`
