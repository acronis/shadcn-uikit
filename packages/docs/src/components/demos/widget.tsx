'use client';

import dynamic from 'next/dynamic';

export const WidgetBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/widget').then(
      (mod) => mod.WidgetBasic
    ),
  { ssr: false }
);

export const WidgetSizes = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/widget').then(
      (mod) => mod.WidgetSizes
    ),
  { ssr: false }
);
