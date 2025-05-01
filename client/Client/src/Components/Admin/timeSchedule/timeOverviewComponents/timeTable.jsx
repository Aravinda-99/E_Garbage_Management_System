import React, { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const TimeTable = ({ schedules, onDelete, onEdit, onApprove }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

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
    if (!form.status || form.status.trim() === '') errors.push('Status is required.');
    return errors;
  };

  const handleSaveEdit = () => {
    const validationErrors = validateForm(editForm);
    if (validationErrors.length > 0) {
      console.warn('Validation failed:', validationErrors);
      alert(`Cannot save schedule. Please fix:\n- ${validationErrors.join('\n- ')}`);
      return;
    }
    onEdit(editForm);
    setEditingId(null);
    setEditForm({});
    console.log('Schedule saved:', editForm);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
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
        } | ${schedule.wasteType || 'N/A'} | ${schedule.status || 'N/A'}`;
        console.log(`Adding row ${index + 1}: ${text}`);
        pdf.text(text, 10, yPosition);

        // Check for page overflow and add new page if needed
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

  return (
    <div>
      <div className="flex justify-end mb-4">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <motion.tr
                  key={schedule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
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
                          <option value="Organic">ORGANIC</option>
                          <option value="Recyclable">PLASTIC</option>
                          <option value="Hazardous">PAPER</option>
                          <option value="General">GLASS</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="status"
                          value={editForm.status || 'pending'}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.wasteType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            schedule.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {schedule.status}
                        </span>
                      </td>
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
                          onClick={() => onDelete(schedule)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </motion.button>
                        {schedule.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onApprove(schedule)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </motion.button>
                        )}
                      </td>
                    </>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No schedules available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;