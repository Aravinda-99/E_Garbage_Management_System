import React, { useState } from 'react';
import { MapPin, Trash2, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Fix for default marker icon in Leaflet (unchanged)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const mockLocations = [
  { id: 1, latitude: 6.927079, longitude: 79.861244, address: "Colombo Fort, Colombo", wasteType: "organic", status: "half-full", lastUpdated: "2024-03-15 10:30" },
  { id: 2, latitude: 6.914741, longitude: 79.872128, address: "Galle Face Green, Colombo", wasteType: "plastic", status: "empty", lastUpdated: "2024-03-15 09:45" },
  { id: 3, latitude: 6.901691, longitude: 79.856975, address: "Kollupitiya, Colombo", wasteType: "paper", status: "full", lastUpdated: "2024-03-15 11:15" },
  { id: 4, latitude: 6.935821, longitude: 79.850726, address: "Maradana, Colombo", wasteType: "metal", status: "empty", lastUpdated: "2024-03-15 12:00" },
  { id: 5, latitude: 6.906079, longitude: 79.873157, address: "Bambalapitiya, Colombo", wasteType: "plastic", status: "half-full", lastUpdated: "2024-03-15 11:45" }
];

// Updated utility functions with refined colors
const getStatusColor = (status) => {
  switch (status) {
    case 'empty': return 'bg-green-50 text-green-600 border-green-100';
    case 'half-full': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    case 'full': return 'bg-red-50 text-red-600 border-red-100';
    default: return 'bg-gray-50 text-gray-600 border-gray-100';
  }
};

// Waste type icons (unchanged)
const getWasteTypeIcon = (type) => {
  switch (type) {
    case 'organic': return 'https://img.icons8.com/color/48/000000/leaf.png';
    case 'plastic': return 'https://img.icons8.com/color/48/000000/plastic.png';
    case 'paper': return 'https://img.icons8.com/color/48/000000/paper.png';
    case 'metal': return 'https://img.icons8.com/color/48/000000/metal.png';
    default: return 'https://img.icons8.com/color/48/000000/trash.png';
  }
};

const BinLocations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    window.open(
      `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
      '_blank'
    );
  };

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWasteType = selectedWasteType === 'all' || location.wasteType === selectedWasteType;
    const matchesStatus = selectedStatus === 'all' || location.status === selectedStatus;
    return matchesSearch && matchesWasteType && matchesStatus;
  });

  const statusCounts = {
    empty: filteredLocations.filter(loc => loc.status === 'empty').length,
    halfFull: filteredLocations.filter(loc => loc.status === 'half-full').length,
    full: filteredLocations.filter(loc => loc.status === 'full').length
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-700 tracking-tight">
              Bin Locations
            </h1>
            <p className="mt-2 text-lg text-gray-600">Track and manage waste bins in real-time</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-green-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="pl-10 w-full py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-400 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition-all duration-300"
                value={selectedWasteType}
                onChange={(e) => setSelectedWasteType(e.target.value)}
              >
                <option value="all">All Waste Types</option>
                <option value="organic">Organic</option>
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
              </select>
              <select
                className="py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition-all duration-300"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="empty">Empty</option>
                <option value="half-full">Half Full</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Map */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden">
              <div className="h-[400px] lg:h-[600px] relative">
                <MapContainer
                  center={[6.927079, 79.861244]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredLocations.map((location) => (
                    <Marker
                      key={location.id}
                      position={[location.latitude, location.longitude]}
                      eventHandlers={{ click: () => handleLocationClick(location) }}
                    >
                      <Popup>
                        <div className="p-3 text-gray-800">
                          <h3 className="font-semibold flex items-center gap-2">
                            <img src={getWasteTypeIcon(location.wasteType)} alt={location.wasteType} className="w-5 h-5" />
                            {location.address}
                          </h3>
                          <p className="text-sm mt-1">Type: <span className="font-medium">{location.wasteType}</span></p>
                          <p className="text-sm">Status: <span className="font-medium">{location.status}</span></p>
                          <p className="text-xs text-gray-500 mt-1">Last Updated: {location.lastUpdated}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Bin List */}
            <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Trash2 className="text-green-600" size={24} />
                Nearby Bins
                <span className="text-sm text-gray-500">({filteredLocations.length})</span>
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={getWasteTypeIcon(location.wasteType)} alt={location.wasteType} className="w-6 h-6" />
                        <div>
                          <h3 className="font-medium text-gray-800">{location.address}</h3>
                          <p className="text-xs text-gray-500">Updated: {location.lastUpdated}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                        {location.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <CheckCircle2 className="text-green-600" size={32} />
              <div>
                <h3 className="text-sm text-gray-600">Empty Bins</h3>
                <p className="text-3xl font-bold text-green-600">{statusCounts.empty}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <AlertCircle className="text-yellow-600" size={32} />
              <div>
                <h3 className="text-sm text-gray-600">Half-Full Bins</h3>
                <p className="text-3xl font-bold text-yellow-600">{statusCounts.halfFull}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <AlertCircle className="text-red-600" size={32} />
              <div>
                <h3 className="text-sm text-gray-600">Full Bins</h3>
                <p className="text-3xl font-bold text-red-600">{statusCounts.full}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #0d9488;
  }
`;

export default BinLocations;