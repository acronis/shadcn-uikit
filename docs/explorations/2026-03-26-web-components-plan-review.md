# Exploration: Web Components Plan 1 Review

Date: 2026-03-26

## Research question

Does the implementation plan at `packages/docs/superpowers/plans/2026-03-26-web-components-simple.md` fully and correctly implement what the spec requires for Plan 1 (scaffold + 10 pure Lit components)? Are there blockers an implementer would hit?

## Scope

In scope: plan correctness, file path consistency, TypeScript/Lit syntax, test correctness, build config, package.json completeness, Vue augmentation syntax. Out of scope: Plan 2 (React-wrapped components), design token value accuracy, visual parity.

## Findings

### 1. Spec coverage -- all 10 components present

The plan covers all 10 pure Lit components listed in the spec: button, badge, chip, input, textarea, label, separator, avatar, skeleton, progress. Each has a source file, test file, and is re-exported through `simple-index.ts`. The `HTMLElementTagNameMap` augmentations are present in each component file. The Vue `GlobalComponents` augmentation is in `index.ts` (Task 7).

**Confidence:** Corroborated

### 2. BLOCKER -- `acr-input` test will fail due to double `input` event dispatch

Plan lines 627-634. The test listens for an `input` event on the host element, then manually dispatches a native `input` event on the inner `<input>`. The component's `_onInput` handler (line 705-712) intercepts this and dispatches a *new* `CustomEvent('input', ...)` with `composed: true`. However, the native `input` event from the inner `<input>` also bubbles and is `composed` by default in many environments. In happy-dom, the native event may or may not cross the shadow boundary depending on version. The test assertion `toHaveBeenCalledOnce()` could fail if both the native and custom events reach the host -- the handler would be called twice.

This is a semantic issue: the component re-dispatches `input` as a `CustomEvent` but does not call `e.stopPropagation()` on the original native event. The native `input` event is *not* composed by spec (unlike `click`), so in a real browser it would not cross the shadow boundary -- but happy-dom may behave differently. The test may pass in happy-dom but fail in a real browser, or vice versa, depending on the happy-dom version's shadow DOM fidelity.

**Confidence:** Substantiated -- depends on happy-dom's shadow DOM event model

### 3. BLOCKER -- `--av-radius` is a length value, not HSL channels, but used inconsistently

The plan uses `var(--av-radius, 0.5rem)` as the fallback (e.g., button line 300, input line 680). The actual token value in the codebase is `--av-radius: 0.25rem` (confirmed in `_globals.scss` line 40 and all theme files). The 0.5rem fallback is wrong relative to the project's actual default -- but this is a cosmetic inaccuracy, not a compilation blocker.

More critically, the button component (line 300) uses `border-radius: var(--av-radius, 0.5rem)` directly, while the spec example (spec lines 60-65) shows a pattern of aliasing to a private `--_radius` variable. The plan does not follow the spec's recommended double-dash aliasing pattern. This is a deviation from the spec but not a build blocker.

**Confidence:** Corroborated -- verified against `_globals.scss` and theme files

### 4. ISSUE -- `acr-label` `for` attribute will not work across shadow DOM

Plan line 861-865. The test asserts that setting `el.for = 'my-input'` puts a `for` attribute on the inner `<label>`. While this will compile and the attribute will render, the `for` attribute on a `<label>` inside a shadow root cannot reference an element by ID in the light DOM or in a different shadow root. The `for`/`id` association is scoped to the same root. This means the `for` property is effectively non-functional for the most common use case (labeling an `<input>` outside the shadow root).

The spec notes (spec line 244) that `ElementInternals` form association is deferred to v2, so this is a known limitation. However, the plan does not document this caveat, and an implementer might spend time debugging why `for` does not work.

**Confidence:** Corroborated -- this is a well-documented shadow DOM limitation

### 5. ISSUE -- Vue `GlobalComponents` augmentation uses class types, not element tag names

