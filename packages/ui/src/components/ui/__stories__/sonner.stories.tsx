import type { Meta, StoryObj } from '@storybook/react-vite'
import { within } from '@storybook/test'
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
      <Toaster position="bottom-center" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByText('Show Toast').click()
  },
}

export const Success: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.success('Success message')}>Show Success</Button>
      <Toaster position="bottom-center" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByText('Show Success').click()
  },
}

export const Error: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.error('Error message')}>Show Error</Button>
      <Toaster position="bottom-center" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByText('Show Error').click()
  },
}

export const MultipleToasts: Story = {
  render: () => (
    <>
      <Button
        onClick={() => {
          toast('Event has been created')
          toast.success('Profile saved successfully')
          toast.error('Failed to delete item')
          toast.warning('Disk space running low')
          toast.info('New update available')
        }}
      >Show Multiple Toasts</Button>
      <Toaster position="bottom-center" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByText('Show Multiple Toasts').click()
  },
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
      <Toaster position="bottom-center" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    canvas.getByText('Show Toast with Action').click()
  },
}
