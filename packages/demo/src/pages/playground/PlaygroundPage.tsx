import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePlaygroundStore } from '@/store/playground/playgroundStore.ts'
import { applyTokenSet } from '@/lib/playground/cssVariables.ts'
import { ThemeMode } from '@/types/playground/index.ts'
import { ThemeSwitcher } from '@/components/playground/ThemeSwitcher.tsx'
import { TokenSelector } from '@/components/playground/TokenSelector.tsx'
import { TokenEditor } from '@/components/playground/TokenEditor.tsx'
import { ComponentShowcase } from '@/components/playground/ComponentShowcase.tsx'
import { Button } from '@acronis-platform/shadcn-uikit/react'

const PlaygroundPage: React.FC = () => {
  const { theme, activeTokenSetId, tokenSets, customTokenSet } = usePlaygroundStore()

  useEffect(() => {
    const activeTokenSet = customTokenSet || tokenSets[activeTokenSetId]
    if (activeTokenSet) {
      const effectiveTheme =
        theme.mode === ThemeMode.SYSTEM
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ThemeMode.DARK
            : ThemeMode.LIGHT
          : theme.mode
      applyTokenSet(activeTokenSet, effectiveTheme)
    }
  }, [theme, activeTokenSetId, tokenSets, customTokenSet])

  return (
    <div className="playground-page min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Components
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold">Theme Playground</h1>
                <p className="text-xs text-muted-foreground">
                  Customize and preview your design tokens
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TokenSelector />
              <ThemeSwitcher showLabel />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
          <section className="border-r border-border bg-background p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Token Editor</h2>
                <p className="text-sm text-muted-foreground">
                  Customize colors, radius, and other design tokens. Changes apply in real-time.
                </p>
              </div>

              <TokenEditor />
            </div>
          </section>

          <section className="bg-muted/30 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Component Preview</h2>
                <p className="text-sm text-muted-foreground">
                  See how your tokens affect all components in real-time
                </p>
              </div>

              <ComponentShowcase />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export { PlaygroundPage }
