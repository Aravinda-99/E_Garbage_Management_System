import React, { useState } from 'react';
import { MapPin, Trash2, Edit, Plus, X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Initial mock data with the fix
const initialLocations = [
  { id: 1, latitude: 6.927079, longitude: 79.861244, address: "Colombo Fort, Colombo", wasteType: "organic", status: "half-full", lastUpdated: "2024-03-15 10:30" },
  { id: 2, latitude: 6.914741, longitude: 79.872128, address: "Galle Face Green, Colombo", wasteType: "plastic", status: "empty", lastUpdated: "2024-03-15 09:45" },
  { id: 3, latitude: 6.901691, longitude: 79.856975, address: "Kollupitiya, Colombo", wasteType: "paper", status: "full", lastUpdated: "2024-03-15 11:15" },
  { id: 4, latitude: 6.935821, longitude: 79.850726, address: "Maradana, Colombo", wasteType: "metal", status: "empty", lastUpdated: "2024-03-15 12:00" },
  { id: 5, latitude: 6.906079, longitude: 79.873157, address: "Bambalapitiya, Colombo", wasteType: "plastic", status: "half-full", lastUpdated: "2024-03-15 11:45" }
];

// Utility functions remain unchanged
const getStatusColor = (status) => {
  switch (status) {
    case 'empty': return 'bg-green-100 text-green-700';
    case 'half-full': return 'bg-yellow-100 text-yellow-700';
    case 'full': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getWasteTypeIcon = (type) => {
  switch (type) {
    case 'organic': return '🌱';
    case 'plastic': return '♻️';
    case 'paper': return '📄';
    case 'metal': return '🔧';
    default: return '🗑️';
  }
};

const BinLocationsAdmin = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState({
    latitude: '',
    longitude: '',
    address: '',
    wasteType: 'organic',
    status: 'empty',
    lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveLocation = () => {
    if (!newLocation.latitude || !newLocation.longitude || !newLocation.address || !newLocation.wasteType || !newLocation.status) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (editingLocation) {
      setLocations((prev) => prev.map((loc) => loc.id === editingLocation.id ? { ...loc, ...newLocation, id: loc.id } : loc));
      toast.success('Location updated successfully!');
    } else {
      const newId = locations.length ? Math.max(...locations.map((loc) => loc.id)) + 1 : 1;
      setLocations((prev) => [...prev, { ...newLocation, id: newId, latitude: parseFloat(newLocation.latitude), longitude: parseFloat(newLocation.longitude) }]);
      toast.success('Location added successfully!');
    }
    setNewLocation({ latitude: '', longitude: '', address: '', wasteType: 'organic', status: 'empty', lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ') });
    setEditingLocation(null);
    setIsModalOpen(false);
  };

  const handleDeleteLocation = (id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    toast.success('Location deleted successfully!');
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setNewLocation({ ...location });
    setIsModalOpen(true);
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setNewLocation({ latitude: '', longitude: '', address: '', wasteType: 'organic', status: 'empty', lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ') });
    setIsModalOpen(true);
  };

  const statusCounts = {
    empty: locations.filter(loc => loc.status === 'empty').length,
    halfFull: locations.filter(loc => loc.status === 'half-full').length,
    full: locations.filter(loc => loc.status === 'full').length
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#1E293B] tracking-tight">Bin Management Dashboard</h1>
            <p className="text-[#64748B] mt-1">Oversee waste bins across Sri Lanka with ease</p>
          </div>
          <button
            onClick={handleAddLocation}
            className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-full hover:bg-[#0D9488] transition-all shadow-md"
          >
            <Plus size={18} />
            New Bin
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#E2E8F0] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-[#22C55E]" size={24} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Empty Bins</h3>
                <p className="text-3xl font-semibold text-[#22C55E]">{statusCounts.empty}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#E2E8F0] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-[#F59E0B]" size={24} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Half-Full Bins</h3>
                <p className="text-3xl font-semibold text-[#F59E0B]">{statusCounts.halfFull}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#E2E8F0] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-[#EF4444]" size={24} />
              <div>
                <h3 className="text-sm font-medium text-[#64748B]">Full Bins</h3>
                <p className="text-3xl font-semibold text-[#EF4444]">{statusCounts.full}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
            <Trash2 className="text-[#14B8A6]" size={20} />
            Bin Locations
            <span className="text-sm text-[#64748B]">({locations.length} total)</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F1F5F9] text-[#64748B] text-sm uppercase tracking-wide">
                  <th className="p-4">Address</th>
                  <th className="p-4">Coordinates</th>
                  <th className="p-4">Waste Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                    <td className="p-4 text-[#1E293B]">{location.address}</td>
                    <td className="p-4 text-[#64748B]">{location.latitude}, {location.longitude}</td>
                    <td className="p-4 flex items-center gap-2 text-[#1E293B]">
                      <span>{getWasteTypeIcon(location.wasteType)}</span>
                      {location.wasteType}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(location.status)}`}>
                        {location.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#64748B]">{location.lastUpdated}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => handleEditLocation(location)} className="text-[#14B8A6] hover:text-[#0D9488] transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteLocation(location.id)} className="text-[#EF4444] hover:text-[#DC2626] transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1E293B]">{editingLocation ? 'Edit Bin Location' : 'Add New Bin Location'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newLocation.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                  placeholder="Enter address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-1">Latitude</label>
                  <input
                    type="number"
                    name="latitude"
                    value={newLocation.latitude}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                    placeholder="e.g., 6.927079"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-1">Longitude</label>
                  <input
                    type="number"
                    name="longitude"
                    value={newLocation.longitude}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                    placeholder="e.g., 79.861244"
                    step="any"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">Waste Type</label>
                <select
                  name="wasteType"
                  value={newLocation.wasteType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                >
                  <option value="organic">Organic</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper</option>
                  <option value="metal">Metal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">Status</label>
                <select
                  name="status"
                  value={newLocation.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                >
                  <option value="empty">Empty</option>
                  <option value="half-full">Half Full</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">Last Updated</label>
                <input
                  type="text"
                  name="lastUpdated"
                  value={newLocation.lastUpdated}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-[#F8FAFC] text-[#1E293B]"
                  placeholder="e.g., 2024-03-15 10:30"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#CBD5E1] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLocation}
                className="flex items-center gap-2 px-4 py-2 bg-[#14B8A6] text-white rounded-lg hover:bg-[#0D9488] transition-colors"
              >
                <Save size={18} />
                {editingLocation ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default BinLocationsAdmin;