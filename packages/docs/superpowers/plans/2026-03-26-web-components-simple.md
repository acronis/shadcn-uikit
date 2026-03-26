# Web Components — Package Scaffold + Pure Lit Components

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `packages/web-components` with `@acronis-platform/shadcn-uikit-wc`, implementing 10 pure Lit components as native Custom Elements with Shadow DOM and `--av-*` CSS variable theming.

**Architecture:** Each component is a Lit `LitElement` subclass registered as a custom element (e.g., `acr-button`). Shadow DOM provides style encapsulation; all colours are consumed via `hsl(var(--av-*))` so the host app's token stylesheet controls the theme. React is not involved in this plan — that is Plan 2.

**Tech Stack:** Lit 3, TypeScript, Vite 6, Vitest 4, happy-dom, pnpm workspaces.

---

## File Map

```
packages/web-components/
├── src/
│   ├── components/simple/
│   │   ├── button.ts       — acr-button: variants + sizes
│   │   ├── badge.ts        — acr-badge: semantic colour variants
│   │   ├── chip.ts         — acr-chip: pill tag
│   │   ├── input.ts        — acr-input: text input with events
│   │   ├── textarea.ts     — acr-textarea: multiline text input
│   │   ├── label.ts        — acr-label: form label
│   │   ├── separator.ts    — acr-separator: horizontal/vertical rule
│   │   ├── avatar.ts       — acr-avatar: image + initials fallback
│   │   ├── skeleton.ts     — acr-skeleton: loading placeholder
│   │   └── progress.ts     — acr-progress: determinate bar
│   ├── simple-index.ts     — re-exports all simple components
│   └── index.ts            — main entry (re-exports simple-index)
├── test/simple/
│   ├── button.test.ts
│   ├── badge.test.ts
│   ├── chip.test.ts
│   ├── input.test.ts
│   ├── textarea.test.ts
│   ├── label.test.ts
│   ├── separator.test.ts
│   ├── avatar.test.ts
│   ├── skeleton.test.ts
│   └── progress.test.ts
├── package.json
├── tsconfig.json
├── vite.config.ts          — build config with preserveModules
└── vitest.config.ts        — test config with happy-dom
```

---

### Task 1: Package scaffold

**Files:**

- Create: `packages/web-components/package.json`
- Create: `packages/web-components/tsconfig.json`
- Create: `packages/web-components/vite.config.ts`
- Create: `packages/web-components/vitest.config.ts`
- Create: `packages/web-components/src/index.ts` (empty placeholder)
- Create: `packages/web-components/src/simple-index.ts` (empty placeholder)

- [ ] **Step 1: Create `packages/web-components/package.json`**

```json
{
  "name": "@acronis-platform/shadcn-uikit-wc",
  "version": "0.1.0",
  "description": "Acronis shadcn UI kit as framework-agnostic Web Components",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "vite build",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "peerDependencies": {
    "lit": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "happy-dom": "^20.0.0",
    "lit": "^3.0.0",
    "typescript": "^5.5.0",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^4.0.0"
  },
  "keywords": ["web-components", "custom-elements", "lit", "acronis"],
  "license": "MIT"
}
```

