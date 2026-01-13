import * as React from 'react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'
import { Popover, PopoverContent, PopoverTrigger } from '@acronis-platform/shadcn-uikit/react'
import { Calendar } from '@acronis-platform/shadcn-uikit/react'
import { Settings, HelpCircle, Info, Bell, User, Filter } from 'lucide-react'

export function PopoverDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <section className="demo-section">
      <h2>Popover Component</h2>
      <p className="demo-description">
        Used to provide additional information and actions related to the selected object when
        clicked.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Popover</h3>
          <p className="text-sm text-gray-600 mb-4">Simple popover with text content.</p>
          <div className="flex justify-center rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Popover with Form</h3>
          <p className="text-sm text-gray-600 mb-4">Popover containing form inputs.</p>
          <div className="flex justify-center rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Settings</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Popover with Calendar</h3>
          <p className="text-sm text-gray-600 mb-4">Popover containing a calendar picker.</p>
          <div className="flex justify-center rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {date ? date.toLocaleDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Popover with Actions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Popover with multiple action buttons matching Figma design.
          </p>
          <div className="flex justify-center rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Info className="mr-2 h-4 w-4" />
                  Show Info
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Title</h4>
                    <p className="text-sm text-muted-foreground">
                      The discovery agent will obtain the neighbor IP addresses by using NetBIOS
                      discovery, Web Service Discovery (WSD), and Address Resolution Protocol (ARP)
                      table.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 text-primary">
                      <span className="mr-2 h-4 w-4 rounded bg-primary" />
                      First action
                    </Button>
                    <Button variant="link" className="h-auto p-0 text-primary">
                      <span className="mr-2 h-4 w-4 rounded bg-primary" />
                      Second action
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Placements</h3>
          <p className="text-sm text-gray-600 mb-4">Popovers positioned at different sides.</p>
          <div className="flex flex-wrap justify-center gap-4 rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Top</Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-64">
                <p className="text-sm">This popover appears on top.</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-64">
                <p className="text-sm">This popover appears on bottom.</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Left</Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-64">
                <p className="text-sm">This popover appears on left.</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Right</Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-64">
                <p className="text-sm">This popover appears on right.</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Alignments</h3>
          <p className="text-sm text-gray-600 mb-4">Popovers with different alignment options.</p>
          <div className="flex flex-wrap justify-center gap-4 rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align Start</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64">
                <p className="text-sm">Aligned to the start.</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align Center</Button>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-64">
                <p className="text-sm">Aligned to the center.</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Align End</Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64">
                <p className="text-sm">Aligned to the end.</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Icon Triggers</h3>
          <p className="text-sm text-gray-600 mb-4">Popovers triggered by icon buttons.</p>
          <div className="flex flex-wrap justify-center gap-4 rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Help</h4>
                  <p className="text-sm text-muted-foreground">
                    Need assistance? Click here to access our help documentation and support
                    resources.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize your preferences and configure application settings.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    You have 3 new notifications. Click to view all.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    View and edit your profile information.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Filter Popover</h3>
          <p className="text-sm text-gray-600 mb-4">Popover with filter options and checkboxes.</p>
          <div className="flex justify-center rounded-lg border p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-semibold">Filter Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="option1" className="h-4 w-4" />
                      <label htmlFor="option1" className="text-sm">
                        Show completed items
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="option2" className="h-4 w-4" />
                      <label htmlFor="option2" className="text-sm">
                        Show archived items
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="option3" className="h-4 w-4" />
                      <label htmlFor="option3" className="text-sm">
                        Show deleted items
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="ghost" size="sm">
                      Clear
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  )
}
