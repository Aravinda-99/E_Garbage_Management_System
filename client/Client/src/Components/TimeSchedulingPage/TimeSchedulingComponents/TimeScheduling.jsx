import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Clock, Trash2, Recycle as RecyclingIcon, BatteryCharging, Leaf, Bell, Filter, ChevronLeft, ChevronRight, AlertCircle, MapPin, Truck, Search } from 'lucide-react';
import { Button } from '../TimeSchedulingComponents/ui/button';
import { Input } from '../TimeSchedulingComponents/ui/input';
import { cn } from '../TimeSchedulingComponents/lib/utils';
import Navbar from '../../Navbar.jsx';
import Footer from '../../Footer.jsx';
import Timeinfo from '../TimeSch_components/timeInfo.jsx';
import Uppersec from '../TimeSch_components/upperSection.jsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../TimeSchedulingComponents/ui/select";
import { toast } from 'sonner';
import axios from 'axios';

// Waste type mapping for display names, aligned with WasteType enum
const WASTE_TYPE_MAPPING = {
    'ORGANIC': 'Green Waste',
    'RECYCLABLE': 'Recyclables',
    'HAZARDOUS': 'Hazardous Waste',
    'GENERAL': 'General Waste',
    'MIXED': 'Mixed Waste',
    'GLASS': 'Glass',
    'ELECTRONIC': 'Electronic Waste',
    'PAPER': 'Paper'
};

// Mock data for fallback when backend fails, aligned with ScheduleDTO
const MOCK_SCHEDULES = [
    {
        id: 1,
        date: '2025-05-05',
        time: '07:00:00',
        location: 'Downtown',
        wasteType: 'ORGANIC'
    },
    {
        id: 2,
        date: '2025-05-06',
        time: '09:00:00',
        location: 'Suburbs',
        wasteType: 'RECYCLABLE'
    }
];