- [ ] **Step 2: Create `packages/web-components/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create `packages/web-components/vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\/.*/],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
```

- [ ] **Step 4: Create `packages/web-components/vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['test/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Create placeholder entry files**

`packages/web-components/src/simple-index.ts`:

```typescript
// simple components will be re-exported here
```

`packages/web-components/src/index.ts`:

```typescript
export * from './simple-index';
```

- [ ] **Step 6: Install dependencies from monorepo root**

```bash
cd /path/to/shadcn-uikit
pnpm install
```

Expected: `packages/web-components` appears in pnpm workspace, `lit` installed as devDep.

- [ ] **Step 7: Verify TypeScript compiles**

```bash
cd packages/web-components
pnpm type-check
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add packages/web-components/
git commit -m "feat(web-components): scaffold package with Vite + Lit + Vitest"
```

---

### Task 2: `acr-button` — establishes the Lit component pattern

**Files:**

- Create: `packages/web-components/src/components/simple/button.ts`
- Create: `packages/web-components/test/simple/button.test.ts`
- Modify: `packages/web-components/src/simple-index.ts`

- [ ] **Step 1: Write the failing test**

`packages/web-components/test/simple/button.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/button';
import type { AcrButton } from '../../src/components/simple/button';

describe('acr-button', () => {
  let el: AcrButton;

  beforeEach(async () => {
    el = document.createElement('acr-button') as AcrButton;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('registers as a custom element', () => {
    expect(customElements.get('acr-button')).toBeDefined();
  });

  it('has a shadow root', () => {
    expect(el.shadowRoot).toBeTruthy();
  });

  it('renders a <button> inside shadow root', async () => {
    expect(el.shadowRoot!.querySelector('button')).toBeTruthy();
  });

  it('reflects disabled to inner button', async () => {
    el.disabled = true;
    await el.updateComplete;
    const inner = el.shadowRoot!.querySelector('button') as HTMLButtonElement;
    expect(inner.disabled).toBe(true);
  });

  it('reflects variant attribute', async () => {
    el.variant = 'outline';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('outline');
  });

  it('dispatches click event', async () => {
    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });
    el.shadowRoot!.querySelector('button')!.click();
    expect(clicked).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd packages/web-components
pnpm test -- button
```

Expected: FAIL — `acr-button` is not defined / module not found.

- [ ] **Step 3: Implement `acr-button`**

`packages/web-components/src/components/simple/button.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@customElement('acr-button')
export class AcrButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: var(--av-radius, 0.25rem);
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.5rem;
      cursor: pointer;
      border: 1px solid transparent;
      height: 2rem;
      padding: 0.25rem 0.5rem;
      transition:
        background-color 0.15s,
        border-color 0.15s;
      background: hsl(var(--av-primary, 213 94% 51%));
      color: hsl(var(--av-primary-foreground, 0 0% 100%));
    }

    button:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    :host([variant='outline']) button {
      background: hsl(var(--av-background, 0 0% 100%));
      color: hsl(var(--av-foreground, 220 13% 13%));
      border-color: hsl(var(--av-border, 220 13% 91%));
    }
    :host([variant='secondary']) button {
      background: hsl(var(--av-background, 0 0% 100%));
      color: hsl(var(--av-primary, 213 94% 51%));
      border-color: hsl(var(--av-primary, 213 94% 51%));
    }
    :host([variant='ghost']) button {
      background: transparent;
      color: hsl(var(--av-primary, 213 94% 51%));
      border-color: transparent;
    }
    :host([variant='destructive']) button {
      background: hsl(var(--av-destructive, 0 84% 60%));
      color: hsl(var(--av-destructive-foreground, 0 0% 100%));
    }
    :host([variant='link']) button {
      background: transparent;
      color: hsl(var(--av-primary, 213 94% 51%));
      border-color: transparent;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    :host([size='sm']) button {
      height: 1.75rem;
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
    }
    :host([size='lg']) button {
      height: 2.5rem;
      padding: 0.5rem 1rem;
    }
    :host([size='icon']) button {
      height: 2rem;
      width: 2rem;
      padding: 0.5rem;
    }
  `;

  @property({ reflect: true }) variant: ButtonVariant = 'default';
  @property({ reflect: true }) size: ButtonSize = 'default';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    return html`
      <button type=${this.type} ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-button': AcrButton;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test -- button
```

Expected: 6 tests pass.

- [ ] **Step 5: Add to simple-index.ts**

```typescript
export * from './components/simple/button';
```

- [ ] **Step 6: Commit**

```bash
git add packages/web-components/src/components/simple/button.ts \
        packages/web-components/src/simple-index.ts \
        packages/web-components/test/simple/button.test.ts
git commit -m "feat(web-components): add acr-button Lit component"
```

---

### Task 3: `acr-badge` and `acr-chip`

**Files:**

- Create: `packages/web-components/src/components/simple/badge.ts`
- Create: `packages/web-components/src/components/simple/chip.ts`
- Create: `packages/web-components/test/simple/badge.test.ts`
- Create: `packages/web-components/test/simple/chip.test.ts`
- Modify: `packages/web-components/src/simple-index.ts`

- [ ] **Step 1: Write failing tests**

`packages/web-components/test/simple/badge.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/badge';
import type { AcrBadge } from '../../src/components/simple/badge';

describe('acr-badge', () => {
  let el: AcrBadge;
  beforeEach(async () => {
    el = document.createElement('acr-badge') as AcrBadge;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-badge')).toBeDefined();
  });
  it('renders span in shadow root', () => {
    expect(el.shadowRoot!.querySelector('span')).toBeTruthy();
  });
  it('reflects variant attribute', async () => {
    el.variant = 'success';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('success');
  });
});
```

`packages/web-components/test/simple/chip.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/chip';

describe('acr-chip', () => {
  let el: HTMLElement;
  beforeEach(async () => {
    el = document.createElement('acr-chip');
    document.body.appendChild(el);
    await (el as any).updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-chip')).toBeDefined();
  });
  it('renders div in shadow root', () => {
    expect(el.shadowRoot!.querySelector('div')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
pnpm test -- badge chip
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `acr-badge`**

`packages/web-components/src/components/simple/badge.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'success'
  | 'info'
  | 'warning'
  | 'neutral';

@customElement('acr-badge')
export class AcrBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    span {
      display: inline-flex;
      align-items: center;
      border-radius: 0.75rem;
      border: 1px solid transparent;
      padding: 0.25rem 0.5rem;
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
      background: hsl(var(--av-primary, 213 94% 51%));
      color: hsl(var(--av-primary-foreground, 0 0% 100%));
    }
    :host([variant='secondary']) span {
      background: hsl(var(--av-secondary, 220 13% 95%));
      color: hsl(var(--av-secondary-foreground, 220 13% 13%));
    }
    :host([variant='outline']) span {
      background: transparent;
      color: hsl(var(--av-foreground, 220 13% 13%));
      border-color: hsl(var(--av-border, 220 13% 91%));
    }
    :host([variant='destructive']) span {
      background: hsl(var(--av-destructive, 0 84% 60%));
      color: hsl(var(--av-destructive-foreground, 0 0% 100%));
    }
    :host([variant='success']) span {
      background: hsl(var(--av-success, 142 76% 36%));
      color: hsl(var(--av-success-foreground, 0 0% 100%));
    }
    :host([variant='info']) span {
      background: hsl(var(--av-info, 199 89% 48%));
      color: hsl(var(--av-info-foreground, 0 0% 100%));
    }
    :host([variant='warning']) span {
      background: hsl(var(--av-warning, 38 92% 50%));
      color: hsl(var(--av-warning-foreground, 0 0% 100%));
    }
    :host([variant='neutral']) span {
      background: hsl(var(--av-muted, 220 13% 95%));
      color: hsl(var(--av-muted-foreground, 220 9% 46%));
    }
  `;

  @property({ reflect: true }) variant: BadgeVariant = 'default';

  render() {
    return html`<span part="badge"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-badge': AcrBadge;
  }
}
```

- [ ] **Step 4: Implement `acr-chip`**

`packages/web-components/src/components/simple/chip.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('acr-chip')
export class AcrChip extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    div {
      display: inline-flex;
      height: 1.5rem;
      align-items: center;
      gap: 0.5rem;
      border-radius: 9999px;
      border: 1px solid hsl(var(--av-primary, 213 94% 51%) / 0.3);
      background: hsl(var(--av-primary, 213 94% 51%) / 0.05);
      padding: 0 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5rem;
      color: hsl(var(--av-foreground, 220 13% 13%));
    }
  `;
  render() {
    return html`<div part="chip"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-chip': AcrChip;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm test -- badge chip
