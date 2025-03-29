import React, { useState } from 'react';
import { MapPin, Trash2, AlertCircle, CheckCircle2, Search, Filter, ChevronRight, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Fix for default marker icon in Leaflet
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

const getStatusColor = (status) => {
  switch (status) {
    case 'empty': return 'bg-green-100 text-green-800';
    case 'half-full': return 'bg-amber-100 text-amber-800';
    case 'full': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'empty': return <CheckCircle2 className="text-green-500" size={16} />;
    case 'half-full': return <AlertCircle className="text-amber-500" size={16} />;
    case 'full': return <AlertCircle className="text-red-500" size={16} />;
    default: return <Info className="text-gray-500" size={16} />;
  }
};

const getWasteTypeIcon = (type) => {
  switch (type) {
    case 'organic': return 'https://img.icons8.com/color/48/compost-bin.png';
    case 'plastic': return 'https://img.icons8.com/color/48/plastic-bottle.png';
    case 'paper': return 'https://img.icons8.com/color/48/paper-recycling.png';
    case 'metal': return 'https://img.icons8.com/color/48/metal-recycling.png';
    default: return 'https://img.icons8.com/color/48/trash-can.png';
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
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
      <Navbar className="z-50" />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 overflow-hidden bg-emerald-900 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Smart Bin Locations
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-6">
            Real-time monitoring of waste collection points across the city
          </p>
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-emerald-800 font-medium rounded-full hover:bg-emerald-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MapPin size={18} /> View Map
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              Learn More <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans -mt-16">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Floating Search Card */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-20 -mt-20 mb-12 mx-4"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm bg-white/90 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Bar */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-gray-400 group-hover:text-emerald-600" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </motion.div>

                {/* Waste Type Filter */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="text-gray-400" size={18} />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent appearance-none transition-all duration-300"
                    value={selectedWasteType}
                    onChange={(e) => setSelectedWasteType(e.target.value)}
                  >
                    <option value="all">All Waste Types</option>
                    <option value="organic">Organic</option>
                    <option value="plastic">Plastic</option>
                    <option value="paper">Paper</option>
                    <option value="metal">Metal</option>
                  </select>
                </motion.div>

                {/* Status Filter */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="text-gray-400" size={18} />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent appearance-none transition-all duration-300"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="empty">Empty</option>
                    <option value="half-full">Half Full</option>
                    <option value="full">Full</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 px-4"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <CheckCircle2 className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Empty Bins</h3>
                  <p className="text-3xl font-semibold text-gray-900">{statusCounts.empty}</p>
                  <p className="mt-1 text-xs text-gray-500">Ready for collection</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex items-start">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-lg">
                  <AlertCircle className="text-amber-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Half-Full Bins</h3>
                  <p className="text-3xl font-semibold text-gray-900">{statusCounts.halfFull}</p>
                  <p className="mt-1 text-xs text-gray-500">Monitor closely</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6 flex items-start">
                <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-600">Full Bins</h3>
                  <p className="text-3xl font-semibold text-gray-900">{statusCounts.full}</p>
                  <p className="mt-1 text-xs text-gray-500">Needs immediate attention</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4"
          >
            {/* Map Section */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin className="text-emerald-600 mr-2" size={20} />
                    Interactive Waste Bin Map
                  </h2>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    Real-time Data
                  </span>
                </div>
                <div className="h-[500px] w-full relative">
                  <MapContainer
                    center={[6.9170822, 79.862846]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                    className="z-0"
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
                        <Popup className="rounded-lg shadow-lg border border-gray-200">
                          <div className="p-3 max-w-xs">
                            <div className="flex items-start">
                              <img 
                                src={getWasteTypeIcon(location.wasteType)} 
                                alt={location.wasteType} 
                                className="w-8 h-8 mr-3 mt-1" 
                              />
                              <div>
                                <h3 className="font-semibold text-gray-800">{location.address}</h3>
                                <div className="flex items-center mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(location.status)} flex items-center`}>
                                    {getStatusIcon(location.status)}
                                    <span className="ml-1 capitalize">{location.status}</span>
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Last Updated: {location.lastUpdated}</p>
                              </div>
                            </div>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-3 w-full text-xs bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                              onClick={() => handleLocationClick(location)}
                            >
                              <MapPin size={14} className="mr-1" /> Open in Maps
                            </motion.button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-fit sticky top-4"
            >
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Trash2 className="text-emerald-600 mr-2" size={20} />
                  Nearby Waste Bins
                  <span className="ml-auto text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                    {filteredLocations.length} found
                  </span>
                </h2>
                <p className="mt-1 text-xs text-gray-500 flex items-center">
                  <Info className="mr-1" size={14} />
                  Click any bin to view on map
                </p>
              </div>
              <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
                {filteredLocations.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="divide-y divide-gray-100"
                  >
                    {filteredLocations.map((location) => (
                      <motion.div
                        key={location.id}
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        onClick={() => handleLocationClick(location)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {location.address}
                            </h3>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span className="capitalize">{location.wasteType}</span>
                              <span className="mx-2">•</span>
                              <span>Updated: {location.lastUpdated}</span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(location.status)} flex items-center`}>
                            {getStatusIcon(location.status)}
                            <span className="ml-1 capitalize">{location.status}</span>
                          </span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <ChevronRight className="text-gray-400 ml-auto" size={16} />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                      <Search className="text-gray-400" size={20} />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bins found</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Waste Management Locations Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 px-4"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Waste Management Hotspots</h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Key locations with advanced waste management infrastructure
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Malabe */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://images.unsplash.com/photo-1587183233478-0acdba5b184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Malabe Waste Management"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Malabe</h3>
                  <p className="text-emerald-200 text-sm mt-1">Smart Bins: 12</p>
                  <div className="mt-3 flex items-center text-white text-xs">
                    <span className="bg-emerald-600/80 px-2 py-1 rounded-full">Eco-Friendly</span>
                    <span className="bg-amber-600/80 px-2 py-1 rounded-full ml-2">High Traffic</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Kotte */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Kotte Waste Management"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Kotte</h3>
                  <p className="text-emerald-200 text-sm mt-1">Smart Bins: 8</p>
                  <div className="mt-3 flex items-center text-white text-xs">
                    <span className="bg-blue-600/80 px-2 py-1 rounded-full">Recycling Hub</span>
                    <span className="bg-purple-600/80 px-2 py-1 rounded-full ml-2">Solar Powered</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Rajagiriya */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Rajagiriya Waste Management"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Rajagiriya</h3>
                  <p className="text-emerald-200 text-sm mt-1">Smart Bins: 15</p>
                  <div className="mt-3 flex items-center text-white text-xs">
                    <span className="bg-red-600/80 px-2 py-1 rounded-full">High Priority</span>
                    <span className="bg-indigo-600/80 px-2 py-1 rounded-full ml-2">IoT Enabled</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Colombo Fort */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://media.istockphoto.com/id/956446200/photo/mosque-and-market-pettah-fort-colombo-sri-lanka.jpg?s=612x612&w=0&k=20&c=RPZocbCPpMNXnpWNXx3IzGhlBnv9ImkZj9G6U7RwNZ4="
                    alt="Rajagiriya Waste Management"
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Colombo Fort</h3>
                  <p className="text-emerald-200 text-sm mt-1">Smart Bins: 22</p>
                  <div className="mt-3 flex items-center text-white text-xs">
                    <span className="bg-emerald-600/80 px-2 py-1 rounded-full">Central Hub</span>
                    <span className="bg-amber-600/80 px-2 py-1 rounded-full ml-2">24/7 Monitoring</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-gradient-to-r bg-emerald-900 to-teal-600 rounded-2xl shadow-xl overflow-hidden mx-4"
          >
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Want to install smart bins in your area?
                </h2>
                <p className="mt-4 text-emerald-100 max-w-2xl mx-auto">
                  Join our smart city initiative and contribute to cleaner, more sustainable urban environments.
                </p>
                <motion.div 
                  className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-emerald-700 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Request Installation
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    Learn About Our Program
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(5, 150, 105, 0.5);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(5, 150, 105, 0.7);
        }
      `}</style>
    </>
  );
};

export default BinLocations;