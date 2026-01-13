import { Separator } from '@acronis-platform/shadcn-uikit/react'

export function SeparatorDemo() {
  return (
    <section className="demo-section">
      <h2>Separator Component</h2>
      <p className="demo-description">Visually or semantically separates content.</p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Horizontal Separator</h3>
          <p className="text-sm text-gray-600 mb-4">A horizontal line to divide content.</p>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Section 1</h4>
              <p className="text-sm text-muted-foreground">This is the first section of content.</p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium">Section 2</h4>
              <p className="text-sm text-muted-foreground">
                This is the second section of content.
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Vertical Separator</h3>
          <p className="text-sm text-gray-600 mb-4">
            A vertical line to divide content horizontally.
          </p>
          <div className="flex h-20 items-center space-x-4">
            <div className="text-sm">Item 1</div>
            <Separator orientation="vertical" />
            <div className="text-sm">Item 2</div>
            <Separator orientation="vertical" />
            <div className="text-sm">Item 3</div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Navigation</h3>
          <p className="text-sm text-gray-600 mb-4">Separator used in navigation menus.</p>
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="hover:underline">
              Home
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:underline">
              About
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:underline">
              Services
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Lists</h3>
          <p className="text-sm text-gray-600 mb-4">Separator between list items.</p>
          <div className="space-y-1">
            <div className="p-2">
              <h4 className="text-sm font-medium">List Item 1</h4>
              <p className="text-sm text-muted-foreground">Description for item 1</p>
            </div>
            <Separator />
            <div className="p-2">
              <h4 className="text-sm font-medium">List Item 2</h4>
              <p className="text-sm text-muted-foreground">Description for item 2</p>
            </div>
            <Separator />
            <div className="p-2">
              <h4 className="text-sm font-medium">List Item 3</h4>
              <p className="text-sm text-muted-foreground">Description for item 3</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Cards</h3>
          <p className="text-sm text-gray-600 mb-4">Separator within card components.</p>
          <div className="max-w-md rounded-lg border p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Card Header</h4>
                <p className="text-sm text-muted-foreground">This is the header section</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Card Content</h4>
                <p className="text-sm text-muted-foreground">This is the main content area</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold">Card Footer</h4>
                <p className="text-sm text-muted-foreground">This is the footer section</p>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Text</h3>
          <p className="text-sm text-gray-600 mb-4">Separator with centered text.</p>
          <div className="space-y-4">
            <p className="text-sm">Content above separator</p>
            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>
            <p className="text-sm">Content below separator</p>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Forms</h3>
          <p className="text-sm text-gray-600 mb-4">Separator between form sections.</p>
          <div className="max-w-md space-y-6 rounded-lg border p-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Personal Information</h4>
              <p className="text-sm text-muted-foreground">Enter your personal details</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold">Contact Information</h4>
              <p className="text-sm text-muted-foreground">How can we reach you?</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold">Preferences</h4>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Sidebar</h3>
          <p className="text-sm text-gray-600 mb-4">Separator in sidebar navigation.</p>
          <div className="w-64 rounded-lg border p-4">
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-sm font-medium">Main Menu</div>
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Dashboard</div>
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Projects</div>
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Tasks</div>
              <Separator className="my-2" />
              <div className="px-2 py-1.5 text-sm font-medium">Settings</div>
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Profile</div>
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Preferences</div>
              <Separator className="my-2" />
              <div className="px-2 py-1.5 text-sm hover:bg-accent">Logout</div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Toolbar</h3>
          <p className="text-sm text-gray-600 mb-4">Separator between toolbar groups.</p>
          <div className="flex items-center space-x-2 rounded-lg border p-2">
            <button className="rounded p-2 hover:bg-accent">Bold</button>
            <button className="rounded p-2 hover:bg-accent">Italic</button>
            <button className="rounded p-2 hover:bg-accent">Underline</button>
            <Separator orientation="vertical" className="h-6" />
            <button className="rounded p-2 hover:bg-accent">Left</button>
            <button className="rounded p-2 hover:bg-accent">Center</button>
            <button className="rounded p-2 hover:bg-accent">Right</button>
            <Separator orientation="vertical" className="h-6" />
            <button className="rounded p-2 hover:bg-accent">Link</button>
            <button className="rounded p-2 hover:bg-accent">Image</button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Multiple Separators</h3>
          <p className="text-sm text-gray-600 mb-4">Multiple sections divided by separators.</p>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Introduction</h4>
              <p className="text-sm text-muted-foreground">
                Welcome to our application. This is the introduction section.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold">Features</h4>
              <p className="text-sm text-muted-foreground">
                Discover all the amazing features we offer.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold">Pricing</h4>
              <p className="text-sm text-muted-foreground">
                Choose the plan that works best for you.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold">Contact</h4>
              <p className="text-sm text-muted-foreground">Get in touch with our support team.</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Grid Layout</h3>
          <p className="text-sm text-gray-600 mb-4">Separators in a grid structure.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Column 1</h4>
              <Separator />
              <p className="text-sm text-muted-foreground">Content for column 1</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Column 2</h4>
              <Separator />
              <p className="text-sm text-muted-foreground">Content for column 2</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Column 3</h4>
              <Separator />
              <p className="text-sm text-muted-foreground">Content for column 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