```

Expected: all pass.

- [ ] **Step 6: Append to simple-index.ts**

```typescript
export * from './components/simple/badge';
export * from './components/simple/chip';
```

- [ ] **Step 7: Commit**

```bash
git add packages/web-components/src/components/simple/badge.ts \
        packages/web-components/src/components/simple/chip.ts \
        packages/web-components/src/simple-index.ts \
        packages/web-components/test/simple/badge.test.ts \
        packages/web-components/test/simple/chip.test.ts
git commit -m "feat(web-components): add acr-badge and acr-chip"
```

---

### Task 4: `acr-input` and `acr-textarea`

**Files:**

- Create: `packages/web-components/src/components/simple/input.ts`
- Create: `packages/web-components/src/components/simple/textarea.ts`
- Create: `packages/web-components/test/simple/input.test.ts`
- Create: `packages/web-components/test/simple/textarea.test.ts`
- Modify: `packages/web-components/src/simple-index.ts`

- [ ] **Step 1: Write failing tests**

`packages/web-components/test/simple/input.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../src/components/simple/input';
import type { AcrInput } from '../../src/components/simple/input';

describe('acr-input', () => {
  let el: AcrInput;
  beforeEach(async () => {
    el = document.createElement('acr-input') as AcrInput;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-input')).toBeDefined();
  });
  it('renders an <input> in shadow root', () => {
    expect(el.shadowRoot!.querySelector('input')).toBeTruthy();
  });
  it('sets placeholder on inner input', async () => {
    el.placeholder = 'Enter email';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('input')!.placeholder).toBe(
      'Enter email'
    );
  });
  it('disables inner input when disabled', async () => {
    el.disabled = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
  });
  it('dispatches input event on value change', async () => {
    const handler = vi.fn();
    el.addEventListener('input', handler);
    const inner = el.shadowRoot!.querySelector('input')!;
    inner.value = 'hello';
    inner.dispatchEvent(new Event('input'));
    expect(handler).toHaveBeenCalledOnce();
  });
});
```

`packages/web-components/test/simple/textarea.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/textarea';

