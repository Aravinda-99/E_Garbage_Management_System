import React, { useState, useEffect } from "react";

export function HeroContentLeft({ galleryRef }) {
  // Array of background images - all images will cycle
  const backgroundImages = [
    "https://cdn.leonardo.ai/users/ed5d9018-351e-4397-8c32-f86a841e5d45/generations/fe5dd044-77fd-4ac0-a10f-7f109a40a593/segments/4:4:1/Flux_Dev_A_wellmaintained_city_park_with_lush_green_grass_neat_3.jpeg?w=512",
    "https://cdn.qwenlm.ai/output/402cc42c-ec8c-4052-b84f-653059787189/t2i/f3333c99-f243-4949-9755-1c5b4b632481/f23bd31c-637f-40f4-8cf0-5d469c741f98.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDAyY2M0MmMtZWM4Yy00MDUyLWI4NGYtNjUzMDU5Nzg3MTg5IiwicmVzb3VyY2VfaWQiOiJmMjNiZDMxYy02MzdmLTQwZjQtOGNmMC01ZDQ2OWM3NDFmOTgiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.tpmF5l_pOXAXqjpG9oSPqPfRMXy5veBe0uyOWos9R1E",
    "https://cdn.qwenlm.ai/output/402cc42c-ec8c-4052-b84f-653059787189/t2i/0f217cfe-7710-409d-81e8-ae5c8a7b6278/6aa229d5-1ded-4db3-a667-04b6a7300c05.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDAyY2M0MmMtZWM4Yy00MDUyLWI4NGYtNjUzMDU5Nzg3MTg5IiwicmVzb3VyY2VfaWQiOiI2YWEyMjlkNS0xZGVkLTRkYjMtYTY2Ny0wNGI2YTczMDBjMDUiLCJyZXNvdXJjZV9jaGF0X2lkIjpudWxsfQ.jj8ceD6PLzgNM8FIGkItvf8O-Le4p2y8PwvETaiX2-0",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1592995709171-2d5b1a0d1b1e?auto=format&fit=crop&w=1920&q=80"
  ];

  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Functions to navigate images
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % backgroundImages.length
    );
  };

  // Effect to change image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to scroll to the Gallery section
  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
      {/* Background Images with fade transition */}
      {backgroundImages.map((imageUrl, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        ></div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 flex justify-between items-center px-4 z-20">
        <button
          onClick={goToPrevious}
          className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Image Navigation Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentImageIndex ? "bg-white scale-110" : "bg-white bg-opacity-60 hover:bg-opacity-80"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Centered Vertically and Horizontally */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg text-shadow text-center max-w-4xl px-4">
          A Smart and Efficient Garbage Management System
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mb-6 drop-shadow-md text-shadow-sm text-center px-4">
          Optimize waste collection and disposal with our advanced management system. Track, schedule,
          and monitor waste management operations in real-time to ensure a cleaner and greener environment.
        </p>
        <button
          onClick={scrollToGallery}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Add these custom styles to your CSS file or in a style tag
const styles = `
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
  }
  
  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }
`;

export default HeroContentLeft;