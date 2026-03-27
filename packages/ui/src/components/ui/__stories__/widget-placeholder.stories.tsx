import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, Plus, Shield } from 'lucide-react'
import {
  WidgetPlaceholder,
  WidgetPlaceholderHeader,
  WidgetPlaceholderTitle,
  WidgetPlaceholderIcon,
  WidgetPlaceholderContent,
  WidgetPlaceholderImage,
  WidgetPlaceholderText,
  WidgetPlaceholderAction,
  WidgetPlaceholderFooter,
} from '../widget-placeholder'

const meta = {
  title: 'UI/WidgetPlaceholder',
  component: WidgetPlaceholder,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <WidgetPlaceholder className="w-[320px] h-[220px]">
      <WidgetPlaceholderHeader>
        <WidgetPlaceholderIcon><BarChart3 /></WidgetPlaceholderIcon>
        <WidgetPlaceholderTitle>Backup Statistics</WidgetPlaceholderTitle>
      </WidgetPlaceholderHeader>
      <WidgetPlaceholderContent>
        <WidgetPlaceholderImage>
          <BarChart3 />
        </WidgetPlaceholderImage>
        <WidgetPlaceholderText>No data available yet</WidgetPlaceholderText>
        <WidgetPlaceholderAction>Set up backup plan</WidgetPlaceholderAction>
      </WidgetPlaceholderContent>
    </WidgetPlaceholder>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <WidgetPlaceholder className="w-[320px]">
      <WidgetPlaceholderHeader>
        <WidgetPlaceholderIcon><Shield /></WidgetPlaceholderIcon>
        <WidgetPlaceholderTitle>Protection Status</WidgetPlaceholderTitle>
      </WidgetPlaceholderHeader>
      <WidgetPlaceholderContent>
        <WidgetPlaceholderImage>
          <Shield />
        </WidgetPlaceholderImage>
        <WidgetPlaceholderText>No devices protected</WidgetPlaceholderText>
        <WidgetPlaceholderAction>
          <Plus className="inline h-3 w-3 mr-1" />
          Add device
        </WidgetPlaceholderAction>
      </WidgetPlaceholderContent>
      <WidgetPlaceholderFooter>Last checked: never</WidgetPlaceholderFooter>
    </WidgetPlaceholder>
  ),
}

export const Interactive: Story = {
  render: () => (
    <WidgetPlaceholder interactive className="w-[320px] h-[220px]">
      <WidgetPlaceholderHeader>
        <WidgetPlaceholderIcon><BarChart3 /></WidgetPlaceholderIcon>
        <WidgetPlaceholderTitle>Click to configure</WidgetPlaceholderTitle>
      </WidgetPlaceholderHeader>
      <WidgetPlaceholderContent>
        <WidgetPlaceholderImage>
          <BarChart3 />
        </WidgetPlaceholderImage>
        <WidgetPlaceholderText>Click anywhere to get started</WidgetPlaceholderText>
      </WidgetPlaceholderContent>
    </WidgetPlaceholder>
  ),
}
