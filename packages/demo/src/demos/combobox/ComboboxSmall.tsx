import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@acronis-platform/shadcn-uikit/react'
import { Popover, PopoverContent, PopoverTrigger } from '@acronis-platform/shadcn-uikit/react'

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' },
]

export function ComboboxSmall() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-8 w-[200px] justify-between text-sm"
          />
        }
      >
        {value
          ? statuses.find((status) => status.value === value)?.label
          : 'Select status...'}
        <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-8" />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-3 w-3',
                      value === status.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
