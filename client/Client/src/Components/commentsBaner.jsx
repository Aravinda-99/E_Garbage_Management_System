import React, { useState } from 'react';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      text: "There are many variations of passages of available but the majority have suffered alteration in some form by injected humour or random word which don't look even.",
      author: "Bonnie Tolbert",
      rating: 5,
    },
    {
      id: 2,
      text: "Working with their team was an incredible experience. Their attention to detail and commitment to quality really sets them apart from competitors.",
      author: "James Rodriguez",
      rating: 5,
    },
    {
      id: 3,
      text: "The product delivered exactly what was promised. I've been using it for months and couldn't be happier with the results.",
      author: "Emma Johnson",
      rating: 4,
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={`text-yellow-400 text-lg`}>
          ★
        </span>
      ));
  };

  return (
    <div className="bg-gray-50 w-full max-w-4xl mx-auto p-8 rounded-lg shadow-md shadow-top-highlight relative">
      <div className="flex flex-col md:flex-row">
        {/* Left side with title and navigation */}
        <div className="md:w-2/5 md:pr-8 mb-6 md:mb-0">
          <div className="mb-8">
            <p className="text-yellow-500 font-semibold mb-2">Our Testimonials</p>
            <h2 className="text-3xl font-bold text-gray-800">
              What They're Talking About Agrios
            </h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            {testimonials[currentSlide].text}
          </p>
          
          <button 
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            View All Testimonials
          </button>

          {/* Navigation arrows */}
          <div className="flex mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 border border-gray-300 flex justify-center items-center rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 border border-gray-300 flex justify-center items-center rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side with testimonial card */}
        <div className="md:w-3/5 relative">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <p className="text-gray-700 mb-4">
              {testimonials[currentSlide].text}
            </p>
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">{testimonials[currentSlide].author}</h4>
              <div className="flex">
                {renderStars(testimonials[currentSlide].rating)}
              </div>
            </div>
            
            {/* Green dot */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-yellow-100"></div>
            </div>
            
            {/* Circle outline */}
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
              <div className="w-32 h-32 rounded-full border border-dashed border-yellow-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentSlide === index ? 'bg-red-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;