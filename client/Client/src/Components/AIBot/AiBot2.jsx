import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Camera, Send, X, ChevronUp, Sparkles, Info, Clock } from 'lucide-react';

const AIBot2 = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      content: 'Hi there! I\'m your WasteWise assistant. Ask me anything about recycling or upload a photo of an item to identify its recyclability and potential value.' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // API configuration - IMPORTANT: Replace with your actual API key
  const API_KEY = "sk-587631bccd8741029157ddf1f30429e9";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";
  const MODEL = "deepseek-chat";

  // System message to define how the AI should respond
  const systemMessage = {
    "role": "system", 
    "content": "You are WasteWise AI, an expert recycling assistant. Help users identify recyclable items, provide recycling tips, and share information about how to earn money from recycling. When users upload images, analyze what the item might be, whether it's recyclable, its potential value, and instructions for recycling it. Be concise but informative."
  };

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Process messages and send to API
  const processMessageToAPI = async (userMessage, imageData = null) => {
    setIsProcessing(true);
    setErrorMessage('');
    
    try {
      // Check if API key is configured
      if (!API_KEY) {
        throw new Error("API key is not configured. Please set your API key.");
      }
      
      // Format messages for API
      const recentMessages = messages.slice(-5);
      let apiMessages = recentMessages.map((messageObject) => ({
        role: messageObject.sender === 'bot' ? 'assistant' : 'user',
        content: messageObject.content
      }));
      
      // Add the current message
      let content = userMessage;
      
      if (imageData) {
        content = userMessage.trim() || "I'm uploading an image of an item for recycling assessment. Please identify what this item could be, whether it's typically recyclable, its potential value, and how to recycle it properly.";
        content += " The image appears to be showing a recycling-related item I need help with.";
      }
      
      apiMessages.push({ role: 'user', content });
      
      const apiRequestBody = {
        model: MODEL,
        messages: [
          systemMessage,
          ...apiMessages
        ],
        max_tokens: 1024,
        temperature: 0.7,
      };
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        
        if (response.status === 402) {
          throw new Error("Your API account has insufficient balance. Please add credits to your account.");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        } else {
          throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices[0].message) {
        setMessages(prev => [...prev, { sender: 'bot', content: data.choices[0].message.content }]);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error communicating with API:", error);
      
      let errorMsg = "There was an error connecting to the service. Please try again later.";
      
      if (error.message.includes("Insufficient Balance") || error.message.includes("402")) {
        errorMsg = "Your API account has insufficient balance. Please add credits to your account.";
      } else if (error.message.includes("API key")) {
        errorMsg = "API key configuration issue. Please check your setup.";
      } else if (error.message.includes("Rate limit") || error.message.includes("429")) {
        errorMsg = "Rate limit exceeded. Please try again in a moment.";
      }
      
      setErrorMessage(errorMsg);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        content: errorMsg + "\n\nFor now, here's some general recycling advice: Check your local recycling guidelines, rinse containers before recycling, and separate materials properly."
      }]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '' && !imagePreview) return;
    
    const newMessages = [...messages];
    
    if (inputText.trim() !== '') {
      const userMessage = inputText.trim();
      newMessages.push({ sender: 'user', content: userMessage });
      setInputText('');
    } else if (imagePreview) {
      newMessages.push({ 
        sender: 'user', 
        content: 'Identify this item:', 
        image: imagePreview 
      });
    }
    
    setMessages(newMessages);
    processMessageToAPI(inputText.trim(), imagePreview);
    
    if (imagePreview) {
      setImagePreview(null);
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }
    
    if (file.size > maxSize) {
      setErrorMessage('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setErrorMessage('');
    };
    reader.onerror = () => {
      setErrorMessage('Error reading the image file');
    };
    reader.readAsDataURL(file);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <button 
        className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-14 h-14`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open recycling assistant"}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <Leaf size={24} />
        )}
      </button>
      
      {/* Chatbot Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-30 border border-gray-200 h-128">
          
          {/* Chat Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
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
              aria-label="Minimize chat"
            >
              <ChevronUp size={20} />
            </button>
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}
          
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
                  className={`max-w-xs sm:max-w-sm p-4 rounded-xl ${msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none shadow' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow border border-gray-100'}`}
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
                    {typeof msg.content === 'string' && msg.content.split('**').map((text, i) => 
                      i % 2 === 1 ? (
                        <span key={i} className="font-semibold">{text}</span>
                      ) : (
                        text
                      )
                    )}
                  </div>
                  
                  {msg.sender === 'bot' && !msg.content?.includes("error") && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                      <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center transition-colors">
                        <Info size={12} className="mr-1" /> Learn More
                      </button>
                      <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center transition-colors">
                        <Clock size={12} className="mr-1" /> Find Centers
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="mb-4 max-w-xs sm:max-w-sm mr-auto">
                <div className="bg-white p-4 rounded-xl rounded-bl-none shadow border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
                    aria-label="Remove image"
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
                aria-label="Upload image"
              >
                <Camera size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                aria-label="Upload image file"
              />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about recycling or upload photo..."
                className="flex-grow mx-2 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder-gray-400 text-sm"
                onKeyPress={handleKeyPress}
                aria-label="Message input"
              />
              <button 
                onClick={handleSendMessage}
                className={`p-3 rounded-full text-white transition-colors ${inputText.trim() === '' && !imagePreview
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow'}`}
                disabled={inputText.trim() === '' && !imagePreview}
                aria-label="Send message"
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

export default AIBot2;