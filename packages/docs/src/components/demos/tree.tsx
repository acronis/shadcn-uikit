'use client';

import dynamic from 'next/dynamic';

export const TreeBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/tree').then(
      (mod) => mod.TreeBasic
    ),
  { ssr: false }
);

export const TreeFileSystem = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/tree').then(
      (mod) => mod.TreeFileSystem
    ),
  { ssr: false }
);
