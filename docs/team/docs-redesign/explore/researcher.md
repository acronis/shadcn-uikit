# Exploration: Documentation Site Options for shadcn-uikit

Date: 2026-04-02

## Research question

What is the most suitable documentation framework for `@acronis-platform/shadcn-uikit` -- a React component library with 40+ components and 1500+ icons? The docs site needs component descriptions, live examples (reusing 100+ existing demo components), and auto-generated API docs from TypeScript sources.

## Scope

**In scope:**
- Documentation framework selection (Fumadocs, Nextra, Docusaurus, Starlight, Storybook Docs, custom Vite+React)
- API docs generation from TypeScript props (react-docgen, ts-morph, TypeDoc, framework-native)
- Live component preview approaches (Sandpack, static render, Storybook embed)
- Monorepo integration with existing pnpm workspace structure
- Reference analysis of basecn.dev and base-ui.com

**Out of scope:**
- Hosting/deployment platform selection
- Content authoring workflow design
- Search implementation details
- Internationalization

## Findings

### 1. Reference sites: basecn.dev and base-ui.com

**basecn.dev** is built with [Fumadocs](https://fumadocs.vercel.app/) on Next.js. The repository at [github.com/akash3444/basecn](https://github.com/akash3444/basecn) uses `fumadocs-core` v16.2.2 and Next.js 16. It provides 55+ components with a docs structure that mirrors shadcn/ui's own site -- component pages with description, usage examples, and installation instructions.

**Confidence:** Corroborated (GitHub repo confirms Fumadocs dependency in pnpm-lock.yaml)

**base-ui.com** is the official documentation for MUI's [Base UI](https://github.com/mui/base-ui) library. The docs source lives at `docs/src/app/(docs)/react/` in the mui/base-ui repo -- a custom Next.js App Router application, not using any off-the-shelf docs framework. Each component page (e.g., `/react/components/alert-dialog`) contains: a description section, multiple interactive examples with source code toggles, and an API reference section with props tables. The local docs server runs on port 3005.

**Confidence:** Corroborated (GitHub repo structure confirmed via search results)

**shadcn/ui** itself uses a custom Next.js application (not Fumadocs or Nextra, despite Nextra being commonly associated with it). The docs at [ui.shadcn.com](https://ui.shadcn.com/) use Next.js App Router with MDX content.

**Confidence:** Substantiated

### 2. Framework comparison

#### Fumadocs

[Fumadocs](https://www.fumadocs.dev/) is a React.js documentation framework with official Next.js support. Architecture: Content -> Core -> UI, allowing headless use. 10,300+ GitHub stars (Jan 2026), ~150K npm downloads/month with 3x year-over-year growth.

Key strengths for this project:
- **Auto Type Table**: The [`fumadocs-typescript`](https://www.fumadocs.dev/docs/ui/components/auto-type-table) package uses the TypeScript Compiler API to generate props tables from type definitions. Accepts a file path and exported type name. Supports `@internal` and `@remarks` TSDoc tags for customization.
- **MDX-native**: Full MDX support with built-in components (Accordion, Tabs, Steps, Code Block).
- **Component library mode**: Has a dedicated [Component Library](https://www.fumadocs.dev/docs/ui/component-library) guide.
- **Live examples**: Components can be directly imported and rendered in MDX. Sandpack can be integrated as a custom component.
- **Proven for this use case**: basecn.dev (55+ components, Base UI + shadcn/ui) uses Fumadocs successfully.

Limitations:
- Requires Next.js -- adds a Next.js dependency to the monorepo.
- Smaller ecosystem than Docusaurus (fewer third-party plugins).
- `AutoTypeTable` only supports object types; function signatures must be wrapped.

**Confidence:** Corroborated

#### Nextra v4

[Nextra](https://nextra.site/) is a Next.js-powered static site generator by The Guild. v4 released Jan 2025 with App Router support exclusively. ~800K npm downloads/month.

Key strengths:
- **TSDoc component**: Available from [Nextra 4.3](https://nextra.site/docs/built-ins/tsdoc), uses `ts-morph` under the hood. Generates props tables from TypeScript definitions via the TypeScript Compiler API.
- **MDX-native**: Full MDX support with file-based routing.
- **Mature**: Used by many open-source projects; well-documented migration path.

Limitations:
- More opinionated than Fumadocs -- configuration-driven rather than composition-driven.
- v4 is App Router only (Pages Router dropped).
- TSDoc component is still relatively new (4.3 alpha).
- Less flexibility for custom layouts compared to Fumadocs.

**Confidence:** Substantiated

#### Docusaurus

[Docusaurus](https://docusaurus.io/) is Meta's documentation framework. 58K+ GitHub stars, the most popular option.

Key strengths:
- **Largest ecosystem**: Versioned docs, i18n, search plugins, vast community.
- **Live code blocks**: [`@docusaurus/theme-live-codeblock`](https://docusaurus.io/docs/markdown-features/react) integrates react-live for in-browser JSX evaluation.
- **MDX v3**: Full MDX support.
- **Proven at scale**: Used by React Native, Jest, many large projects.

Limitations:
- **Not Next.js**: Uses its own build system and client-side routing. Cannot share Next.js infra or conventions.
- **Live code scope**: Custom components must be manually registered in `ReactLiveScope` -- not automatic.
- **No built-in TypeScript props extraction**: Requires separate tooling (react-docgen, TypeDoc) to generate API tables.
- **React version**: Docusaurus manages its own React version, which can conflict with workspace dependencies.

**Confidence:** Corroborated

#### Starlight (Astro)

[Starlight](https://starlight.astro.build/) is Astro's documentation framework. Excellent performance due to Astro's partial hydration.

Key strengths:
- **Performance**: Ships minimal JS by default; partial hydration for interactive islands.
- **Multi-framework**: Supports React, Vue, Svelte components in MDX via Astro islands.
- **MDX support**: Full MDX with component imports.

Limitations:
- **React as a second-class citizen**: React components run in Astro islands, not the native runtime. This adds friction for a React component library.
- **No TypeScript props extraction**: No built-in solution; requires external tooling.
- **Live preview complexity**: No straightforward path for live editable React examples. Sandpack integration is possible but requires more custom work.
- **Different build chain**: Astro's build pipeline is separate from the Vite-based UI package build.

**Confidence:** Substantiated

#### Storybook Docs (extend existing setup)

The project already has [Storybook 10.x configured](https://github.com/acronis/shadcn-uikit) with `@storybook/addon-docs`, `@storybook/addon-a11y`, and visual regression testing via `@storybook/test-runner`.

Key strengths:
- **Zero new setup**: Already configured with stories, addons, and visual testing.
- **Autodocs**: Storybook's [autodocs](https://storybook.js.org/docs/writing-docs/autodocs) auto-generates documentation pages from stories and component metadata.
- **Props extraction**: Uses `react-docgen` (Babel-based) to auto-extract props tables from TypeScript sources.
- **Interactive examples**: Every story is already a live, interactive example.

Limitations:
- **Not a docs site**: Storybook's UI is optimized for component development, not end-user documentation. Navigation, prose content, and cross-component guides feel constrained.
- **Limited MDX flexibility**: Storybook MDX is a subset of standard MDX with Storybook-specific imports.
- **Branding**: Hard to customize the overall look to match a product/brand documentation site.
- **SEO**: Storybook pages are not SEO-friendly by default (iframe-based rendering).
- **Already serves a purpose**: The existing Storybook is used for visual regression testing. Overloading it with documentation concerns risks complicating both.

**Confidence:** Corroborated

#### Custom Vite+React

Build a bespoke docs site using Vite + React, adding MDX support via `@mdx-js/rollup`.

Key strengths:
- **Full control**: No framework constraints; exact layout, routing, and behavior.
- **Same toolchain**: The UI package already builds with Vite; shared config and plugins.
- **Direct imports**: Components and demos import naturally with no framework adapters.

Limitations:
- **Build everything**: File-based routing, sidebar navigation, table of contents, search, code highlighting, responsive layout -- all must be built or assembled from libraries.
- **Maintenance burden**: Every feature that Fumadocs/Nextra/Docusaurus provide out of the box becomes custom code to maintain.
- **TypeScript props extraction**: Must implement or integrate separately.
- **Time to first page**: Significantly longer than framework-based approaches.

**Confidence:** Substantiated

### 3. API docs generation strategies

| Tool | Approach | Used by | Strengths | Weaknesses |
|------|----------|---------|-----------|------------|
| [`fumadocs-typescript`](https://www.fumadocs.dev/docs/integrations/typescript) | TypeScript Compiler API, RSC | basecn.dev, Fumadocs projects | Built-in with Fumadocs, auto-generates from file paths, TSDoc support | Only object types, Fumadocs-specific |
| [Nextra TSDoc](https://nextra.site/docs/built-ins/tsdoc) | `ts-morph` (TS Compiler API) | Nextra projects | Built-in with Nextra 4.3+, server component | Alpha-stage, Nextra-specific |
| [`react-docgen`](https://github.com/reactjs/react-docgen) | Babel AST parser | Storybook (default) | Fast, well-tested, 8.0 supports TS | Misses complex inherited types, cross-file resolution limited |
| [`react-docgen-typescript`](https://github.com/styleguidist/react-docgen-typescript) | TypeScript Compiler API | Storybook (optional), Styleguidist | Handles complex TS patterns, 320+ dependents | Slower than Babel-based, maintenance concerns |
| [`ts-morph`](https://ts-morph.com/) | TypeScript Compiler API wrapper | Custom solutions | Maximum flexibility, handles any TS pattern | Requires custom extraction logic, not docs-specific |
| [TypeDoc](https://typedoc.org/) + [`typedoc-plugin-markdown`](https://github.com/tgreyuk/typedoc-plugin-markdown) | TypeScript Compiler API | API reference sites | Full API documentation, markdown output | Verbose output, designed for libraries not component props |

**What the reference sites use:**

- **base-ui.com**: Custom API docs generation within the mui/base-ui repo. MUI has historically used custom tooling built on TypeScript's compiler API for their extensive API reference tables.
- **shadcn/ui**: Does not auto-generate props tables. Component docs show manual usage examples and link to Radix UI's API documentation.
- **basecn.dev**: Uses `fumadocs-typescript`'s `AutoTypeTable` component.

**Confidence:** Substantiated (react-docgen and ts-morph claims corroborated; base-ui.com specifics substantiated from repo structure)

**Compatibility with this project's components:**

The project's components use standard React patterns (`React.forwardRef`, interface extension of HTML element attributes, `VariantProps` from CVA). Example from `button.tsx`:

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

This pattern is well-supported by `react-docgen-typescript`, `fumadocs-typescript`, and `ts-morph`. The `VariantProps` generic may require special handling to display variant options (e.g., `variant: "default" | "destructive" | "outline" | ...`) rather than just `VariantProps<typeof buttonVariants>`.

**Confidence:** Substantiated (based on reading the actual source code)

### 4. Live component preview approaches

| Approach | How it works | Latency | Editability | Complexity |
|----------|-------------|---------|-------------|------------|
| **Static MDX render** | Import component directly in MDX, render inline | Instant (SSR/SSG) | Not editable | Low |
| **Sandpack** | In-browser bundler (CodeSandbox engine) | 1-3s cold start | Fully editable | Medium |
| **react-live** | Eval-based live JSX preview | Instant | Editable (JSX only) | Low-Medium |
| **Storybook embed** | iframe to Storybook instance | Network dependent | Via Storybook controls | Medium |
| **StackBlitz WebContainers** | Full Node.js in browser | 5-10s cold start | Full project editing | High |

**Static MDX render** is the simplest path and directly reuses existing demo components from `packages/demo/src/demos/**`. Each demo (e.g., `ButtonVariants.tsx`) is a self-contained React component that imports from `@acronis-platform/shadcn-uikit/react` -- these can be imported directly into MDX files.

**Sandpack** is used by [React's official docs](https://react.dev) and is well-suited for allowing users to experiment with component props. It supports [custom file dependencies](https://sandpack.codesandbox.io/) and has built-in support for Vite as a bundler. However, it requires bundling the component library as a dependency within the Sandpack sandbox, which adds configuration complexity.

**react-live** is what Docusaurus's `theme-live-codeblock` uses. It evaluates JSX in the browser but does not support full module imports -- components must be pre-registered in a scope object.

**Confidence:** Substantiated

### 5. Monorepo integration

The project uses pnpm workspaces with packages at `packages/*`. A docs package would sit at `packages/docs/` (directory exists but has no `package.json`).

**Importing from workspace packages:**
- `@acronis-platform/shadcn-uikit` is already consumed by `packages/demo` via `"workspace:*"` -- the same pattern works for a docs package.
- Demo components in `packages/demo/src/demos/**` export named React components that import from the UI package. These can be re-exported or directly imported by the docs site.

**Build-time API generation:**
- For Fumadocs: `fumadocs-typescript`'s `AutoTypeTable` reads `.tsx` files at build time via a file path relative to `cwd`. The docs package would reference `../ui/src/components/ui/button.tsx` (or an alias).
- For Nextra: The `TSDoc` component similarly accepts TypeScript code/file references.
- For framework-agnostic: A prebuild script using `react-docgen-typescript` or `ts-morph` can scan `packages/ui/src/components/ui/**/*.tsx` and output JSON, which MDX pages consume at build time.

**Build chain considerations:**
- Next.js-based frameworks (Fumadocs, Nextra) add `next` as a dependency. The existing monorepo uses Vite exclusively.
- Docusaurus adds its own build chain (Webpack-based in v3, considering Rspack).
- Starlight adds the Astro build chain.
- Custom Vite stays consistent with existing tooling.

**Confidence:** Substantiated

## Comparison

### Framework comparison matrix

| Criteria | Fumadocs | Nextra v4 | Docusaurus | Starlight | Storybook Docs | Custom Vite |
|----------|----------|-----------|------------|-----------|----------------|-------------|
| **Live React examples** | Direct import in MDX | Direct import in MDX | react-live (limited scope) | Astro islands (friction) | Stories (native) | Direct import |
| **MDX support** | Full | Full | Full (MDX v3) | Full | Storybook MDX (subset) | Via `@mdx-js/rollup` |
| **Built-in props extraction** | `AutoTypeTable` (TS Compiler) | `TSDoc` (ts-morph) | None | None | `react-docgen` (Babel) | None |
| **Reuse existing demos** | Import directly | Import directly | Register in scope | Astro island wrapper | Already stories | Import directly |
| **Monorepo fit** | New Next.js dep | New Next.js dep | Separate build chain | Separate build chain | Already configured | Same Vite tooling |
| **Customizability** | High (headless) | Medium (theme-based) | Medium (plugins) | Medium (overrides) | Low (Storybook UI) | Unlimited |
| **Time to first page** | Hours | Hours | Hours | Hours | Minutes (exists) | Days-weeks |
| **Community/ecosystem** | Growing (10K stars) | Mature (800K dl/mo) | Largest (58K stars) | Growing (Astro) | Largest (6M dl/wk) | N/A |
| **Maintenance burden** | Low (framework updates) | Low | Low | Low | Minimal (exists) | High |
| **SEO** | Full SSG/SSR | Full SSG/SSR | Full SSG | Full SSG | Poor (iframes) | Depends on implementation |
| **Reference implementation** | basecn.dev | Many OSS projects | React Native, Jest | Many OSS docs | Internal tooling | base-ui.com, shadcn/ui |

### Estimated complexity (person-days to first deployable version)

| Framework | Setup | Content migration | API docs | Live examples | Total estimate |
|-----------|-------|-------------------|----------|---------------|----------------|
| Fumadocs | 1-2d | 3-5d | 1-2d (built-in) | 1d (direct import) | 6-10d |
| Nextra v4 | 1-2d | 3-5d | 2-3d (newer API) | 1d (direct import) | 7-11d |
| Docusaurus | 1-2d | 3-5d | 3-5d (custom) | 2-3d (scope setup) | 9-15d |
| Starlight | 2-3d | 3-5d | 3-5d (custom) | 3-4d (islands) | 11-17d |
| Storybook Docs | 0d | 2-3d (MDX stories) | 0d (built-in) | 0d (exists) | 2-3d |
| Custom Vite | 5-8d | 3-5d | 3-5d (custom) | 1d (direct import) | 12-23d |

## Key takeaways

- basecn.dev -- the closest reference project to this library's goals -- uses Fumadocs with `fumadocs-typescript` for auto-generated props tables. (Corroborated)
- Fumadocs and Nextra v4 both provide built-in TypeScript props extraction via the TS Compiler API, eliminating the need for custom API docs tooling. (Corroborated)
- The project's existing demo components (`packages/demo/src/demos/**`) are self-contained React components that can be directly imported into MDX pages in any Next.js-based framework -- no wrapper code needed. (Substantiated)
- The `VariantProps<typeof buttonVariants>` pattern used throughout the library may require testing with any props extraction tool to confirm variant values are correctly resolved rather than displayed as an opaque generic type. (Conjecture -- depends on how each tool resolves CVA generics)
- Storybook Docs offers the fastest path (already configured) but does not serve as a proper public documentation site due to SEO, navigation, and branding limitations. (Corroborated)

## Open questions

1. **CVA variant resolution**: Does `fumadocs-typescript`'s `AutoTypeTable` correctly resolve `VariantProps<typeof buttonVariants>` into the union of literal types (`"default" | "destructive" | ...`)? This needs testing with an actual component file.

2. **Next.js in monorepo**: Adding Next.js as a dependency introduces a different dev server and build pipeline alongside the existing Vite setup. What are the implications for CI build times and developer experience?

3. **Demo component reuse strategy**: Should the docs package import demos directly from `packages/demo/src/demos/**`, or should demos be co-located with component source in `packages/ui`? The current demo package has its own dependencies (react-router-dom, zustand) that may not be needed in the docs context.

4. **Sandpack vs static render**: Is live editing a requirement for v1 of the docs site, or are static rendered examples (with visible source code) sufficient? This significantly affects complexity.

5. **Storybook coexistence**: If a separate docs site is built, should Storybook continue to serve as the visual regression testing tool only, or should it be retired in favor of the docs site?

6. **basecn.dev deep dive**: A closer examination of basecn.dev's source code (component page structure, MDX patterns, `AutoTypeTable` usage) could provide a reusable template for this project's docs.

## Sources

1. [Fumadocs official site](https://www.fumadocs.dev/) -- framework overview, component library guide, Auto Type Table documentation
2. [Fumadocs TypeScript integration](https://www.fumadocs.dev/docs/integrations/typescript) -- `fumadocs-typescript` package details for props extraction
3. [Fumadocs comparisons page](https://www.fumadocs.dev/docs/comparisons) -- self-authored comparison with Nextra and Docusaurus
4. [Nextra 4 announcement (The Guild)](https://the-guild.dev/blog/nextra-4) -- App Router migration, breaking changes
5. [Nextra TSDoc component](https://nextra.site/docs/built-ins/tsdoc) -- built-in TypeScript props generation (4.3 alpha)
6. [Docusaurus MDX and React](https://docusaurus.io/docs/markdown-features/react) -- live codeblock integration, MDX v3 support
7. [Starlight docs](https://starlight.astro.build/) -- component usage, multi-framework support
8. [Storybook autodocs](https://storybook.js.org/docs/writing-docs/autodocs) -- automatic documentation generation from stories
9. [Sandpack](https://sandpack.codesandbox.io/) -- live code editing toolkit by CodeSandbox
10. [basecn GitHub repo (akash3444/basecn)](https://github.com/akash3444/basecn) -- Fumadocs-based docs for shadcn/ui + Base UI components
11. [Base UI GitHub repo (mui/base-ui)](https://github.com/mui/base-ui) -- custom Next.js docs site at `docs/src/app/(docs)/react/`
12. [shadcn/ui GitHub repo (shadcn-ui/ui)](https://github.com/shadcn-ui/ui) -- custom Next.js docs site
13. [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) -- TS Compiler API-based props parser
14. [ts-morph docs generation article](https://souporserious.com/generate-typescript-docs-using-ts-morph/) -- using ts-morph for custom type extraction
15. [Fumadocs vs Nextra vs Starlight 2026 (PkgPulse)](https://www.pkgpulse.com/blog/fumadocs-vs-nextra-v4-vs-starlight-documentation-sites-2026) -- npm download comparisons, adoption data
16. [Using Sandpack for React Libraries Documentation (CodeSandbox blog)](https://codesandbox.io/blog/using-sandpack-for-react-libraries-documentation) -- Sandpack integration patterns
