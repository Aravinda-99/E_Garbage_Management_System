// BinLocationMap.jsx
import React from 'react';
import { Map } from 'lucide-react';

const BinLocationMap = ({ binLocations }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bin Location Map</h3>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center">
            <Map className="h-10 w-10 text-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Interactive map would be displayed here</p>
            <p className="text-sm text-gray-500">(Using Google Maps API or Leaflet.js)</p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-500">Empty ({binLocations.filter(bin => bin.status === 'empty').length})</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-500">Full ({binLocations.filter(bin => bin.status === 'full').length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinLocationMap;