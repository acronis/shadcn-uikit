import { useState } from 'react'
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
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Textarea } from '@acronis-platform/shadcn-uikit/react'
import { AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react'

export function DialogDemo() {
  const [_isLoading, setIsLoading] = useState(false)

  const _handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <section className="demo-section">
      <h2>Dialog Component</h2>
      <p className="demo-description">
        Used to focus the user&apos;s attention exclusively on one task or piece of information via
        a dialog that sits on top of the page content.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Dialog</h3>
          <p className="text-sm text-gray-600 mb-4">
            Simple dialog with title, content, and action buttons.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <p className="text-sm text-gray-600">
                  This is a basic dialog with some content. You can add any content you want here.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Dialog Sizes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dialogs in different sizes: small, medium, large, and extra large.
          </p>
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Small (464px)</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[464px]">
                <DialogHeader>
                  <DialogTitle>Small Dialog</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
                <DialogBody>
                  <p className="text-sm text-gray-600">This is a small dialog (464px width).</p>
                </DialogBody>
                <DialogFooter>
                  <Button>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Medium (672px)</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[672px]">
                <DialogHeader>
                  <DialogTitle>Medium Dialog</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
                <DialogBody>
                  <p className="text-sm text-gray-600">This is a medium dialog (672px width).</p>
                </DialogBody>
                <DialogFooter>
                  <Button>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Large (832px)</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[832px]">
                <DialogHeader>
                  <DialogTitle>Large Dialog</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
                <DialogBody>
                  <p className="text-sm text-gray-600">This is a large dialog (832px width).</p>
                </DialogBody>
                <DialogFooter>
                  <Button>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="demo-item">
          <h3>Form Dialog</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dialog with form inputs for collecting user data.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                </form>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button>Create Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Confirmation Dialog</h3>
          <p className="text-sm text-gray-600 mb-4">Dialog for confirming destructive actions.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Are you sure you want to delete this item?
                    </p>
                    <p className="text-sm text-gray-600">
                      This action cannot be undone. This will permanently delete the item and remove
                      all associated data.
                    </p>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Loading State</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dialog showing loading state during async operations.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Process Data</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Processing</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-[#2668C5]" />
                  <p className="text-sm text-gray-600">
                    Please wait while we process your request...
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button disabled>Processing...</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Success Dialog</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dialog showing successful completion of an action.
          </p>
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
        </div>

        <div className="demo-item">
          <h3>Info Dialog</h3>
          <p className="text-sm text-gray-600 mb-4">Dialog for displaying informational content.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Info</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Information</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Important Information</p>
                      <p className="text-sm text-gray-600">
                        This dialog provides important information about the system. Please read
                        carefully before proceeding.
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-8">
                    <li>Feature A is now available</li>
                    <li>Feature B has been updated</li>
                    <li>Feature C will be deprecated soon</li>
                  </ul>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button>Got it</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Dialog with Textarea</h3>
          <p className="text-sm text-gray-600 mb-4">Dialog with textarea for longer text input.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Leave Feedback</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Provide Feedback</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Brief description" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium">
                      Feedback
                    </label>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts..."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button>Submit Feedback</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="demo-item">
          <h3>Scrollable Content</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dialog with scrollable content for long text.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Terms</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <DialogBody className="max-h-[400px]">
                <div className="space-y-4 text-sm text-gray-600">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.
                  </p>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium.
                  </p>
                  <p>
                    Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="outline">Decline</Button>
                </DialogTrigger>
                <Button>Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
