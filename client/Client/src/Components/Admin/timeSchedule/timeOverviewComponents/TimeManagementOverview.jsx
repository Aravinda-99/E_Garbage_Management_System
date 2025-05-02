import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from '../TimeSchedulingComponents/ui/button';
import { Input } from '../TimeSchedulingComponents/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../TimeSchedulingComponents/ui/select';
import { toast } from 'sonner';

const TimeManagementOverview = ({ onScheduleApproved }) => {
    const [schedules, setSchedules] = useState([
        // Example schedule data
        { id: '1', date: '2025-05-05', time: '07:00', location: 'Downtown', wasteType: 'Organic', status: 'pending' }
    ]);

    // State for new schedule form
    const [newSchedule, setNewSchedule] = useState({
        date: '',
        time: '',
        location: '',
        wasteType: ''
    });

    // Current date for validation (May 3, 2025, as per system context)
    const today = new Date('2025-05-03');
    today.setHours(0, 0, 0, 0);

    const handleApproveSchedule = useCallback(async (schedule) => {
        // Validate date: block past dates
        const scheduleDate = new Date(schedule.date);
        if (scheduleDate < today) {
            alert('Cannot approve a schedule for a past date.');
            return;
        }

        try {
            console.log('Approving schedule:', schedule);
            // Update schedule status to "completed" in backend
            await axios.put(`http://localhost:8045/api/v1/shedule/update-schedule/${schedule.id}`, {
                ...schedule,
                status: 'completed'
            });
            // Update local state
            setSchedules(prev => prev.map(s => s.id === schedule.id ? { ...s, status: 'completed' } : s));
            // Call the onScheduleApproved callback
            if (onScheduleApproved) {
                console.log('Calling onScheduleApproved with:', schedule);
                onScheduleApproved(schedule);
            }
            toast.success('Schedule approved successfully!', {
                position: 'top-right',
                duration: 2000,
            });
        } catch (error) {
            console.error('Error approving schedule:', error);
            toast.error('Failed to approve schedule.', {
                position: 'top-right',
                duration: 3000,
            });
        }
    }, [onScheduleApproved]);

    const handleInputChange = (field, value) => {
        setNewSchedule(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateSchedule = useCallback(async () => {
        // Validate required fields
        if (!newSchedule.date || !newSchedule.time || !newSchedule.location || !newSchedule.wasteType) {
            toast.error('Please fill in all fields.', {
                position: 'top-right',
                duration: 3000,
            });
            return;
        }

        // Validate date: block past dates, allow present or future
        const selectedDate = new Date(newSchedule.date);
        if (selectedDate < today) {
            alert('Cannot create a schedule for a past date.');
            return;
        }

        try {
            console.log('Creating new schedule:', newSchedule);
            // Send POST request to backend to create a new schedule
            const response = await axios.post('http://localhost:8045/api/v1/shedule/create-schedule', {
                date: newSchedule.date,
                time: newSchedule.time + ':00', // Append seconds to match backend format (HH:mm:ss)
                location: newSchedule.location,
                wasteType: newSchedule.wasteType.toUpperCase(), // Convert to uppercase to match backend enum
                status: 'pending'
            });

            // Add the new schedule to the local state
            const newScheduleWithId = {
                id: response.data.id || Date.now().toString(), // Use backend ID if available, else fallback
                date: newSchedule.date,
                time: newSchedule.time,
                location: newSchedule.location,
                wasteType: newSchedule.wasteType,
                status: 'pending'
            };
            setSchedules(prev => [...prev, newScheduleWithId]);

            // Reset form
            setNewSchedule({ date: '', time: '', location: '', wasteType: '' });

            toast.success('Schedule created successfully!', {
                position: 'top-right',
                duration: 2000,
            });
        } catch (error) {
            console.error('Error creating schedule:', error);
            toast.error('Failed to create schedule.', {
                position: 'top-right',
                duration: 3000,
            });
        }
    }, [newSchedule, today]);

    // Available waste types (aligned with backend WasteType enum)
    const wasteTypes = ['Organic', 'Recyclable', 'Hazardous', 'General', 'Mixed', 'Glass', 'Electronic', 'Paper'];

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule Management</h2>

            {/* Form to Create New Schedule */}
            <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Create New Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <Input
                            type="date"
                            value={newSchedule.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <Input
                            type="time"
                            value={newSchedule.time}
                            onChange={(e) => handleInputChange('time', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <Input
                            type="text"
                            value={newSchedule.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="Enter location"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Waste Type</label>
                        <Select
                            value={newSchedule.wasteType}
                            onValueChange={(value) => handleInputChange('wasteType', value)}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Select waste type" />
                            </SelectTrigger>
                            <SelectContent>
                                {wasteTypes.map(type => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button
                    onClick={handleCreateSchedule}
                    className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
                >
                    Create Schedule
                </Button>
            </div>

            {/* Existing Schedules */}
            {schedules.map(schedule => (
                <div key={schedule.id} className="bg-white p-4 mb-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p><strong>Type:</strong> {schedule.wasteType}</p>
                        <p><strong>Location:</strong> {schedule.location}</p>
                        <p><strong>Date:</strong> {schedule.date}</p>
                        <p><strong>Time:</strong> {schedule.time}</p>
                        <p><strong>Status:</strong> {schedule.status}</p>
                    </div>
                    {schedule.status === 'pending' && (
                        <Button
                            onClick={() => handleApproveSchedule(schedule)}
                            className="bg-green-500 text-white hover:bg-green-600"
                        >
                            Approve
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TimeManagementOverview;