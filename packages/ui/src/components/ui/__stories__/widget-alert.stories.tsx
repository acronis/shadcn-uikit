import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info, CheckCircle, AlertTriangle, XCircle, MoreVertical } from 'lucide-react'
import {
  WidgetAlert,
  WidgetAlertIcon,
  WidgetAlertContent,
  WidgetAlertTitle,
  WidgetAlertDate,
  WidgetAlertDescription,
  WidgetAlertActions,
} from '../widget-alert'

const meta = {
  title: 'UI/WidgetAlert',
  component: WidgetAlert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Info_: Story = {
  name: 'Info',
  render: () => (
    <WidgetAlert variant="info" className="w-[420px]">
      <WidgetAlertIcon><Info /></WidgetAlertIcon>
      <WidgetAlertContent>
        <WidgetAlertTitle>Backup completed</WidgetAlertTitle>
        <WidgetAlertDate>Today, 10:32 AM</WidgetAlertDate>
      </WidgetAlertContent>
      <WidgetAlertActions><MoreVertical /></WidgetAlertActions>
    </WidgetAlert>
  ),
}

export const Success_: Story = {
  name: 'Success',
  render: () => (
    <WidgetAlert variant="success" className="w-[420px]">
      <WidgetAlertIcon><CheckCircle /></WidgetAlertIcon>
      <WidgetAlertContent>
        <WidgetAlertTitle>Protection active</WidgetAlertTitle>
        <WidgetAlertDate>Today, 9:15 AM</WidgetAlertDate>
      </WidgetAlertContent>
      <WidgetAlertActions><MoreVertical /></WidgetAlertActions>
    </WidgetAlert>
  ),
}

export const Warning_: Story = {
  name: 'Warning',
  render: () => (
    <WidgetAlert variant="warning" className="w-[420px]">
      <WidgetAlertIcon><AlertTriangle /></WidgetAlertIcon>
      <WidgetAlertContent>
        <WidgetAlertTitle>License expiring soon</WidgetAlertTitle>
        <WidgetAlertDate>Expires in 7 days</WidgetAlertDate>
        <WidgetAlertDescription>Renew your license to continue protection.</WidgetAlertDescription>
      </WidgetAlertContent>
      <WidgetAlertActions><MoreVertical /></WidgetAlertActions>
    </WidgetAlert>
  ),
}

export const Danger_: Story = {
  name: 'Danger',
  render: () => (
    <WidgetAlert variant="danger" className="w-[420px]">
      <WidgetAlertIcon><XCircle /></WidgetAlertIcon>
      <WidgetAlertContent>
        <WidgetAlertTitle>Backup failed</WidgetAlertTitle>
        <WidgetAlertDate>Yesterday, 11:45 PM</WidgetAlertDate>
        <WidgetAlertDescription>Check your network connection and retry.</WidgetAlertDescription>
      </WidgetAlertContent>
      <WidgetAlertActions><MoreVertical /></WidgetAlertActions>
    </WidgetAlert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[420px]">
      <WidgetAlert variant="info">
        <WidgetAlertIcon><Info /></WidgetAlertIcon>
        <WidgetAlertContent><WidgetAlertTitle>Info alert</WidgetAlertTitle></WidgetAlertContent>
      </WidgetAlert>
      <WidgetAlert variant="success">
        <WidgetAlertIcon><CheckCircle /></WidgetAlertIcon>
        <WidgetAlertContent><WidgetAlertTitle>Success alert</WidgetAlertTitle></WidgetAlertContent>
      </WidgetAlert>
      <WidgetAlert variant="warning">
        <WidgetAlertIcon><AlertTriangle /></WidgetAlertIcon>
        <WidgetAlertContent><WidgetAlertTitle>Warning alert</WidgetAlertTitle></WidgetAlertContent>
      </WidgetAlert>
      <WidgetAlert variant="danger">
        <WidgetAlertIcon><XCircle /></WidgetAlertIcon>
        <WidgetAlertContent><WidgetAlertTitle>Danger alert</WidgetAlertTitle></WidgetAlertContent>
      </WidgetAlert>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <WidgetAlert variant="warning" interactive className="w-[420px]">
      <WidgetAlertIcon><AlertTriangle /></WidgetAlertIcon>
      <WidgetAlertContent>
        <WidgetAlertTitle>Disk space running low</WidgetAlertTitle>
        <WidgetAlertDate>Today, 2:00 PM</WidgetAlertDate>
        <WidgetAlertDescription>Only 10% storage remaining. Click for details.</WidgetAlertDescription>
      </WidgetAlertContent>
      <WidgetAlertActions><MoreVertical /></WidgetAlertActions>
    </WidgetAlert>
  ),
}
