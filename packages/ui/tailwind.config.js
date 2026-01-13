/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    '../demo-app/src/**/*.{js,jsx,ts,tsx,vue}', // Include demo-app for dev mode
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
        '3xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1920px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--semantic-bg-base))',
        foreground: 'hsl(var(--semantic-text-primary))',
        primary: {
          DEFAULT: 'hsl(var(--semantic-bg-brand))',
          foreground: 'hsl(var(--semantic-text-inverse))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--semantic-bg-elevated))',
          foreground: 'hsl(var(--semantic-text-primary))',
        },
        muted: {
          DEFAULT: 'hsl(var(--semantic-bg-muted))',
          foreground: 'hsl(var(--semantic-text-secondary))',
        },
        accent: {
          DEFAULT: 'hsl(var(--semantic-bg-brand))',
          foreground: 'hsl(var(--semantic-text-inverse))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--semantic-status-danger))',
          foreground: 'hsl(var(--semantic-text-inverse))',
          light: 'hsl(var(--semantic-status-danger-bg))',
          accent: 'hsl(var(--semantic-status-danger))',
        },
        danger: {
          DEFAULT: 'hsl(var(--semantic-status-danger-bg))',
          foreground: 'hsl(var(--semantic-status-danger-text))',
          accent: 'hsl(var(--semantic-status-danger))',
        },
        success: {
          DEFAULT: 'hsl(var(--semantic-status-success-bg))',
          foreground: 'hsl(var(--semantic-status-success-text))',
          accent: 'hsl(var(--semantic-status-success))',
        },
        warning: {
          DEFAULT: 'hsl(var(--semantic-status-warning-bg))',
          foreground: 'hsl(var(--semantic-status-warning-text))',
          accent: 'hsl(var(--semantic-status-warning))',
        },
        info: {
          DEFAULT: 'hsl(var(--semantic-status-info-bg))',
          foreground: 'hsl(var(--semantic-status-info-text))',
          accent: 'hsl(var(--semantic-status-info))',
        },
        critical: {
          DEFAULT: 'hsl(var(--semantic-status-critical-bg))',
          foreground: 'hsl(var(--semantic-status-critical-text))',
          accent: 'hsl(var(--semantic-status-critical))',
        },
        neutral: {
          DEFAULT: 'hsl(var(--semantic-status-neutral-bg))',
          foreground: 'hsl(var(--semantic-status-neutral-text))',
          accent: 'hsl(var(--semantic-status-neutral))',
        },
        ai: {
          DEFAULT: 'hsl(var(--semantic-status-ai-bg))',
          foreground: 'hsl(var(--semantic-status-ai-text))',
          accent: 'hsl(var(--semantic-status-ai))',
        },
        popover: {
          DEFAULT: 'hsl(var(--semantic-bg-elevated))',
          foreground: 'hsl(var(--semantic-text-primary))',
        },
        tooltip: {
          DEFAULT: 'hsl(var(--semantic-bg-overlay))',
          foreground: 'hsl(var(--semantic-text-inverse))',
        },
        card: {
          DEFAULT: 'hsl(var(--semantic-bg-elevated))',
          foreground: 'hsl(var(--semantic-text-primary))',
        },
        border: 'hsl(var(--semantic-border-default))',
        input: 'hsl(var(--semantic-border-default))',
        ring: 'hsl(var(--semantic-interactive-focus))',
        // '--chart-1': 'oklch(0.646 0.222 41.116)',
        // '--chart-2': 'oklch(0.6 0.118 184.704)',
        // '--chart-3': 'oklch(0.398 0.07 227.392)',
        // '--chart-4': 'oklch(0.828 0.189 84.429)',
        // '--chart-5': 'oklch(0.769 0.188 70.08)',
        sidebar: {
          DEFAULT: 'hsl(var(--semantic-nav-bg))',
          foreground: 'hsl(var(--semantic-nav-text))',
          primary: 'hsl(var(--semantic-nav-bg))',
          'primary-foreground': 'hsl(var(--semantic-text-inverse))',
          accent: 'hsl(var(--semantic-nav-active))',
          'accent-foreground': 'hsl(var(--semantic-text-inverse))',
          border: 'hsl(var(--semantic-nav-bg))',
          ring: 'hsl(var(--semantic-bg-brand))',
        },
      },
      borderRadius: {
        lg: 'var(--semantic-radius)',
        md: 'calc(var(--semantic-radius) - 2px)',
        sm: 'calc(var(--semantic-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
