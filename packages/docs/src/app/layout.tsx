import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
