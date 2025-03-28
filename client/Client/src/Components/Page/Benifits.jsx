import React from 'react';
import { Play } from 'lucide-react';

const SystemBenefits = () => {
  return (
    <div className="flex flex-row w-full">
      {/* Left Section - Green Background with Benefits */}
      <div className="bg-emerald-900 text-white p-8 w-1/2">
        <div className="space-y-8 max-w-md">
          <div className="flex items-start space-x-3">
            <div className="mt-1 flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">Always Fresh</h3>
              <p className="mt-1 text-white/80 text-sm">
                Committed to providing necessary breakfast, surrounded in melodies she and therefore. Day direction regulated but supported yet her.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">All organic</h3>
              <p className="mt-1 text-white/80 text-sm">
                Committed to providing necessary breakfast, surrounded in melodies she and therefore. Day direction regulated but supported.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">Eco Friendly</h3>
              <p className="mt-1 text-white/80 text-sm">
                Northward at in to melodious she and melodies she and therefore. Day direction regulated but supported yet her.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-1 flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">Eco Friendly</h3>
              <p className="mt-1 text-white/80 text-sm">
                Northward at in to melodious she and melodies she and therefore. Day direction regulated but supported yet her.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="mt-1 flex-shrink-0">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg">Eco Friendly</h3>
              <p className="mt-1 text-white/80 text-sm">
                Northward at in to melodious she and melodies she and therefore. Day direction regulated but supported yet her.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Stats and Image */}
      <div className="bg-gray-200 w-1/2 p-8 flex flex-col justify-between border-r border-t border-b border-gray-300">
        <div>
          <p className="text-gray-600 font-medium">Why Choose Us</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900 max-w-xs">
            Growing crops and raising livestock.
          </h2>
          
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-4xl font-bold text-amber-400">38K</h3>
              <div className="w-48 h-px bg-gray-300 my-2"></div>
              <p className="text-gray-600 text-sm">Trusted Customers</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-amber-400">28M</h3>
              <div className="w-48 h-px bg-gray-300 my-2"></div>
              <p className="text-gray-600 text-sm">Growth Tons of Harvest</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 relative">
          <div className="rounded-lg overflow-hidden relative w-full h-40 shadow-md">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("/api/placeholder/400/240")` }}
            ></div>
            <div className="absolute inset-0 bg-black/10"></div>
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Play size={20} className="text-amber-500 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBenefits;