import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from '../chip'
import { X } from 'lucide-react'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Chip',
  },
}

export const WithIcon: Story = {
  render: () => (
    <Chip>
      Tag
      <X className="ml-1 h-3 w-3" />
    </Chip>
  ),
}
