import { Input } from '@acronis-platform/shadcn-uikit/react'

export function BasicInputDemo() {
  return (
    <section className="demo-section">
      <h2>Basic Input</h2>
      <p className="demo-description">
        Simple input fields with placeholder text and default values.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Default Input</h3>
          <div className="space-y-4">
            <Input placeholder="Enter text..." />
            <Input placeholder="With default value" defaultValue="Default value" />
          </div>
        </div>
      </div>
    </section>
  )
}
