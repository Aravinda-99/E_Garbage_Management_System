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
          instructions: 'Rinse thoroughly, remove caps and labels if possible, and place in your recycling bin. Check local guidelines as some municipalities only accept certain plastic types.',
          impact: 'Recycling plastic reduces oil consumption (1 ton of recycled plastic saves 16.3 barrels of oil) and prevents plastic pollution in oceans.'
        },
        'Aluminum Can': {
          recyclable: true,
          instructions: 'Rinse cans to remove residue. Leave labels on as they burn off during recycling. Do not crush - many facilities use shape to sort aluminum.',
          impact: 'Aluminum can be recycled indefinitely without quality loss. Recycling one can saves enough energy to power a TV for 3 hours.'
        },
        'Paper': {
          recyclable: true,
          instructions: 'Keep paper dry and clean. Remove any plastic windows from envelopes. Staples are okay - they get removed during processing.',
          impact: 'Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and reduces greenhouse gas emissions by 1 metric ton of CO2 equivalent.'
        },
        'Glass Bottle': {
          recyclable: true,
          instructions: 'Rinse thoroughly. Remove metal caps (recycle separately). Broken glass should be wrapped and disposed safely - most programs don\'t accept it.',
          impact: 'Glass recycling reduces mining waste by 80% and air pollution by 20% compared to making new glass from raw materials.'
        },
        'Food Waste': {
          recyclable: true,
          instructions: 'Compost at home or use municipal programs. Remove any plastic packaging. Eggshells, coffee grounds, and most plant-based food can be composted.',
          impact: 'Composting reduces methane emissions (a potent greenhouse gas) from landfills and creates nutrient-rich soil that sequesters carbon.'
        },
        'Electronics': {
          recyclable: true,
          instructions: 'Never throw in regular trash. Use certified e-waste recyclers. Remove batteries if possible. Wipe personal data from devices.',
          impact: 'Proper e-waste recycling prevents heavy metal contamination and recovers valuable materials like gold, silver, and rare earth elements.'
        },
        'Batteries': {
          recyclable: true,
          instructions: 'Store used batteries in non-metal container. Tape terminals of lithium batteries. Many stores have drop-off bins. Never incinerate.',
          impact: 'Battery recycling prevents soil and water contamination from heavy metals and recovers reusable materials.'
        },
        'Textiles': {
          recyclable: true,
          instructions: 'Donate wearable items. For damaged textiles, look for specialized textile recycling programs. Keep dry and clean.',
          impact: 'Textile recycling reduces water consumption (it takes 2,700 liters of water to make one cotton t-shirt) and prevents landfill waste.'
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