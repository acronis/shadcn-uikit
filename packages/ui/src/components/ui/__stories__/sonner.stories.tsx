import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from '../sonner'
import { Button } from '../button'
import { toast } from 'sonner'

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
      <Toaster />
    </>
  ),
}

export const Success: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.success('Success message')}>Show Success</Button>
      <Toaster />
    </>
  ),
}

export const Error: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.error('Error message')}>Show Error</Button>
      <Toaster />
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('Event created', {
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
      <Toaster />
    </>
  ),
}