describe('acr-textarea', () => {
  let el: HTMLElement;
  beforeEach(async () => {
    el = document.createElement('acr-textarea');
    document.body.appendChild(el);
    await (el as any).updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-textarea')).toBeDefined();
  });
  it('renders <textarea> in shadow root', () => {
    expect(el.shadowRoot!.querySelector('textarea')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
pnpm test -- input textarea
```

Expected: FAIL.

- [ ] **Step 3: Implement `acr-input`**

`packages/web-components/src/components/simple/input.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('acr-input')
export class AcrInput extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
    }
    input {
      display: flex;
      height: 3rem;
      width: 100%;
      border-radius: var(--av-radius, 0.25rem);
      border: 1px solid hsl(var(--av-input, 220 13% 91%));
      background: hsl(var(--av-background, 0 0% 100%));
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      line-height: 1.5rem;
      color: hsl(var(--av-foreground, 220 13% 13%));
      transition: border-color 0.15s;
      box-sizing: border-box;
      font-family: inherit;
    }
    input::placeholder {
      color: hsl(var(--av-muted-foreground, 220 9% 46%));
    }
    input:focus-visible {
      outline: none;
      border-color: hsl(var(--av-primary, 213 94% 51%));
    }
    input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  @property() type = 'text';
  @property() placeholder = '';
  @property() value = '';
  @property() name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onChange(e: Event) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: (e.target as HTMLInputElement).value,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <input
        type=${this.type}
        placeholder=${this.placeholder}
        name=${this.name}
        .value=${this.value}
        ?disabled=${this.disabled}
        part="input"
        @input=${this._onInput}
        @change=${this._onChange}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-input': AcrInput;
  }
}
```

- [ ] **Step 4: Implement `acr-textarea`**

`packages/web-components/src/components/simple/textarea.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('acr-textarea')
export class AcrTextarea extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
    }
    textarea {
      display: flex;
      min-height: 5rem;
      width: 100%;
      border-radius: var(--av-radius, 0.25rem);
      border: 1px solid hsl(var(--av-input, 220 13% 91%));
      background: hsl(var(--av-background, 0 0% 100%));
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      line-height: 1.5rem;
      color: hsl(var(--av-foreground, 220 13% 13%));
      transition: border-color 0.15s;
      box-sizing: border-box;
      font-family: inherit;
      resize: vertical;
    }
    textarea::placeholder {
      color: hsl(var(--av-muted-foreground, 220 9% 46%));
    }
    textarea:focus-visible {
      outline: none;
      border-color: hsl(var(--av-primary, 213 94% 51%));
    }
    textarea:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  @property() placeholder = '';
  @property() value = '';
  @property() name = '';
  @property({ type: Number }) rows = 3;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _onInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <textarea
        placeholder=${this.placeholder}
        name=${this.name}
        rows=${this.rows}
        ?disabled=${this.disabled}
        part="textarea"
        @input=${this._onInput}
      >
${this.value}</textarea
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-textarea': AcrTextarea;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm test -- input textarea
```

Expected: all pass.

- [ ] **Step 6: Append to simple-index.ts**

```typescript
export * from './components/simple/input';
export * from './components/simple/textarea';
```

- [ ] **Step 7: Commit**

```bash
git add packages/web-components/src/components/simple/input.ts \
        packages/web-components/src/components/simple/textarea.ts \
        packages/web-components/src/simple-index.ts \
        packages/web-components/test/simple/input.test.ts \
        packages/web-components/test/simple/textarea.test.ts
git commit -m "feat(web-components): add acr-input and acr-textarea"
```

---

### Task 5: `acr-label` and `acr-separator`

**Files:**

- Create: `packages/web-components/src/components/simple/label.ts`
- Create: `packages/web-components/src/components/simple/separator.ts`
- Create: `packages/web-components/test/simple/label.test.ts`
- Create: `packages/web-components/test/simple/separator.test.ts`
- Modify: `packages/web-components/src/simple-index.ts`

- [ ] **Step 1: Write failing tests**

`packages/web-components/test/simple/label.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/label';
import type { AcrLabel } from '../../src/components/simple/label';

describe('acr-label', () => {
  let el: AcrLabel;
  beforeEach(async () => {
    el = document.createElement('acr-label') as AcrLabel;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-label')).toBeDefined();
  });
  it('renders <label> in shadow root', () => {
    expect(el.shadowRoot!.querySelector('label')).toBeTruthy();
  });
  it('sets for attribute on inner label', async () => {
    el.for = 'my-input';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('label')!.getAttribute('for')).toBe(
      'my-input'
    );
    // Note: the `for` attribute points into the shadow DOM's own scope.
    // Cross-shadow-boundary label association (referencing a light DOM input by id)
    // is a known Web Components limitation. Consumers should use aria-labelledby
    // or place the input inside the same shadow root if association is needed.
  });
});
```

`packages/web-components/test/simple/separator.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/separator';
import type { AcrSeparator } from '../../src/components/simple/separator';

