# @shadcn-uikit/demo

Interactive demo application showcasing the shadcn-uikit components and color schemes.

## Features

- **Multiple Color Schemes**: Six pre-configured themes including:
  - Default Light
  - Default Dark
  - Acronis Blue (brand color)
  - Acronis Orange (brand color)
  - Green
  - Purple

- **Component Showcase**: Demonstrates all available components:
  - Button variants and sizes
  - Card variants (default, elevated, outlined)
  - Input fields
  - Form examples

## Running the Demo

```bash
npm install
npm run dev
```

The demo will open in your browser at `http://localhost:3000`.

## Building for Production

```bash
npm run build
npm run preview
```

## Theme Customization

Themes are defined in `src/index.css` using CSS variables. Each theme can be customized by adjusting the HSL color values.

## Project Structure

```
demo/
├── src/
│   ├── App.tsx          # Main demo application
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles and themes
│   └── themes/          # Theme definitions
├── index.html
├── vite.config.ts
└── tailwind.config.js
```
