---
applyTo: "**/*.spec.ts"
---

## Unit test requirements (Acronis UI Component Library)

These guidelines reflect our actual test stack and patterns. Use them for all new and updated unit tests.

### Stack
- Vitest for test running and assertions
- Vue Test Utils for Vue 3 component tests
- vitest-axe for basic a11y smoke checks where meaningful
- TypeScript across all tests

### File placement and naming
- Use `*.spec.ts` for all tests
- Components: co-locate next to component source (e.g. `packages/ui/src/components/button/button.spec.ts`)
- Utilities: in the package tests folder (e.g. `packages/utils/tests/case.spec.ts`)

### Test structure
- One top-level `describe()` per component/module
- Prefer small, focused `it()` blocks
- Group related scenarios with nested `describe()` only when it increases clarity

### Mounting components
- Use `mount()` from `@vue/test-utils`

Example (from `button.spec.ts`):
```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './button.vue'

describe('button', () => {
  it('render', () => {
    const wrapper = mount(Button, { slots: { default: 'Text' } })
    expect(wrapper.find('.av-button').classes()).toEqual([
      'av-button',
      'av-button_variant_primary',
      'av-button_size_medium',
    ])
  })
})
```

### Props typing and variants
- Type props when helpful using exported interfaces (e.g., `AvAsideProps`)
- Iterate known variants from exported constants/enums

```ts
import { BUTTON_VARIANT } from './button.ts'
Object.keys(BUTTON_VARIANT).forEach((variant) => {
  const wrapper = mount(Button, { props: { variant } as any })
  // assertions per variant
})
```

### Events and v-model
- Use `wrapper.emitted()` to assert events
- For v-model, assert both DOM state and `update:modelValue`

```ts
const emitted = wrapper.emitted()
expect(emitted['update:modelValue']).toBeTruthy()
```

### Slots
- Provide slots via `mount({ slots: { ... } })` and assert with `.text()` or finders

### Accessibility (optional)
- Add a lightweight a11y check with `vitest-axe` when it adds value and is stable

```ts
import { axe } from 'vitest-axe'
expect(await axe(wrapper.element)).toHaveNoViolations()
```

### Async and DOM updates
- Use `await nextTick()` after prop changes or interactions that trigger updates

### Snapshots policy
- Favor targeted assertions over large snapshots
- Inline snapshots may be used sparingly for simple markup; avoid brittle, noisy snapshots

### Utilities tests
- Keep them table-driven and deterministic; assert return values directly

Example (from `packages/utils/tests/case.spec.ts`):
```ts
import { describe, it, expect } from 'vitest'
import { toPascalCase } from '../src'

describe('toPascalCase', () => {
  it('converts', () => {
    expect(toPascalCase('some_Mixed_CASE_words')).toBe('SomeMixedCaseWords')
  })
})
```

### Reliability
- Avoid randomness and timers; if needed, stub explicitly with `vi` utilities
- Ensure tests pass ESLint and Prettier

### Checklist
- Renders default state
- Applies classes/styles for key props
- Emits expected events (including `update:modelValue` if applicable)
- Renders slots
- Optional: a11y smoke test with `vitest-axe`
- Uses `nextTick()` where necessary
- Avoids large/brittle snapshots