Plan lines 1267-1280. The Vue `GlobalComponents` interface maps PascalCase names (e.g., `AcrButton`) to the Lit element class types. For Vue's custom element resolution, the keys in `GlobalComponents` should match the tag names consumers use in templates. Vue resolves `<acr-button>` by looking for either `acr-button` or `AcrButton` in `GlobalComponents`, so the PascalCase form does work for autocompletion -- but the types will be Lit's `LitElement` subclasses, not Vue component types. This means Vue template type-checking will see Lit-specific properties (`updateComplete`, `renderRoot`, etc.) rather than a clean props interface.

The spec (spec line 192) says to put this in a separate `vue.d.ts` entry file, but the plan puts it directly in `index.ts`. This means TypeScript will attempt to resolve the `vue` module even for non-Vue consumers. If `vue` is not installed, `declare module 'vue'` is harmless (it just augments a module that does not exist), but it adds noise to the declaration output.

**Confidence:** Substantiated

### 6. ISSUE -- `vite.config.ts` uses `__dirname` which is not available in ESM

Plan line 139: `entry: resolve(__dirname, 'src/index.ts')`. The package.json declares `"type": "module"`, which means `vite.config.ts` is processed as ESM. In ESM, `__dirname` is not defined. Vite does provide a shim for `__dirname` in config files when using `defineConfig`, so this will actually work in practice -- Vite internally transforms config files using esbuild/rolldown. However, the existing `packages/ui/vite.config.ts` also uses `__dirname` with `"type": "module"` in its package.json, so this pattern is already established in the repo and works.

**Confidence:** Substantiated -- verified that `packages/ui` uses the same pattern successfully

### 7. ISSUE -- Missing `lib` in tsconfig.json `compilerOptions`

Plan line 104-120. The tsconfig.json does not include `"lib": ["ES2020", "DOM", "DOM.Iterable"]`. Without the `DOM` lib, TypeScript will not recognize `HTMLElement`, `HTMLButtonElement`, `HTMLInputElement`, `CustomEvent`, `document`, `customElements`, and other DOM APIs used throughout every component and test file. The existing `packages/ui/tsconfig.json` includes `"lib": ["ES2020", "DOM", "DOM.Iterable"]`.

This is a **compilation blocker**. The type-check step (Task 1, Step 7) will fail.

**Confidence:** Corroborated -- verified against `packages/ui/tsconfig.json` which includes the DOM lib

### 8. ISSUE -- `preserveModules` with single `entry` may produce unexpected output

Plan line 139 defines a single entry point `src/index.ts`, but line 145 enables `preserveModules: true`. With `preserveModules`, Rollup preserves the module structure of all files reachable from the entry. This should work correctly -- each component file becomes a separate output chunk. However, the `lib.formats: ['es']` combined with `preserveModules` means Rollup will not use the `lib.entry` as the sole output file; instead it produces one file per module. The `lib.entry` just defines the entry for module resolution. This is the intended behavior per the plan.

One subtle issue: with `preserveModules: true` and `entryFileNames: '[name].js'`, Rollup names files by their module name. The entry `src/index.ts` becomes `index.js`, and `src/components/simple/button.ts` becomes `components/simple/button.js`. This matches the expected output in Task 8, Step 2 (line 1325).

**Confidence:** Substantiated

### 9. ISSUE -- `acr-progress` test assertion for `aria-valuenow` uses string comparison

Plan line 1078: `expect(el.shadowRoot!.querySelector('.track')!.getAttribute('aria-valuenow')).toBe('42')`. The `getAttribute` method returns a string, and the Lit template uses `aria-valuenow=${this.value ?? 0}` which will render the number as a string attribute. This assertion is correct.

However, line 1084: `expect(indicator.style.transform).toBe('translateX(-50%)')`. Lit uses `style=${...}` as a string attribute binding (line 1216), not the `.style` property binding. When Lit sets `style="transform: translateX(-50%)"` as an attribute, accessing `indicator.style.transform` should return `translateX(-50%)` after the browser parses the inline style. In happy-dom, this depends on whether happy-dom parses inline `style` attributes into the `CSSStyleDeclaration` object. Many happy-dom versions do support this, but it is a potential flaky point.

