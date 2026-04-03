'use client';

import dynamic from 'next/dynamic';

export const DropdownMenuBasic = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/dropdown-menu').then(
      (mod) => mod.DropdownMenuBasic
    ),
  { ssr: false }
);

export const DropdownMenuWithCheckboxes = dynamic(
  () =>
    import('@acronis-platform/shadcn-uikit-demos/dropdown-menu').then(
      (mod) => mod.DropdownMenuWithCheckboxes
    ),
  { ssr: false }
);
