import { Badge } from '@acronis-platform/shadcn-uikit/react'

export function BadgeDemo() {
  return (
    <section className="demo-section">
      <h2>Badge Component</h2>
      <p className="demo-description">
        Displays a badge or a component that looks like a badge for status indicators, labels, and
        tags.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Status Variants</h3>
          <p className="text-sm text-gray-600 mb-4">
            Different badge variants for various status types.
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="critical">Critical</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </div>

        <div className="demo-item">
          <h3>Default Variants</h3>
          <p className="text-sm text-gray-600 mb-4">Standard badge variants.</p>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        <div className="demo-item">
          <h3>Small Badges</h3>
          <p className="text-sm text-gray-600 mb-4">Compact badges with smaller text.</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success" className="text-[10px] py-0">
              TAG
            </Badge>
            <Badge variant="info" className="text-[10px] py-0">
              TAG
            </Badge>
            <Badge variant="warning" className="text-[10px] py-0">
              TAG
            </Badge>
            <Badge variant="critical" className="text-[10px] py-0">
              TAG
            </Badge>
            <Badge variant="danger" className="text-[10px] py-0">
              TAG
            </Badge>
            <Badge variant="neutral" className="text-[10px] py-0">
              TAG
            </Badge>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Icons</h3>
          <p className="text-sm text-gray-600 mb-4">Badges with icon elements.</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success" className="gap-1">
              <span className="text-xs">✓</span> Success
            </Badge>
            <Badge variant="info" className="gap-1">
              <span className="text-xs">ℹ</span> Info
            </Badge>
            <Badge variant="warning" className="gap-1">
              <span className="text-xs">⚠</span> Warning
            </Badge>
            <Badge variant="danger" className="gap-1">
              <span className="text-xs">✕</span> Danger
            </Badge>
          </div>
        </div>

        <div className="demo-item">
          <h3>Status Indicators</h3>
          <p className="text-sm text-gray-600 mb-4">Badges used as status indicators in lists.</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Server Status</span>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Database Connection</span>
              <Badge variant="info">Connected</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">API Response Time</span>
              <Badge variant="warning">Slow</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Disk Space</span>
              <Badge variant="critical">Low</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Service Health</span>
              <Badge variant="danger">Down</Badge>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Task Status</h3>
          <p className="text-sm text-gray-600 mb-4">Badges for task management.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Badge variant="success">Completed</Badge>
              <span className="text-sm">Design mockups</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Badge variant="info">In Progress</Badge>
              <span className="text-sm">Frontend development</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Badge variant="warning">Review</Badge>
              <span className="text-sm">Code review pending</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Badge variant="neutral">Todo</Badge>
              <span className="text-sm">Write documentation</span>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Priority Levels</h3>
          <p className="text-sm text-gray-600 mb-4">Badges indicating priority levels.</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="danger">High Priority</Badge>
            <Badge variant="critical">Medium Priority</Badge>
            <Badge variant="warning">Low Priority</Badge>
            <Badge variant="neutral">No Priority</Badge>
          </div>
        </div>

        <div className="demo-item">
          <h3>Notification Counts</h3>
          <p className="text-sm text-gray-600 mb-4">Badges showing notification counts.</p>
          <div className="flex flex-wrap gap-6">
            <div className="relative">
              <button className="rounded-lg border p-3">Messages</button>
              <Badge
                variant="danger"
                className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-[10px]"
              >
                5
              </Badge>
            </div>
            <div className="relative">
              <button className="rounded-lg border p-3">Notifications</button>
              <Badge
                variant="info"
                className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-[10px]"
              >
                12
              </Badge>
            </div>
            <div className="relative">
              <button className="rounded-lg border p-3">Updates</button>
              <Badge
                variant="success"
                className="absolute -right-2 -top-2 rounded-full px-2 py-0.5 text-[10px]"
              >
                3
              </Badge>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Category Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Badges used as category tags.</p>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 text-sm font-medium">Article Title</h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">React</Badge>
                <Badge variant="success">TypeScript</Badge>
                <Badge variant="warning">Tutorial</Badge>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 text-sm font-medium">Project Update</h4>
              <p className="mb-3 text-sm text-muted-foreground">
                New features and improvements released.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">New</Badge>
                <Badge variant="info">Feature</Badge>
                <Badge variant="neutral">v2.0</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>User Roles</h3>
          <p className="text-sm text-gray-600 mb-4">Badges for user roles and permissions.</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <span className="text-sm font-medium">John Doe</span>
              <Badge variant="danger">Admin</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <span className="text-sm font-medium">Jane Smith</span>
              <Badge variant="info">Editor</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <span className="text-sm font-medium">Bob Johnson</span>
              <Badge variant="success">Moderator</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <span className="text-sm font-medium">Alice Williams</span>
              <Badge variant="neutral">User</Badge>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Payment Status</h3>
          <p className="text-sm text-gray-600 mb-4">Badges for payment and transaction status.</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Invoice #001</div>
                <div className="text-xs text-muted-foreground">$250.00</div>
              </div>
              <Badge variant="success">Paid</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Invoice #002</div>
                <div className="text-xs text-muted-foreground">$150.00</div>
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Invoice #003</div>
                <div className="text-xs text-muted-foreground">$350.00</div>
              </div>
              <Badge variant="danger">Overdue</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Invoice #004</div>
                <div className="text-xs text-muted-foreground">$450.00</div>
              </div>
              <Badge variant="critical">Processing</Badge>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Environment Labels</h3>
          <p className="text-sm text-gray-600 mb-4">Badges for environment indicators.</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success">Production</Badge>
            <Badge variant="warning">Staging</Badge>
            <Badge variant="info">Development</Badge>
            <Badge variant="neutral">Local</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
