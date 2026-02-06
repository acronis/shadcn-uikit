import {
  Empty,
  EmptyIcon,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { FolderOpen } from 'lucide-react'

export function EmptyWithAction() {
  return (
    <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
      <Empty>
        <EmptyIcon className="h-24 w-24">
          <FolderOpen className="text-[#2668C5]" />
        </EmptyIcon>
        <EmptyHeader>
          <EmptyTitle>No files</EmptyTitle>
          <EmptyDescription>Get started by uploading your first file.</EmptyDescription>
        </EmptyHeader>
        <EmptyActions>
          <Button>Upload File</Button>
        </EmptyActions>
      </Empty>
    </div>
  )
}
