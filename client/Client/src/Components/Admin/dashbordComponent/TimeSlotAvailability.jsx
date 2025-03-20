// TimeSlotAvailability.jsx
import React from 'react';

const TimeSlotAvailability = ({ timeSlots, selectedDate, setSelectedDate, selectedLocation, setSelectedLocation }) => {
  // Filter time slots based on selected date and location
  const filteredTimeSlots = timeSlots.filter(slot => {
    return (
      slot.date === selectedDate && 
      (selectedLocation === 'All' || slot.location === selectedLocation)
    );
  });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Time Slot Availability</h3>
          <div className="mb-4 flex flex-wrap gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="All">All Locations</option>
                <option value="Downtown">Downtown</option>
                <option value="North Side">North Side</option>
                <option value="East Side">East Side</option>
                <option value="West Side">West Side</option>
                <option value="South Side">South Side</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTimeSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        slot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Note: In a real application, this would use a full-featured calendar component.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotAvailability;