import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Camera, Send, X, ChevronUp, Sparkles, Info, Clock, CheckCircle } from 'lucide-react';

const AIBot = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hi there! I\'m your WasteWise assistant. Ask me anything about recycling or upload a photo of an item to identify its recyclability and potential value.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate AI response
  const getAIResponse = async (question, imageData = null) => {
    setIsProcessing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = '';
    
    if (imageData) {
      // Image processing logic
      response = analyzeWasteImage(imageData);
    } else {
      // Text question answering
      response = getRecyclingAnswer(question);
    }
    
    setMessages(prev => [...prev, { sender: 'bot', content: response }]);
    setIsProcessing(false);
  };
  
  // Simulate image analysis
  const analyzeWasteImage = () => {
    const wasteTypes = ['Plastic (Type 1 - PET)', 'Aluminum Can', 'Paper', 'Glass Bottle', 'Food Waste'];
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    
    const recyclingInfo = {
      'Plastic (Type 1 - PET)': {
        recyclable: true,
        value: 'High (₹15-20/kg)',
        instructions: 'Rinse thoroughly, remove caps and labels if possible, and place in your recycling bin.',
        impact: 'Recycling plastic reduces oil consumption and prevents ocean pollution.'
      },
      'Aluminum Can': {
        recyclable: true,
        value: 'High (₹80-100/kg)',
        instructions: 'Rinse cans to remove residue. Leave labels on as they burn off during recycling.',
        impact: 'Aluminum can be recycled indefinitely without quality loss.'
      },
      'Paper': {
        recyclable: true,
        value: 'Medium (₹10-15/kg)',
        instructions: 'Keep paper dry and clean. Remove any plastic windows from envelopes.',
        impact: 'Recycling one ton of paper saves 17 trees and reduces greenhouse gas emissions.'
      },
      'Glass Bottle': {
        recyclable: true,
        value: 'Low (₹5-10/kg)',
        instructions: 'Rinse thoroughly. Remove metal caps (recycle separately).',
        impact: 'Glass recycling reduces mining waste by 80% compared to new production.'
      },
      'Food Waste': {
        recyclable: true,
        value: 'Compost Value',
        instructions: 'Compost at home or use municipal programs. Remove any plastic packaging.',
        impact: 'Composting reduces methane emissions from landfills.'
      }
    };
    
    const info = recyclingInfo[randomType];
    
    return `I identified this as: **${randomType}**

**Recyclability:** ${info.recyclable ? '✅ Recyclable' : '❌ Not recyclable'}
**Potential Value:** ${info.value}
**Instructions:** ${info.instructions}
**Environmental Impact:** ${info.impact}

Would you like to learn more about recycling ${randomType.toLowerCase()} or find nearby recycling centers?`;
  };
  
  // Simulate text responses
  const getRecyclingAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('how to recycle')) {
      return "To recycle effectively:\n1. Separate waste into categories\n2. Rinse containers before recycling\n3. Check local guidelines\n4. Remove non-recyclable parts\n\nUpload a photo for specific item instructions!";
    } else if (lowerQuestion.includes('make money') || lowerQuestion.includes('earn')) {
      return "Earn through recycling by:\n1. Selling recyclables to local centers\n2. Our reward program\n3. Community challenges\n4. Referring businesses\n\nWhich option interests you?";
    } else if (lowerQuestion.includes('plastic')) {
      return "Plastic recycling tips:\n• Look for recycling symbols (1-7)\n• Types 1 & 2 are most valuable\n• Always rinse before recycling\n• Remove labels when possible\n\nUpload a photo for specific plastic identification!";
    } else {
      return "I can help with:\n• Recycling specific materials\n• Local recycling locations\n• Earning rewards\n• Identifying unknown items (upload photo)\n\nWhat would you like to know?";
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '' && !imagePreview) return;
    
    if (inputText.trim() !== '') {
      setMessages(prev => [...prev, { sender: 'user', content: inputText }]);
      getAIResponse(inputText);
      setInputText('');
    }
    
    if (imagePreview) {
      setMessages(prev => [...prev, { 
        sender: 'user', 
        content: 'Identify this item:', 
        image: imagePreview 
      }]);
      getAIResponse('', imagePreview);
      setImagePreview(null);
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <button 
        className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-br bg-emerald-900 to-teal-600 hover:from-emerald-600 hover:to-teal-700'} text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px'
        }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Leaf size={24} />
        )}
      </button>
      
      {/* Chatbot Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-30 border border-gray-200"
          style={{ height: '32rem' }}>
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r bg-emerald-900 to-teal-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Leaf size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">WasteWise AI</h3>
                <p className="text-xs text-white/90 flex items-center">
                  <Sparkles size={12} className="mr-1" />
                  Recycling Assistant
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronUp size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div 
            className="flex-grow p-4 overflow-y-auto bg-gray-50"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[90%] p-4 rounded-2xl ${msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-br-none shadow-lg' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'}`}
                >
                  {msg.image && (
                    <div className="mb-3 overflow-hidden rounded-lg border-2 border-white/20">
                      <img 
                        src={msg.image} 
                        alt="Uploaded item" 
                        className="rounded-lg max-w-full max-h-48 object-contain mx-auto"
                      />
                    </div>
                  )}
                  <div className="whitespace-pre-line text-sm">
                    {msg.content.split('**').map((text, i) => 
                      i % 2 === 1 ? (
                        <span key={i} className="font-semibold">{text}</span>
                      ) : (
                        text
                      )
                    )}
                  </div>
                  
                  {msg.sender === 'bot' && (
                    <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap gap-2">
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full flex items-center transition-colors">
                        <Info size={12} className="mr-1" /> Learn More
                      </button>
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full flex items-center transition-colors">
                        <Clock size={12} className="mr-1" /> Centers
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="mb-4 max-w-[90%] mr-auto">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-emerald-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-200 bg-white p-3">
            {imagePreview && (
              <div className="relative mb-3">
                <div className="p-2 bg-gray-100 rounded-lg inline-flex items-center">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-12 w-12 object-cover rounded"
                  />
                  <button 
                    onClick={() => setImagePreview(null)}
                    className="ml-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <button 
                onClick={() => fileInputRef.current.click()}
                className="p-2 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="Upload waste photo"
              >
                <Camera size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about recycling or upload photo..."
                className="flex-grow mx-2 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-gray-400 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className={`p-3 rounded-full text-white transition-colors ${inputText.trim() === '' && !imagePreview
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md'}`}
                disabled={inputText.trim() === '' && !imagePreview}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBot;