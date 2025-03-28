import React from 'react';
import req1 from '../../../image/req1.jpg'
import req2 from '../../../image/req2.jpg'

const ServiceComponent = () => {
  return (
    <div className="bg-white py-14 px-5 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-white rounded-full w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
              <img 
                src={req1} 
                alt="Tourist with map and phone" 
                className="max-w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-1/2">
          <p className="text-base uppercase text-gray-500 tracking-wider">WELCOME TO OUR SITE</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 my-5">We are the best company for your visit</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            After decades of experience, and a while life in Lucca, we offer you the most 
            complete tourism service in the city. In addition to having bikes and rickshaws to 
            have as much fun as you want, you have the choice of tour guides with whom to 
            tour and chosen for your every need. We offer packages in the way that you get the 
            most at the lowest price. Book with us and we will always be available for you!
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-yellow-500">20+</span>
              <span className="text-base text-gray-500">Years Experience</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-yellow-500">100+</span>
              <span className="text-base text-gray-500">Customer Satisfaction</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-yellow-500">15+</span>
              <span className="text-base text-gray-500">Services</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-yellow-500">10+</span>
              <span className="text-base text-gray-500">Professional Guides</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;