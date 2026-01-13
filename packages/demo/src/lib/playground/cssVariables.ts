import { TokenSet, ThemeMode, ColorPalette } from '@/types/playground/index.ts'
import { getCssVarToPaletteMap } from './themeConfig'

/**
 * Apply token set CSS variables to the document
 */
export function applyTokenSet(tokenSet: TokenSet, theme: ThemeMode): void {
  const root = document.documentElement
  const palette = theme === ThemeMode.DARK ? tokenSet.dark : tokenSet.light

  // Apply color variables
  applyColorPalette(root, palette)

  // Apply radius variables
  applyRadiusVariables(root, tokenSet.radius)
}

/**
 * Apply color palette CSS variables
 * Uses the single source of truth from themeConfig.ts
 */
function applyColorPalette(root: HTMLElement, palette: ColorPalette): void {
  // Get mapping from single source of truth
  const colorMap = getCssVarToPaletteMap()

  Object.entries(colorMap).forEach(([cssVar, paletteKey]) => {
    const colorToken = palette[paletteKey as keyof ColorPalette]
    if (colorToken) {
      root.style.setProperty(cssVar, colorToken.css)
    }
  })
}

/**
 * Apply radius CSS variables
 */
function applyRadiusVariables(root: HTMLElement, radius: TokenSet['radius']): void {
  root.style.setProperty('--av-radius', radius.lg)
  root.style.setProperty('--av-radius-sm', radius.sm)
  root.style.setProperty('--av-radius-md', radius.md)
  root.style.setProperty('--av-radius-lg', radius.lg)
  root.style.setProperty('--av-radius-xl', radius.xl)
  root.style.setProperty('--av-radius-2xl', radius['2xl'])
  root.style.setProperty('--av-radius-full', radius.full)
}

/**
 * Remove all playground CSS variables
 */
export function removeTokenSet(): void {
  const root = document.documentElement
  const variablesToRemove = [
    '--av-background',
    '--av-foreground',
    '--av-card',
    '--av-card-foreground',
    '--av-popover',
    '--av-popover-foreground',
    '--av-primary',
    '--av-primary-foreground',
    '--av-secondary',
    '--av-secondary-foreground',
    '--av-muted',
    '--av-muted-foreground',
    '--av-accent',
    '--av-accent-foreground',
    '--av-destructive',
    '--av-destructive-foreground',
    '--av-border',
    '--av-input',
    '--av-ring',
    '--av-radius',
    '--av-radius-sm',
    '--av-radius-md',
    '--av-radius-lg',
    '--av-radius-xl',
    '--av-radius-2xl',
    '--av-radius-full',
  ]

  variablesToRemove.forEach((variable) => {
    root.style.removeProperty(variable)
  })
}

/**
 * Get computed token values from the document
 */
export function getComputedTokenValues(): Record<string, string> {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)
  const values: Record<string, string> = {}

  const variables = [
    '--av-background',
    '--av-foreground',
    '--av-card',
    '--av-card-foreground',
    '--av-popover',
    '--av-popover-foreground',
    '--av-primary',
    '--av-primary-foreground',
    '--av-secondary',
    '--av-secondary-foreground',
    '--av-muted',
    '--av-muted-foreground',
    '--av-accent',
    '--av-accent-foreground',
    '--av-destructive',
    '--av-destructive-foreground',
    '--av-border',
    '--av-input',
    '--av-ring',
    '--av-radius',
  ]

  variables.forEach((variable) => {
    const value = computedStyle.getPropertyValue(variable).trim()
    if (value) {
      values[variable] = value
    }
  })

  return values
}
