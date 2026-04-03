'use client';

import dynamic from 'next/dynamic';

export const SidebarFull = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/sidebar').then(
      (mod) => mod.SidebarFull
    ),
  { ssr: false }
);

export const SidebarWithSections = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/sidebar').then(
      (mod) => mod.SidebarWithSections
    ),
  { ssr: false }
);
