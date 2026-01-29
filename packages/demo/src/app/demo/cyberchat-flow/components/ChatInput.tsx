import { useRef, useEffect } from 'react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Send, Paperclip, Globe } from 'lucide-react'
import { useChatFlowStore } from '../store/useChatFlowStore'

export function ChatInput() {
  const inputValue = useChatFlowStore((state) => state.inputValue)
  const setInputValue = useChatFlowStore((state) => state.setInputValue)
  const sendMessage = useChatFlowStore((state) => state.sendMessage)
  const webSearchEnabled = useChatFlowStore((state) => state.webSearchEnabled)
  const toggleWebSearch = useChatFlowStore((state) => state.toggleWebSearch)
  const selectedModel = useChatFlowStore((state) => state.selectedModel)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 200)
      textarea.style.height = `${newHeight}px`
    }
  }, [inputValue])

  // Focus input when suggestion is selected
  useEffect(() => {
    if (inputValue && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [inputValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage()
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  return (
    <div className="border-t border-border bg-background px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <div
          className={`relative border rounded-3xl bg-background px-4 py-3 transition-colors ${
            inputValue ? 'border-[#0D7DE5]' : 'border-border'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="w-full min-h-[40px] max-h-[200px] resize-none bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            rows={1}
          />

          <div className="flex items-center justify-between mt-2">
            {/* Left side - Add files and Web search */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 rounded-lg border-border text-xs"
              >
                <Paperclip className="h-3.5 w-3.5" />
                <span>Add files</span>
              </Button>
              <Button
                variant={webSearchEnabled ? 'default' : 'outline'}
                size="sm"
                className={`h-8 gap-1.5 rounded-lg text-xs ${
                  webSearchEnabled
                    ? 'bg-[#0D7DE5] hover:bg-[#0B6FD1] text-white border-[#0D7DE5]'
                    : 'border-border'
                }`}
                onClick={toggleWebSearch}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Web search</span>
              </Button>
            </div>

            {/* Right side - Model selector and send */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selectedModel}
              </span>
              <Button
                size="icon"
                className="h-8 w-8 shrink-0 rounded-lg bg-[#0D7DE5] hover:bg-[#0B6FD1]"
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
