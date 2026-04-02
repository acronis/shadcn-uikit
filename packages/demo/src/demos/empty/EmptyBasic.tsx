import {
  Empty,
  EmptyIcon,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from '@acronis-platform/shadcn-uikit/react'
import { MailboxIcon } from '@acronis-platform/shadcn-uikit'
export function EmptyBasic() {
  return (
    <div className="flex min-h-[300px] items-center justify-center border rounded-lg bg-gray-50">
      <Empty>
        <EmptyIcon className="h-24 w-24 text-primary">
          <MailboxIcon size={96} />
        </EmptyIcon>
        <EmptyHeader>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>
            You don&apos;t have any messages yet. When you receive messages, they will appear
            here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
