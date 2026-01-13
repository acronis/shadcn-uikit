import * as React from 'react'
import { Progress } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function ProgressDemo() {
  const [progress1, setProgress1] = React.useState(13)
  const [progress2, setProgress2] = React.useState(50)
  const [progress3, setProgress3] = React.useState(75)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress1(66), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    setProgress2(0)
    const interval = setInterval(() => {
      setProgress2((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <section className="demo-section">
      <h2>Progress Component</h2>
      <p className="demo-description">
        Used to visually represent the progress of a particular process. It shows how much of the
        task has been completed and how much is remaining.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Progress Bar</h3>
          <p className="text-sm text-gray-600 mb-4">Simple linear progress indicator.</p>
          <div className="space-y-4">
            <Progress value={progress1} className="w-full" />
            <p className="text-sm text-gray-600">{progress1}% complete</p>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Progress Values</h3>
          <p className="text-sm text-gray-600 mb-4">
            Progress bars showing various completion states.
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>25% Complete</span>
                <span className="text-gray-500">25%</span>
              </div>
              <Progress value={25} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>50% Complete</span>
                <span className="text-gray-500">50%</span>
              </div>
              <Progress value={50} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>75% Complete</span>
                <span className="text-gray-500">75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Task Completed</span>
                <span className="text-gray-500">100%</span>
              </div>
              <Progress value={100} className="w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Labels</h3>
          <p className="text-sm text-gray-600 mb-4">Progress bars with descriptive labels.</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm">Uploading files...</p>
              <Progress value={33} className="w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Processing data...</p>
              <Progress value={67} className="w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Installation complete</p>
              <Progress value={100} className="w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Time Remaining</h3>
          <p className="text-sm text-gray-600 mb-4">
            Progress bars showing estimated time remaining.
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm">12 minutes remaining...</p>
              <Progress value={30} className="w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">5 minutes remaining...</p>
              <Progress value={60} className="w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Almost done...</p>
              <Progress value={90} className="w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Sizes</h3>
          <p className="text-sm text-gray-600 mb-4">Progress bars with various heights.</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm">Small (h-1)</p>
              <Progress value={50} className="h-1 w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Default (h-2)</p>
              <Progress value={50} className="h-2 w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Medium (h-3)</p>
              <Progress value={50} className="h-3 w-full" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Large (h-4)</p>
              <Progress value={50} className="h-4 w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Animated Progress</h3>
          <p className="text-sm text-gray-600 mb-4">Progress bar that animates automatically.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Loading...</span>
                <span className="text-gray-500">{progress2}%</span>
              </div>
              <Progress value={progress2} className="w-full" />
            </div>
            <Button onClick={handleStart} size="sm">
              Start Progress
            </Button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Multiple Progress Bars</h3>
          <p className="text-sm text-gray-600 mb-4">
            Multiple progress indicators for different tasks.
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Downloading assets</span>
                <span className="text-gray-500">85%</span>
              </div>
              <Progress value={85} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Installing dependencies</span>
                <span className="text-gray-500">60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Configuring settings</span>
                <span className="text-gray-500">40%</span>
              </div>
              <Progress value={40} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Running tests</span>
                <span className="text-gray-500">20%</span>
              </div>
              <Progress value={20} className="w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Widths</h3>
          <p className="text-sm text-gray-600 mb-4">Progress bars with various widths.</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm">Small width</p>
              <Progress value={50} className="w-48" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Medium width</p>
              <Progress value={50} className="w-64" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Large width</p>
              <Progress value={50} className="w-96" />
            </div>

            <div className="space-y-2">
              <p className="text-sm">Full width</p>
              <Progress value={50} className="w-full" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In Cards</h3>
          <p className="text-sm text-gray-600 mb-4">Progress bars used within card components.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Project Alpha</h4>
              <p className="mb-4 text-sm text-gray-600">Development in progress</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-gray-500">65%</span>
                </div>
                <Progress value={65} className="w-full" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Project Beta</h4>
              <p className="mb-4 text-sm text-gray-600">Testing phase</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-gray-500">90%</span>
                </div>
                <Progress value={90} className="w-full" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Project Gamma</h4>
              <p className="mb-4 text-sm text-gray-600">Planning stage</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-gray-500">25%</span>
                </div>
                <Progress value={25} className="w-full" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Project Delta</h4>
              <p className="mb-4 text-sm text-gray-600">Completed</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-gray-500">100%</span>
                </div>
                <Progress value={100} className="w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Interactive Progress</h3>
          <p className="text-sm text-gray-600 mb-4">Manually adjustable progress indicator.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Adjust progress</span>
                <span className="text-gray-500">{progress3}%</span>
              </div>
              <Progress value={progress3} className="w-full" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setProgress3(Math.max(0, progress3 - 10))} size="sm">
                -10%
              </Button>
              <Button onClick={() => setProgress3(Math.min(100, progress3 + 10))} size="sm">
                +10%
              </Button>
              <Button onClick={() => setProgress3(0)} variant="outline" size="sm">
                Reset
              </Button>
              <Button onClick={() => setProgress3(100)} variant="outline" size="sm">
                Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
