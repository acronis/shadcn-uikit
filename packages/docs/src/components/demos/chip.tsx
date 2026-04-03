'use client';

import dynamic from 'next/dynamic';

export const ChipBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/chip').then(
      (mod) => mod.ChipBasic
    ),
  { ssr: false }
);

export const ChipRemovable = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/chip').then(
      (mod) => mod.ChipRemovable
    ),
  { ssr: false }
);
