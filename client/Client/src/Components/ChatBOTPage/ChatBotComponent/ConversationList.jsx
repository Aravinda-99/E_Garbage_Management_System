// ConversationList.jsx
import React from 'react'
import { MessageCircle, X } from 'lucide-react'

function ConversationList({ conversations, onSelect, onDelete }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="space-y-2">
          {conversations.map(conv => (
            <div key={conv.id} className="group relative">
              <div
                onClick={() => onSelect(conv.id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <MessageCircle size={16} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 line-clamp-1">{conv.title}</p>
                  <p className="text-xs text-gray-500">{conv.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => onDelete(conv.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-full"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConversationList;

