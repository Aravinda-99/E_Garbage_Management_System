import React, { useEffect, useRef } from 'react';
import { Map } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BinLocationMap = ({ binLocations }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Initialize map centered on Sri Lanka
      mapRef.current = L.map(mapContainerRef.current, {
        center: [7.8731, 80.7718], // Sri Lanka coordinates
        zoom: 8,
        scrollWheelZoom: false,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add markers for bin locations
      binLocations.forEach(bin => {
        if (bin.latitude && bin.longitude) {
          const markerColor = bin.status === 'empty' ? 'green' : 'red';
          
          // Create custom marker icon
          const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5]
          });

          L.marker([bin.latitude, bin.longitude], { icon: markerIcon })
            .addTo(mapRef.current)
            .bindPopup(`Bin Status: ${bin.status}`);
        }
      });

      // Cleanup on unmount
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [binLocations]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Bin Location Map</h3>
        <div 
          ref={mapContainerRef}
          className="h-64 rounded-md"
          style={{ minHeight: '16rem' }}
        >
          {/* Fallback content if map fails to load */}
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-10 w-10 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">Loading map...</p>
            </div>
          </div>
        </div>
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
  );
};

export default BinLocationMap;