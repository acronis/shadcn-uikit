import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@acronis-platform/shadcn-uikit/react'
import { Info } from 'lucide-react'

export function TooltipDemo() {
  return (
    <section className="demo-section">
      <h2>Tooltip Component</h2>
      <p className="demo-description">
        Used as an overlay object that provides context or explains the function of a UI element. It
        cannot contain a clickable element inside itself and is called on hovering.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Basic Tooltip</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="demo-item">
          <h3>Tooltip with Icon</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-full w-6 h-6 bg-gray-200 hover:bg-gray-300 transition-colors">
                  <Info className="w-4 h-4 text-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="demo-item">
          <h3>Tooltip Positions</h3>
          <div className="flex flex-col gap-8 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex gap-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Left</Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Tooltip on left</p>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Right</Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Tooltip on right</p>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="demo-item">
          <h3>Tooltip with Longer Text</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover for details</Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  This is a longer tooltip text that provides more detailed information about the
                  element.
                </p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="demo-item">
          <h3>Tooltip with Custom Delay</h3>
          <TooltipProvider delayDuration={800}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Slow to appear</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip has a longer delay</p>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="demo-item">
          <h3>Multiple Tooltips</h3>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default">Save</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save your changes</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Cancel</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discard changes</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete permanently</p>
                  <TooltipArrow />
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}
