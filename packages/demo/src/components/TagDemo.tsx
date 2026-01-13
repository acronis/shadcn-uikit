import { Tag } from '@acronis-platform/shadcn-uikit/react'
import {
  CheckCircle,
  Info,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Circle,
  Star,
  Zap,
  Shield,
  Lock,
  Unlock,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

export function TagDemo() {
  return (
    <section className="demo-section">
      <h2>Tag Component</h2>
      <p className="demo-description">
        Used to label, categorize, or organize items using keywords that describe them.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Default Size Tags</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tags in default size (24px height) with different color variants.
          </p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success">Success</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="critical">Critical</Tag>
            <Tag variant="danger">Danger</Tag>
            <Tag variant="neutral">Neutral</Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Small Size Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Compact tags in small size (16px height).</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" size="small">
              Success
            </Tag>
            <Tag variant="info" size="small">
              Info
            </Tag>
            <Tag variant="warning" size="small">
              Warning
            </Tag>
            <Tag variant="critical" size="small">
              Critical
            </Tag>
            <Tag variant="danger" size="small">
              Danger
            </Tag>
            <Tag variant="neutral" size="small">
              Neutral
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Tags with Icons</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tags with leading icons for additional visual context.
          </p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" icon={<CheckCircle className="h-4 w-4" />}>
              Active
            </Tag>
            <Tag variant="info" icon={<Info className="h-4 w-4" />}>
              Info
            </Tag>
            <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
              Warning
            </Tag>
            <Tag variant="critical" icon={<AlertCircle className="h-4 w-4" />}>
              Critical
            </Tag>
            <Tag variant="danger" icon={<XCircle className="h-4 w-4" />}>
              Error
            </Tag>
            <Tag variant="neutral" icon={<Circle className="h-4 w-4" />}>
              Neutral
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Small Tags with Icons</h3>
          <p className="text-sm text-gray-600 mb-4">Compact tags with icons in small size.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" size="small" icon={<CheckCircle className="h-3 w-3" />}>
              Active
            </Tag>
            <Tag variant="info" size="small" icon={<Info className="h-3 w-3" />}>
              Info
            </Tag>
            <Tag variant="warning" size="small" icon={<AlertTriangle className="h-3 w-3" />}>
              Warning
            </Tag>
            <Tag variant="critical" size="small" icon={<AlertCircle className="h-3 w-3" />}>
              Critical
            </Tag>
            <Tag variant="danger" size="small" icon={<XCircle className="h-3 w-3" />}>
              Error
            </Tag>
            <Tag variant="neutral" size="small" icon={<Circle className="h-3 w-3" />}>
              Neutral
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Status Tags</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tags representing different system or item statuses.
          </p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" icon={<CheckCircle className="h-4 w-4" />}>
              Completed
            </Tag>
            <Tag variant="info" icon={<Clock className="h-4 w-4" />}>
              In Progress
            </Tag>
            <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
              Pending
            </Tag>
            <Tag variant="danger" icon={<XCircle className="h-4 w-4" />}>
              Failed
            </Tag>
            <Tag variant="neutral" icon={<Circle className="h-4 w-4" />}>
              Draft
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Priority Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags indicating priority levels.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="danger" icon={<TrendingUp className="h-4 w-4" />}>
              Urgent
            </Tag>
            <Tag variant="critical" icon={<AlertCircle className="h-4 w-4" />}>
              High
            </Tag>
            <Tag variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
              Medium
            </Tag>
            <Tag variant="info" icon={<TrendingDown className="h-4 w-4" />}>
              Low
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Security Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags for security-related information.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" icon={<Shield className="h-4 w-4" />}>
              Verified
            </Tag>
            <Tag variant="info" icon={<Lock className="h-4 w-4" />}>
              Encrypted
            </Tag>
            <Tag variant="warning" icon={<Unlock className="h-4 w-4" />}>
              Unlocked
            </Tag>
            <Tag variant="danger" icon={<AlertCircle className="h-4 w-4" />}>
              Vulnerable
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Feature Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags highlighting features or capabilities.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" icon={<Star className="h-4 w-4" />}>
              Premium
            </Tag>
            <Tag variant="info" icon={<Zap className="h-4 w-4" />}>
              Fast
            </Tag>
            <Tag variant="warning" size="small">
              Beta
            </Tag>
            <Tag variant="neutral" size="small">
              Legacy
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Environment Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags for different deployment environments.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success">Production</Tag>
            <Tag variant="warning">Staging</Tag>
            <Tag variant="info">Development</Tag>
            <Tag variant="neutral">Testing</Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Version Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags for version information.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="success" size="small">
              v2.0
            </Tag>
            <Tag variant="info" size="small">
              v1.5
            </Tag>
            <Tag variant="neutral" size="small">
              v1.0
            </Tag>
            <Tag variant="warning" size="small">
              Deprecated
            </Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Category Tags</h3>
          <p className="text-sm text-gray-600 mb-4">Tags for categorizing content or items.</p>
          <div className="flex flex-wrap gap-3">
            <Tag variant="info">Frontend</Tag>
            <Tag variant="success">Backend</Tag>
            <Tag variant="warning">Database</Tag>
            <Tag variant="critical">DevOps</Tag>
            <Tag variant="neutral">Design</Tag>
          </div>
        </div>

        <div className="demo-item">
          <h3>Mixed Sizes Example</h3>
          <p className="text-sm text-gray-600 mb-4">
            Combination of default and small tags in a real-world scenario.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold">Project Alpha</h4>
                <Tag variant="success" icon={<CheckCircle className="h-4 w-4" />}>
                  Active
                </Tag>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                A high-priority project with multiple components.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag variant="danger" size="small">
                  Urgent
                </Tag>
                <Tag variant="info" size="small">
                  Frontend
                </Tag>
                <Tag variant="success" size="small">
                  Backend
                </Tag>
                <Tag variant="warning" size="small">
                  v2.0
                </Tag>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold">Project Beta</h4>
                <Tag variant="warning" icon={<Clock className="h-4 w-4" />}>
                  In Progress
                </Tag>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                A medium-priority project in development phase.
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag variant="info" size="small">
                  Medium
                </Tag>
                <Tag variant="neutral" size="small">
                  Design
                </Tag>
                <Tag variant="info" size="small">
                  Development
                </Tag>
                <Tag variant="warning" size="small">
                  Beta
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
