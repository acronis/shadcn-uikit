# Feature: Tailwind CSS v4 Migration

## Objective

Migrate from Tailwind CSS v3 to v4 while maintaining pixel-identical visual output across all 320 visual regression snapshots.

## Behavior

### Shadow utility renames (visual parity)
- `shadow-sm` -> `shadow-xs` in card.tsx, auth-layout.tsx, select.tsx + 5 demo files
- bare `shadow` -> `shadow-sm` in slider.tsx, sidebar.tsx (2 occurrences)
- tailwind-reference.html updated accordingly

### Package changes
- tailwindcss ^3.4.1 -> ^4.2.2
- Add @tailwindcss/postcss ^4.2.2, @tailwindcss/cli ^4.2.2, tw-animate-css ^1.4.0
- Remove tailwindcss-animate, autoprefixer

### Config changes
- PostCSS configs switch to @tailwindcss/postcss
- tailwind.preset.js removes tailwindcss-animate plugin
- SCSS entry files replace @tailwind directives with @import + @config
- build-full-css.ts uses @tailwindcss/cli

## Files changed

- packages/ui/package.json, packages/demo/package.json
- packages/ui/postcss.config.js, packages/demo/postcss.config.js
- packages/ui/tailwind.preset.js
- packages/ui/src/styles/{index,full,base-only,components-only,utilities-only}.scss
- packages/demo/src/styles/index.scss
- packages/ui/scripts/build-full-css.ts
- packages/ui/src/components/ui/{card,auth-layout,select,slider,sidebar}.tsx
- packages/demo/src/components/{CardPlayground,TablePlayground,chat/ChatContainer}.tsx
- packages/demo/src/app/demo/cyberchat-flow/components/LoginPage.tsx
- packages/demo/src/app/demo/cyberchat/CyberChatHostDemo.tsx
- packages/ui/src/styles/tailwind-reference.html

## Verification

- [ ] `pnpm build` succeeds in packages/ui
- [ ] `pnpm type-check` passes
- [ ] grep confirms `slide-in-from-top-dialog-offset` resolves in built CSS
- [ ] grep confirms `:root` CSS custom properties present in built CSS
- [ ] No remaining v3 shadow-sm or bare shadow in component files

## Open questions

None — architecture document is complete.
