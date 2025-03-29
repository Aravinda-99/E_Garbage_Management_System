// MessageBubble.jsx
import React from 'react'
import { MessageSquare, MessageCircle, ThumbsUp, RefreshCw, Copy } from 'lucide-react'

function MessageBubble({ 
  text, 
  isAI, 
  image, 
  onLike, 
  onRegenerate, 
  timestamp, 
  isError 
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className={`flex gap-4 mb-6 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {isAI ? (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
          <MessageSquare size={16} className="text-white" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <MessageCircle size={16} className="text-gray-600" />
        </div>
      )}
      <div className={`flex-1 ${isAI ? 'pr-12' : 'pl-12'}`}>
        <div
          className={`p-4 rounded-xl shadow-md transition-all duration-200 ${
            isAI
              ? isError 
                ? 'bg-red-50 border border-red-200'
                : 'bg-white border border-gray-100'
              : 'bg-indigo-600 text-white'
          }`}
        >
          {image && (
            <div className="mb-3">
              <img
                src={image}
                alt="Uploaded content"
                className="max-w-sm rounded-lg border border-gray-200 hover:scale-105 transition-transform duration-200"
              />
            </div>
          )}
          <p className="whitespace-pre-wrap">{text}</p>
          <div className="text-xs mt-2 opacity-70">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {isAI && (
            <>
              <button 
                onClick={onLike} 
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title="Like this response"
              >
                <ThumbsUp size={14} className="text-gray-500 hover:text-indigo-600" />
              </button>
              <button 
                onClick={onRegenerate} 
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title="Regenerate response"
              >
                <RefreshCw size={14} className="text-gray-500 hover:text-indigo-600" />
              </button>
            </>
          )}
          <button 
            onClick={handleCopy} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            title="Copy message"
          >
            <Copy size={14} className="text-gray-500 hover:text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble;