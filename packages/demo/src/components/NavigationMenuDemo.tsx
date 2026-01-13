import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@acronis-platform/shadcn-uikit/react'
import { cn } from '@acronis-platform/shadcn-uikit/react'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/alert',
    description: 'A modal dialog that interrupts the user with important content.',
  },
  {
    title: 'Button',
    href: '/button',
    description: 'Displays a button or a component that looks like a button.',
  },
  {
    title: 'Calendar',
    href: '/calendar',
    description: 'A date calendar component for selecting dates.',
  },
  {
    title: 'Dialog',
    href: '/dialog',
    description: 'A window overlaid on either the primary window or another dialog.',
  },
  {
    title: 'Input',
    href: '/input',
    description: 'Displays a form input field or a component that looks like an input field.',
  },
  {
    title: 'Tooltip',
    href: '/tooltip',
    description: 'A popup that displays information related to an element.',
  },
]

export function NavigationMenuDemo() {
  const [activeTab, setActiveTab] = React.useState('overview')

  return (
    <section className="demo-section">
      <h2>Navigation Menu Component</h2>
      <p className="demo-description">
        Used as secondary navigation through the content of a particular section and cannot lead the
        user outside the parent section.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Horizontal Navigation Menu</h3>
          <p className="text-sm text-gray-600 mb-4">
            A collection of links for navigating websites.
          </p>
          <div className="flex justify-center rounded-lg border p-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components built with Radix UI and Tailwind CSS.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/button" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>
                      <ListItem href="/input" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem href="/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/calendar">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Documentation
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="demo-item">
          <h3>Secondary Tab Navigation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tab-style navigation with active indicator matching Figma design.
          </p>
          <div className="rounded-lg border">
            <nav className="flex border-b">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  'relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide transition-colors',
                  activeTab === 'overview'
                    ? 'text-[hsl(var(--nav-menu-text))]'
                    : 'text-gray-500 hover:text-[hsl(var(--nav-menu-text))]'
                )}
              >
                Overview
                {activeTab === 'overview' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--nav-menu-active-indicator))]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={cn(
                  'relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide transition-colors',
                  activeTab === 'analytics'
                    ? 'text-[hsl(var(--nav-menu-text))]'
                    : 'text-gray-500 hover:text-[hsl(var(--nav-menu-text))]'
                )}
              >
                Analytics
                <span className="flex h-4 items-center rounded-full border border-[hsl(var(--nav-menu-counter-border))] bg-[hsl(var(--nav-menu-counter-bg))] px-2 text-[10px] font-bold leading-4 tracking-wider text-[hsl(var(--nav-menu-counter-text))]">
                  5
                </span>
                {activeTab === 'analytics' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--nav-menu-active-indicator))]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={cn(
                  'relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide transition-colors',
                  activeTab === 'reports'
                    ? 'text-[hsl(var(--nav-menu-text))]'
                    : 'text-gray-500 hover:text-[hsl(var(--nav-menu-text))]'
                )}
              >
                Reports
                {activeTab === 'reports' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--nav-menu-active-indicator))]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={cn(
                  'relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide transition-colors',
                  activeTab === 'settings'
                    ? 'text-[hsl(var(--nav-menu-text))]'
                    : 'text-gray-500 hover:text-[hsl(var(--nav-menu-text))]'
                )}
              >
                Settings
                <span className="flex h-4 items-center rounded-full border border-[hsl(var(--nav-menu-counter-border))] bg-[hsl(var(--nav-menu-counter-bg))] px-2 text-[10px] font-bold leading-4 tracking-wider text-[hsl(var(--nav-menu-counter-text))]">
                  3
                </span>
                {activeTab === 'settings' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--nav-menu-active-indicator))]" />
                )}
              </button>
            </nav>
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h4 className="mb-2 font-semibold">Overview Content</h4>
                  <p className="text-sm text-gray-600">
                    This is the overview section with general information about your dashboard.
                  </p>
                </div>
              )}
              {activeTab === 'analytics' && (
                <div>
                  <h4 className="mb-2 font-semibold">Analytics Content</h4>
                  <p className="text-sm text-gray-600">
                    View detailed analytics and metrics. You have 5 new reports to review.
                  </p>
                </div>
              )}
              {activeTab === 'reports' && (
                <div>
                  <h4 className="mb-2 font-semibold">Reports Content</h4>
                  <p className="text-sm text-gray-600">
                    Access and generate various reports for your data.
                  </p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div>
                  <h4 className="mb-2 font-semibold">Settings Content</h4>
                  <p className="text-sm text-gray-600">
                    Configure your preferences and account settings. 3 settings need attention.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Simple Tab Navigation</h3>
          <p className="text-sm text-gray-600 mb-4">Basic tab navigation without counters.</p>
          <div className="rounded-lg border">
            <nav className="flex border-b">
              {['Dashboard', 'Projects', 'Team', 'Calendar'].map((tab) => (
                <button
                  key={tab}
                  className="relative px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide text-gray-500 transition-colors hover:text-[hsl(var(--nav-menu-text))]"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="demo-item">
          <h3>Navigation with Icons</h3>
          <p className="text-sm text-gray-600 mb-4">Tab navigation with icon indicators.</p>
          <div className="rounded-lg border">
            <nav className="flex border-b">
              <button className="relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--nav-menu-text))] transition-colors">
                Home
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[hsl(var(--nav-menu-active-indicator))]" />
              </button>
              <button className="relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide text-gray-500 transition-colors hover:text-[hsl(var(--nav-menu-text))]">
                Products
              </button>
              <button className="relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide text-gray-500 transition-colors hover:text-[hsl(var(--nav-menu-text))]">
                Services
              </button>
              <button className="relative flex items-center gap-2 px-6 pb-4 pt-5 text-sm font-semibold uppercase tracking-wide text-gray-500 transition-colors hover:text-[hsl(var(--nav-menu-text))]">
                About
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
