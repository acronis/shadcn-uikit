import * as React from 'react'
import {
  BasicSelect,
  ControlledSelect,
  GroupedSelect,
  MultipleSelect,
  ObjectValuesSelect,
  DisabledSelect,
  FormattedValueSelect,
  ScrollableSelect,
} from '@/demos/select'

export function SelectDemo() {
  return (
    <section className="demo-section">
      <h2>Select Component (Base UI)</h2>
      <p className="demo-description mb-8 text-muted-foreground">
        Select component built with MUI Base UI.
        Provides accessible, unstyled primitives with full Tailwind CSS styling support.
        Features include controlled/uncontrolled state, multiple selection, object values, grouping, and custom formatting.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Select</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple select dropdown with predefined options.
          </p>
          <BasicSelect />
        </div>

        <div className="demo-item">
          <h3>Controlled Select</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with controlled state using React state management.
          </p>
          <ControlledSelect />
        </div>

        <div className="demo-item">
          <h3>Grouped Options</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with options organized into labeled groups.
          </p>
          <GroupedSelect />
        </div>

        <div className="demo-item">
          <h3>Multiple Selection</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select multiple values from the list. Uses array-based value state.
          </p>
          <MultipleSelect />
        </div>

        <div className="demo-item">
          <h3>Object Values</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with complex object values. Demonstrates custom equality comparison and string
            conversion functions.
          </p>
          <ObjectValuesSelect />
        </div>

        <div className="demo-item">
          <h3>Disabled States</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Examples of disabled select and individual disabled options.
          </p>
          <DisabledSelect />
        </div>

        <div className="demo-item">
          <h3>Formatted Value Display</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Custom rendering of selected values with icons and formatting.
          </p>
          <FormattedValueSelect />
        </div>

        <div className="demo-item">
          <h3>Scrollable List</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with a long list of options demonstrating scroll behavior and keyboard
            navigation.
          </p>
          <ScrollableSelect />
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">Key Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Built on MUI Base UI primitives for maximum accessibility</li>
          <li>Full keyboard navigation support (Arrow keys, Enter, Escape, Home, End)</li>
          <li>Typeahead functionality for quick item selection</li>
          <li>Supports single and multiple selection modes</li>
          <li>Object values with custom comparison and formatting</li>
          <li>Grouped options with labels</li>
          <li>Customizable positioning and alignment</li>
          <li>Fully styled with Tailwind CSS</li>
        </ul>
      </div>
    </section>
  )
}
