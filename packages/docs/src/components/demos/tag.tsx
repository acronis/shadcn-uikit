'use client';

import dynamic from 'next/dynamic';

export const TagDefault = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/tag').then(
      (mod) => mod.TagDefault
    ),
  { ssr: false }
);

export const TagWithIcons = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/tag').then(
      (mod) => mod.TagWithIcons
    ),
  { ssr: false }
);
