import React, { useState } from 'react';
import Sidebar from './ChatBotComponent/Sidebar'; // Default import
import ChatContainer from './ChatBotComponent/ChatContainer'; // Default import
import ChatInput from './ChatBotComponent/ChatInput'; // Default import

 function ChatBotPage() {
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-center text-indigo-600">
            AI Assistant
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
  );
}

export default ChatBotPage;