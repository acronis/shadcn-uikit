import {
  Empty,
  EmptyIcon,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
  EmptyLinks,
} from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Inbox,
  FolderOpen,
  Search,
  Users,
  FileText,
  Database,
  ShoppingCart,
  Calendar,
  Mail,
  AlertCircle,
  XCircle,
} from 'lucide-react'

export function EmptyDemo() {
  return (
    <section className="demo-section">
      <h2>Empty State Component</h2>
      <p className="demo-description">
        Used to show initial states of interface sections when no data to show.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Empty State</h3>
          <p className="text-sm text-gray-600 mb-4">
            Simple empty state with icon, title, and description.
          </p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24 text-primary">
                <Inbox size={96} />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any messages yet. When you receive messages, they will appear
                  here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Empty State with Action Button</h3>
          <p className="text-sm text-gray-600 mb-4">Empty state with a primary action button.</p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <FolderOpen className="text-[#2668C5]" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No files</EmptyTitle>
                <EmptyDescription>Get started by uploading your first file.</EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <Button>Upload File</Button>
              </EmptyActions>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Empty State with Button and Link</h3>
          <p className="text-sm text-gray-600 mb-4">
            Empty state with primary action and a secondary link.
          </p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <Search className="text-[#2668C5]" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  We couldn&apos;t find any results matching your search. Try adjusting your
                  filters.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <Button>Clear Filters</Button>
                <EmptyLinks>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    View all items
                  </a>
                </EmptyLinks>
              </EmptyActions>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Empty State with Multiple Links</h3>
          <p className="text-sm text-gray-600 mb-4">
            Empty state with button and multiple help links.
          </p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <Users className="text-[#2668C5]" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No team members</EmptyTitle>
                <EmptyDescription>
                  Start collaborating by inviting team members to your workspace.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <Button>Invite Team Members</Button>
                <EmptyLinks>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Learn more
                  </a>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    View documentation
                  </a>
                </EmptyLinks>
              </EmptyActions>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Empty State - Only Links</h3>
          <p className="text-sm text-gray-600 mb-4">
            Empty state with only links, no primary button.
          </p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <FileText className="text-[#2668C5]" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>No documents</EmptyTitle>
                <EmptyDescription>You haven&apos;t created any documents yet.</EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <EmptyLinks>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Browse templates
                  </a>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Import from file
                  </a>
                </EmptyLinks>
              </EmptyActions>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Empty State - Error</h3>
          <p className="text-sm text-gray-600 mb-4">Empty state for error scenarios.</p>
          <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <XCircle className="text-red-500" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>Failed to load content</EmptyTitle>
                <EmptyDescription>
                  An error occurred while loading content. Please refresh the page and try again.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <Button>Try Again</Button>
                <EmptyLinks>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Details
                  </a>
                </EmptyLinks>
              </EmptyActions>
            </Empty>
          </div>
        </div>

        <div className="demo-item">
          <h3>Various Empty States</h3>
          <p className="text-sm text-gray-600 mb-4">
            Different empty state examples for common scenarios.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex min-h-[250px] items-center justify-center border rounded-lg bg-gray-50">
              <Empty>
                <EmptyIcon className="h-24 w-24">
                  <Database className="text-[#2668C5]" />
                </EmptyIcon>
                <EmptyHeader>
                  <EmptyTitle>No data available</EmptyTitle>
                  <EmptyDescription>There is no data to display at this time.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>

            <div className="flex min-h-[250px] items-center justify-center border rounded-lg bg-gray-50">
              <Empty>
                <EmptyIcon className="h-24 w-24">
                  <ShoppingCart className="text-[#2668C5]" />
                </EmptyIcon>
                <EmptyHeader>
                  <EmptyTitle>Cart is empty</EmptyTitle>
                  <EmptyDescription>Add items to your cart to get started.</EmptyDescription>
                </EmptyHeader>
                <EmptyActions>
                  <Button variant="outline">Browse Products</Button>
                </EmptyActions>
              </Empty>
            </div>

            <div className="flex min-h-[250px] items-center justify-center border rounded-lg bg-gray-50">
              <Empty>
                <EmptyIcon className="h-24 w-24">
                  <Calendar className="text-[#2668C5]" />
                </EmptyIcon>
                <EmptyHeader>
                  <EmptyTitle>No events scheduled</EmptyTitle>
                  <EmptyDescription>Create your first event to get started.</EmptyDescription>
                </EmptyHeader>
                <EmptyActions>
                  <Button>Create Event</Button>
                </EmptyActions>
              </Empty>
            </div>

            <div className="flex min-h-[250px] items-center justify-center border rounded-lg bg-gray-50">
              <Empty>
                <EmptyIcon className="h-24 w-24">
                  <Mail className="text-[#2668C5]" />
                </EmptyIcon>
                <EmptyHeader>
                  <EmptyTitle>Inbox is empty</EmptyTitle>
                  <EmptyDescription>You&apos;re all caught up!</EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Discovery Agent Example</h3>
          <p className="text-sm text-gray-600 mb-4">
            Complex empty state with detailed description and multiple actions.
          </p>
          <div className="flex min-h-[350px] items-center justify-center border rounded-lg bg-gray-50">
            <Empty>
              <EmptyIcon className="h-24 w-24">
                <AlertCircle className="text-[#2668C5]" />
              </EmptyIcon>
              <EmptyHeader>
                <EmptyTitle>Discovery agent</EmptyTitle>
                <EmptyDescription>
                  The discovery agent will locate the Hyper-V addresses for using NetBIOS discovery,
                  and Service Discovery (SRVS), and Acronis Resource Protocol (ARP) table.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyActions>
                <Button>Configure</Button>
                <EmptyLinks>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Learn more
                  </a>
                  <a href="#" className="text-sm font-semibold text-[#2668C5] hover:underline">
                    Settings
                  </a>
                </EmptyLinks>
              </EmptyActions>
            </Empty>
          </div>
        </div>
      </div>
    </section>
  )
}
