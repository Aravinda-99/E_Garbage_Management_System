import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Camera, Send, X, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const analyzeWasteImage = (imageData) => {
    const wasteTypes = ['Plastic (Type 1 - PET)', 'Aluminum Can', 'Paper', 'Glass Bottle', 'Food Waste'];
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    
    const recyclingInfo = {
      'Plastic (Type 1 - PET)': {
        recyclable: true,
        value: '$0.05 - $0.10 per item',
        instructions: 'Rinse, remove label if possible, and place in your recycling bin.',
        impact: 'Recycling one plastic bottle saves enough energy to power a 60W light bulb for 6 hours.'
      },
      'Aluminum Can': {
        recyclable: true,
        value: '$0.05 - $0.10 per can',
        instructions: 'Rinse and place in your recycling bin. Don\'t crush the can for easier sorting.',
        impact: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours.'
      },
      'Paper': {
        recyclable: true,
        value: '$0.01 per sheet or $0.50 per pound',
        instructions: 'Stack together and place in paper recycling. Remove any plastic or metal attachments.',
        impact: 'Recycling one ton of paper saves 17 trees and 7,000 gallons of water.'
      },
      'Glass Bottle': {
        recyclable: true,
        value: '$0.05 - $0.10 per bottle',
        instructions: 'Rinse thoroughly and place in glass recycling. Remove caps and lids.',
        impact: 'Glass can be recycled indefinitely without loss in quality or purity.'
      },
      'Food Waste': {
        recyclable: true,
        value: 'Can be composted for garden use or $0.25 per pound at some compost centers',
        instructions: 'Add to compost bin or check local composting programs.',
        impact: 'Composting food waste reduces methane emissions from landfills and creates nutrient-rich soil.'
      }
    };
    
    const info = recyclingInfo[randomType];
    
    return `I identified this as: **${randomType}**

**Recyclability:** ${info.recyclable ? '✅ Recyclable' : '❌ Not recyclable'}
**Potential Value:** ${info.value}
**Instructions:** ${info.instructions}
**Environmental Impact:** ${info.impact}

Would you like to learn more about recycling ${randomType.toLowerCase()} or find nearby recycling centers that accept this material?`;
  };
  
  // Simulate text responses
  const getRecyclingAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('how to recycle')) {
      return "To recycle effectively, separate your waste into categories: paper, plastic, glass, metal, and organic waste. Rinse containers before recycling, and check local guidelines as recycling rules vary by location. For specific items, you can upload a photo and I'll provide detailed instructions!";
    } else if (lowerQuestion.includes('make money') || lowerQuestion.includes('earn') || lowerQuestion.includes('revenue')) {
      return "You can earn money through recycling in several ways:\n\n1. Collecting and selling recyclable materials to local recycling centers\n2. Participating in our reward program where you earn points for verified recycling activities\n3. Joining community challenges with cash prizes\n4. Referring businesses to our bulk recycling program\n\nWould you like to learn more about any of these options?";
    } else if (lowerQuestion.includes('plastic')) {
      return "Most plastic items have a recycling symbol with a number (1-7) indicating the type of plastic. Types 1 (PET) and 2 (HDPE) are widely recyclable and have the highest value. Always rinse plastics before recycling and remove labels when possible. Upload a photo of your plastic item for specific recycling instructions!";
    } else {
      return "I'm here to help with all your recycling questions! You can ask me about how to recycle specific materials, where to recycle in your area, or how to earn rewards through our program. You can also upload photos of items you're unsure about.";
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '' && !imagePreview) return;
    
    // Add user message to chat
    if (inputText.trim() !== '') {
      setMessages(prev => [...prev, { sender: 'user', content: inputText }]);
      getAIResponse(inputText);
      setInputText('');
    }
    
    // Handle image preview
    if (imagePreview) {
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
      setMessages(prev => [...prev, { 
        sender: 'user', 
        content: 'I\'d like to recycle this item:', 
        image: reader.result 
      }]);
      getAIResponse('', reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="relative z-50">
      {/* Enhanced Chat toggle button */}
      <button 
        className={`fixed bottom-6 right-6 ${isOpen ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : 'bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'} text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          boxShadow: isOpen ? '0 10px 25px -5px rgba(239, 68, 68, 0.4)' : '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
        }}
      >
        {isOpen ? (
          <X size={24} className="transform transition-transform hover:rotate-90 duration-300" />
        ) : (
          <div className="flex items-center animate-pulse">
            <Leaf size={20} className="mr-2 animate-bounce" />
            <span className="font-medium">Recycle Assistant</span>
          </div>
        )}
      </button>
      
      {/* Enhanced Chatbot container */}
      <div className={`fixed bottom-24 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${isOpen ? 'h-[32rem] opacity-100' : 'h-0 opacity-0'} z-30 border border-gray-100`}>
        {/* Gradient Chat header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/20 rounded-full">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold">WasteWise Assistant</h3>
              <p className="text-xs text-white/80">Ask me about recycling</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronUp size={20} />
          </button>
        </div>
        
        {/* Enhanced Chat messages */}
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
                className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'}`}
                style={{
                  boxShadow: msg.sender === 'user' 
                    ? '0 2px 10px -3px rgba(16, 185, 129, 0.3)' 
                    : '0 2px 5px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {msg.image && (
                  <div className="mb-2 overflow-hidden rounded-lg">
                    <img 
                      src={msg.image} 
                      alt="Uploaded item" 
                      className="rounded-lg max-w-full max-h-48 object-contain mx-auto"
                    />
                  </div>
                )}
                <div className="whitespace-pre-line text-sm">{msg.content}</div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="mb-4 max-w-[85%] mr-auto">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="ml-2 text-xs text-gray-500">Analyzing...</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Chat input */}
        <div className="border-t border-gray-200 bg-white p-3 flex items-center">
          <button 
            onClick={() => fileInputRef.current.click()}
            className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors hover:scale-110 transform"
            title="Upload image"
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
            placeholder="Ask about recycling..."
            className="flex-grow mx-2 p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className={`p-2 rounded-full text-white transition-all ${inputText.trim() === '' && !imagePreview
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-110'}`}
            disabled={inputText.trim() === '' && !imagePreview}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIBot;