// Components/ChatBOTPage/ChatBotPage.jsx
import React, { useState, useRef } from 'react';
import { Plus, Send, Image as ImageIcon, X, MessageCircle, MessageSquare, ThumbsUp, RefreshCw, Copy, Settings } from 'lucide-react';

// Profile Component
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
  );
}

// MessageBubble Component
function MessageBubble({ text, isAI, image, onLike, onRegenerate, timestamp, isError }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

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
  );
}

// ConversationList Component
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
  );
}

// ChatInput Component
function ChatInput({ onSend }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() || selectedImage) {
      onSend(inputValue, selectedImage);
      setInputValue('');
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
  );
}

// ChatContainer Component
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
  );
}

// Sidebar Component
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
  );
}

// Main ChatBotPage Component (Renamed to ChatBotPage2 as per your code)
export default function ChatBotPage2() {
  const [conversations, setConversations] = useState([
    { id: '1', title: 'Create Html Game Environment...', timestamp: '2 days ago' },
    { id: '2', title: 'Apply To Leave For Emergency', timestamp: '3 days ago' },
    { id: '3', title: 'What is UI UX Design?', timestamp: '4 days ago' },
    { id: '4', title: 'Create POS System', timestamp: '5 days ago' },
  ]);

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi! I can help you analyze images and answer questions. Feel free to upload an image and ask me anything!',
      isAI: true,
      timestamp: new Date().toISOString()
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message, image) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      image,
      timestamp: new Date().toISOString()
    }]);
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = image 
        ? "I can see the image you've shared. What would you like to know about it?"
        : "I'm processing your request. How can I help you further?";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isAI: true,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong. Please try again.",
        isAI: true,
        isError: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: '1',
      text: 'Hi! I can help you analyze images and answer questions. Feel free to upload an image and ask me anything!',
      isAI: true,
      timestamp: new Date().toISOString()
    }]);
  };

  const handleLike = (id) => {
    console.log('Liked message:', id);
  };

  const handleRegenerate = (id) => {
    console.log('Regenerating message:', id);
  };

  const handleSelectConversation = (id) => {
    console.log('Selected conversation:', id);
  };

  const handleDeleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        <Sidebar
          conversations={conversations}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <h1 className="text-xl font-semibold text-center text-indigo-600">
              AI Image Analysis Assistant
            </h1>
          </div>
          <ChatContainer
            messages={messages}
            onLike={handleLike}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}