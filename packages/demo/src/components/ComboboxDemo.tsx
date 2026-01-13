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

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
]

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
]

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' },
]

export function ComboboxDemo() {
  const [frameworkOpen, setFrameworkOpen] = React.useState(false)
  const [frameworkValue, setFrameworkValue] = React.useState('')

  const [languageOpen, setLanguageOpen] = React.useState(false)
  const [languageValue, setLanguageValue] = React.useState('')

  const [countryOpen, setCountryOpen] = React.useState(false)
  const [countryValue, setCountryValue] = React.useState('')

  const [statusOpen, setStatusOpen] = React.useState(false)
  const [statusValue, setStatusValue] = React.useState('')

  const [smallOpen, setSmallOpen] = React.useState(false)
  const [smallValue, setSmallValue] = React.useState('')

  return (
    <section className="demo-section">
      <h2>Combobox Component</h2>
      <p className="demo-description">
        Allows users not only to select a value from a list of predefined values but also to enter
        data manually.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Combobox</h3>
          <p className="text-sm text-gray-600 mb-4">
            A searchable dropdown that allows selecting from a list of options.
          </p>
          <Popover open={frameworkOpen} onOpenChange={setFrameworkOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={frameworkOpen}
                className="w-[280px] justify-between"
              >
                {frameworkValue
                  ? frameworks.find((framework) => framework.value === frameworkValue)?.label
                  : 'Select framework...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setFrameworkValue(currentValue === frameworkValue ? '' : currentValue)
                          setFrameworkOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            frameworkValue === framework.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="demo-item">
          <h3>Different Widths</h3>
          <p className="text-sm text-gray-600 mb-4">Comboboxes with various widths.</p>
          <div className="flex flex-wrap gap-4">
            <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={languageOpen}
                  className="w-[200px] justify-between"
                >
                  {languageValue
                    ? languages.find((lang) => lang.value === languageValue)?.label
                    : 'Select language...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((lang) => (
                        <CommandItem
                          key={lang.value}
                          value={lang.value}
                          onSelect={(currentValue) => {
                            setLanguageValue(currentValue === languageValue ? '' : currentValue)
                            setLanguageOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              languageValue === lang.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {lang.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={countryOpen}
                  className="w-[320px] justify-between"
                >
                  {countryValue
                    ? countries.find((country) => country.value === countryValue)?.label
                    : 'Select country...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.value}
                          onSelect={(currentValue) => {
                            setCountryValue(currentValue === countryValue ? '' : currentValue)
                            setCountryOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              countryValue === country.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {country.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="demo-item">
          <h3>Small Combobox</h3>
          <p className="text-sm text-gray-600 mb-4">Compact combobox with smaller size.</p>
          <Popover open={smallOpen} onOpenChange={setSmallOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={smallOpen}
                className="h-8 w-[200px] justify-between text-sm"
              >
                {smallValue
                  ? statuses.find((status) => status.value === smallValue)?.label
                  : 'Select status...'}
                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
              </Button>
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
                          setSmallValue(currentValue === smallValue ? '' : currentValue)
                          setSmallOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-3 w-3',
                            smallValue === status.value ? 'opacity-100' : 'opacity-0'
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
        </div>

        <div className="demo-item">
          <h3>Form Example</h3>
          <p className="text-sm text-gray-600 mb-4">
            Combobox used within a form with labels and helper text.
          </p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <label htmlFor="framework-select" className="text-sm font-medium">
                Framework
              </label>
              <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="framework-select"
                    variant="outline"
                    role="combobox"
                    aria-expanded={statusOpen}
                    className="w-full justify-between"
                  >
                    {statusValue
                      ? frameworks.find((framework) => framework.value === statusValue)?.label
                      : 'Select framework...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setStatusValue(currentValue === statusValue ? '' : currentValue)
                              setStatusOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                statusValue === framework.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <p className="text-sm text-gray-500">
                Choose the framework you want to use for your project.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="language-select" className="text-sm font-medium">
                Programming Language
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="language-select"
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    Select language...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((lang) => (
                          <CommandItem key={lang.value} value={lang.value}>
                            <Check className="mr-2 h-4 w-4 opacity-0" />
                            {lang.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <p className="text-sm text-gray-500">Select your preferred programming language.</p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <p className="text-sm text-gray-600 mb-4">Combobox in disabled state.</p>
          <Button variant="outline" role="combobox" disabled className="w-[280px] justify-between">
            Select framework...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </div>
    </section>
  )
}
