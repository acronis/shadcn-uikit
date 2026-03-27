import type { Meta, StoryObj } from '@storybook/react-vite'
import { TrendingUp, MoreVertical } from 'lucide-react'
import {
  WidgetProgressTiers,
  WidgetProgressTiersHeader,
  WidgetProgressTiersTitle,
  WidgetProgressTiersIcon,
  WidgetProgressTiersBar,
  WidgetProgressTiersLegend,
  WidgetProgressTiersLegendItem,
  WidgetProgressTiersFooter,
} from '../widget-progress-tiers'

const meta = {
  title: 'UI/WidgetProgressTiers',
  component: WidgetProgressTiers,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetProgressTiers>

export default meta
type Story = StoryObj<typeof meta>

const tiers = [
  { label: 'Success', value: 620, color: 'var(--av-chart-success, #4caf50)' },
  { label: 'Warning', value: 180, color: 'var(--av-chart-warning, #ff9800)' },
  { label: 'Critical', value: 120, color: 'var(--av-chart-critical, #e91e63)' },
  { label: 'Danger', value: 80, color: 'var(--av-chart-danger, #f44336)' },
]

export const Default: Story = {
  render: () => (
    <WidgetProgressTiers className="w-[360px]">
      <WidgetProgressTiersHeader>
        <WidgetProgressTiersIcon><TrendingUp /></WidgetProgressTiersIcon>
        <WidgetProgressTiersTitle>Backup Status</WidgetProgressTiersTitle>
        <MoreVertical className="h-4 w-4 ml-auto text-muted-foreground" />
      </WidgetProgressTiersHeader>
      <WidgetProgressTiersBar tiers={tiers} />
      <WidgetProgressTiersLegend>
        {tiers.map((t) => (
          <WidgetProgressTiersLegendItem key={t.label} color={t.color} label={t.label} value={t.value} />
        ))}
      </WidgetProgressTiersLegend>
    </WidgetProgressTiers>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <WidgetProgressTiers className="w-[360px]">
      <WidgetProgressTiersHeader>
        <WidgetProgressTiersIcon><TrendingUp /></WidgetProgressTiersIcon>
        <WidgetProgressTiersTitle>Protection Coverage</WidgetProgressTiersTitle>
      </WidgetProgressTiersHeader>
      <WidgetProgressTiersBar tiers={tiers} />
      <WidgetProgressTiersLegend>
        {tiers.map((t) => (
          <WidgetProgressTiersLegendItem key={t.label} color={t.color} label={t.label} value={t.value} />
        ))}
      </WidgetProgressTiersLegend>
      <WidgetProgressTiersFooter>
        Total: {tiers.reduce((acc, t) => acc + t.value, 0)} devices
      </WidgetProgressTiersFooter>
    </WidgetProgressTiers>
  ),
}

export const TwoTiers: Story = {
  render: () => (
    <WidgetProgressTiers className="w-[360px]">
      <WidgetProgressTiersHeader>
        <WidgetProgressTiersIcon><TrendingUp /></WidgetProgressTiersIcon>
        <WidgetProgressTiersTitle>License Usage</WidgetProgressTiersTitle>
      </WidgetProgressTiersHeader>
      <WidgetProgressTiersBar tiers={[
        { label: 'Used', value: 75, color: 'var(--av-chart-success, #4caf50)' },
        { label: 'Available', value: 25, color: 'var(--av-brand-light, #e0e0e0)' },
      ]} />
      <WidgetProgressTiersLegend>
        <WidgetProgressTiersLegendItem color="var(--av-chart-success, #4caf50)" label="Used" value="75%" />
        <WidgetProgressTiersLegendItem color="var(--av-brand-light, #e0e0e0)" label="Available" value="25%" />
      </WidgetProgressTiersLegend>
    </WidgetProgressTiers>
  ),
}

export const Interactive: Story = {
  render: () => (
    <WidgetProgressTiers interactive className="w-[360px]">
      <WidgetProgressTiersHeader>
        <WidgetProgressTiersIcon><TrendingUp /></WidgetProgressTiersIcon>
        <WidgetProgressTiersTitle>Click for details</WidgetProgressTiersTitle>
      </WidgetProgressTiersHeader>
      <WidgetProgressTiersBar tiers={tiers} />
      <WidgetProgressTiersLegend>
        {tiers.map((t) => (
          <WidgetProgressTiersLegendItem key={t.label} color={t.color} label={t.label} value={t.value} />
        ))}
      </WidgetProgressTiersLegend>
    </WidgetProgressTiers>
  ),
}
