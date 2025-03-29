// Profile.jsx
import React from 'react'
import { Settings } from 'lucide-react'

function Profile({ name, imageUrl }) {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
        <img
          src={imageUrl}
          alt={name}
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">{name}</p>
        </div>
        <Settings size={20} className="text-gray-500 hover:text-indigo-600 transition-colors" />
      </div>
    </div>
  )
}

export default Profile;