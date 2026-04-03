'use client';

import dynamic from 'next/dynamic';

// Lazy-load to avoid SSR failure from react-router-dom dependency in the barrel
export const NavigationMenuSimple = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/navigation-menu').then(
      (mod) => mod.NavigationMenuSimple
    ),
  { ssr: false }
);
