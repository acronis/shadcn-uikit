import type { Meta, StoryObj } from '@storybook/react-vite'
import { Settings, Shield, Database, FileText, Bell, Users, HelpCircle } from 'lucide-react'
import {
  SecondaryMenu,
  SecondaryMenuHeader,
  SecondaryMenuContent,
  SecondaryMenuGroup,
  SecondaryMenuItem,
  SecondaryMenuFooter,
} from '../secondary-menu'

const meta = {
  title: 'UI/SecondaryMenu',
  component: SecondaryMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SecondaryMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SecondaryMenu className="h-[480px]">
      <SecondaryMenuContent>
        <SecondaryMenuGroup>
          <SecondaryMenuItem icon={<Shield />} active>
            Protection
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Database />}>
            Backups
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<FileText />}>
            Reports
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
        <SecondaryMenuGroup>
          <SecondaryMenuItem icon={<Settings />}>
            Settings
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
      </SecondaryMenuContent>
    </SecondaryMenu>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <SecondaryMenu className="h-[480px]">
      <SecondaryMenuHeader>
        <span className="font-semibold text-sm">Manage</span>
      </SecondaryMenuHeader>
      <SecondaryMenuContent>
        <SecondaryMenuGroup title="Protection">
          <SecondaryMenuItem icon={<Shield />} active>
            Overview
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Database />}>
            Backup Plans
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<FileText />}>
            Activity
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
        <SecondaryMenuGroup title="Account">
          <SecondaryMenuItem icon={<Users />}>
            Users
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Bell />}>
            Notifications
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Settings />}>
            Settings
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
      </SecondaryMenuContent>
    </SecondaryMenu>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <SecondaryMenu className="h-[480px]">
      <SecondaryMenuContent>
        <SecondaryMenuGroup>
          <SecondaryMenuItem icon={<Shield />} active>
            Protection
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Database />}>
            Backups
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<FileText />}>
            Reports
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Settings />}>
            Settings
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
      </SecondaryMenuContent>
      <SecondaryMenuFooter>
        <SecondaryMenuItem icon={<HelpCircle />} className="px-0">
          Help & Support
        </SecondaryMenuItem>
      </SecondaryMenuFooter>
    </SecondaryMenu>
  ),
}

export const WithTags: Story = {
  render: () => (
    <SecondaryMenu className="h-[480px]">
      <SecondaryMenuContent>
        <SecondaryMenuGroup title="Features">
          <SecondaryMenuItem icon={<Shield />} active>
            Protection
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Database />} tag="New">
            Backups
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<FileText />} tag="Beta">
            Reports
          </SecondaryMenuItem>
          <SecondaryMenuItem icon={<Settings />} disabled>
            Settings
          </SecondaryMenuItem>
        </SecondaryMenuGroup>
      </SecondaryMenuContent>
    </SecondaryMenu>
  ),
}
