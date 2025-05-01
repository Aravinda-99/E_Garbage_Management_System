import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeStatistics from '../dashbordComponent/timeStatistics.jsx';
import TimeTable from './timeOverviewComponents/timeTable.jsx';

// Configure axios defaults - adjust the base URL according to your backend
axios.defaults.baseURL = 'http://localhost:8045'; // Change this to your backend URL

const TimeManagementOverview = () => {
  // State for schedules and statistics
  const [schedules, setSchedules] = useState([]);
  const [timeStats, setTimeStats] = useState({
    scheduled: 0,
    completed: 0,
    pending: 0,
    locations: 0,
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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
    duplicate: '',
  });

  // Load schedules from backend on component mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Fetch all schedules from backend
  const fetchSchedules = async () => {
    setLoading(true);
    setApiError('');
    try {
      // Updated to match the controller endpoint
      const response = await axios.get('/api/v1/shedule/get-all-schedule');
      const fetchedSchedules = response.data;
      
      // Transform backend data format to frontend format if needed
      const formattedSchedules = fetchedSchedules.map(schedule => ({
        id: schedule.id.toString(),
        date: schedule.date,
        time: schedule.time,
        location: schedule.location,
        wasteType: schedule.wasteType,
        status: schedule.status || 'pending' // Add default if status is not in DTO
      }));
      
      setSchedules(formattedSchedules);
      updateStats(formattedSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setApiError('Failed to load schedules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Validation function for new schedule (empty fields)
  const validateNewSchedule = (schedule) => {
    const newErrors = {
      date: '',
      time: '',
      location: '',
      wasteType: '',
      duplicate: '',
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

  // CREATE: Add new schedule with validation and save to backend
  const handleCreateSchedule = async () => {
    // Clear any previous API errors
    setApiError('');
    
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

    try {
      setLoading(true);
      
      // Convert frontend data to match backend DTO
      const scheduleDTO = {
        id: newSchedule.id ? Number(newSchedule.id) : null,
        date: newSchedule.date, // Backend expects LocalDate format (YYYY-MM-DD)
        time: newSchedule.time, // Backend expects LocalTime format (HH:MM)
        location: newSchedule.location,
        wasteType: newSchedule.wasteType // Ensure it matches the WasteType enum values
      };

      // Updated to match the controller endpoint
      const response = await axios.post('/api/v1/shedule/saved', scheduleDTO);
      
      console.log('Backend response:', response.data);
      
      // Refresh schedules from backend to ensure we have latest data
      await fetchSchedules();
      
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
      
    } catch (error) {
      console.error('Error saving schedule:', error);
      setApiError(`Failed to save schedule: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
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
  const handleEditSchedule = async (updatedSchedule) => {
    setApiError('');
    try {
      setLoading(true);
      
      // Prepare DTO for backend
      const scheduleDTO = {
        id: updatedSchedule.id ? Number(updatedSchedule.id) : null,
        date: updatedSchedule.date,
        time: updatedSchedule.time,
        location: updatedSchedule.location,
        wasteType: updatedSchedule.wasteType
      };

      // Updated to match the controller endpoint
      await axios.put(`/api/v1/shedule/update/${scheduleDTO.id}`, scheduleDTO);
      
      // Update local state
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      );
      
      setSchedules(updatedSchedules);
      updateStats(updatedSchedules);
      
    } catch (error) {
      console.error('Error updating schedule:', error);
      setApiError(`Failed to update schedule: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove schedule
  const handleDeleteSchedule = async (scheduleToDelete) => {
    setApiError('');
    try {
      setLoading(true);
      
      // Updated to match the controller endpoint
      await axios.delete(`/api/v1/shedule/delete-schedule/${scheduleToDelete.id}`);
      
      // Update local state
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.id !== scheduleToDelete.id
      );
      
      setSchedules(updatedSchedules);
      updateStats(updatedSchedules);
      
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setApiError(`Failed to delete schedule: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Approve schedule
  // Note: Based on your controller, there doesn't seem to be a direct endpoint for status updates
  // You might need to implement this in the backend or use the update endpoint
  const handleApproveSchedule = async (schedule) => {
    setApiError('');
    try {
      setLoading(true);
      
      // Since there's no specific status endpoint in your controller,
      // use the general update endpoint
      const scheduleDTO = {
        id: schedule.id ? Number(schedule.id) : null,
        date: schedule.date,
        time: schedule.time,
        location: schedule.location,
        wasteType: schedule.wasteType,
        // Note: status isn't in the DTO, so you'll need to add this field to your DTO
        // or handle it differently in your backend
      };
      
      // Updated to match the controller endpoint
      await axios.put(`/api/v1/shedule/update/${scheduleDTO.id}`, scheduleDTO);
      
      // Update local state
      const updatedSchedules = schedules.map((s) =>
        s.id === schedule.id ? { ...s, status: 'completed' } : s
      );
      
      setSchedules(updatedSchedules);
      updateStats(updatedSchedules);
      
    } catch (error) {
      console.error('Error approving schedule:', error);
      setApiError(`Failed to approve schedule: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
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

  // Bulk action: Cancel all pending schedules
  // Note: This endpoint doesn't exist in your controller, so you'd need to add it
  const handleCancelAllPending = async () => {
    setApiError('');
    try {
      setLoading(true);
      
      // You'll need to add this endpoint to your controller
      // For now, use individual deletes for pending schedules
      const pendingSchedules = schedules.filter(s => s.status === 'pending');
      
      // Delete each pending schedule one by one
      for (const schedule of pendingSchedules) {
        await axios.delete(`/api/v1/shedule/delete-schedule/${schedule.id}`);
      }
      
      // Update local state
      const updatedSchedules = schedules.filter((s) => s.status !== 'pending');
      setSchedules(updatedSchedules);
      updateStats(updatedSchedules);
      
    } catch (error) {
      console.error('Error cancelling pending schedules:', error);
      setApiError(`Failed to cancel pending schedules: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Waste Collection Schedule Management</h1>

      {/* API Error Display */}
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{apiError}</p>
        </div>
      )}

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
          <div>
            <select
              name="wasteType"
              value={newSchedule.wasteType}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              disabled={loading}
            >
              <option value="">Select Waste Type</option>
              <option value="ORGANIC">ORGANIC</option>
              <option value="RECYCLABLE">RECYCLABLE</option>
              <option value="HAZARDOUS">HAZARDOUS</option>
              <option value="GENERAL">GENERAL</option>
            </select>
            {errors.wasteType && <p className="text-red-500 text-sm mt-1">{errors.wasteType}</p>}
          </div>
          <button
            onClick={handleCreateSchedule}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-green-300"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Schedule'}
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
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            Generate Weekly Plan
          </button>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading schedules...</p>
        ) : (
          <TimeTable
            schedules={schedules}
            onDelete={handleDeleteSchedule}
            onEdit={handleEditSchedule}
            onApprove={handleApproveSchedule}
            disabled={loading}
          />
        )}
      </div>

      {/* Additional Controls */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bulk Operations</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-yellow-300"
            disabled={loading}
          >
            Reschedule Pending
          </button>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-purple-300"
            disabled={loading}
          >
            Assign Collection Teams
          </button>
          <button
            onClick={handleCancelAllPending}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-red-300"
            disabled={loading}
          >
            Cancel All Pending
          </button>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-indigo-300"
            disabled={loading}
          >
            Export Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeManagementOverview;