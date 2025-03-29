// Sidebar.jsx
import React from 'react'
import { Plus } from 'lucide-react'
import  ConversationList  from './ConversationList'
import  Profile  from './Profile'

 function Sidebar({ conversations, onNewChat, onSelectConversation, onDeleteConversation }) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
        <h1 className="text-xl font-semibold mb-4 text-indigo-600">CHAT A.I+</h1>
        <button
          onClick={onNewChat}
          className="w-full bg-indigo-600 text-white rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all transform hover:shadow-md active:scale-95"
        >
          <Plus size={20} />
          New chat
        </button>
      </div>

      <ConversationList
        conversations={conversations}
        onSelect={onSelectConversation}
        onDelete={onDeleteConversation}
      />

      <Profile
        name="John Doe"
        imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
    </div>
  )
}

export default Sidebar;