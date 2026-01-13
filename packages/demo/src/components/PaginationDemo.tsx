import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@acronis-platform/shadcn-uikit/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acronis-platform/shadcn-uikit/react'

export function PaginationDemo() {
  const [currentPage1, setCurrentPage1] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(14)
  const [currentPage3, setCurrentPage3] = useState(20)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pagination</h2>
        <p className="text-muted-foreground">
          Navigation component for multi-page content with various states and configurations.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Pagination - First Page</CardTitle>
            <CardDescription>
              Shows the first page state with disabled previous button and visible first pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage1 > 1) setCurrentPage1(currentPage1 - 1)
                    }}
                    className={currentPage1 === 1 ? 'pointer-events-none opacity-30' : ''}
                  />
                </PaginationItem>
                {[1, 2, 3, 4, 5].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage1(page)
                      }}
                      isActive={currentPage1 === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage1(20)
                    }}
                  >
                    20
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage1 < 20) setCurrentPage1(currentPage1 + 1)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-center text-sm text-muted-foreground">
              Current page: {currentPage1} of 20
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Middle Page State</CardTitle>
            <CardDescription>
              Shows a middle page with ellipsis on both sides and surrounding page numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage2 > 1) setCurrentPage2(currentPage2 - 1)
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage2(1)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {[currentPage2 - 1, currentPage2, currentPage2 + 1].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage2(page)
                      }}
                      isActive={currentPage2 === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage2(20)
                    }}
                  >
                    20
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage2 < 20) setCurrentPage2(currentPage2 + 1)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-center text-sm text-muted-foreground">
              Current page: {currentPage2} of 20
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Page State</CardTitle>
            <CardDescription>
              Shows the last page state with disabled next button and visible last pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage3 > 1) setCurrentPage3(currentPage3 - 1)
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage3(1)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {[16, 17, 18, 19, 20].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage3(page)
                      }}
                      isActive={currentPage3 === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage3 < 20) setCurrentPage3(currentPage3 + 1)
                    }}
                    className={currentPage3 === 20 ? 'pointer-events-none opacity-30' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="text-center text-sm text-muted-foreground">
              Current page: {currentPage3} of 20
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simple Pagination</CardTitle>
            <CardDescription>Minimal pagination with just prev/next controls</CardDescription>
          </CardHeader>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compact Pagination</CardTitle>
            <CardDescription>Pagination with fewer visible page numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Responsive design with proper spacing</li>
          <li>Active page highlighting with brand colors</li>
          <li>Disabled state for boundary pages (first/last)</li>
          <li>Ellipsis for truncated page ranges</li>
          <li>Keyboard navigation support</li>
          <li>ARIA labels for accessibility</li>
          <li>Customizable page ranges and visibility</li>
          <li>Follows Acronis brand design tokens</li>
        </ul>
      </div>
    </div>
  )
}
