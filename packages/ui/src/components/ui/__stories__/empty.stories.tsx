import type { Meta, StoryObj } from '@storybook/react-vite'
import { Empty } from '../empty'
import { Inbox } from 'lucide-react'

const meta = {
  title: 'UI/Empty',
  component: Empty,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No data',
    description: 'There is no data to display',
  },
}

export const WithIcon: Story = {
  render: () => (
    <Empty
      icon={<Inbox className="h-16 w-16" />}
      title="No messages"
      description="You don't have any messages yet"
    />
  ),
}
