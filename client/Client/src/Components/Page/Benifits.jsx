import React from 'react';
import { Play, Recycle } from 'lucide-react';

const SystemBenefits = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full bg-gradient-to-b from-green-50 to-white">
      {/* Left Section - Benefits */}
      <div className="bg-emerald-900 text-white p-6 lg:p-10 w-full lg:w-1/2">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-white">Why WasteWise?</h2>
          {[
            {
              title: "Efficient Collection",
              desc: "Streamlined waste pickup ensures cleaner streets and timely disposal."
            },
            {
              title: "Smart Monitoring",
              desc: "Real-time bin status updates optimize collection routes and reduce overflow."
            },
            {
              title: "Eco-Friendly",
              desc: "Promoting sustainable waste management for a greener planet."
            },
            {
              title: "Community Impact",
              desc: "Empowering residents to contribute to a cleaner environment."
            },
            {
              title: "Cost Effective",
              desc: "Reducing operational costs with data-driven waste management."
            }
          ].map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="mt-1 flex-shrink-0">
                <Recycle size={24} className="text-green-200" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">{benefit.title}</h3>
                <p className="mt-1 text-green-100 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Stats and Video */}
      <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-white flex flex-col justify-between">
        <div className="max-w-xl mx-auto">
          <p className="text-green-600 font-semibold uppercase tracking-wide">Our Impact</p>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-gray-800">
            Transforming Waste Management
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-4xl font-bold text-green-600">12K+</h3>
              <div className="w-24 h-1 bg-green-200 my-2 rounded-full"></div>
              <p className="text-gray-600 text-sm">Bins Monitored</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">5M+</h3>
              <div className="w-24 h-1 bg-green-200 my-2 rounded-full"></div>
              <p className="text-gray-600 text-sm">Tons Recycled</p>
            </div>
          </div>
        </div>

        {/* Video Section - Waste Collection */}
        <div className="mt-8 lg:mt-12 relative">
          <div className="rounded-xl overflow-hidden shadow-lg relative w-full h-48 lg:h-64">
            <video
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/video/2020/06/13/41869-431407027_large.mp4" // Waste collection video
              poster="https://img.mixkit.co/videos/preview/waste-collection-truck-in-the-streets-5088-0-large.jpg" // Corresponding thumbnail
              controls={false}
            />
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:bg-green-700 transition-all duration-300"
              onClick={() => document.querySelector('video')?.play()}
            >
              <Play size={24} className="text-white ml-1" />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">See our waste collection in action</p>
        </div>
      </div>
    </div>
  );
};

export default SystemBenefits;