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
    locations: 0,
    pastDays: 0,
    presentDays: 0,
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

  // Current date for validation (May 3, 2025, as per system context)
  const today = new Date('2025-05-03');
  today.setHours(0, 0, 0, 0);

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

    // Validate date: block past dates, allow present or future
    const selectedDate = new Date(newSchedule.date);
    if (selectedDate < today) {
      alert('Cannot create a schedule for a past date.');
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
      locations: new Set(updatedSchedules.map((s) => s.location)).size,
      pastDays: updatedSchedules.filter((s) => new Date(s.date) < today).length,
      presentDays: updatedSchedules.filter((s) => new Date(s.date) >= today).length,
    });
  };

  // UPDATE: Edit existing schedule
  const handleEditSchedule = async (updatedSchedule) => {
    setApiError('');

    // Validate date: block past dates, allow present or future
    const selectedDate = new Date(updatedSchedule.date);
    if (selectedDate < today) {
      alert('Cannot update a schedule to a past date.');
      return;
    }

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
  const handleApproveSchedule = async (schedule) => {
    setApiError('');

    // Validate date: block past dates, allow present or future
    const selectedDate = new Date(schedule.date);
    if (selectedDate < today) {
      alert('Cannot approve a schedule for a past date.');
      return;
    }

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

  // State for bulk operation confirmation
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkAction, setBulkAction] = useState(null);

  // Bulk action handlers
  const handleBulkDeletePast = () => {
    setBulkAction('past');
    setShowBulkConfirm(true);
  };

  const handleBulkDeletePresentFuture = () => {
    setBulkAction('presentFuture');
    setShowBulkConfirm(true);
  };

  const handleBulkDeleteAll = () => {
    setBulkAction('all');
    setShowBulkConfirm(true);
  };

  const confirmBulkDelete = async () => {
    if (!bulkAction) return;

    setLoading(true);
    setApiError('');
    try {
      let schedulesToDelete = [];
      if (bulkAction === 'past') {
        schedulesToDelete = schedules.filter(s => new Date(s.date) < today);
      } else if (bulkAction === 'presentFuture') {
        schedulesToDelete = schedules.filter(s => new Date(s.date) >= today);
      } else if (bulkAction === 'all') {
        schedulesToDelete = [...schedules];
      }

      for (const schedule of schedulesToDelete) {
        await axios.delete(`/api/v1/shedule/delete-schedule/${schedule.id}`);
      }

      const updatedSchedules = schedules.filter(s => !schedulesToDelete.some(del => del.id === s.id));
      setSchedules(updatedSchedules);
      updateStats(updatedSchedules);
    } catch (error) {
      console.error(`Error deleting ${bulkAction} schedules:`, error);
      setApiError(`Failed to delete ${bulkAction} schedules: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
      setShowBulkConfirm(false);
      setBulkAction(null);
    }
  };

  const cancelBulkDelete = () => {
    setShowBulkConfirm(false);
    setBulkAction(null);
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
              <option value="MIXED">MIXED</option>
              <option value="GLASS">GLASS</option>
              <option value="ELECTRONIC">ELECTRONIC</option>
              <option value="PAPER">PAPER</option>
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
            onClick={handleBulkDeletePast}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-yellow-300"
            disabled={loading}
          >
            Delete All Past Schedules
          </button>
          <button 
            onClick={handleBulkDeletePresentFuture}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-purple-300"
            disabled={loading}
          >
            Delete All Present and Future Schedules
          </button>
          <button
            onClick={handleBulkDeleteAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-red-300"
            disabled={loading}
          >
            Delete All Schedules
          </button>
        </div>
      </div>

      {/* Bulk Confirmation Popup */}
      {showBulkConfirm && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-md bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete all {bulkAction === 'past' ? 'past' : bulkAction === 'presentFuture' ? 'present and future' : 'all'} schedules?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelBulkDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeManagementOverview;