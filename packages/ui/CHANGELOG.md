## [0.31.0](https://github.com/acronis/shadcn-uikit/compare/v0.30.1...v0.31.0) (2026-03-31)


### Features

* refactor components to use base UI library and improve accessibility ([b766cc8](https://github.com/acronis/shadcn-uikit/commit/b766cc891035ac30626b69e2cd63b9527a842f6c))

## [0.30.1](https://github.com/acronis/shadcn-uikit/compare/v0.30.0...v0.30.1) (2026-03-30)


### Bug Fixes

* **theme:** regenerate white-label from ui-syntax-tokens, add generator script ([dfa59eb](https://github.com/acronis/shadcn-uikit/commit/dfa59eb7e58cda9b62484683a68b8e563c6aa902))

## [0.30.0](https://github.com/acronis/shadcn-uikit/compare/v0.29.0...v0.30.0) (2026-03-30)


### Features

* add categories.json generation for organized icon categorization ([ae8a021](https://github.com/acronis/shadcn-uikit/commit/ae8a02154c528e5e060a321ac266c9767282bbe4))
* add icon generation script and update package.json ([a9550f4](https://github.com/acronis/shadcn-uikit/commit/a9550f4840abf35fafb6d970859142e0b1f9cc00))
* add new SVG icons for various UI elements ([aae10a5](https://github.com/acronis/shadcn-uikit/commit/aae10a552ea2bac6fec1fe65e01960d19345a8c6))
* add script to generate Storybook stories for icons by category ([efc62ae](https://github.com/acronis/shadcn-uikit/commit/efc62ae976619eb9aaca7d158fb0d68156bf4021))
* add Storybook stories for various icons and update auto-generated file timestamp ([b232b15](https://github.com/acronis/shadcn-uikit/commit/b232b158d573acb47dc6cd8968564698bdec11ee))
* add visual regression for icons ([9cdb260](https://github.com/acronis/shadcn-uikit/commit/9cdb2605da8302f3e79dc9119553e05d98469712))
* update BaseIcon component to accept dynamic viewBox prop and clean up legacy exports ([3ac9240](https://github.com/acronis/shadcn-uikit/commit/3ac9240da9e3d084da91baa8e2aa95ec96b1a0b8))


### Bug Fixes

* **icons:** remove stale icon story files during regeneration ([0c13c07](https://github.com/acronis/shadcn-uikit/commit/0c13c072016a1488b3ac50ae02ea0df69887ca05))

## [0.29.0](https://github.com/acronis/shadcn-uikit/compare/v0.28.0...v0.29.0) (2026-03-28)


### Features

* **accordion:** migrate to Base UI primitive ([9607741](https://github.com/acronis/shadcn-uikit/commit/96077410bf8d66ef04932cd7ae0cb71545d4caf4))
* add dropdown menu story with user interaction and enhance screenshot handling for menu overlays ([adf4253](https://github.com/acronis/shadcn-uikit/commit/adf4253811bee5bfed0fbe7b23b47f2f2116f5c6))
* add Open drawer story with user interaction for testing ([fc973b5](https://github.com/acronis/shadcn-uikit/commit/fc973b5be567748cbee6205645b659ecb42eb0ce))
* add storybook snapshots for various UI components ([e858706](https://github.com/acronis/shadcn-uikit/commit/e858706afedee1d034236dd08e61ae7b6a700f43))
* add storybook stories for various UI components including PageContent, AspectRatio, and VisuallyHidden ([721fcc0](https://github.com/acronis/shadcn-uikit/commit/721fcc0cf2aa56dcfe25b7df04de8a21b51bc486))
* **alert-dialog:** migrate to Base UI primitive ([d5ab30d](https://github.com/acronis/shadcn-uikit/commit/d5ab30d08f9a469cdb58471148dcf71a1e46bf1f))
* **collapsible:** migrate to Base UI primitive ([199bd47](https://github.com/acronis/shadcn-uikit/commit/199bd47bc0b229e7f7096ab0e52fddba51817a4e))
* **combobox:** rename ExampleCombobox to Combobox for consistency ([40c21df](https://github.com/acronis/shadcn-uikit/commit/40c21df18dedd44a895d1dfdef105eb4f5074511))
* **dialog:** migrate to Base UI primitive, fix command.tsx type import ([684b6b4](https://github.com/acronis/shadcn-uikit/commit/684b6b4b0ba28ecf4c34e356ef287ec0a9df143d))
* **dropdown-menu:** migrate to Base UI Menu primitive ([272703c](https://github.com/acronis/shadcn-uikit/commit/272703c2fea1bf0a9034fd25698bc110eaddcb11))
* enhance accordion component with improved accessibility and styling ([1653bae](https://github.com/acronis/shadcn-uikit/commit/1653bae03b10ffe5f43feb92faa090c50232b179))
* enhance Empty and Field stories with structured components and improved layout ([ac15e73](https://github.com/acronis/shadcn-uikit/commit/ac15e73479ae44ad4668e59f68c0e29485921e5b))
* enhance progress component with improved styling and indeterminate state handling ([7455779](https://github.com/acronis/shadcn-uikit/commit/7455779964cb5820c2a026c2980df6652d6866c8))
* enhance toast component stories with interactive play functions and multiple toast examples ([11d6a5d](https://github.com/acronis/shadcn-uikit/commit/11d6a5dcd69a1689d7f3b681b79224e179037120))
* normalize slider values to arrays for consistent thumb rendering ([63b0598](https://github.com/acronis/shadcn-uikit/commit/63b0598527e87e860314789e50b0c0db0e6d315e))
* **number-field:** add new NumberField component using Base UI primitive ([a71292d](https://github.com/acronis/shadcn-uikit/commit/a71292d689cccfb14abe29e3f25a89373fa59c08))
* **popover:** migrate to Base UI primitive ([e27f514](https://github.com/acronis/shadcn-uikit/commit/e27f514018543b52ff8822bd7cccb06558e1d4e1))
* **progress:** migrate to Base UI primitive ([75b7f67](https://github.com/acronis/shadcn-uikit/commit/75b7f6735132fcdb36d95ee9702c332fe5965a4d))
* refactor accordion and collapsible components for improved styling and API consistency ([4f9ba1f](https://github.com/acronis/shadcn-uikit/commit/4f9ba1fd3bb1656e28534f3aa3bc134c3467ca86))
* refactor Alert and Chip stories to use structured components and improve layout ([605e45c](https://github.com/acronis/shadcn-uikit/commit/605e45ccac34c4674d7bd972c607be1778a6a25c))
* **scroll-area:** migrate to Base UI primitive ([dada4e9](https://github.com/acronis/shadcn-uikit/commit/dada4e967d099b1bc234790a85af521c5974ba5f))
* **select:** consolidate base-select.tsx, migrate to Base UI primitive ([41df470](https://github.com/acronis/shadcn-uikit/commit/41df470c999dff75ff240f5bc5c8e38f2645eefb))
* **separator:** migrate to Base UI primitive ([2956f1b](https://github.com/acronis/shadcn-uikit/commit/2956f1b06a70f1eb6b000d04dba11d693083359b))
* **sheet:** migrate to Base UI Dialog primitive ([de091ea](https://github.com/acronis/shadcn-uikit/commit/de091ea7ff64be1187a9b0e9baeb5f88bdb5c177))
* **slider:** add new Slider component using Base UI primitive ([d1e352a](https://github.com/acronis/shadcn-uikit/commit/d1e352a013ec08bbf8cf3a1c1d8868719440f3cb))
* **switch:** migrate to Base UI primitive ([e4fe746](https://github.com/acronis/shadcn-uikit/commit/e4fe74697de04e49a2184b05b2cd45e345ce62c6))
* **tabs:** migrate to Base UI primitive ([9d9748a](https://github.com/acronis/shadcn-uikit/commit/9d9748a256e6862e92c203d229a438e1dab4ffb8))
* **toggle-group:** add new ToggleGroup component using Base UI primitive ([553351e](https://github.com/acronis/shadcn-uikit/commit/553351ee43d13f761ebb1ed74b4710f92e080130))
* **tooltip:** migrate to Base UI primitive ([f68a269](https://github.com/acronis/shadcn-uikit/commit/f68a2695d7eaebfb3830c7f3d60a694013260827))
* update peer dependencies to support React 19.x ([a4f5955](https://github.com/acronis/shadcn-uikit/commit/a4f595591118945e687d892853538ffffc829d1c))
* update peer dependencies to support React 19.x ([29b4519](https://github.com/acronis/shadcn-uikit/commit/29b4519297c1ebdd27351fa1c14c8f2d8ddca12c))
* update Progress component styling and improve indicator animation ([b912795](https://github.com/acronis/shadcn-uikit/commit/b912795bdafa5c056093a3d4de227e0d90465b42))
* update screenshot logic for toast notifications and adjust Toaster positioning in stories ([ff32163](https://github.com/acronis/shadcn-uikit/commit/ff32163d78d9ff31a65e0c5e959c695606ec758e))


### Bug Fixes

* address Docker visual regression setup review issues ([d2809ac](https://github.com/acronis/shadcn-uikit/commit/d2809ac8a5ab10cdc20e53bf65a3f59e7f969fc0))
* **checkbox:** support Radix-style checked="indeterminate" API with Base UI ([e879db3](https://github.com/acronis/shadcn-uikit/commit/e879db3849125613535921e3f4edfef84cffdcb6))
* **drawer:** replace DrawerTrigger asChild with Button asChild to avoid nested buttons ([51aeaca](https://github.com/acronis/shadcn-uikit/commit/51aeacae7848cd14d02d0139516257099a2e5356))
* enhance screenshot capture with padding for better component visibility ([8896244](https://github.com/acronis/shadcn-uikit/commit/8896244a65b8540529a7747ff219846754698cdb))
* improve screenshot handling for dialog overlays and update test dependencies ([b2e108a](https://github.com/acronis/shadcn-uikit/commit/b2e108a43c090ed21845171cba659ff582877b01))
* **stories:** wrap Sidebar story in SidebarProvider, regenerate snapshot ([b8da410](https://github.com/acronis/shadcn-uikit/commit/b8da4101fd76302dcf33a508a773823bc2aad485))
* **tabs:** export Tabs.Root as Tabs component (not namespace object) ([6fb85ab](https://github.com/acronis/shadcn-uikit/commit/6fb85ab5369e588686a7d4603ea1fd2363842449))
* update @storybook/test dependency to version 8.6.18 and clean up imports in test-runner ([5619327](https://github.com/acronis/shadcn-uikit/commit/561932773d5b74f9bae14d4120b9c5a7a604b0ce))
* update checkbox component layout for improved alignment ([a43de6c](https://github.com/acronis/shadcn-uikit/commit/a43de6c6691791846c2feb44baf689fde6b76e48))
* update data attribute syntax for consistency across components ([d5d846e](https://github.com/acronis/shadcn-uikit/commit/d5d846ed5ac11c8314c7b58f15b20da3ab88f039))
* update switch snapshots ([db74af2](https://github.com/acronis/shadcn-uikit/commit/db74af2570555d70885f3b873a1d985658a46012))

## [0.28.0](https://github.com/acronis/shadcn-uikit/compare/v0.27.0...v0.28.0) (2026-03-27)


### Features

* **ADP-49599:** simplified theme logic, removed applyNavVariant ([14320b5](https://github.com/acronis/shadcn-uikit/commit/14320b552b57dd3e4a5680e635ea42aa04271eea))
* **ADP-49599:** updated applyTheme and applyNavVariant to work with shadow root ([c5500cf](https://github.com/acronis/shadcn-uikit/commit/c5500cf4d7868e6d37c560258bfc9ab5b6446500))

