'use client';

import dynamic from 'next/dynamic';

export const SecondaryMenuBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/secondary-menu').then(
      (mod) => mod.SecondaryMenuBasic
    ),
  { ssr: false }
);

export const SecondaryMenuWithIcons = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/secondary-menu').then(
      (mod) => mod.SecondaryMenuWithIcons
    ),
  { ssr: false }
);
