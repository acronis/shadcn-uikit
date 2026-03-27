import type { Meta, StoryObj } from '@storybook/react-vite'
import { Activity, MoreVertical } from 'lucide-react'
import {
  WidgetProgressChunks,
  WidgetProgressChunksHeader,
  WidgetProgressChunksTitle,
  WidgetProgressChunksIcon,
  WidgetProgressChunksBody,
  WidgetProgressChunkRow,
  WidgetProgressChunksFooter,
} from '../widget-progress-chunks'

const meta = {
  title: 'UI/WidgetProgressChunks',
  component: WidgetProgressChunks,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetProgressChunks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <WidgetProgressChunks className="w-[360px]">
      <WidgetProgressChunksHeader>
        <WidgetProgressChunksIcon><Activity /></WidgetProgressChunksIcon>
        <WidgetProgressChunksTitle>Backup Progress</WidgetProgressChunksTitle>
        <MoreVertical className="h-4 w-4 ml-auto text-muted-foreground" />
      </WidgetProgressChunksHeader>
      <WidgetProgressChunksBody>
        <WidgetProgressChunkRow
          label="Success"
          value={842}
          total={1000}
          color="var(--av-chart-success, #4caf50)"
        />
        <WidgetProgressChunkRow
          label="Warning"
          value={120}
          total={1000}
          color="var(--av-chart-warning, #ff9800)"
        />
        <WidgetProgressChunkRow
          label="Failed"
          value={38}
          total={1000}
          color="var(--av-chart-danger, #f44336)"
        />
      </WidgetProgressChunksBody>
    </WidgetProgressChunks>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <WidgetProgressChunks className="w-[360px]">
      <WidgetProgressChunksHeader>
        <WidgetProgressChunksIcon><Activity /></WidgetProgressChunksIcon>
        <WidgetProgressChunksTitle>Storage Usage</WidgetProgressChunksTitle>
      </WidgetProgressChunksHeader>
      <WidgetProgressChunksBody>
        <WidgetProgressChunkRow
          label="Documents"
          value={256}
          total={512}
          color="var(--av-chart-success, #4caf50)"
          formatValue={(v) => `${v} GB`}
          formatTotal={(t) => `${t} GB`}
        />
        <WidgetProgressChunkRow
          label="Media"
          value={180}
          total={512}
          color="var(--av-chart-warning, #ff9800)"
          formatValue={(v) => `${v} GB`}
          formatTotal={(t) => `${t} GB`}
        />
        <WidgetProgressChunkRow
          label="System"
          value={64}
          total={512}
          color="var(--av-chart-critical, #e91e63)"
          formatValue={(v) => `${v} GB`}
          formatTotal={(t) => `${t} GB`}
        />
      </WidgetProgressChunksBody>
      <WidgetProgressChunksFooter>
        Total used: 500 GB / 512 GB
      </WidgetProgressChunksFooter>
    </WidgetProgressChunks>
  ),
}

export const Interactive: Story = {
  render: () => (
    <WidgetProgressChunks interactive className="w-[360px]">
      <WidgetProgressChunksHeader>
        <WidgetProgressChunksIcon><Activity /></WidgetProgressChunksIcon>
        <WidgetProgressChunksTitle>Protection Coverage</WidgetProgressChunksTitle>
      </WidgetProgressChunksHeader>
      <WidgetProgressChunksBody>
        <WidgetProgressChunkRow
          label="Protected"
          value={75}
          total={100}
          color="var(--av-chart-success, #4caf50)"
          formatValue={(v) => `${v}%`}
          formatTotal={(t) => `${t}%`}
        />
        <WidgetProgressChunkRow
          label="Unprotected"
          value={25}
          total={100}
          color="var(--av-chart-danger, #f44336)"
          formatValue={(v) => `${v}%`}
          formatTotal={(t) => `${t}%`}
        />
      </WidgetProgressChunksBody>
    </WidgetProgressChunks>
  ),
}
