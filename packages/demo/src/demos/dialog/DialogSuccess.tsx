import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogBody,
  DialogCloseButton,
  DialogTrigger,
} from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { CheckCircle } from 'lucide-react'

export function DialogSuccess() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Success</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Task Completed Successfully</p>
              <p className="text-sm text-gray-600">
                Your changes have been saved and applied.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button>Close</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