describe('acr-separator', () => {
  let el: AcrSeparator;
  beforeEach(async () => {
    el = document.createElement('acr-separator') as AcrSeparator;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-separator')).toBeDefined();
  });
  it('renders <hr> in shadow root', () => {
    expect(el.shadowRoot!.querySelector('hr')).toBeTruthy();
  });
  it('defaults to horizontal orientation', () => {
    expect(el.orientation).toBe('horizontal');
  });
  it('reflects orientation attribute', async () => {
    el.orientation = 'vertical';
    await el.updateComplete;
    expect(el.getAttribute('orientation')).toBe('vertical');
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
pnpm test -- label separator
```

Expected: FAIL.

- [ ] **Step 3: Implement `acr-label`**

`packages/web-components/src/components/simple/label.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('acr-label')
export class AcrLabel extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    label {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
      color: hsl(var(--av-foreground, 220 13% 13%));
      cursor: default;
    }
  `;

  @property() for = '';

  render() {
    return html`<label for=${this.for} part="label"><slot></slot></label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-label': AcrLabel;
  }
}
```

- [ ] **Step 4: Implement `acr-separator`**

`packages/web-components/src/components/simple/separator.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('acr-separator')
export class AcrSeparator extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    hr {
      border: none;
      margin: 0;
      background: hsl(var(--av-primary, 213 94% 51%) / 0.1);
    }
    :host([orientation='horizontal']) hr,
    hr {
      height: 1px;
      width: 100%;
    }
    :host([orientation='vertical']) hr {
      width: 1px;
      height: 100%;
    }
  `;

  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' =
    'horizontal';

  render() {
    return html`<hr
      role="separator"
      aria-orientation=${this.orientation}
      part="separator"
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-separator': AcrSeparator;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm test -- label separator
```

Expected: all pass.

- [ ] **Step 6: Append to simple-index.ts**

```typescript
export * from './components/simple/label';
export * from './components/simple/separator';
```

- [ ] **Step 7: Commit**

```bash
git add packages/web-components/src/components/simple/label.ts \
        packages/web-components/src/components/simple/separator.ts \
        packages/web-components/src/simple-index.ts \
        packages/web-components/test/simple/label.test.ts \
        packages/web-components/test/simple/separator.test.ts
git commit -m "feat(web-components): add acr-label and acr-separator"
```

---

### Task 6: `acr-avatar`, `acr-skeleton`, `acr-progress`

**Files:**

- Create: `packages/web-components/src/components/simple/avatar.ts`
- Create: `packages/web-components/src/components/simple/skeleton.ts`
- Create: `packages/web-components/src/components/simple/progress.ts`
- Create: `packages/web-components/test/simple/avatar.test.ts`
- Create: `packages/web-components/test/simple/skeleton.test.ts`
- Create: `packages/web-components/test/simple/progress.test.ts`
- Modify: `packages/web-components/src/simple-index.ts`

- [ ] **Step 1: Write failing tests**

`packages/web-components/test/simple/avatar.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/avatar';
import type { AcrAvatar } from '../../src/components/simple/avatar';

describe('acr-avatar', () => {
  let el: AcrAvatar;
  beforeEach(async () => {
    el = document.createElement('acr-avatar') as AcrAvatar;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-avatar')).toBeDefined();
  });
  it('shows fallback text when no src', async () => {
    el.fallback = 'AB';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('span')!.textContent).toBe('AB');
  });
  it('shows img when src is set', async () => {
    el.src = 'https://example.com/img.png';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('img')).toBeTruthy();
  });
});
```

`packages/web-components/test/simple/skeleton.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/skeleton';

