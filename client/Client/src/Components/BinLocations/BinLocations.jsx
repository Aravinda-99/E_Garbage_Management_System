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
  { id: 5, latitude: 6.906079, longitude: 79.873157, address: "Bambalapitiya, Colombo", wasteType: "plastic", status: "half-full", lastUpdated: "2024-03-15 11:45" },
  { id: 6, latitude: 6.9047, longitude: 79.9547, address: "Malabe", wasteType: "organic", status: "full", lastUpdated: "2024-03-15 13:00" },
  { id: 7, latitude: 6.9107, longitude: 79.9185, address: "Kotte", wasteType: "plastic", status: "half-full", lastUpdated: "2024-03-15 13:15" },
  { id: 8, latitude: 6.9155, longitude: 79.9285, address: "Rajagiriya", wasteType: "paper", status: "empty", lastUpdated: "2024-03-15 13:30" }
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
      {/* Added z-index to ensure Navbar stays on top */}
      <Navbar className="z-50" />
      <div className="py-30 min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8 font-sans pt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* New Banner Section */}
          <div className="text-center py-20 bg-emerald-900 z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Bin Locations
            </h1>
            <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
            Track and manage waste bins in real-time
            </p>
          </div>

          {/* Header */}
          {/* <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-700 tracking-tight">
              Bin Locations
            </h1>
            <p className="mt-2 text-lg text-gray-600">Track and manage waste bins in real-time</p>
          </div> */}

          {/* Search and Filter Section */}
          <div className="py- bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-5 mb-8 border border-green-100/50 transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-green-600 transition-colors duration-300" size={18} />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="pl-9 pr-4 w-full py-2 bg-white/70 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Waste Type Filter */}
              <div className="relative group">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-green-600 transition-colors duration-300" size={18} />
                <select
                  className="pl-9 pr-4 w-full py-2 bg-white/70 border border-gray-200 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
                  value={selectedWasteType}
                  onChange={(e) => setSelectedWasteType(e.target.value)}
                >
                  <option value="all">All Waste Types</option>
                  <option value="organic">Organic</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative group">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-green-600 transition-colors duration-300" size={18} />
                <select
                  className="pl-9 pr-4 w-full py-2 bg-white/70 border border-gray-200 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
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

          <div className="py-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Map */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden z-10">
              <div className="h-[400px] lg:h-[600px] relative">
                <MapContainer
                  center={[6.9170822, 79.862846]}
                  zoom={12}
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
            <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 z-10">
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

          {/* Picture Cards Section for Specific Locations */}
          <div className="mt-12 z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Waste Management in Key Locations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Malabe */}
              <div className="relative bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                <img
                  src="https://img.freepik.com/free-photo/plastic-garbage-conveyor-belt-waste-recycling-factory_1268-23430.jpg?t=st=1743208019~exp=1743211619~hmac=371eea9a16346cd6a8cea052553c8964bd353fe63dd47328ce974efaefd0d913&w=1380"
                  alt="Garbage Bins in Malabe"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">Malabe</h3>
                </div>
              </div>

              {/* Card 2: Kotte */}
              <div className="relative bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                <img
                  src="https://img.freepik.com/free-photo/couple-collects-garbage-garbage-bags-park_1157-27404.jpg?t=st=1743208080~exp=1743211680~hmac=47145703b573a839ab7787ea31968780d68bf8ab372008fcb75dc69d761e2a73&w=1380"
                  alt="Garbage Bins in Kotte"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">Kotte</h3>
                </div>
              </div>

              {/* Card 3: Rajagiriya */}
              <div className="relative bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                <img
                  src="https://img.freepik.com/free-photo/man-coveralls-trash-pill-doing-research_1157-49008.jpg?t=st=1743208115~exp=1743211715~hmac=3eb39360eff23a8e2426fe4e5ce16ad0f81270eed397b35673aba9ba9a61c3e5&w=1380"
                  alt="Garbage Bins in Rajagiriya"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">Rajagiriya</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

// Updated scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Thinner scrollbar */
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #e5e7eb; /* Subtle gray track */
    border-radius: 6px; /* Slightly larger radius for a smoother look */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #14b8a6; /* Teal thumb color */
    border-radius: 6px; /* Match the track radius */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #0f766e; /* Darker teal on hover */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
  }
`;

export default BinLocations;