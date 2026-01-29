import { useRef, useEffect } from 'react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { FileSearch, Brain, Send } from 'lucide-react'
import { useChatFlowStore } from '../store/useChatFlowStore'

export function LandingState() {
  const suggestionChips = useChatFlowStore((state) => state.suggestionChips)
  const selectSuggestion = useChatFlowStore((state) => state.selectSuggestion)
  const selectedModel = useChatFlowStore((state) => state.selectedModel)
  const inputValue = useChatFlowStore((state) => state.inputValue)
  const setInputValue = useChatFlowStore((state) => state.setInputValue)
  const sendMessage = useChatFlowStore((state) => state.sendMessage)

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
    <div className="flex-1 flex items-center justify-center px-6 overflow-auto bg-[#F5F7FA]">
      <div className="max-w-3xl w-full space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-xl font-normal text-foreground">
            Hey Alex, what are gonna do today?
          </h1>
        </div>

        {/* Input box - centered */}
        <div
          className={`relative border rounded-3xl bg-white px-4 py-3 transition-colors ${
            inputValue ? 'border-[#0D7DE5]' : 'border-gray-200'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Show me what you can"
            className="w-full min-h-[40px] max-h-[200px] resize-none bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            rows={1}
          />
        </div>

        {/* Filter buttons and model selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-lg text-xs border-gray-200 bg-white"
            >
              <FileSearch className="h-3.5 w-3.5" />
              <span>Use files</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-lg text-xs border-gray-200 bg-white"
            >
              <Brain className="h-3.5 w-3.5" />
              <span>Show reports</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selectedModel}</span>
            <Button
              size="icon"
              className="h-8 w-8 rounded-lg bg-[#0D7DE5] hover:bg-[#0B6FD1]"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Not sure where to start section */}
        <div className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Not sure where to start?</h2>

          {/* Suggestion chips - flowing layout */}
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip) => (
              <Button
                key={chip.id}
                variant="outline"
                className="h-auto py-2 px-4 font-normal text-sm rounded-full border-gray-200 bg-white hover:bg-gray-50"
                onClick={() => selectSuggestion(chip.text)}
              >
                {chip.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
