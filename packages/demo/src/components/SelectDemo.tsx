import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'

export function SelectDemo() {
  const [value1, setValue1] = React.useState('')
  // const [value2, setValue2] = React.useState('')

  return (
    <section className="demo-section">
      <h2>Select Component</h2>
      <p className="demo-description">
        Used when the values are predefined by the system and the user needs to select one or more
        values from the list.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Select</h3>
          <p className="text-sm text-gray-600 mb-4">Simple select dropdown with options.</p>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-item">
          <h3>With Label</h3>
          <p className="text-sm text-gray-600 mb-4">Select with a label above it.</p>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country" className="w-[280px]">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="demo-item">
          <h3>Controlled Select</h3>
          <p className="text-sm text-gray-600 mb-4">Select with controlled state.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={value1} onValueChange={setValue1}>
                <SelectTrigger id="framework" className="w-[280px]">
                  <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="solid">Solid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {value1 && <p className="text-sm text-gray-600">Selected framework: {value1}</p>}
          </div>
        </div>

        <div className="demo-item">
          <h3>With Groups</h3>
          <p className="text-sm text-gray-600 mb-4">Select with grouped options.</p>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-item">
          <h3>Disabled Options</h3>
          <p className="text-sm text-gray-600 mb-4">Select with some disabled options.</p>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise" disabled>
                Enterprise (Coming Soon)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-item">
          <h3>Disabled Select</h3>
          <p className="text-sm text-gray-600 mb-4">Completely disabled select.</p>
          <Select disabled>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-item">
          <h3>Different Widths</h3>
          <p className="text-sm text-gray-600 mb-4">Select components with various widths.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Small (w-48)</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s">Small</SelectItem>
                  <SelectItem value="m">Medium</SelectItem>
                  <SelectItem value="l">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Medium (w-64)</Label>
              <Select>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Large (w-96)</Label>
              <Select>
                <SelectTrigger className="w-96">
                  <SelectValue placeholder="Select a longer option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option with longer text</SelectItem>
                  <SelectItem value="option2">Another option with more text</SelectItem>
                  <SelectItem value="option3">Yet another lengthy option</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Full Width</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select full width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full1">Full width option 1</SelectItem>
                  <SelectItem value="full2">Full width option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In a Form</h3>
          <p className="text-sm text-gray-600 mb-4">Select used within a form context.</p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <h4 className="font-semibold">User Preferences</h4>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notifications">Notification Frequency</Label>
              <Select>
                <SelectTrigger id="notifications">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Multiple Selects</h3>
          <p className="text-sm text-gray-600 mb-4">Multiple select components in a grid.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                  <SelectItem value="alice">Alice Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Long List of Options</h3>
          <p className="text-sm text-gray-600 mb-4">Select with scrollable content.</p>
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="af">Afghanistan</SelectItem>
              <SelectItem value="al">Albania</SelectItem>
              <SelectItem value="dz">Algeria</SelectItem>
              <SelectItem value="ar">Argentina</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="at">Austria</SelectItem>
              <SelectItem value="bd">Bangladesh</SelectItem>
              <SelectItem value="be">Belgium</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="cl">Chile</SelectItem>
              <SelectItem value="cn">China</SelectItem>
              <SelectItem value="co">Colombia</SelectItem>
              <SelectItem value="dk">Denmark</SelectItem>
              <SelectItem value="eg">Egypt</SelectItem>
              <SelectItem value="fi">Finland</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="gr">Greece</SelectItem>
              <SelectItem value="in">India</SelectItem>
              <SelectItem value="id">Indonesia</SelectItem>
              <SelectItem value="ie">Ireland</SelectItem>
              <SelectItem value="il">Israel</SelectItem>
              <SelectItem value="it">Italy</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="mx">Mexico</SelectItem>
              <SelectItem value="nl">Netherlands</SelectItem>
              <SelectItem value="nz">New Zealand</SelectItem>
              <SelectItem value="no">Norway</SelectItem>
              <SelectItem value="pk">Pakistan</SelectItem>
              <SelectItem value="pl">Poland</SelectItem>
              <SelectItem value="pt">Portugal</SelectItem>
              <SelectItem value="ru">Russia</SelectItem>
              <SelectItem value="sa">Saudi Arabia</SelectItem>
              <SelectItem value="sg">Singapore</SelectItem>
              <SelectItem value="za">South Africa</SelectItem>
              <SelectItem value="kr">South Korea</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
              <SelectItem value="se">Sweden</SelectItem>
              <SelectItem value="ch">Switzerland</SelectItem>
              <SelectItem value="th">Thailand</SelectItem>
              <SelectItem value="tr">Turkey</SelectItem>
              <SelectItem value="ua">Ukraine</SelectItem>
              <SelectItem value="ae">United Arab Emirates</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="vn">Vietnam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="demo-item">
          <h3>With Default Value</h3>
          <p className="text-sm text-gray-600 mb-4">Select with a pre-selected default value.</p>
          <Select defaultValue="medium">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
