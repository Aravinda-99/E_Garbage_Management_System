import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Qimg1 from '../../image/Qimg1.jpg'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What destinations do you offer tours to?",
      answer: "Themeon offers a range of services including web development, software development, IT consulting, digital marketing."
    },
    {
      question: "What types of service do you provide?",
      answer: "We offer guided tours, self-guided tours, private tours, group tours, and customized tour packages tailored to your preferences."
    },
    {
      question: "What is included in the tour package?",
      answer: "Our standard packages include accommodation, transportation, guided tours, entrance fees to attractions, and selected meals."
    },
    {
      question: "What should I pack for my trip?",
      answer: "We recommend packing comfortable walking shoes, weather-appropriate clothing, a camera, travel documents, and any personal medications."
    }
  ];

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16 items-center">
          {/* Left section - Title and images */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-orange-500 text-sm font-medium uppercase tracking-wider">FAQ</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 mx-auto">
                <img 
                  src={Qimg1} 
                  alt="Tourists visiting landmark" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 z-0"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
          
          {/* Right section - Accordion */}
          <div className="md:w-1/2">
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                    openIndex === index ? 'border-orange-500' : 'border-transparent'
                  } transition-all`}
                >
                  <button 
                    className="w-full flex justify-between items-center p-5 text-left"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className={`font-medium text-lg ${openIndex === index ? 'text-orange-500' : 'text-gray-800'}`}>
                      {item.question}
                    </span>
                    <ChevronUp 
                      className={`transition-transform duration-300 ${
                        openIndex === index ? 'text-orange-500' : 'text-gray-400 transform rotate-180'
                      }`} 
                      size={20} 
                    />
                  </button>
                  
                  {openIndex === index && (
                    <div className="p-5 pt-0 text-gray-600 text-base leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;