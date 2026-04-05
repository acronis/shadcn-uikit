'use client';
import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';

// Docs-local Toaster: wraps sonner directly (not the UIKit Toaster) so that
// toast() calls from transpiled demos and <Toaster> share the same module
// instance (same React 19 peer-dep hash). Also avoids the UIKit dist's
// hardcoded next-themes React-18 path which has no provider here.
export function Toaster() {
  const { theme = 'system' } = useTheme();
  return (
    <SonnerToaster
      theme={theme as 'light' | 'dark' | 'system'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:rounded-[4px] group-[.toaster]:shadow-sm group-[.toaster]:w-[384px]',
          description: 'group-[.toast]:text-foreground group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-primary group-[.toast]:font-semibold group-[.toast]:border-0',
          cancelButton:
            'group-[.toast]:bg-transparent group-[.toast]:text-foreground group-[.toast]:hover:bg-muted',
        },
      }}
    />
  );
}
