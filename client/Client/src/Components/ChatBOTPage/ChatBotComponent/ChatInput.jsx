// ChatInput.jsx
import React, { useState, useRef } from 'react'
import { Send, Image as ImageIcon, X } from 'lucide-react'

function ChatInput({ onSend }) {
  const [inputValue, setInputValue] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleSend = () => {
    if (inputValue.trim() || selectedImage) {
      onSend(inputValue, selectedImage)
      setInputValue('')
      setSelectedImage(null)
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {selectedImage && (
          <div className="mb-4 relative inline-block">
            <img
              src={selectedImage}
              alt="Selected"
              className="h-20 w-auto rounded-lg border border-gray-200"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your image or type a message..."
            className="flex-1 p-4 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          <div className="absolute right-4 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ImageIcon size={20} />
            </button>
            <button
              onClick={handleSend}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput;