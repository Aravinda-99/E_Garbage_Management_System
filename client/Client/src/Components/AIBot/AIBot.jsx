import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Camera, Send, X, ChevronUp, Sparkles, Info, Clock } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIBot = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', content: "Hi there! I'm your WasteWise assistant. Ask me anything about recycling or upload a photo of an item to identify its recyclability and potential value." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // API Keys
  const imaggaApiKey = 'acc_744bec21e1455ed';
  const imaggaApiSecret = 'aa1db6c7a0995bf46955732d6aca8543';
  
  // Initialize Google Gemini AI
  const genAI = new GoogleGenerativeAI("AIzaSyCl3oZMgnx6hahBY584ZcDzcMvj6r9beuI");
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Get AI response from Google Gemini and Imagga
  const getAIResponse = async (question, imageData = null) => {
    setIsProcessing(true);
    try {
      let response = '';
      
      if (imageData) {
        // Use Imagga API for image analysis
        const formData = new FormData();
        const blob = await fetch(imageData).then(r => r.blob());
        formData.append('image', blob);

        const imaggaResponse = await fetch('https://api.imagga.com/v2/tags', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(imaggaApiKey + ':' + imaggaApiSecret)
          },
          body: formData
        });

        if (!imaggaResponse.ok) {
          throw new Error('Failed to analyze image with Imagga');
        }

        const imaggaData = await imaggaResponse.json();
        const tags = imaggaData.result?.tags || [];
        
        // Get top 5 tags with confidence > 30
        const relevantTags = tags
          .filter(tag => tag.confidence > 30)
          .slice(0, 5)
          .map(tag => tag.tag.en)
          .join(', ');

        response = '**Image Analysis Results:**\n';
        response += `Detected items: ${relevantTags}\n\n`;
        
        // Use Gemini AI for detailed analysis
        const imageParts = [
          {
            inlineData: {
              data: imageData.split(',')[1],
              mimeType: blob.type
            }
          },
          {
            text: `Based on these detected items: ${relevantTags}, provide detailed recycling guidance including:\n1. Material type\n2. Recyclability\n3. Best disposal method\n4. Environmental impact\n5. Alternative uses or upcycling suggestions`
          }
        ];

        const result = await model.generateContent(imageParts);
        const geminiResponse = await result.response;
        response += geminiResponse.text();
      } else {
        // For text questions, use Gemini AI
        const textModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await textModel.generateContent([
          "You are a recycling expert. Provide accurate information about recycling, waste management, and environmental sustainability. Keep responses concise and informative.",
          question
        ]);
        const geminiResponse = await result.response;
        response = geminiResponse.text();
      }
      
      setMessages(prev => [...prev, { sender: 'bot', content: response }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.'
      }]);
    } finally {
      setIsProcessing(false);
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

  // Handle image upload with validation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large. Maximum size is 5MB.');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a JPEG, PNG, GIF or WebP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Convert to base64 and set as preview
      const base64Image = reader.result;
      setImagePreview(base64Image);
    };
    reader.onerror = () => {
      alert('Failed to read the image file.');
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