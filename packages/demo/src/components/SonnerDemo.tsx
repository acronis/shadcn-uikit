import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Toaster } from '@acronis-platform/shadcn-uikit/react'

export function SonnerDemo() {
  const [position, setPosition] = React.useState<
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  >('top-right')

  return (
    <section className="demo-section">
      <h2>Sonner (Toast) Component</h2>
      <p className="demo-description">
        Toast notifications for displaying temporary messages to users using Sonner library.
      </p>

      <Toaster position={position} />

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Toast</h3>
          <p className="text-sm text-gray-600 mb-4">Simple toast notification with a message.</p>
          <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
        </div>

        <div className="demo-item">
          <h3>Toast with Description</h3>
          <p className="text-sm text-gray-600 mb-4">Toast with title and description.</p>
          <Button
            onClick={() =>
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
              })
            }
          >
            Show Toast with Description
          </Button>
        </div>

        <div className="demo-item">
          <h3>Success Toast</h3>
          <p className="text-sm text-gray-600 mb-4">
            Success toast with green background and checkmark icon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.success('Successfully saved!')}>Success</Button>
            <Button
              onClick={() =>
                toast.success('Profile updated', {
                  description: 'Your profile has been updated successfully.',
                })
              }
            >
              Success with Description
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Info Toast</h3>
          <p className="text-sm text-gray-600 mb-4">
            Info toast with blue background and info icon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.info('New update available')}>Info</Button>
            <Button
              onClick={() =>
                toast.info('System notification', {
                  description: 'A new version is available for download.',
                })
              }
            >
              Info with Description
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Warning Toast</h3>
          <p className="text-sm text-gray-600 mb-4">
            Warning toast with yellow background and warning icon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.warning('Low disk space')}>Warning</Button>
            <Button
              onClick={() =>
                toast.warning('Storage warning', {
                  description: 'Your storage is almost full. Please free up some space.',
                })
              }
            >
              Warning with Description
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Error Toast</h3>
          <p className="text-sm text-gray-600 mb-4">
            Error toast with red background and error icon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
            <Button
              onClick={() =>
                toast.error('Failed to save', {
                  description: 'There was an error saving your changes. Please try again.',
                })
              }
            >
              Error with Description
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Loading Toast</h3>
          <p className="text-sm text-gray-600 mb-4">Loading toast with spinner icon.</p>
          <Button
            onClick={() => {
              const id = toast.loading('Loading...', {
                description: 'Please wait while we process your request.',
              })
              setTimeout(() => {
                toast.success('Completed!', {
                  id,
                  description: 'Your request has been processed.',
                })
              }, 2000)
            }}
          >
            Show Loading Toast
          </Button>
        </div>

        <div className="demo-item">
          <h3>Toast with Action</h3>
          <p className="text-sm text-gray-600 mb-4">Toast with an action button.</p>
          <Button
            onClick={() =>
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => toast.success('Undo successful'),
                },
              })
            }
          >
            Toast with Action
          </Button>
        </div>

        <div className="demo-item">
          <h3>Toast with Cancel Button</h3>
          <p className="text-sm text-gray-600 mb-4">Toast with a cancel button.</p>
          <Button
            onClick={() =>
              toast('Are you sure?', {
                description: 'This action cannot be undone.',
                cancel: {
                  label: 'Cancel',
                  onClick: () => console.log('Cancelled'),
                },
                action: {
                  label: 'Continue',
                  onClick: () => toast.success('Action completed'),
                },
              })
            }
          >
            Toast with Cancel
          </Button>
        </div>

        <div className="demo-item">
          <h3>Promise Toast</h3>
          <p className="text-sm text-gray-600 mb-4">Toast that updates based on promise state.</p>
          <Button
            onClick={() => {
              const promise = () =>
                new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000))

              toast.promise(promise, {
                loading: 'Loading...',
                success: (data: any) => {
                  return `${data.name} toast has been added`
                },
                error: 'Error',
              })
            }}
          >
            Promise Toast
          </Button>
        </div>

        <div className="demo-item">
          <h3>Custom Duration</h3>
          <p className="text-sm text-gray-600 mb-4">Toast with custom display duration.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast('This will disappear in 1 second', { duration: 1000 })}>
              1 Second
            </Button>
            <Button onClick={() => toast('This will stay for 10 seconds', { duration: 10000 })}>
              10 Seconds
            </Button>
            <Button onClick={() => toast('This will stay forever', { duration: Infinity })}>
              Infinite
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Rich Content Toast</h3>
          <p className="text-sm text-gray-600 mb-4">Toast with custom JSX content.</p>
          <Button
            onClick={() =>
              toast(
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">New message received</div>
                  <div className="text-sm">
                    <strong>John Doe:</strong> Hey, are you available for a quick call?
                  </div>
                </div>
              )
            }
          >
            Rich Content Toast
          </Button>
        </div>

        <div className="demo-item">
          <h3>Multiple Toasts</h3>
          <p className="text-sm text-gray-600 mb-4">Show multiple toasts at once.</p>
          <Button
            onClick={() => {
              toast.success('First notification')
              setTimeout(() => toast.info('Second notification'), 200)
              setTimeout(() => toast.warning('Third notification'), 400)
              setTimeout(() => toast.error('Fourth notification'), 600)
            }}
          >
            Show Multiple Toasts
          </Button>
        </div>

        <div className="demo-item">
          <h3>Dismissible Toasts</h3>
          <p className="text-sm text-gray-600 mb-4">Control toast dismissal behavior.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast('This can be dismissed', { dismissible: true })}>
              Dismissible
            </Button>
            <Button onClick={() => toast('This cannot be dismissed', { dismissible: false })}>
              Not Dismissible
            </Button>
            <Button onClick={() => toast.dismiss()}>Dismiss All</Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Toast Positions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click a button to change the toast position and show a toast.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => {
                setPosition('top-left')
                toast('Top Left Position')
              }}
            >
              Top Left
            </Button>
            <Button
              onClick={() => {
                setPosition('top-center')
                toast('Top Center Position')
              }}
            >
              Top Center
            </Button>
            <Button
              onClick={() => {
                setPosition('top-right')
                toast('Top Right Position')
              }}
            >
              Top Right
            </Button>
            <Button
              onClick={() => {
                setPosition('bottom-left')
                toast('Bottom Left Position')
              }}
            >
              Bottom Left
            </Button>
            <Button
              onClick={() => {
                setPosition('bottom-center')
                toast('Bottom Center Position')
              }}
            >
              Bottom Center
            </Button>
            <Button
              onClick={() => {
                setPosition('bottom-right')
                toast('Bottom Right Position')
              }}
            >
              Bottom Right
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Current position: <strong>{position}</strong>. Position is set globally on the Toaster
            component.
          </p>
        </div>

        <div className="demo-item">
          <h3>Real-world Examples</h3>
          <p className="text-sm text-gray-600 mb-4">Common use cases for toast notifications.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  toast.success('File uploaded', {
                    description: 'document.pdf has been uploaded successfully.',
                    action: {
                      label: 'View',
                      onClick: () => console.log('View file'),
                    },
                  })
                }
              >
                File Upload Success
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  toast.error('Connection lost', {
                    description: 'Unable to connect to the server. Retrying...',
                    action: {
                      label: 'Retry',
                      onClick: () => toast.info('Reconnecting...'),
                    },
                  })
                }
              >
                Connection Error
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  toast.info('New comment', {
                    description: 'Sarah commented on your post.',
                    action: {
                      label: 'View',
                      onClick: () => console.log('View comment'),
                    },
                  })
                }
              >
                Social Notification
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  toast.warning('Session expiring', {
                    description: 'Your session will expire in 5 minutes.',
                    action: {
                      label: 'Extend',
                      onClick: () => toast.success('Session extended'),
                    },
                  })
                }
              >
                Session Warning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
