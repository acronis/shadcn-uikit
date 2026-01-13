import * as React from 'react'
import { Label } from '@acronis-platform/shadcn-uikit/react'
import { RadioGroup, RadioGroupItem } from '@acronis-platform/shadcn-uikit/react'

export function RadioGroupDemo() {
  const [value1, setValue1] = React.useState('option-one')
  const [value2, setValue2] = React.useState('comfortable')
  const [value3, setValue3] = React.useState('card')

  return (
    <section className="demo-section">
      <h2>Radio Group Component</h2>
      <p className="demo-description">
        Used when a group of options is mutually exclusive and only one option can be selected from
        that group.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Radio Group</h3>
          <p className="text-sm text-gray-600 mb-4">Simple radio group with labels.</p>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three">Option Three</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>Controlled Radio Group</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group with controlled state.</p>
          <div className="space-y-4">
            <RadioGroup value={value1} onValueChange={setValue1}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="r1-option-one" />
                <Label htmlFor="r1-option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="r1-option-two" />
                <Label htmlFor="r1-option-two">Option Two</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="r1-option-three" />
                <Label htmlFor="r1-option-three">Option Three</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-gray-600">Selected: {value1}</p>
          </div>
        </div>

        <div className="demo-item">
          <h3>With Descriptions</h3>
          <p className="text-sm text-gray-600 mb-4">Radio options with descriptive text.</p>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="default" id="r2-default" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="r2-default">Default</Label>
                <p className="text-sm text-muted-foreground">The default spacing for components.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="comfortable" id="r2-comfortable" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="r2-comfortable">Comfortable</Label>
                <p className="text-sm text-muted-foreground">
                  Increased spacing for better readability.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="compact" id="r2-compact" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="r2-compact">Compact</Label>
                <p className="text-sm text-muted-foreground">
                  Reduced spacing to fit more content.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>Disabled Options</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group with some disabled options.</p>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="r3-option-one" />
              <Label htmlFor="r3-option-one">Available Option</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="r3-option-two" disabled />
              <Label htmlFor="r3-option-two" className="opacity-50">
                Disabled Option
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="r3-option-three" />
              <Label htmlFor="r3-option-three">Another Available Option</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-four" id="r3-option-four" disabled />
              <Label htmlFor="r3-option-four" className="opacity-50">
                Another Disabled Option
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>Horizontal Layout</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group displayed horizontally.</p>
          <RadioGroup defaultValue="yes" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r4-yes" />
              <Label htmlFor="r4-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r4-no" />
              <Label htmlFor="r4-no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="r4-maybe" />
              <Label htmlFor="r4-maybe">Maybe</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>In a Form</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group used within a form context.</p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Notification Preferences</h4>
              <p className="text-sm text-gray-600">How would you like to receive notifications?</p>
            </div>
            <RadioGroup defaultValue="email">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="email" id="notify-email" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="notify-email">Email</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="sms" id="notify-sms" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="notify-sms">SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via text message.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="push" id="notify-push" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="notify-push">Push Notification</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="none" id="notify-none" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="notify-none">None</Label>
                  <p className="text-sm text-muted-foreground">Do not send me any notifications.</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="demo-item">
          <h3>Payment Method Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group for selecting payment methods.</p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <h4 className="font-semibold">Select Payment Method</h4>
            <RadioGroup defaultValue="credit-card">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="credit-card" id="pay-credit" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="pay-credit">Credit Card</Label>
                  <p className="text-sm text-muted-foreground">
                    Pay with Visa, Mastercard, or American Express.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="paypal" id="pay-paypal" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="pay-paypal">PayPal</Label>
                  <p className="text-sm text-muted-foreground">
                    Pay securely using your PayPal account.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank-transfer" id="pay-bank" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="pay-bank">Bank Transfer</Label>
                  <p className="text-sm text-muted-foreground">
                    Direct transfer from your bank account.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="demo-item">
          <h3>Card Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group with card-style options.</p>
          <RadioGroup value={value3} onValueChange={setValue3}>
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  value3 === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                onClick={() => setValue3('card')}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="card" id="plan-card" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="plan-card" className="cursor-pointer">
                      Card View
                    </Label>
                    <p className="text-sm text-muted-foreground">Display items as cards</p>
                  </div>
                </div>
              </div>

              <div
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  value3 === 'list' ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                onClick={() => setValue3('list')}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="list" id="plan-list" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="plan-list" className="cursor-pointer">
                      List View
                    </Label>
                    <p className="text-sm text-muted-foreground">Display items as a list</p>
                  </div>
                </div>
              </div>

              <div
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  value3 === 'grid' ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
                onClick={() => setValue3('grid')}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="grid" id="plan-grid" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="plan-grid" className="cursor-pointer">
                      Grid View
                    </Label>
                    <p className="text-sm text-muted-foreground">Display items in a grid</p>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>Size Options</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group for selecting sizes.</p>
          <RadioGroup defaultValue="medium" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="size-small" />
              <Label htmlFor="size-small">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="size-medium" />
              <Label htmlFor="size-medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="size-large" />
              <Label htmlFor="size-large">Large</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xlarge" id="size-xlarge" />
              <Label htmlFor="size-xlarge">X-Large</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="demo-item">
          <h3>Priority Selection</h3>
          <p className="text-sm text-gray-600 mb-4">Radio group for selecting priority levels.</p>
          <RadioGroup defaultValue="medium" value={value2} onValueChange={setValue2}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="low" id="priority-low" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="priority-low">Low Priority</Label>
                <p className="text-sm text-muted-foreground">Can be completed when time permits.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="medium" id="priority-medium" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="priority-medium">Medium Priority</Label>
                <p className="text-sm text-muted-foreground">Should be completed within a week.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="high" id="priority-high" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="priority-high">High Priority</Label>
                <p className="text-sm text-muted-foreground">Needs immediate attention.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="urgent" id="priority-urgent" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="priority-urgent">Urgent</Label>
                <p className="text-sm text-muted-foreground">
                  Critical issue requiring immediate action.
                </p>
              </div>
            </div>
          </RadioGroup>
          <p className="mt-4 text-sm text-gray-600">Selected priority: {value2}</p>
        </div>
      </div>
    </section>
  )
}