**Confidence:** Conjecture -- depends on happy-dom's CSS style parsing fidelity

### 10. MINOR -- Workspace discovery does not require changes

The `pnpm-workspace.yaml` at the repo root uses `packages: ['packages/*']`. Since the new package is at `packages/web-components`, it will be automatically discovered. No workspace config changes needed. This is correct in the plan (Task 1, Step 6 just runs `pnpm install`).

**Confidence:** Corroborated

### 11. MINOR -- External regex `['lit', /^lit\/.*/]` is correct but incomplete

Plan line 143: `external: ['lit', /^lit\/.*/]`. This correctly externalizes `lit` and subpath imports like `lit/decorators.js`, `lit/html.js`, etc. However, Lit 3 also has `@lit/reactive-element` and `@lit/localize` as potential transitive imports. The `@lit/*` packages are internal to Lit and typically not imported directly by component code. Since the plan only uses `lit` and `lit/decorators.js`, the current external config is sufficient.

**Confidence:** Substantiated

### 12. MINOR -- `chip.ts` HSL alpha syntax

Plan line 543-544 uses `hsl(var(--av-primary, 213 94% 51%) / 0.3)`. This is the modern CSS color function syntax (CSS Color Level 4), where `hsl()` accepts space-separated values and an optional `/ alpha`. This works in all modern browsers but may not parse correctly in happy-dom during tests if happy-dom does not implement CSS Color Level 4. This would not cause test failures since the tests do not assert on computed styles, only on DOM structure.

**Confidence:** Substantiated

### 13. MINOR -- Spec says separate `vue.d.ts`, plan puts augmentation in `index.ts`

Spec line 192: "A `GlobalComponents` augmentation for Vue 3 (in a separate `vue.d.ts` entry)". The plan (Task 7, line 1262-1281) puts the Vue augmentation directly in `index.ts`. This deviates from the spec. The practical consequence is that `vue` module augmentation will be included in the main declaration file, which may cause confusion for non-Vue consumers reading the types.

**Confidence:** Corroborated

## Key takeaways

- **BLOCKER (line 104-120):** `tsconfig.json` is missing `"lib": ["ES2020", "DOM", "DOM.Iterable"]`. Every component and test file uses DOM APIs. Type-checking will fail. (Corroborated)
- **Issue (lines 705-712 / 627-634):** `acr-input` does not `stopPropagation()` on the native input event before re-dispatching a CustomEvent. This may cause double-firing in some environments. (Substantiated)
- **Issue (line 861-865):** `acr-label`'s `for` attribute is non-functional across shadow DOM boundaries. Not a build blocker but should be documented. (Corroborated)
- **Deviation (line 1262-1281):** Vue `GlobalComponents` augmentation is in `index.ts` instead of a separate `vue.d.ts` as the spec requires. (Corroborated)
- **Minor (line 300):** `--av-radius` fallback is `0.5rem` but the project default is `0.25rem`. Cosmetic only. (Corroborated)

## Open questions

1. Does the team's happy-dom version support `element.style.transform` parsing from inline `style` attributes? This affects the `acr-progress` transform test.
2. Should `acr-input` and `acr-textarea` call `stopPropagation()` on the native event before dispatching the custom event, or should they avoid re-dispatching altogether (relying on the native event with `composed: true` instead)?
3. Should the Vue augmentation live in `vue.d.ts` as the spec says, or is `index.ts` acceptable?

## Sources

1. `packages/ui/tsconfig.json` -- confirmed `lib` includes `DOM` and `DOM.Iterable`
2. `packages/ui/vite.config.ts` -- confirmed `__dirname` usage pattern in ESM context
3. `pnpm-workspace.yaml` -- confirmed `packages/*` glob discovers `packages/web-components`
4. `packages/ui/src/styles/_globals.scss` -- confirmed `--av-radius: 0.25rem` and `--av-primary: 213 65% 46%`
5. `packages/ui/src/styles/_variables.scss` -- confirmed token names and HSL channel format
