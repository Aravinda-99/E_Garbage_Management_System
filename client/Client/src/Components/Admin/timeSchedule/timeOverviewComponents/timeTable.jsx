import React, { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import axios from 'axios';
import { toast } from 'sonner';

const TimeTable = ({ schedules, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false); // New state for save confirmation
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [filterOption, setFilterOption] = useState('all'); // State for filter: 'all', 'past', 'presentFuture'

  // Current date for determining past schedules (May 3, 2025, as per system context)
  const today = new Date('2025-05-03');
  today.setHours(0, 0, 0, 0);

  const handleEditClick = (schedule) => {
    setEditingId(schedule.id);
    setEditForm({ ...schedule });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (form) => {
    const errors = [];
    if (!form.date || form.date.trim() === '') errors.push('Date is required.');
    if (!form.time || form.time.trim() === '') errors.push('Time is required.');
    if (!form.location || form.location.trim() === '') errors.push('Location is required.');
    if (!form.wasteType || form.wasteType.trim() === '') errors.push('Waste Type is required.');
    return errors;
  };

  const handleSaveEdit = () => {
    const validationErrors = validateForm(editForm);
    if (validationErrors.length > 0) {
      console.warn('Validation failed:', validationErrors);
      alert(`Cannot save schedule. Please fix:\n- ${validationErrors.join('\n- ')}`);
      return;
    }
    // Show confirmation popup before saving
    setShowSaveConfirm(true);
  };

  const confirmSave = () => {
    onEdit(editForm);
    setEditingId(null);
    setEditForm({});
    setShowSaveConfirm(false);
    console.log('Schedule saved:', editForm);
  };

  const cancelSave = () => {
    setShowSaveConfirm(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDeleteClick = (schedule) => {
    setScheduleToDelete(schedule);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      onDelete(scheduleToDelete);
      setShowDeleteConfirm(false);
      setScheduleToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setScheduleToDelete(null);
  };

  const generatePDF = () => {
    console.log('Starting PDF generation...');

    if (!schedules || schedules.length === 0) {
      console.warn('No schedules available to export.');
      alert('No schedules to export!');
      return;
    }

    try {
      console.log('Initializing jsPDF...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setFontSize(12);
      console.log('Setting PDF title...');
      pdf.text('Timetable Export', 10, 10);

      console.log('Adding schedules to PDF...');
      schedules.forEach((schedule, index) => {
        const yPosition = 20 + index * 10;
        const text = `${schedule.date || 'N/A'} | ${schedule.time || 'N/A'} | ${
          schedule.location || 'N/A'
        } | ${schedule.wasteType || 'N/A'}`;
        console.log(`Adding row ${index + 1}: ${text}`);
        pdf.text(text, 10, yPosition);

        if (yPosition > 270) {
          console.log('Adding new page due to overflow...');
          pdf.addPage();
          pdf.text('Timetable Export (Continued)', 10, 10);
        }
      });

      console.log('Saving PDF...');
      pdf.save('timetable.pdf');
      console.log('PDF generation complete. Check your downloads folder.');
    } catch (error) {
      console.error('PDF Generation Error:', error.message, error.stack);
      alert('Failed to generate PDF. Check the console for details.');
    }
  };

  // Filter schedules based on the selected filter option
  const filteredSchedules = () => {
    if (filterOption === 'past') {
      return schedules.filter(schedule => new Date(schedule.date) < today);
    } else if (filterOption === 'presentFuture') {
      return schedules.filter(schedule => new Date(schedule.date) >= today);
    }
    return schedules; // 'all' option
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Filter Schedules:</span>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Schedules</option>
              <option value="past">Past Days</option>
              <option value="presentFuture">Present & Future Days</option>
            </select>
          </label>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </motion.button>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waste Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSchedules().length > 0 ? (
              filteredSchedules().map((schedule, index) => {
                const isPast = new Date(schedule.date) < today;
                return (
                  <motion.tr
                    key={schedule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-gray-50 transition-colors ${isPast ? 'bg-red-100' : ''}`}
                  >
                    {editingId === schedule.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            name="date"
                            value={editForm.date || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="time"
                            name="time"
                            value={editForm.time || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            name="location"
                            value={editForm.location || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            name="wasteType"
                            value={editForm.wasteType || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
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
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-800"
                          >
                            Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </motion.button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isPast ? 'text-red-500' : 'text-gray-900'}`}>
                          {schedule.date}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isPast ? 'text-red-500' : 'text-gray-900'}`}>
                          {schedule.time}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isPast ? 'text-red-500' : 'text-gray-900'}`}>
                          {schedule.location}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isPast ? 'text-red-500' : 'text-gray-900'}`}>
                          {schedule.wasteType || 'N/A'}
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditClick(schedule)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteClick(schedule)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </>
                    )}
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {filterOption === 'past' ? 'No past schedules available' : 
                   filterOption === 'presentFuture' ? 'No present or future schedules available' : 
                   'No schedules available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save Confirmation Popup */}
      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Save</h3>
            <p className="mb-4">Are you sure you want to save this schedule?</p>
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={cancelSave}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={confirmSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this schedule?</p>
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;