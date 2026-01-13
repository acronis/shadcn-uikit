import React from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@acronis-platform/shadcn-uikit/react'
import { HomeIcon, FolderIcon, FileIcon } from 'lucide-react'

export function BreadcrumbDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Breadcrumb</h1>
      <p className="text-gray-600 mb-8">
        Used to help the user to see the entire path from the parent section to the section where
        the user is currently located with the possibility to navigate to any level back.
      </p>

      <div className="space-y-12">
        {/* Basic Breadcrumb */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Breadcrumb</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">First</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/second">Second</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/third">Third</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fourth">Fourth</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Active</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Breadcrumb with Icons */}
        <div>
          <h2 className="text-xl font-semibold mb-4">With Icons</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  First
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/second" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Second
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/third" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Third
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fourth" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Fourth
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <FileIcon className="w-4 h-4" />
                  Active
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Breadcrumb with Ellipsis */}
        <div>
          <h2 className="text-xl font-semibold mb-4">With Ellipsis (Collapsed)</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">First</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fifth">Fifth</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/sixth">Sixth</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/seventh">Seventh</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Active</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Breadcrumb with Icons and Ellipsis */}
        <div>
          <h2 className="text-xl font-semibold mb-4">With Icons and Ellipsis</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  First
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fifth" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Fifth
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/sixth" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Sixth
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/seventh" className="flex items-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  Seventh
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <FileIcon className="w-4 h-4" />
                  Active
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  )
}
