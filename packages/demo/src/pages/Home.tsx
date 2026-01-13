import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Acronis UIKit</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A modern React UI component library based on Acronis design system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Components</h3>
          <p className="text-sm text-muted-foreground">
            Explore our collection of reusable UI components built with React and TypeScript.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Design System</h3>
          <p className="text-sm text-muted-foreground">
            All components follow the Acronis design system with consistent styling and behavior.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">Accessible</h3>
          <p className="text-sm text-muted-foreground">
            Built with accessibility in mind, following WCAG 2.1 guidelines.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            <Link to="/playground">Playground</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            A place to experiment with different color palettes.
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            <Link to="/demo">Demo</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            Full-featured demo application
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            <Link to="/chart">Charts</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive charts built with Recharts
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
        <p className="mb-4 text-muted-foreground">
          Select a component from the sidebar to view its demo and explore different variations.
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Each component includes multiple examples and use cases</li>
          <li>Interactive demos show real-world usage patterns</li>
          <li>All components are fully typed with TypeScript</li>
          <li>Styling is based on Figma design specifications</li>
        </ul>
      </div>
    </div>
  )
}
