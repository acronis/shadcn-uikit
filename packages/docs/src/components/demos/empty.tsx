'use client';

import dynamic from 'next/dynamic';

export const EmptyBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/empty').then(
      (mod) => mod.EmptyBasic
    ),
  { ssr: false }
);

export const EmptyWithAction = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/empty').then(
      (mod) => mod.EmptyWithAction
    ),
  { ssr: false }
);
