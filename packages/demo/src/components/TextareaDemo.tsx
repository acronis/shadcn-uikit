import { useState } from 'react'
import { Textarea } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'

export function TextareaDemo() {
  const [comment, setComment] = useState('')
  const [description, setDescription] = useState('')
  const [feedback, setFeedback] = useState('')
  const charLimit = 500

  return (
    <section className="demo-section">
      <h2>Textarea Component</h2>
      <p className="demo-description">
        Used to enter data when the expected input is short. In the case of multiline input, need to
        use the Textarea component.
      </p>

      <div className="demo-grid">
        <div className="demo-item">
          <h3>Basic Textarea</h3>
          <div className="space-y-4">
            <Textarea placeholder="Enter your text here..." />
            <Textarea placeholder="With default value" defaultValue="This is some default text" />
          </div>
        </div>

        <div className="demo-item">
          <h3>With Labels</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="comments" className="text-sm font-medium text-[#243143]">
                Comments
              </label>
              <Textarea id="comments" placeholder="Enter your comments..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-[#243143]">
                Description
              </label>
              <Textarea id="description" placeholder="Describe your project..." />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Different Sizes</h3>
          <div className="space-y-4">
            <Textarea className="min-h-[60px]" placeholder="Small textarea (60px)" />
            <Textarea placeholder="Default textarea (80px)" />
            <Textarea className="min-h-[120px]" placeholder="Large textarea (120px)" />
            <Textarea className="min-h-[200px]" placeholder="Extra large textarea (200px)" />
          </div>
        </div>

        <div className="demo-item">
          <h3>With Helper Text</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-[#243143]">
                Bio
              </label>
              <Textarea id="bio" placeholder="Tell us about yourself..." />
              <p className="text-xs text-[rgba(36,49,67,0.7)]">
                Write a short bio to introduce yourself
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-[#243143]">
                Notes
              </label>
              <Textarea id="notes" placeholder="Add your notes here..." />
              <p className="text-xs text-[rgba(36,49,67,0.7)]">
                These notes will be visible to your team
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled State</h3>
          <div className="space-y-4">
            <Textarea placeholder="Disabled textarea" disabled />
            <Textarea
              placeholder="Disabled with value"
              defaultValue="This textarea is disabled and cannot be edited"
              disabled
            />
          </div>
        </div>

        <div className="demo-item">
          <h3>Required Fields</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="required-message" className="text-sm font-medium text-[#243143]">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea id="required-message" placeholder="Enter your message..." required />
            </div>
            <div className="space-y-2">
              <label htmlFor="required-feedback" className="text-sm font-medium text-[#243143]">
                Feedback <span className="text-red-500">*</span>
              </label>
              <Textarea id="required-feedback" placeholder="Share your feedback..." required />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Error State</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="error-message" className="text-sm font-medium text-[#243143]">
                Message
              </label>
              <Textarea
                id="error-message"
                placeholder="Enter your message..."
                className="border-red-500 focus-visible:border-red-500"
              />
              <p className="text-xs text-red-500">Message is required and cannot be empty</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="error-description" className="text-sm font-medium text-[#243143]">
                Description
              </label>
              <Textarea
                id="error-description"
                placeholder="Enter description..."
                className="border-red-500 focus-visible:border-red-500"
                defaultValue="Too short"
              />
              <p className="text-xs text-red-500">
                Description must be at least 20 characters long
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Character Counter</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="limited-text" className="text-sm font-medium text-[#243143]">
                Feedback ({feedback.length}/{charLimit})
              </label>
              <Textarea
                id="limited-text"
                placeholder="Enter your feedback..."
                value={feedback}
                onChange={(e) => {
                  if (e.target.value.length <= charLimit) {
                    setFeedback(e.target.value)
                  }
                }}
                maxLength={charLimit}
              />
              <p className="text-xs text-[rgba(36,49,67,0.7)]">
                {charLimit - feedback.length} characters remaining
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Auto-resize Textarea</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="auto-resize" className="text-sm font-medium text-[#243143]">
                Auto-growing Textarea
              </label>
              <Textarea
                id="auto-resize"
                placeholder="This textarea grows automatically..."
                className="resize-none"
                rows={3}
              />
              <p className="text-xs text-[rgba(36,49,67,0.7)]">
                This textarea automatically adjusts its height
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Resize Options</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">No Resize</label>
              <Textarea className="resize-none" placeholder="Cannot be resized" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Vertical Resize</label>
              <Textarea className="resize-y" placeholder="Can be resized vertically" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Both Directions</label>
              <Textarea className="resize" placeholder="Can be resized in both directions" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Form Example</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              alert(`Form submitted!\nComment: ${comment}\nDescription: ${description}`)
            }}
          >
            <div className="space-y-2">
              <label htmlFor="form-comment" className="text-sm font-medium text-[#243143]">
                Comment <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="form-comment"
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="form-description" className="text-sm font-medium text-[#243143]">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="form-description"
                placeholder="Provide a detailed description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>

        <div className="demo-item">
          <h3>Various Use Cases</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Code Snippet</label>
              <Textarea
                className="font-mono text-xs"
                placeholder="Paste your code here..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Address</label>
              <Textarea placeholder="Enter your full address..." rows={4} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#243143]">Review</label>
              <Textarea placeholder="Write your review..." className="min-h-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
