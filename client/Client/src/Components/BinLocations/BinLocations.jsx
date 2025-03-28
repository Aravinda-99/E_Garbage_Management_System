import React, { useState } from 'react';
import { MapPin, Trash2, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Navbar from '../Navbar';
import Footer from '../Footer'

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
    case 'empty': return 'bg-green-100 text-green-700 border-green-200';
    case 'half-full': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'full': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

// Replace emojis with image URLs (replace these with your own assets)
const getWasteTypeIcon = (type) => {
  switch (type) {
    case 'organic': return 'https://img.icons8.com/color/48/000000/leaf.png'; // Organic icon
    case 'plastic': return 'https://img.icons8.com/color/48/000000/plastic.png'; // Plastic icon
    case 'paper': return 'https://img.icons8.com/color/48/000000/paper.png'; // Paper icon
    case 'metal': return 'https://img.icons8.com/color/48/000000/metal.png'; // Metal icon
    default: return 'https://img.icons8.com/color/48/000000/trash.png'; // Default trash icon
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
    <><Navbar/>
    <div className="py-20 min-h-screen bg-[#F8FAFC] p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] bg-opacity-50">
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#14B8A6] to-[#0D9488] bg-clip-text text-transparent tracking-tight">
            Bin Locations
          </h1>
          <p className="text-[#64748B] mt-2 text-lg">Real-time waste bin monitoring across Sri Lanka</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748B]" size={20} />
              <input
                type="text"
                placeholder="Search locations..."
                className="pl-12 w-full p-4 bg-[#F8FAFC]/80 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-[#1E293B] shadow-sm hover:shadow-md transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-4 bg-[#F8FAFC]/80 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-[#1E293B] shadow-sm hover:shadow-md transition-all"
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
              className="p-4 bg-[#F8FAFC]/80 border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14B8A6] text-[#1E293B] shadow-sm hover:shadow-md transition-all"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="md:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 overflow-hidden">
            <div className="relative h-[500px]">
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
                    eventHandlers={{
                      click: () => handleLocationClick(location),
                    }}
                  >
                    <Popup>
                      <div className="text-[#1E293B] p-2">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                          <img src={getWasteTypeIcon(location.wasteType)} alt={location.wasteType} className="w-5 h-5" />
                          {location.address}
                        </h3>
                        <p className="text-xs mt-1">Type: {location.wasteType}</p>
                        <p className="text-xs">Status: {location.status}</p>
                        <p className="text-xs">Last Updated: {location.lastUpdated}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Bin List */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 p-6">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
              <Trash2 className="text-[#14B8A6]" size={22} />
              Nearby Bins
              <span className="text-sm text-[#64748B]">({filteredLocations.length} found)</span>
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 rounded-xl bg-white/80 border border-[#E2E8F0]/50 hover:border-[#14B8A6] hover:bg-gradient-to-br from-[#F8FAFC] to-[#E6F0FA] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg"
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img src={getWasteTypeIcon(location.wasteType)} alt={location.wasteType} className="w-6 h-6" />
                      <h3 className="font-medium text-[#1E293B] text-base">{location.address}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium border ${getStatusColor(location.status)}`}>
                      {location.status}
                    </span>
                    <span className="text-[#64748B]">Updated: {location.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-[#22C55E]" size={28} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Empty Bins</h3>
                <p className="text-4xl font-bold text-[#22C55E]">{statusCounts.empty}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <AlertCircle className="text-[#F59E0B]" size={28} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Half-Full Bins</h3>
                <p className="text-4xl font-bold text-[#F59E0B]">{statusCounts.halfFull}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-[#E2E8F0]/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <AlertCircle className="text-[#EF4444]" size={28} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Full Bins</h3>
                <p className="text-4xl font-bold text-[#EF4444]">{statusCounts.full}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BinLocations;