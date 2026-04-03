'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR failure from missing-icons in barrel exports
export const ButtonGroupBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/button-group').then(
      (mod) => mod.ButtonGroupBasic
    ),
  { ssr: false }
);

export const ButtonGroupSizes = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/button-group').then(
      (mod) => mod.ButtonGroupSizes
    ),
  { ssr: false }
);

export const ButtonGroupVertical = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/button-group').then(
      (mod) => mod.ButtonGroupVertical
    ),
  { ssr: false }
);
