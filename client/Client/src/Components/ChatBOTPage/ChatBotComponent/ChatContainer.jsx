// ChatContainer.jsx
import React from 'react'
import  MessageBubble  from './MessageBubble'

function ChatContainer({ messages, onLike, onRegenerate, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            {...message}
            onLike={() => onLike(message.id)}
            onRegenerate={() => onRegenerate(message.id)}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatContainer;