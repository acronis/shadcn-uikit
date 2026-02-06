import * as React from 'react'
import {
  BadgeStatusVariants,
  BadgeDefaultVariants,
  BadgeSmall,
  BadgeWithIcons,
  BadgeStatusIndicators,
  BadgeNotificationCounts,
} from '@/demos/badge'
import { DemoWithCode } from './DemoWithCode'

// Import actual source code files as raw strings
import badgeStatusVariantsCode from '../demos/badge/BadgeStatusVariants.tsx?raw'
import badgeDefaultVariantsCode from '../demos/badge/BadgeDefaultVariants.tsx?raw'
import badgeSmallCode from '../demos/badge/BadgeSmall.tsx?raw'
import badgeWithIconsCode from '../demos/badge/BadgeWithIcons.tsx?raw'
import badgeStatusIndicatorsCode from '../demos/badge/BadgeStatusIndicators.tsx?raw'
import badgeNotificationCountsCode from '../demos/badge/BadgeNotificationCounts.tsx?raw'

export function BadgeDemo() {
  return (
    <section className="demo-section">
      <h2>Badge Component</h2>
      <p className="demo-description mb-8 text-muted-foreground">
        Displays a badge or a component that looks like a badge for status indicators, labels, and
        tags.
      </p>

      <div className="space-y-8">
        <DemoWithCode
          title="Status Variants"
          description="Different badge variants for various status types."
          code={badgeStatusVariantsCode}
        >
          <BadgeStatusVariants />
        </DemoWithCode>

        <DemoWithCode
          title="Default Variants"
          description="Standard badge variants."
          code={badgeDefaultVariantsCode}
        >
          <BadgeDefaultVariants />
        </DemoWithCode>

        <DemoWithCode
          title="Small Badges"
          description="Compact badges with smaller text."
          code={badgeSmallCode}
        >
          <BadgeSmall />
        </DemoWithCode>

        <DemoWithCode
          title="With Icons"
          description="Badges with icon elements."
          code={badgeWithIconsCode}
        >
          <BadgeWithIcons />
        </DemoWithCode>

        <DemoWithCode
          title="Status Indicators"
          description="Badges used as status indicators in lists."
          code={badgeStatusIndicatorsCode}
        >
          <BadgeStatusIndicators />
        </DemoWithCode>

        <DemoWithCode
          title="Notification Counts"
          description="Badges showing notification counts."
          code={badgeNotificationCountsCode}
        >
          <BadgeNotificationCounts />
        </DemoWithCode>
      </div>
    </section>
  )
}