describe('acr-skeleton', () => {
  let el: HTMLElement;
  beforeEach(async () => {
    el = document.createElement('acr-skeleton');
    document.body.appendChild(el);
    await (el as any).updateComplete;
  });
  afterEach(() => {
    el.remove();
  });
  it('registers as custom element', () => {
    expect(customElements.get('acr-skeleton')).toBeDefined();
  });
  it('has a shadow root', () => {
    expect(el.shadowRoot).toBeTruthy();
  });
});
```

`packages/web-components/test/simple/progress.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/components/simple/progress';
import type { AcrProgress } from '../../src/components/simple/progress';

describe('acr-progress', () => {
  let el: AcrProgress;
  beforeEach(async () => {
    el = document.createElement('acr-progress') as AcrProgress;
    document.body.appendChild(el);
    await el.updateComplete;
  });
  afterEach(() => {
    el.remove();
  });

  it('registers as custom element', () => {
    expect(customElements.get('acr-progress')).toBeDefined();
  });
  it('renders track and indicator', () => {
    expect(el.shadowRoot!.querySelector('.track')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('.indicator')).toBeTruthy();
  });
  it('sets aria-valuenow to value', async () => {
    el.value = 42;
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('.track')!.getAttribute('aria-valuenow')
    ).toBe('42');
  });
  it('sets transform style attribute for value=50', async () => {
    el.value = 50;
    await el.updateComplete;
    const indicator = el.shadowRoot!.querySelector<HTMLElement>('.indicator')!;
    // Check the raw style attribute string rather than parsed CSSStyleDeclaration
    // to avoid happy-dom version differences in CSS parsing.
    expect(indicator.getAttribute('style')).toContain('translateX(-50%)');
  });
});
```

- [ ] **Step 2: Run to confirm failure**

```bash
pnpm test -- avatar skeleton progress
```

Expected: FAIL.

- [ ] **Step 3: Implement `acr-avatar`**

`packages/web-components/src/components/simple/avatar.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('acr-avatar')
export class AcrAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
    div {
      position: relative;
      display: flex;
      height: 2.5rem;
      width: 2.5rem;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 9999px;
      background: hsl(var(--av-muted, 220 13% 95%));
      align-items: center;
      justify-content: center;
    }
    img {
      aspect-ratio: 1;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    span {
      font-size: 0.875rem;
      font-weight: 500;
      color: hsl(var(--av-muted-foreground, 220 9% 46%));
    }
  `;

  @property() src = '';
  @property() alt = '';
  @property() fallback = '';
  @state() private _imgError = false;

  render() {
    return html`
      <div part="avatar">
        ${this.src && !this._imgError
          ? html`<img
              src=${this.src}
              alt=${this.alt}
              part="image"
              @error=${() => {
                this._imgError = true;
              }}
            />`
          : html`<span part="fallback">${this.fallback}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-avatar': AcrAvatar;
  }
}
```

- [ ] **Step 4: Implement `acr-skeleton`**

`packages/web-components/src/components/simple/skeleton.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('acr-skeleton')
export class AcrSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-radius: 0.375rem;
      background: hsl(var(--av-muted, 220 13% 95%));
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-skeleton': AcrSkeleton;
  }
}
```

- [ ] **Step 5: Implement `acr-progress`**

`packages/web-components/src/components/simple/progress.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('acr-progress')
export class AcrProgress extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      height: 1rem;
      width: 100%;
      overflow: hidden;
      border-radius: 9999px;
    }
    .track {
      height: 100%;
      width: 100%;
      background: hsl(var(--av-input, 220 13% 91%));
      border-radius: 9999px;
      overflow: hidden;
    }
    .indicator {
      height: 100%;
      width: 100%;
      background: hsl(var(--av-primary, 213 94% 51%));
      transition: transform 0.3s ease;
    }
  `;

  @property({ type: Number }) value: number | null = null;

  render() {
    const transform =
      this.value != null ? `translateX(-${100 - this.value}%)` : undefined;
    return html`
      <div
        class="track"
        part="track"
        role="progressbar"
        aria-valuenow=${this.value ?? 0}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="indicator"
          part="indicator"
          style=${transform ? `transform: ${transform}` : ''}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'acr-progress': AcrProgress;
  }
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
pnpm test -- avatar skeleton progress
```

Expected: all pass.

- [ ] **Step 7: Append to simple-index.ts**

```typescript
export * from './components/simple/avatar';
export * from './components/simple/skeleton';
export * from './components/simple/progress';
```

- [ ] **Step 8: Commit**

```bash
git add packages/web-components/src/components/simple/ \
        packages/web-components/src/simple-index.ts \
        packages/web-components/test/simple/
git commit -m "feat(web-components): add acr-avatar, acr-skeleton, acr-progress"
```

---

### Task 7: TypeScript types and final `index.ts`

**Files:**

- Modify: `packages/web-components/src/index.ts`
- Create: `packages/web-components/src/vue.d.ts`
- Modify: `packages/web-components/package.json` (add vue.d.ts export)

- [ ] **Step 1: Finalise `index.ts`**

`packages/web-components/src/index.ts`:

```typescript
// Re-export all simple components (registers custom elements as side-effect)
export * from './simple-index';
```

- [ ] **Step 2: Create `src/vue.d.ts` for Vue 3 GlobalComponents augmentation**

Consumers using Vue 3 import this file to get `<acr-*>` autocomplete in templates.

`packages/web-components/src/vue.d.ts`:

```typescript
import type { AcrButton } from './components/simple/button';
import type { AcrBadge } from './components/simple/badge';
import type { AcrChip } from './components/simple/chip';
import type { AcrInput } from './components/simple/input';
import type { AcrTextarea } from './components/simple/textarea';
import type { AcrLabel } from './components/simple/label';
import type { AcrSeparator } from './components/simple/separator';
import type { AcrAvatar } from './components/simple/avatar';
import type { AcrSkeleton } from './components/simple/skeleton';
import type { AcrProgress } from './components/simple/progress';

declare module 'vue' {
  export interface GlobalComponents {
    AcrButton: AcrButton;
    AcrBadge: AcrBadge;
    AcrChip: AcrChip;
    AcrInput: AcrInput;
    AcrTextarea: AcrTextarea;
    AcrLabel: AcrLabel;
    AcrSeparator: AcrSeparator;
    AcrAvatar: AcrAvatar;
    AcrSkeleton: AcrSkeleton;
    AcrProgress: AcrProgress;
  }
}
```

- [ ] **Step 3: Add `vue.d.ts` export to `package.json`**

Add to the `exports` field in `packages/web-components/package.json`:

```json
"./vue": {
  "types": "./dist/vue.d.ts"
}
```

Vue consumers then add to their `tsconfig.json`:

```json
{ "compilerOptions": { "types": ["@acronis-platform/shadcn-uikit-wc/vue"] } }
```

- [ ] **Step 4: Run the full test suite**

```bash
pnpm test
```

Expected: all tests pass with 0 failures.

- [ ] **Step 5: Verify TypeScript**

```bash
pnpm type-check
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add packages/web-components/src/index.ts \
        packages/web-components/src/vue.d.ts \
        packages/web-components/package.json
git commit -m "feat(web-components): add TypeScript and Vue 3 type augmentations"
```

---

### Task 8: Build verification

- [ ] **Step 1: Build the package**

```bash
cd packages/web-components
pnpm build
```

Expected: `dist/` contains JS files for each component, `.d.ts` files, no errors.

- [ ] **Step 2: Verify dist output structure**

```bash
ls dist/components/simple/
```

Expected: `button.js`, `badge.js`, `chip.js`, `input.js`, `textarea.js`, `label.js`, `separator.js`, `avatar.js`, `skeleton.js`, `progress.js` + corresponding `.d.ts` files.

- [ ] **Step 3: Smoke test — manual HTML page**

Create `packages/web-components/test/smoke.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="../../ui/dist/tokens.css" />
  </head>
  <body>
    <acr-button variant="outline">Hello Web Components</acr-button>
    <acr-badge variant="success">Active</acr-badge>
    <acr-input placeholder="Type here..." style="width:200px"></acr-input>
    <acr-progress value="60" style="width:200px"></acr-progress>

    <script type="module" src="../dist/index.js"></script>
  </body>
</html>
```

Open with `npx serve packages/web-components` and verify components render correctly.

- [ ] **Step 4: Final commit**

```bash
git add packages/web-components/test/smoke.html
git commit -m "feat(web-components): verify build output with smoke test"
```
