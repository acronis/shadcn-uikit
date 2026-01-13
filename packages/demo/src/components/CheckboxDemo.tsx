import * as React from 'react'
import { Checkbox } from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false)
  const [indeterminate, setIndeterminate] = React.useState<boolean | 'indeterminate'>(
    'indeterminate'
  )
  const [items, setItems] = React.useState([
    { id: '1', label: 'Item 1', checked: false },
    { id: '2', label: 'Item 2', checked: false },
    { id: '3', label: 'Item 3', checked: false },
  ])

  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)
  const parentChecked = allChecked ? true : someChecked ? 'indeterminate' : false

  return (
    <section className="demo-section">
      <h2>Checkbox Component</h2>
      <p className="demo-description">
        A control that allows the user to toggle between checked and not checked states.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Checkbox</h3>
          <p className="text-sm text-gray-600 mb-4">Simple checkbox without label.</p>
          <Checkbox />
        </div>

        <div className="demo-item">
          <h3>With Label</h3>
          <p className="text-sm text-gray-600 mb-4">Checkbox with associated label.</p>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              Accept terms and conditions
            </Label>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Label and Description</h3>
          <p className="text-sm text-gray-600 mb-4">Checkbox with label and description text.</p>
          <div className="flex items-start space-x-2">
            <Checkbox id="marketing" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="marketing"
                className="text-sm font-normal cursor-pointer text-[hsl(var(--checkbox-label))]"
              >
                Marketing emails
              </Label>
              <p className="text-sm text-[hsl(var(--checkbox-description)/0.7)]">
                Receive emails about new products, features, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Controlled Checkbox</h3>
          <p className="text-sm text-gray-600 mb-4">Checkbox with controlled state.</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="controlled" checked={checked} onCheckedChange={setChecked} />
              <Label htmlFor="controlled" className="text-sm font-normal cursor-pointer">
                {checked ? 'Checked' : 'Unchecked'}
              </Label>
            </div>
            <button
              onClick={() => setChecked(!checked)}
              className="text-sm text-primary hover:underline"
            >
              Toggle checkbox
            </button>
          </div>
        </div>

        <div className="demo-item">
          <h3>Indeterminate State</h3>
          <p className="text-sm text-gray-600 mb-4">Checkbox with indeterminate (mixed) state.</p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="indeterminate"
              checked={indeterminate}
              onCheckedChange={setIndeterminate}
            />
            <Label htmlFor="indeterminate" className="text-sm font-normal cursor-pointer">
              {indeterminate === 'indeterminate'
                ? 'Indeterminate'
                : indeterminate
                  ? 'Checked'
                  : 'Unchecked'}
            </Label>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <p className="text-sm text-gray-600 mb-4">Disabled checkboxes in different states.</p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-unchecked" disabled />
              <Label
                htmlFor="disabled-unchecked"
                className="text-sm font-normal text-[hsl(var(--checkbox-disabled-text)/0.4)]"
              >
                Disabled unchecked
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checked" disabled checked />
              <Label
                htmlFor="disabled-checked"
                className="text-sm font-normal text-[hsl(var(--checkbox-disabled-text)/0.4)]"
              >
                Disabled checked
              </Label>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Parent-Child Checkboxes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Parent checkbox with indeterminate state based on children.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parent"
                checked={parentChecked}
                onCheckedChange={(checked) => {
                  const newChecked = checked === true
                  setItems(items.map((item) => ({ ...item, checked: newChecked })))
                }}
              />
              <Label htmlFor="parent" className="text-sm font-medium cursor-pointer">
                Select all
              </Label>
            </div>
            <div className="ml-6 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={(checked) => {
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? { ...i, checked: checked === true } : i
                        )
                      )
                    }}
                  />
                  <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Form Example</h3>
          <p className="text-sm text-gray-600 mb-4">Checkboxes in a form context.</p>
          <form className="space-y-4 rounded-lg border p-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox id="notifications" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notifications"
                    className="text-sm font-normal cursor-pointer text-[hsl(var(--checkbox-label))]"
                  >
                    Enable notifications
                  </Label>
                  <p className="text-sm text-[hsl(var(--checkbox-description)/0.7)]">
                    Get notified when someone mentions you
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="updates" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="updates"
                    className="text-sm font-normal cursor-pointer text-[hsl(var(--checkbox-label))]"
                  >
                    Product updates
                  </Label>
                  <p className="text-sm text-[hsl(var(--checkbox-description)/0.7)]">
                    Receive updates about new features
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="newsletter" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="newsletter"
                    className="text-sm font-normal cursor-pointer text-[hsl(var(--checkbox-label))]"
                  >
                    Newsletter
                  </Label>
                  <p className="text-sm text-[hsl(var(--checkbox-description)/0.7)]">
                    Weekly digest of what&apos;s new
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="demo-item">
          <h3>Multiple Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Multiple checkboxes for selecting options.</p>
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm font-medium mb-3">Select your interests:</p>
            <div className="flex items-center space-x-2">
              <Checkbox id="design" />
              <Label htmlFor="design" className="text-sm font-normal cursor-pointer">
                Design
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="development" />
              <Label htmlFor="development" className="text-sm font-normal cursor-pointer">
                Development
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm font-normal cursor-pointer">
                Marketing
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sales" />
              <Label htmlFor="sales" className="text-sm font-normal cursor-pointer">
                Sales
              </Label>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Checkbox List</h3>
          <p className="text-sm text-gray-600 mb-4">List of items with checkboxes.</p>
          <div className="space-y-1 rounded-lg border">
            {['Task 1', 'Task 2', 'Task 3', 'Task 4'].map((task, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border-b p-3 last:border-b-0 hover:bg-muted/50"
              >
                <Checkbox id={`task-${index}`} />
                <Label
                  htmlFor={`task-${index}`}
                  className="flex-1 text-sm font-normal cursor-pointer"
                >
                  {task}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="demo-item">
          <h3>Checkbox States Overview</h3>
          <p className="text-sm text-gray-600 mb-4">All checkbox states in one view.</p>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">Unchecked States</p>
              <div className="flex items-center space-x-2">
                <Checkbox id="state-default" />
                <Label htmlFor="state-default" className="text-sm font-normal">
                  Default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="state-disabled-unchecked" disabled />
                <Label
                  htmlFor="state-disabled-unchecked"
                  className="text-sm font-normal text-[hsl(var(--checkbox-disabled-text)/0.4)]"
                >
                  Disabled
                </Label>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Checked States</p>
              <div className="flex items-center space-x-2">
                <Checkbox id="state-checked" checked />
                <Label htmlFor="state-checked" className="text-sm font-normal">
                  Checked
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="state-indeterminate" checked="indeterminate" />
                <Label htmlFor="state-indeterminate" className="text-sm font-normal">
                  Indeterminate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="state-disabled-checked" disabled checked />
                <Label
                  htmlFor="state-disabled-checked"
                  className="text-sm font-normal text-[hsl(var(--checkbox-disabled-text)/0.4)]"
                >
                  Disabled checked
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