const Scheduling = () => {
    const [filterType, setFilterType] = useState('All');
    const [filterLocation, setFilterLocation] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));
    const [dateError, setDateError] = useState('');
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTimeouts, setActiveTimeouts] = useState({});
    const [dailyRoutes, setDailyRoutes] = useState({});
    const [retryCount, setRetryCount] = useState(0);

    // Process schedules into dailyRoutes, adjusted for ScheduleDTO
    const processSchedules = useCallback((schedules) => {
        const updatedRoutes = {};
        schedules.forEach(schedule => {
            const scheduleDate = new Date(schedule.date);
            const dayOfWeek = scheduleDate.toLocaleDateString('en-US', { weekday: 'long' });
            if (!updatedRoutes[dayOfWeek]) updatedRoutes[dayOfWeek] = [];
            
            // Parse LocalTime format (e.g., "07:00:00")
            const timeParts = schedule.time.split(':');
            const hours = parseInt(timeParts[0], 10);
            const minutes = timeParts[1];
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const endHours = (hours + 2) % 12 || 12;
            const endPeriod = hours + 2 >= 12 ? 'PM' : 'AM';
            const displayTime = `${displayHours}:${minutes} ${period} - ${endHours}:${minutes} ${endPeriod}`;

            updatedRoutes[dayOfWeek].push({
                id: schedule.id,
                location: schedule.location,
                type: WASTE_TYPE_MAPPING[schedule.wasteType] || schedule.wasteType,
                time: displayTime,
                route: `Dynamic Route ${schedule.id}`,
                day: dayOfWeek,
                date: schedule.date // Store the original date (e.g., "2025-05-05")
            });
        });
        console.log('Updated dailyRoutes:', updatedRoutes);
        return updatedRoutes;
    }, []);

    // Fetch schedules from backend, aligned with ScheduleDTO
    const fetchSchedules = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching schedules from backend...');
            const response = await axios.get('http://localhost:8045/api/v1/shedule/get-all-schedule', {
                timeout: 5000 // Timeout after 5 seconds
            });
            console.log('Backend response:', response.data);
            if (!Array.isArray(response.data)) {
                throw new Error('Invalid response format: Expected an array of schedules');
            }
            const updatedRoutes = processSchedules(response.data);
            setDailyRoutes(updatedRoutes);
            setRetryCount(0); // Reset retry count on success
        } catch (error) {
            console.error('Error fetching schedules:', {
                message: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data
                } : null
            });
            let errorMessage = 'Failed to load schedules. Please check the backend connection.';
            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Request timed out. Please try again later.';
            } else if (error.response?.status === 404) {
                errorMessage = 'Schedule endpoint not found. Verify the backend API.';
            } else if (error.response?.status === 400) {
                errorMessage = 'Bad request. Check the API parameters.';
            } else if (error.response?.status === 403) {
                errorMessage = 'Access denied. Check CORS or authentication.';
            } else if (error.response?.status === 500) {
                errorMessage = 'Server error. Contact backend support.';
            } else if (error.message.includes('Invalid response format')) {
                errorMessage = 'Unexpected data format from backend. Contact support.';
            }
            setError(errorMessage);
            toast.error(errorMessage, {
                position: 'top-right',
                duration: 3000,
            });
            // Fallback to mock data
            console.log('Using mock data as fallback...');
            const updatedRoutes = processSchedules(MOCK_SCHEDULES);
            setDailyRoutes(updatedRoutes);
        } finally {
            setLoading(false);
        }
    }, [processSchedules]);

    // Handle retry with exponential backoff
    const handleRetry = useCallback(() => {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s
        setRetryCount(prev => prev + 1);
        console.log(`Retrying fetchSchedules in ${delay}ms (attempt ${retryCount + 1})...`);
        setTimeout(() => {
            fetchSchedules();
        }, delay);
    }, [retryCount, fetchSchedules]);

    // Fetch schedules on mount and cleanup timeouts
    useEffect(() => {
        fetchSchedules();
        const timer = setTimeout(() => setLoading(false), 5000); // Fallback timeout
        return () => {
            clearTimeout(timer);
            Object.values(activeTimeouts).forEach(timeout => clearTimeout(timeout));
        };
    }, [fetchSchedules, activeTimeouts]);

    // Get all unique locations and waste types for filters
    const allLocations = useMemo(() => {
        const locations = new Set();
        Object.values(dailyRoutes).forEach(day => {
            day.forEach(collection => locations.add(collection.location));
        });
        return ['All', ...Array.from(locations)];
    }, [dailyRoutes]);

    const allWasteTypes = useMemo(() => {
        const types = new Set();
        Object.values(dailyRoutes).forEach(day => {
            day.forEach(collection => types.add(collection.type));
        });
        return ['All', ...Array.from(types)];
    }, [dailyRoutes]);

    function getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    const handleDateChange = useCallback((dateString) => {
        const newDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (newDate < today) {
            setDateError('You cannot select a past date.');
            toast.error('Cannot select a past date', { position: 'top-right', duration: 2000 });
        } else {
            setDateError('');
            setSelectedDate(dateString);
            setSelectedWeek(getWeekNumber(newDate));
        }
    }, []);

    const handleDateInputChange = (e) => {
        handleDateChange(e.target.value);
    };

    const getCollectionIcon = (type) => {
        switch (type) {
            case 'General Waste':
            case 'Mixed Waste':
                return <Trash2 className="w-5 h-5 text-gray-700" />;
            case 'Recyclables':
            case 'Glass':
            case 'Paper':
                return <RecyclingIcon className="w-5 h-5 text-green-600" />;
            case 'Electronic Waste':
                return <BatteryCharging className="w-5 h-5 text-yellow-500" />;
            case 'Green Waste':
                return <Leaf className="w-5 h-5 text-green-800" />;
            case 'Hazardous Waste':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            default:
                return null;
        }
    };

    // Get schedules based on selected date (default) or search term (global search)
    const displayedSchedules = useMemo(() => {
        if (searchTerm) {
            // Global search across all days
            const allSchedules = [];
            Object.entries(dailyRoutes).forEach(([day, schedules]) => {
                schedules.forEach(schedule => {
                    allSchedules.push({ ...schedule, day });
                });
            });

            return allSchedules.filter(collection => {
                const searchMatch = 
                    collection.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    collection.type.toLowerCase().includes(searchTerm.toLowerCase());
                const typeMatch = filterType === 'All' || collection.type === filterType;
                const locationMatch = filterLocation === 'All' || collection.location === filterLocation;
                return searchMatch && typeMatch && locationMatch;
            });
        } else {
            // Default: show schedules for the selected date only
            const date = new Date(selectedDate);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const daySchedule = dailyRoutes[dayOfWeek] || [];
            return daySchedule.filter(collection => {
                const typeMatch = filterType === 'All' || collection.type === filterType;
                const locationMatch = filterLocation === 'All' || collection.location === filterLocation;
                return typeMatch && locationMatch;
            });
        }
    }, [searchTerm, filterType, filterLocation, selectedDate, dailyRoutes]);

    const isReminderSet = useCallback((date, collection) => {
        const reminderId = `${date}-${collection.location}-${collection.type}`;
        return reminders.some(r => r.id === reminderId);
    }, [reminders]);

    const handleToggleReminder = useCallback((date, collection) => {
        const reminderId = `${date}-${collection.location}-${collection.type}`;
        const existingReminderIndex = reminders.findIndex(r => r.id === reminderId);
        const reminderExists = existingReminderIndex !== -1;

        if (reminderExists) {
            if (activeTimeouts[reminderId]) {
                clearTimeout(activeTimeouts[reminderId]);
            }
            
            const newReminders = reminders.filter(r => r.id !== reminderId);
            const newTimeouts = { ...activeTimeouts };
            delete newTimeouts[reminderId];
            
            setReminders(newReminders);
            setActiveTimeouts(newTimeouts);
            
            toast.success(`Reminder cleared for ${collection.type} in ${collection.location}!`, {
                position: 'top-right',
                duration: 2000,
            });
        } else {
            const startTime = collection.time.split(' - ')[0];
            const [time, period] = startTime.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            let adjustedHours = hours;
            if (period === 'PM' && hours !== 12) {
                adjustedHours += 12;
            } else if (period === 'AM' && hours === 12) {
                adjustedHours = 0;
            }

            const reminderDateTime = new Date(date);
            reminderDateTime.setHours(adjustedHours, minutes, 0, 0);

            const now = new Date();

            if (reminderDateTime <= now) {
                toast.error("Cannot set a reminder for a past time.", {
                    icon: <AlertCircle />,
                    position: 'top-right',
                    duration: 2000,
                });
                return;
            }

            const newReminder = {
                ...collection,
                date,
                id: reminderId
            };
            
            setReminders(prevReminders => [...prevReminders, newReminder]);

            toast.success(`Reminder set for ${collection.type} in ${collection.location} at ${startTime}!`, {
                position: 'top-right',
                duration: 2000,
            });

            const timeUntilReminder = reminderDateTime.getTime() - now.getTime();

            const timeoutId = setTimeout(() => {
                const message = `Reminder: ${collection.type} collection in ${collection.location} on ${date} between ${collection.time}!`;
                if (notificationsEnabled) {
                    if ("Notification" in window && Notification.permission === "granted") {
                        new Notification(message);
                    } else {
                        alert(message);
                    }
                } else {
                    toast.info(message, {
                        position: 'top-right',
                        duration: 3000,
                    });
                }
                
                setReminders(prev => prev.filter(r => r.id !== reminderId));
                setActiveTimeouts(prev => {
                    const newTimeouts = { ...prev };
                    delete newTimeouts[reminderId];
                    return newTimeouts;
                });
            }, timeUntilReminder);

            setActiveTimeouts(prevTimeouts => ({
                ...prevTimeouts,
                [reminderId]: timeoutId
            }));
        }
    }, [reminders, activeTimeouts, notificationsEnabled]);

    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562937950-192257528599?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
        >
            {/* Fixed Navbar */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <Navbar />
            </motion.div>

            {/* Added space between Navbar and Uppersec */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="pt-20"
            >
                <Uppersec
                    notificationsEnabled={notificationsEnabled}
                    setNotificationsEnabled={setNotificationsEnabled}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex-1"
            >
                <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-col space-y-4 mb-4 bg-green-100/50 p-3 rounded-lg">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xl font-semibold text-gray-900"
                                >
                                    Daily Collection Routes
                                </motion.h2>

                                {/* Search Bar */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex items-center space-x-2"
                                >
                                    <div className="relative flex-1">
                                        <Input
                                            type="text"
                                            placeholder="Search all days (location or waste type)"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {searchTerm && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSearchTerm('')}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    {/* Waste Types Filter */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <Filter className="w-5 h-5 text-gray-600" />
                                        <Select
                                            value={filterType}
                                            onValueChange={setFilterType}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Filter by waste type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#2b6a36c1] text-white">
                                                {allWasteTypes.map(type => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className="text-white hover:bg-[#2A5A50] focus:bg-[#2A5A50]"
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </motion.div>

                                    {/* Location Filter */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                        <Select
                                            value={filterLocation}
                                            onValueChange={setFilterLocation}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Filter by location" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#2b6a36a0] text-white">
                                                {allLocations.map(location => (
                                                   <SelectItem
                                                        key={location}
                                                        value={location}
                                                        className="text-white hover:bg-[#2b6a36c1] focus:bg-[#2A5A50]"
                                                    >
                                                        {location}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </motion.div>

                                    {/* Date Navigation */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="flex items-center space-x-4"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                const date = new Date(selectedDate);
                                                date.setDate(date.getDate() - 1);
                                                handleDateChange(date.toISOString().split('T')[0]);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                                        </Button>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="relative flex-1"
                                        >
                                            <Input
                                                type="date"
                                                value={selectedDate}
                                                onChange={handleDateInputChange}
                                                className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </motion.div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                const date = new Date(selectedDate);
                                                date.setDate(date.getDate() + 1);
                                                handleDateChange(date.toISOString().split('T')[0]);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {dateError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {dateError}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="text-sm text-gray-600"
                            >
                                Week {selectedWeek} - {getDayName(selectedDate)}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="text-sm font-medium text-gray-700"
                            >
                                {displayedSchedules.length} {displayedSchedules.length === 1 ? 'collection' : 'collections'} {searchTerm ? 'found' : 'scheduled'}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-y-4"
                    >
                        <AnimatePresence>
                            {error ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-red-100/80 backdrop-blur-md rounded-xl shadow-md p-8 text-center"
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-lg font-medium text-red-700"
                                    >
                                        Error Loading Schedules
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-red-500 mt-2"
                                    >
                                        {error}
                                    </motion.p>
                                    <Button
                                        onClick={handleRetry}
                                        className="mt-4 bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Retry (Attempt {retryCount + 1})
                                    </Button>
                                </motion.div>
                            ) : loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.5 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex items-center justify-between animate-pulse"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <div className="h-4 bg-gray-300 rounded w-40 mb-1"></div>
                                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                                            </motion.div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-20 h-8 bg-gray-300 rounded"
                                        />
                                    </motion.div>
                                ))
                            ) : displayedSchedules.length > 0 ? (
                                displayedSchedules.map((collection, index) => {
                                    const isCurrentlySet = isReminderSet(selectedDate, collection);
                                    return (
                                        <motion.div
                                            key={`${collection.route}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex items-center justify-between"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="flex items-center gap-4"
                                            >
                                                {getCollectionIcon(collection.type)}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.1 }}
                                                >
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.2 }}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <p className="text-lg font-semibold text-gray-900">{collection.type}</p>
                                                        <motion.span
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5, delay: 0.3 }}
                                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                        >
                                                            {collection.route}
                                                        </motion.span>
                                                    </motion.div>
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.4 }}
                                                        className="text-sm text-gray-600"
                                                    >
                                                        <span className="font-medium">{collection.time}</span>
                                                        {searchTerm && (
                                                            <span>
                                                                {' on '}
                                                                {collection.day}
                                                                {' ('}
                                                                <span className="text-red-500">{collection.date}</span>
                                                                {')'}
                                                            </span>
                                                        )}
                                                    </motion.p>
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.5 }}
                                                        className="text-xs text-gray-500 mt-1 flex items-center"
                                                    >
                                                        <MapPin className="w-3 h-3 mr-1" /> {collection.location}
                                                    </motion.p>
                                                </motion.div>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleToggleReminder(selectedDate, collection)}
                                                    className={cn(
                                                        isCurrentlySet
                                                            ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                                                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                                    )}
                                                >
                                                    {isCurrentlySet ? (
                                                        <>
                                                            <Clock className="w-4 h-4 mr-2" />
                                                            Clear Reminder
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Bell className="w-4 h-4 mr-2" />
                                                            Remind Me
                                                        </>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 text-center"
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <Truck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-lg font-medium text-gray-700"
                                    >
                                        {searchTerm ? 'No collections found' : 'No collections scheduled'}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-gray-500 mt-2"
                                    >
                                        {searchTerm
                                            ? "No collections match your search or filters. Try adjusting your search term or filters."
                                            : filterType !== 'All' || filterLocation !== 'All'
                                            ? "No collections match your filters. Try adjusting your filters."
                                            : "No waste collections are scheduled for this day."}
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Timeinfo />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Footer />
            </motion.div>
        </motion.div>
    );
};

export default Scheduling;