import React, { useState } from 'react';
import { MapPin, Trash2, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in Leaflet (if icons don't show up)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const mockLocations = [
  {
    id: 1,
    latitude: 6.927079,
    longitude: 79.861244,
    address: "Colombo Fort, Colombo",
    wasteType: "organic",
    status: "half-full",
    lastUpdated: "2024-03-15 10:30"
  },
  {
    id: 2,
    latitude: 6.914741,
    longitude: 79.872128,
    address: "Galle Face Green, Colombo",
    wasteType: "plastic",
    status: "empty",
    lastUpdated: "2024-03-15 09:45"
  },
  {
    id: 3,
    latitude: 6.901691,
    longitude: 79.856975,
    address: "Kollupitiya, Colombo",
    wasteType: "paper",
    status: "full",
    lastUpdated: "2024-03-15 11:15"
  },
  {
    id: 4,
    latitude: 6.935821,
    longitude: 79.850726,
    address: "Maradana, Colombo",
    wasteType: "metal",
    status: "empty",
    lastUpdated: "2024-03-15 12:00"
  },
  {
    id: 5,
    latitude: 6.906079,
    longitude: 79.873157,
    address: "Bambalapitiya, Colombo",
    wasteType: "plastic",
    status: "half-full",
    lastUpdated: "2024-03-15 11:45"
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'empty':
      return 'bg-green-100 text-green-800';
    case 'half-full':
      return 'bg-yellow-100 text-yellow-800';
    case 'full':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getWasteTypeIcon = (type) => {
  switch (type) {
    case 'organic':
      return '🌱';
    case 'plastic':
      return '♻️';
    case 'paper':
      return '📄';
    case 'metal':
      return '🔧';
    default:
      return '🗑️';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Garbage Bin Locations
          </h1>
          <p className="text-gray-600">
            Monitor waste bins across Sri Lanka in real-time
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search locations..."
                className="pl-10 w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-[500px]">
              <MapContainer
                center={[6.927079, 79.861244]} // Center on Colombo
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                      <div>
                        <h3 className="font-medium">{location.address}</h3>
                        <p>Type: {location.wasteType}</p>
                        <p>Status: {location.status}</p>
                        <p>Last Updated: {location.lastUpdated}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Bin List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trash2 className="text-teal-600" />
              Nearby Bins
              <span className="text-sm text-gray-500">({filteredLocations.length} found)</span>
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-teal-200 cursor-pointer transition-all"
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getWasteTypeIcon(location.wasteType)}</span>
                      <h3 className="font-medium text-gray-800">
                        {location.address}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${getStatusColor(
                        location.status
                      )}`}
                    >
                      {location.status}
                    </span>
                    <span className="text-gray-500">
                      Updated: {location.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <div>
                <h3 className="font-semibold">Empty Bins</h3>
                <p className="text-2xl font-bold text-green-500">{statusCounts.empty}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-yellow-500" />
              <div>
                <h3 className="font-semibold">Half-Full Bins</h3>
                <p className="text-2xl font-bold text-yellow-500">{statusCounts.halfFull}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500" />
              <div>
                <h3 className="font-semibold">Full Bins</h3>
                <p className="text-2xl font-bold text-red-500">{statusCounts.full}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinLocations;