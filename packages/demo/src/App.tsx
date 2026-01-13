import { useState } from 'react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input } from '@shadcn-uikit/ui'
import { themes } from './themes'
import './index.css'

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleThemeChange = (theme: typeof themes[number]) => {
    setCurrentTheme(theme)
    document.documentElement.className = theme.className
  }

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shadcn UIKit Demo</h1>
          <p className="text-muted-foreground">
            Explore custom shadcn components with multiple color schemes
          </p>
        </div>

        {/* Theme Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Theme Selector</CardTitle>
            <CardDescription>
              Choose from multiple color schemes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant={currentTheme.name === theme.name ? "default" : "outline"}
                  onClick={() => handleThemeChange(theme)}
                >
                  {theme.icon} {theme.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Button Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Sizes</p>
                <div className="flex items-center flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">⚙️</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Example */}
          <Card>
            <CardHeader>
              <CardTitle>Form Example</CardTitle>
              <CardDescription>Input fields with validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setFormData({ name: '', email: '' })}>
                Clear
              </Button>
              <Button>Submit</Button>
            </CardFooter>
          </Card>

          {/* Card Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>Default card variant</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This is the default card style with shadow and border.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with enhanced shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This card has an elevated appearance with a stronger shadow.
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Card with prominent border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This card emphasizes the border without shadow.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>About This Demo</CardTitle>
            <CardDescription>Shadcn UIKit Features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🎨 Multiple Themes</h3>
                <p className="text-sm text-muted-foreground">
                  Six pre-configured color schemes including Acronis brand colors
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">🧩 Reusable Components</h3>
                <p className="text-sm text-muted-foreground">
                  Built on shadcn/ui with custom variants and styling
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">⚡ Fast Development</h3>
                <p className="text-sm text-muted-foreground">
                  TypeScript support with excellent DX and performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
