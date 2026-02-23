import * as React from 'react'
import { WidgetAll } from '@/demos/widget'
import { DemoWithCode } from './DemoWithCode'

import widgetAllCode from '../demos/widget/WidgetAll.tsx?raw'

export function WidgetDemo() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Widgets</h2>
        <p className="text-muted-foreground">
          Chart widgets, progress indicators, alerts, data tables, and text metrics for dashboards
        </p>
      </div>

      <DemoWithCode
        title="All Widget Types"
        description="Comprehensive widget showcase including Bar Chart, Line Chart, Donut Chart, Stacked Area, Treemap, Progress Tiers, Progress Chunks, Alerts, Protection Status, Protection Summary, Table Data, Text Metrics, and Placeholders."
        code={widgetAllCode}
      >
        <WidgetAll />
      </DemoWithCode>
    </div>
  );
}
