import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-green-50">
      {/* Background Image or Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
      ></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side: Heading and Description */}
            <div className="space-y-6 text-white">
              <h1 className="text-5xl font-bold">
                Natural Products
              </h1>
              <p className="text-lg">
                For Lovers of Healthy Organic Food
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Shop Now
                </a>
                <a
                  href="#"
                  className="bg-white text-green-600 px-6 py-3 rounded-md border border-green-600 hover:bg-green-50 transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side: Image or Visual Content */}
            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/free-photo/composition-different-trashed-objects_23-2148996932.jpg?t=st=1742366326~exp=1742369926~hmac=1b28a2dd0c745ec25277a839c6276389dab8be63032663fb66593b14dabfdfec&w=1380"
                alt="Organic Food"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;