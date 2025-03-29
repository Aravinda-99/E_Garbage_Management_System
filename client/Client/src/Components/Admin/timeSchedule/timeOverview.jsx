import React, { useState } from 'react';
import TimeStatistics from '../dashbordComponent/timeStatistics.jsx'; // Adjust path as needed
import TimeTable from './timeOverviewComponents/timeTable.jsx'; // Adjust path as needed

const TimeManagementOverview = () => {
  // State for schedules and statistics
  const [schedules, setSchedules] = useState([]);
  const [timeStats, setTimeStats] = useState({
    scheduled: 0,
    completed: 0,
    pending: 0,
    locations: 0,
  });

  // State for new schedule form, including wasteType
  const [newSchedule, setNewSchedule] = useState({
    id: '',
    date: '',
    time: '',
    location: '',
    wasteType: '',
    status: 'pending',
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    date: '',
    time: '',
    location: '',
    wasteType: '',
    duplicate: '', // New error for duplicate schedules
  });

  // Validation function for new schedule (empty fields)
  const validateNewSchedule = (schedule) => {
    const newErrors = {
      date: '',
      time: '',
      location: '',
      wasteType: '',
      duplicate: '', // Reset duplicate error
    };
    let isValid = true;

    if (!schedule.date || schedule.date.trim() === '') {
      newErrors.date = 'Date is required.';
      isValid = false;
    }
    if (!schedule.time || schedule.time.trim() === '') {
      newErrors.time = 'Time is required.';
      isValid = false;
    }
    if (!schedule.location || schedule.location.trim() === '') {
      newErrors.location = 'Location is required.';
      isValid = false;
    }
    if (!schedule.wasteType || schedule.wasteType.trim() === '') {
      newErrors.wasteType = 'Waste Type is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Check for duplicate schedules
  const checkForDuplicate = (schedule) => {
    return schedules.some(
      (existingSchedule) =>
        existingSchedule.date === schedule.date &&
        existingSchedule.time === schedule.time &&
        existingSchedule.location === schedule.location &&
        existingSchedule.wasteType === schedule.wasteType
    );
  };

  // CREATE: Add new schedule with validation
  const handleCreateSchedule = () => {
    // Validate empty fields
    const isValid = validateNewSchedule(newSchedule);

    if (!isValid) {
      console.warn('Validation failed for new schedule:', errors);
      return;
    }

    // Check for duplicates
    if (checkForDuplicate(newSchedule)) {
      setErrors((prev) => ({
        ...prev,
        duplicate: 'A schedule with the same date, time, location, and waste type already exists.',
      }));
      console.warn('Duplicate schedule detected:', newSchedule);
      return;
    }

    const scheduleWithId = {
      ...newSchedule,
      id: Date.now().toString(), // Simple unique ID generation
    };

    const updatedSchedules = [...schedules, scheduleWithId];
    setSchedules(updatedSchedules);
    updateStats(updatedSchedules);

    // Reset form and errors
    setNewSchedule({
      id: '',
      date: '',
      time: '',
      location: '',
      wasteType: '',
      status: 'pending',
    });
    setErrors({
      date: '',
      time: '',
      location: '',
      wasteType: '',
      duplicate: '',
    });
    console.log('Schedule added successfully:', scheduleWithId);
  };

  // READ: Update statistics based on schedules
  const updateStats = (updatedSchedules) => {
    setTimeStats({
      scheduled: updatedSchedules.length,
      completed: updatedSchedules.filter((s) => s.status === 'completed').length,
      pending: updatedSchedules.filter((s) => s.status === 'pending').length,
      locations: new Set(updatedSchedules.map((s) => s.location)).size,
    });
  };

  // UPDATE: Edit existing schedule
  const handleEditSchedule = (updatedSchedule) => {
    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    );
    setSchedules(updatedSchedules);
    updateStats(updatedSchedules);
  };

  // DELETE: Remove schedule
  const handleDeleteSchedule = (scheduleToDelete) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.id !== scheduleToDelete.id
    );
    setSchedules(updatedSchedules);
    updateStats(updatedSchedules);
  };

  // UPDATE: Approve schedule
  const handleApproveSchedule = (schedule) => {
    const updatedSchedules = schedules.map((s) =>
      s.id === schedule.id ? { ...s, status: 'completed' } : s
    );
    setSchedules(updatedSchedules);
    updateStats(updatedSchedules);
  };

  // Form input handler with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited if it now has a value
    if (value && value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Clear duplicate error when any field changes
    setErrors((prev) => ({ ...prev, duplicate: '' }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Waste Collection Schedule Management</h1>

      {/* Time Statistics Cards */}
      <TimeStatistics stats={timeStats} />

      {/* Create New Schedule Form */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <input
              type="date"
              name="date"
              value={newSchedule.date}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Date"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <input
              type="time"
              name="time"
              value={newSchedule.time}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Time"
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={newSchedule.location}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              placeholder="Location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
          <div>
            <select
              name="wasteType"
              value={newSchedule.wasteType}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Waste Type</option>
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
              <option value="General">General</option>
            </select>
            {errors.wasteType && <p className="text-red-500 text-sm mt-1">{errors.wasteType}</p>}
          </div>
          <button
            onClick={handleCreateSchedule}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Schedule
          </button>
        </div>
        {/* Display duplicate error below the form */}
        {errors.duplicate && (
          <p className="text-red-500 text-sm mt-2">{errors.duplicate}</p>
        )}
      </div>

      {/* Schedule Table Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Collection Schedules</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Generate Weekly Plan
          </button>
        </div>
        <TimeTable
          schedules={schedules}
          onDelete={handleDeleteSchedule}
          onEdit={handleEditSchedule}
          onApprove={handleApproveSchedule}
        />
      </div>

      {/* Additional Controls */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bulk Operations</h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors">
            Reschedule Pending
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Assign Collection Teams
          </button>
          <button
            onClick={() => {
              const updatedSchedules = schedules.filter((s) => s.status !== 'pending');
              setSchedules(updatedSchedules);
              updateStats(updatedSchedules);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel All Pending
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeManagementOverview;