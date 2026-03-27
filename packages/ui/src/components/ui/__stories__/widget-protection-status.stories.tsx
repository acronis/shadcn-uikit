import type { Meta, StoryObj } from '@storybook/react-vite'
import { Shield, MoreVertical } from 'lucide-react'
import {
  WidgetProtectionStatus,
  WidgetProtectionStatusHeader,
  WidgetProtectionStatusTitle,
  WidgetProtectionStatusIcon,
  WidgetProtectionStatusContent,
  WidgetProtectionStatusIndicator,
  WidgetProtectionStatusValue,
  WidgetProtectionStatusLabel,
  WidgetProtectionStatusFooter,
} from '../widget-protection-status'

const meta = {
  title: 'UI/WidgetProtectionStatus',
  component: WidgetProtectionStatus,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetProtectionStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Success_: Story = {
  name: 'Success',
  render: () => (
    <WidgetProtectionStatus className="w-[240px]">
      <WidgetProtectionStatusHeader>
        <WidgetProtectionStatusIcon><Shield /></WidgetProtectionStatusIcon>
        <WidgetProtectionStatusTitle>Protected Devices</WidgetProtectionStatusTitle>
        <MoreVertical className="h-4 w-4 ml-auto text-muted-foreground" />
      </WidgetProtectionStatusHeader>
      <WidgetProtectionStatusContent>
        <WidgetProtectionStatusIndicator status="success">
          <WidgetProtectionStatusValue>1,284</WidgetProtectionStatusValue>
        </WidgetProtectionStatusIndicator>
        <WidgetProtectionStatusLabel>All devices protected</WidgetProtectionStatusLabel>
      </WidgetProtectionStatusContent>
    </WidgetProtectionStatus>
  ),
}

export const Warning_: Story = {
  name: 'Warning',
  render: () => (
    <WidgetProtectionStatus className="w-[240px]">
      <WidgetProtectionStatusHeader>
        <WidgetProtectionStatusIcon><Shield /></WidgetProtectionStatusIcon>
        <WidgetProtectionStatusTitle>At Risk</WidgetProtectionStatusTitle>
        <MoreVertical className="h-4 w-4 ml-auto text-muted-foreground" />
      </WidgetProtectionStatusHeader>
      <WidgetProtectionStatusContent>
        <WidgetProtectionStatusIndicator status="warning">
          <WidgetProtectionStatusValue>42</WidgetProtectionStatusValue>
        </WidgetProtectionStatusIndicator>
        <WidgetProtectionStatusLabel>Devices need attention</WidgetProtectionStatusLabel>
      </WidgetProtectionStatusContent>
    </WidgetProtectionStatus>
  ),
}

export const Danger_: Story = {
  name: 'Danger',
  render: () => (
    <WidgetProtectionStatus className="w-[240px]">
      <WidgetProtectionStatusHeader>
        <WidgetProtectionStatusIcon><Shield /></WidgetProtectionStatusIcon>
        <WidgetProtectionStatusTitle>Failed Backups</WidgetProtectionStatusTitle>
        <MoreVertical className="h-4 w-4 ml-auto text-muted-foreground" />
      </WidgetProtectionStatusHeader>
      <WidgetProtectionStatusContent>
        <WidgetProtectionStatusIndicator status="danger">
          <WidgetProtectionStatusValue>17</WidgetProtectionStatusValue>
        </WidgetProtectionStatusIndicator>
        <WidgetProtectionStatusLabel>Backups failed today</WidgetProtectionStatusLabel>
      </WidgetProtectionStatusContent>
      <WidgetProtectionStatusFooter>Last checked: 5 min ago</WidgetProtectionStatusFooter>
    </WidgetProtectionStatus>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {(['success', 'warning', 'critical', 'danger', 'info', 'neutral'] as const).map((status) => (
        <WidgetProtectionStatus key={status} className="w-[200px]">
          <WidgetProtectionStatusHeader>
            <WidgetProtectionStatusIcon><Shield /></WidgetProtectionStatusIcon>
            <WidgetProtectionStatusTitle className="capitalize">{status}</WidgetProtectionStatusTitle>
          </WidgetProtectionStatusHeader>
          <WidgetProtectionStatusContent>
            <WidgetProtectionStatusIndicator status={status}>
              <WidgetProtectionStatusValue>128</WidgetProtectionStatusValue>
            </WidgetProtectionStatusIndicator>
            <WidgetProtectionStatusLabel>Devices</WidgetProtectionStatusLabel>
          </WidgetProtectionStatusContent>
        </WidgetProtectionStatus>
      ))}
    </div>
  ),
}
