import { useEffect, useRef } from 'react'
import { ScrollArea } from '@acronis-platform/shadcn-uikit/react'
import { useCyberChatStore } from './store/useCyberChatStore'
import { CyberChatSidebar } from './components/CyberChatSidebar'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { UserMessage } from './components/messages/UserMessage'
import { AIMessage } from './components/messages/AIMessage'
import { LoadingMessage } from './components/messages/LoadingMessage'

export function CyberChatPage() {
  const { messages, isTyping } = useCyberChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex h-screen bg-background">
      <CyberChatSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader />

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => {
              if (message.type === 'user') {
                return <UserMessage key={message.id} message={message} />
              }
              if (message.type === 'ai') {
                return <AIMessage key={message.id} message={message} />
              }
              if (message.type === 'loading') {
                return (
                  <LoadingMessage
                    key={message.id}
                    title={typeof message.content === 'string' ? message.content : 'Processing...'}
                  />
                )
              }
              return null
            })}
            {isTyping && <LoadingMessage />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <ChatInput />
      </div>
    </div>
  )
}
