import { Tabs, TabsContent, TabsList, TabsTrigger } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'

export function TabsDemo() {
  return (
    <section className="demo-section">
      <h2>Tabs Component</h2>
      <p className="demo-description">
        Used as additional navigation between content within a subsection. The content is switched
        without reloading the page.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Tabs</h3>
          <p className="text-sm text-gray-600 mb-4">Simple tabs with content panels.</p>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p>Content for Tab 1</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p>Content for Tab 2</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p>Content for Tab 3</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Account Settings</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs for managing account settings.</p>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@johndoe" />
              </div>
              <Button>Save changes</Button>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
              <Button>Change password</Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Multiple Tabs</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs with multiple options.</p>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-2 font-semibold">Overview</h4>
                <p className="text-sm text-muted-foreground">
                  View a summary of your account activity and key metrics.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-2 font-semibold">Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed analytics and insights about your performance.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-2 font-semibold">Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Generate and download custom reports.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-2 font-semibold">Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your notification preferences.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Full Width Tabs</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs that span the full width.</p>
          <Tabs defaultValue="first" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="first">First</TabsTrigger>
              <TabsTrigger value="second">Second</TabsTrigger>
              <TabsTrigger value="third">Third</TabsTrigger>
              <TabsTrigger value="fourth">Fourth</TabsTrigger>
              <TabsTrigger value="last">Last</TabsTrigger>
            </TabsList>
            <TabsContent value="first" className="mt-4">
              <p>First tab content</p>
            </TabsContent>
            <TabsContent value="second" className="mt-4">
              <p>Second tab content</p>
            </TabsContent>
            <TabsContent value="third" className="mt-4">
              <p>Third tab content</p>
            </TabsContent>
            <TabsContent value="fourth" className="mt-4">
              <p>Fourth tab content</p>
            </TabsContent>
            <TabsContent value="last" className="mt-4">
              <p>Last tab content</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Disabled Tab</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs with a disabled option.</p>
          <Tabs defaultValue="available" className="w-full">
            <TabsList>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="another">Another</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-4">
              <p>This tab is available.</p>
            </TabsContent>
            <TabsContent value="disabled" className="mt-4">
              <p>This content is not accessible.</p>
            </TabsContent>
            <TabsContent value="another" className="mt-4">
              <p>Another available tab.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Product Details</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs for product information.</p>
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Product Description</h4>
                <p className="text-sm text-muted-foreground">
                  This is a high-quality product designed to meet your needs. It features advanced
                  technology and premium materials for long-lasting durability.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Technical Specifications</h4>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Dimensions: 10 x 5 x 2 inches</li>
                  <li>Weight: 1.5 lbs</li>
                  <li>Material: Premium aluminum</li>
                  <li>Color: Space Gray</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Customer Reviews</h4>
                <p className="text-sm text-muted-foreground">
                  ⭐⭐⭐⭐⭐ 4.8 out of 5 stars (based on 127 reviews)
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Dashboard Sections</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs for different dashboard views.</p>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h5 className="mb-2 text-sm font-medium">Total Users</h5>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h5 className="mb-2 text-sm font-medium">Active Sessions</h5>
                  <p className="text-2xl font-bold">567</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h5 className="mb-2 text-sm font-medium">Revenue</h5>
                  <p className="text-2xl font-bold">$12,345</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <div className="space-y-2 rounded-lg border p-4">
                <p className="text-sm">
                  <span className="font-medium">User123</span> logged in
                </p>
                <p className="text-sm">
                  <span className="font-medium">User456</span> completed a purchase
                </p>
                <p className="text-sm">
                  <span className="font-medium">User789</span> updated their profile
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Privacy Settings</Label>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Documentation Tabs</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs for documentation sections.</p>
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList>
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="getting-started" className="mt-4">
              <div className="space-y-4 rounded-lg border p-6">
                <h4 className="font-semibold">Getting Started</h4>
                <p className="text-sm text-muted-foreground">
                  Welcome! This guide will help you get up and running quickly.
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-sm">
                  <li>Install the package</li>
                  <li>Configure your environment</li>
                  <li>Run your first command</li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="api" className="mt-4">
              <div className="space-y-4 rounded-lg border p-6">
                <h4 className="font-semibold">API Reference</h4>
                <p className="text-sm text-muted-foreground">
                  Complete API documentation with examples and parameters.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="examples" className="mt-4">
              <div className="space-y-4 rounded-lg border p-6">
                <h4 className="font-semibold">Code Examples</h4>
                <p className="text-sm text-muted-foreground">
                  Practical examples to help you implement common use cases.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="mt-4">
              <div className="space-y-4 rounded-lg border p-6">
                <h4 className="font-semibold">Frequently Asked Questions</h4>
                <p className="text-sm text-muted-foreground">Find answers to common questions.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Compact Tabs</h3>
          <p className="text-sm text-gray-600 mb-4">Smaller tabs for compact layouts.</p>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs">
                Completed
              </TabsTrigger>
              <TabsTrigger value="archived" className="text-xs">
                Archived
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <p className="text-sm">Showing all items</p>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <p className="text-sm">Showing active items</p>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <p className="text-sm">Showing completed items</p>
            </TabsContent>
            <TabsContent value="archived" className="mt-4">
              <p className="text-sm">Showing archived items</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="demo-item">
          <h3>Vertical Layout</h3>
          <p className="text-sm text-gray-600 mb-4">Tabs with content displayed vertically.</p>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4 space-y-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-4 font-semibold">Profile Information</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself" />
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="billing" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-4 font-semibold">Billing Information</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your billing details and payment methods.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="team" className="mt-4">
              <div className="rounded-lg border p-6">
                <h4 className="mb-4 font-semibold">Team Management</h4>
                <p className="text-sm text-muted-foreground">Invite and manage team members.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
