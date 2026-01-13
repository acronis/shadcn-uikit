import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'
import { Switch } from '@acronis-platform/shadcn-uikit/react'

export function CardDemo() {
  return (
    <section className="demo-section">
      <h2>Card Component</h2>
      <p className="demo-description">
        A container component used to group related content and actions.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Card</h3>
          <p className="text-sm text-gray-600 mb-4">Simple card with title and content.</p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area.</p>
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Card with Footer</h3>
          <p className="text-sm text-gray-600 mb-4">
            Card with header, content, and footer sections.
          </p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Click the button below to create your project.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Create</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Card with Form</h3>
          <p className="text-sm text-gray-600 mb-4">Card containing form inputs.</p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Make changes to your account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Multiple Cards</h3>
          <p className="text-sm text-gray-600 mb-4">
            Grid of cards displaying different information.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>+20.1% from last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
                <CardDescription>+180.1% from last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales</CardTitle>
                <CardDescription>+19% from last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="demo-item">
          <h3>Card with Shadow</h3>
          <p className="text-sm text-gray-600 mb-4">Card with elevated shadow effect.</p>
          <Card className="w-[350px] shadow-lg">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">John Doe</span> sent you a message
                </p>
                <p className="text-sm">
                  <span className="font-medium">Jane Smith</span> liked your post
                </p>
                <p className="text-sm">
                  <span className="font-medium">Bob Johnson</span> commented on your photo
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Settings Card</h3>
          <p className="text-sm text-gray-600 mb-4">Card for settings with switches.</p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Cookie Settings</CardTitle>
              <CardDescription>Manage your cookie preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="necessary">Strictly Necessary</Label>
                <Switch id="necessary" defaultChecked disabled />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="functional">Functional Cookies</Label>
                <Switch id="functional" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="performance">Performance Cookies</Label>
                <Switch id="performance" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Product Cards</h3>
          <p className="text-sm text-gray-600 mb-4">Cards displaying product information.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardDescription>For professional use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unlimited projects</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Custom domain</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>✓ Everything in Premium</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ SSO authentication</li>
                  <li>✓ SLA guarantee</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="demo-item">
          <h3>Card with Image</h3>
          <p className="text-sm text-gray-600 mb-4">Card with image header.</p>
          <Card className="w-[350px] overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600" />
            <CardHeader>
              <CardTitle>Beautiful Landscape</CardTitle>
              <CardDescription>A stunning view of nature</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover the beauty of natural landscapes with our curated collection.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Gallery</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Compact Cards</h3>
          <p className="text-sm text-gray-600 mb-4">Smaller cards for compact layouts.</p>
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-4">
              <div className="text-sm font-medium">Active Users</div>
              <div className="text-2xl font-bold">1,234</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Total Sales</div>
              <div className="text-2xl font-bold">$45.2K</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Conversion</div>
              <div className="text-2xl font-bold">3.2%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Growth</div>
              <div className="text-2xl font-bold">+12%</div>
            </Card>
          </div>
        </div>

        <div className="demo-item">
          <h3>Interactive Card</h3>
          <p className="text-sm text-gray-600 mb-4">Card with hover effects.</p>
          <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Hover Me</CardTitle>
              <CardDescription>This card has hover effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Hover over this card to see the shadow effect.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Card Variants</h3>
          <p className="text-sm text-gray-600 mb-4">Cards with different border styles.</p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="w-full border-primary">
              <CardHeader>
                <CardTitle className="text-sm">Primary Border</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card with primary color border</p>
              </CardContent>
            </Card>
            <Card className="w-full border-destructive">
              <CardHeader>
                <CardTitle className="text-sm">Error Border</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card with error/destructive border</p>
              </CardContent>
            </Card>
            <Card className="w-full border-2">
              <CardHeader>
                <CardTitle className="text-sm">Thick Border</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card with thicker border</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="demo-item">
          <h3>List Card</h3>
          <p className="text-sm text-gray-600 mb-4">Card containing a list of items.</p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Pushed to repository</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Created new branch</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Merged pull request</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
