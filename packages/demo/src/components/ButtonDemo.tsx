import { Button } from '@acronis-platform/shadcn-uikit/react'

export function ButtonDemo() {
  return (
    <>
      <section className="demo-section">
        <h2>Button Variants</h2>
        <div className="button-grid">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Additional Variants</h2>
        <div className="button-grid">
          <Button variant="translucent">Translucent</Button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Button Sizes</h2>
        <div className="button-grid">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="secondary">
            ⋯
          </Button>
        </div>
      </section>

      <section className="demo-section">
        <h2>Button States</h2>
        <div className="button-grid">
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </>
  )
}
