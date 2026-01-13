import * as React from 'react'
import { Filter } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Card, CardContent, CardHeader, CardTitle } from '@acronis-platform/shadcn-uikit/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@acronis-platform/shadcn-uikit/react'

export function FilterDemo() {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([])
  const [statusFilters, setStatusFilters] = React.useState<string[]>([])
  const [categoryFilters, setCategoryFilters] = React.useState<string[]>([])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setStatusFilters([])
    setCategoryFilters([])
  }

  const totalFilters = activeFilters.length + statusFilters.length + categoryFilters.length

  return (
    <section className="demo-section">
      <h2>Filter Component</h2>
      <p className="demo-description">
        A filter button component with optional counter badge for displaying active filter counts.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Filter</h3>
          <p className="text-sm text-gray-600 mb-4">Simple filter button with icon and text.</p>
          <div className="flex gap-4">
            <Filter />
            <Filter>Custom Label</Filter>
            <Filter>Apply Filters</Filter>
          </div>
        </div>

        <div className="demo-item">
          <h3>Filter with Counter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Filter button showing the number of active filters.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Filter count={0}>No Filters</Filter>
            <Filter count={1}>Filter</Filter>
            <Filter count={3}>Filter</Filter>
            <Filter count={5}>Filter</Filter>
            <Filter count={12}>Filter</Filter>
            <Filter count={99}>Filter</Filter>
          </div>
        </div>

        <div className="demo-item">
          <h3>Active State</h3>
          <p className="text-sm text-gray-600 mb-4">Filter button in active state with counter.</p>
          <div className="flex gap-4">
            <Filter active={false}>Inactive</Filter>
            <Filter active={true} count={3}>
              Active
            </Filter>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Variants</h3>
          <p className="text-sm text-gray-600 mb-4">
            Filter button with different button variants.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Filter variant="ghost" count={3}>
              Ghost
            </Filter>
            <Filter variant="outline" count={3}>
              Outline
            </Filter>
            <Filter variant="default" count={3}>
              Default
            </Filter>
          </div>
        </div>

        <div className="demo-item">
          <h3>Interactive Filter Example</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click filters to toggle them on/off and see the counter update.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Product List</span>
                <div className="flex gap-2">
                  <Filter count={activeFilters.length} active={activeFilters.length > 0}>
                    Filters
                  </Filter>
                  {activeFilters.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Quick Filters</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['New', 'Popular', 'On Sale', 'In Stock', 'Featured'].map((filter) => (
                      <Button
                        key={filter}
                        variant={activeFilters.includes(filter) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>
                {activeFilters.length > 0 && (
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm">
                      <strong>Active Filters:</strong> {activeFilters.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Filter with Dropdown Menu</h3>
          <p className="text-sm text-gray-600 mb-4">
            Filter button that opens a dropdown menu with filter options.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Filter count={statusFilters.length} active={statusFilters.length > 0}>
                Status
              </Filter>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('active')}
                onCheckedChange={() => toggleStatusFilter('active')}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('pending')}
                onCheckedChange={() => toggleStatusFilter('pending')}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('completed')}
                onCheckedChange={() => toggleStatusFilter('completed')}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes('cancelled')}
                onCheckedChange={() => toggleStatusFilter('cancelled')}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="demo-item">
          <h3>Multiple Filter Groups</h3>
          <p className="text-sm text-gray-600 mb-4">
            Multiple filter buttons working together with a total count.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Advanced Filtering</span>
                <div className="flex gap-2 items-center">
                  <Filter count={totalFilters} active={totalFilters > 0}>
                    All Filters
                  </Filter>
                  {totalFilters > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Filter count={statusFilters.length} active={statusFilters.length > 0}>
                        Status
                      </Filter>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {['Active', 'Pending', 'Completed', 'Cancelled'].map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={statusFilters.includes(status.toLowerCase())}
                          onCheckedChange={() => toggleStatusFilter(status.toLowerCase())}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Filter count={categoryFilters.length} active={categoryFilters.length > 0}>
                        Category
                      </Filter>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'].map(
                        (category) => (
                          <DropdownMenuCheckboxItem
                            key={category}
                            checked={categoryFilters.includes(category.toLowerCase())}
                            onCheckedChange={() => toggleCategoryFilter(category.toLowerCase())}
                          >
                            {category}
                          </DropdownMenuCheckboxItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {totalFilters > 0 && (
                  <div className="p-4 bg-muted rounded-md space-y-2">
                    {statusFilters.length > 0 && (
                      <p className="text-sm">
                        <strong>Status:</strong> {statusFilters.join(', ')}
                      </p>
                    )}
                    {categoryFilters.length > 0 && (
                      <p className="text-sm">
                        <strong>Category:</strong> {categoryFilters.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="demo-item">
          <h3>Filter in Toolbar</h3>
          <p className="text-sm text-gray-600 mb-4">
            Filter button as part of a toolbar with other actions.
          </p>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex gap-2">
              <Filter count={3}>Filters</Filter>
              <Button variant="outline" size="sm">
                Sort
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Showing 24 of 156 items</div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <p className="text-sm text-gray-600 mb-4">Filter button in disabled state.</p>
          <div className="flex gap-4">
            <Filter disabled>Disabled</Filter>
            <Filter disabled count={3}>
              Disabled with Count
            </Filter>
          </div>
        </div>
      </div>
    </section>
  )
}
