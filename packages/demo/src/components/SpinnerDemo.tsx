import * as React from 'react'
import { Spinner } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acronis-platform/shadcn-uikit/react'

export function SpinnerDemo() {
  const [loading, setLoading] = React.useState(false)
  const [dataLoading, setDataLoading] = React.useState(false)

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  const simulateDataLoad = () => {
    setDataLoading(true)
    setTimeout(() => setDataLoading(false), 2000)
  }

  return (
    <section className="demo-section">
      <h2>Spinner (Loading) Component</h2>
      <p className="demo-description">
        Loading indicators to show progress and inform users that content is being loaded.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Spinner</h3>
          <p className="text-sm text-gray-600 mb-4">Simple spinner without any text.</p>
          <Spinner />
        </div>

        <div className="demo-item">
          <h3>Spinner Sizes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Different spinner sizes: small, medium, large, and extra large.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-muted-foreground">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-muted-foreground">Large</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="xl" />
              <span className="text-xs text-muted-foreground">Extra Large</span>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Spinner with Text</h3>
          <p className="text-sm text-gray-600 mb-4">Spinner with accompanying text label.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Spinner size="sm" />
              <span className="text-sm text-[hsl(var(--loading-text))]">Data is loading...</span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner size="md" />
              <span className="text-sm text-[hsl(var(--loading-text))]">Please wait...</span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner size="lg" />
              <span className="text-base text-[hsl(var(--loading-text))]">Loading content...</span>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Centered Loading State</h3>
          <p className="text-sm text-gray-600 mb-4">
            Centered spinner for full-page or container loading states.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-12">
            <Spinner size="lg" />
            <div className="text-center">
              <p className="text-sm font-medium text-[hsl(var(--loading-text))]">Loading...</p>
              <p className="text-xs text-[hsl(var(--loading-text-secondary)/0.7)] mt-1">
                Please wait while we fetch your data
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Button with Loading State</h3>
          <p className="text-sm text-gray-600 mb-4">
            Button showing loading spinner when action is in progress.
          </p>
          <div className="flex gap-3">
            <Button onClick={simulateLoading} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Loading...
                </>
              ) : (
                'Click to Load'
              )}
            </Button>
            <Button variant="outline" onClick={simulateLoading} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Processing...
                </>
              ) : (
                'Process Data'
              )}
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Card with Loading State</h3>
          <p className="text-sm text-gray-600 mb-4">Card component showing loading state.</p>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>View your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              {dataLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Spinner size="lg" />
                  <p className="text-sm text-[hsl(var(--loading-text-secondary)/0.7)] mt-4">
                    Loading profile data...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                  <Button onClick={simulateDataLoad} variant="outline" className="w-full">
                    Reload Data
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Inline Loading</h3>
          <p className="text-sm text-gray-600 mb-4">
            Inline spinner for loading within text or small components.
          </p>
          <div className="space-y-3">
            <p className="text-sm">
              <Spinner size="sm" className="inline-block align-middle mr-2" />
              Fetching latest updates...
            </p>
            <p className="text-sm">
              Your request is being processed
              <Spinner size="sm" className="inline-block align-middle ml-2" />
            </p>
          </div>
        </div>

        <div className="demo-item">
          <h3>Loading Overlay</h3>
          <p className="text-sm text-gray-600 mb-4">
            Full overlay loading state for blocking interactions.
          </p>
          <div className="relative rounded-lg border p-8">
            <div className="space-y-4">
              <h4 className="font-medium">Content Area</h4>
              <p className="text-sm text-muted-foreground">
                This is some content that will be covered by the loading overlay.
              </p>
              <Button onClick={() => setDataLoading(!dataLoading)}>
                {dataLoading ? 'Hide' : 'Show'} Loading Overlay
              </Button>
            </div>
            {dataLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" />
                  <p className="text-sm font-medium text-[hsl(var(--loading-text))]">Loading...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="demo-item">
          <h3>Custom Colors</h3>
          <p className="text-sm text-gray-600 mb-4">Spinners with custom colors.</p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-blue-500" />
              <span className="text-xs text-muted-foreground">Blue</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-green-500" />
              <span className="text-xs text-muted-foreground">Green</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-orange-500" />
              <span className="text-xs text-muted-foreground">Orange</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-red-500" />
              <span className="text-xs text-muted-foreground">Red</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-purple-500" />
              <span className="text-xs text-muted-foreground">Purple</span>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Loading States Grid</h3>
          <p className="text-sm text-gray-600 mb-4">Common loading state patterns.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-6 flex flex-col items-center justify-center gap-3">
              <Spinner size="md" />
              <p className="text-sm text-center text-[hsl(var(--loading-text))]">Data is loading</p>
            </div>
            <div className="rounded-lg border p-6 flex flex-col items-center justify-center gap-3">
              <Spinner size="md" />
              <div className="text-center">
                <p className="text-sm font-medium text-[hsl(var(--loading-text))]">
                  Data is loading
                </p>
                <p className="text-xs text-[hsl(var(--loading-text-secondary)/0.7)] mt-1">
                  Wait until it is completed.
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-6 flex flex-col items-center justify-center gap-3">
              <Spinner size="lg" />
              <div className="text-center">
                <p className="text-sm font-medium text-[hsl(var(--loading-text))]">
                  Data is loading
                </p>
                <p className="text-xs text-[hsl(var(--loading-text-secondary)/0.7)] mt-1">
                  Wait until it is completed.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Action
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-3">
                <Spinner size="sm" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[hsl(var(--loading-text))]">
                    Processing request
                  </p>
                  <p className="text-xs text-[hsl(var(--loading-text-secondary)/0.7)] mt-1">
                    This may take a few moments...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>List Loading Skeleton</h3>
          <p className="text-sm text-gray-600 mb-4">Loading state for list items.</p>
          <div className="space-y-2 rounded-lg border p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded border">
                <Spinner size="sm" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
