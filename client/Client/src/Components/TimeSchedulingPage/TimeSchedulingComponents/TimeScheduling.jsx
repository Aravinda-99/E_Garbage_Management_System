import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, Clock, Trash2, Recycle as RecyclingIcon, BatteryCharging, Leaf, Bell, Filter, ChevronLeft, ChevronRight, AlertCircle, MapPin, Truck } from 'lucide-react';
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

const Scheduling = () => {
    const [filterType, setFilterType] = useState('All');
    const [filterLocation, setFilterLocation] = useState('All');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));
    const [dateError, setDateError] = useState('');
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTimeouts, setActiveTimeouts] = useState({});

    // Define routes with locations and their collection details
    const dailyRoutes = {
        'Monday': [
            { location: 'Downtown', type: 'General Waste', time: '7:00 AM - 9:00 AM', route: 'Route A' },
            { location: 'Suburbs', type: 'Recyclables', time: '8:00 AM - 10:00 AM', route: 'Route B' },
            { location: 'Industrial Area', type: 'Electronic Waste', time: '9:00 AM - 11:00 AM', route: 'Route C' }
        ],
        'Tuesday': [
            { location: 'Rural', type: 'Green Waste', time: '6:00 AM - 8:00 AM', route: 'Route D' },
            { location: 'Downtown', type: 'Recyclables', time: '10:00 AM - 12:00 PM', route: 'Route A' },
            { location: 'Suburbs', type: 'General Waste', time: '7:00 AM - 9:00 AM', route: 'Route B' }
        ],
        'Wednesday': [
            { location: 'Industrial Area', type: 'General Waste', time: '5:00 AM - 7:00 AM', route: 'Route C' },
            { location: 'Rural', type: 'Electronic Waste', time: '8:00 AM - 10:00 AM', route: 'Route D' }
        ],
        'Thursday': [
            { location: 'Downtown', type: 'Green Waste', time: '9:00 AM - 11:00 AM', route: 'Route A' },
            { location: 'Suburbs', type: 'Electronic Waste', time: '7:00 AM - 9:00 AM', route: 'Route B' }
        ],
        'Friday': [
            { location: 'Industrial Area', type: 'Recyclables', time: '6:00 AM - 8:00 AM', route: 'Route C' },
            { location: 'Rural', type: 'General Waste', time: '8:00 AM - 10:00 AM', route: 'Route D' }
        ],
        'Saturday': [
            { location: 'Downtown', type: 'Electronic Waste', time: '7:00 AM - 9:00 AM', route: 'Route A' },
            { location: 'Suburbs', type: 'Green Waste', time: '9:00 AM - 11:00 AM', route: 'Route B' }
        ],
        'Sunday': [] // No collections on Sunday
    };

    // Get all unique locations and waste types for filters
    const allLocations = useMemo(() => {
        const locations = new Set();
        Object.values(dailyRoutes).forEach(day => {
            day.forEach(collection => locations.add(collection.location));
        });
        return ['All', ...Array.from(locations)];
    }, []);

    const allWasteTypes = useMemo(() => {
        const types = new Set();
        Object.values(dailyRoutes).forEach(day => {
            day.forEach(collection => types.add(collection.type));
        });
        return ['All', ...Array.from(types)];
    }, []);

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
            case 'General Waste': return <Trash2 className="w-5 h-5 text-gray-700" />;
            case 'Recyclables': return <RecyclingIcon className="w-5 h-5 text-green-600" />;
            case 'Electronic Waste': return <BatteryCharging className="w-5 h-5 text-yellow-500" />;
            case 'Green Waste': return <Leaf className="w-5 h-5 text-green-800" />;
            default: return null;
        }
    };

    const getSchedule = useMemo(() => {
        const date = new Date(selectedDate);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const daySchedule = dailyRoutes[dayOfWeek] || [];

        return daySchedule.filter(collection => {
            const typeMatch = filterType === 'All' || collection.type === filterType;
            const locationMatch = filterLocation === 'All' || collection.location === filterLocation;
            return typeMatch && locationMatch;
        });
    }, [selectedDate, filterType, filterLocation]);

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

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => {
            clearTimeout(timer);
            Object.values(activeTimeouts).forEach(timeout => clearTimeout(timeout));
        };
    }, [activeTimeouts]);

    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562937950-192257528599?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            {/* Fixed Navbar */}
            
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Added space between Navbar and Uppersec */}
            <div className="pt-21"> 
              <Uppersec
                  notificationsEnabled={notificationsEnabled}
                  setNotificationsEnabled={setNotificationsEnabled}
              />
            </div>

            <div className="flex-1">
                <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 mb-8"
                    >
                        <div className="flex flex-col space-y-4 mb-4 bg-green-100/50 p-3 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-900">Daily Collection Routes</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Waste Types Filter */}
                                <div className="flex items-center space-x-2">
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
                                </div>

                                {/* Location Filter */}
                                <div className="flex items-center space-x-2">
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
                                </div>

                                {/* Date Navigation */}
                                <div className="flex items-center space-x-4">
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
                                    <div className="relative flex-1">
                                        <Input
                                            type="date"
                                            value={selectedDate}
                                            onChange={handleDateInputChange}
                                            className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>
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
                                </div>
                            </div>
                        </div>

                        {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Week {selectedWeek} - {getDayName(selectedDate)}
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                {getSchedule.length} {getSchedule.length === 1 ? 'collection' : 'collections'} scheduled
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.5 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex items-center justify-between animate-pulse"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                            <div>
                                                <div className="h-4 bg-gray-300 rounded w-40 mb-1"></div>
                                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                                            </div>
                                        </div>
                                        <div className="w-20 h-8 bg-gray-300 rounded"></div>
                                    </motion.div>
                                ))
                            ) : (
                                getSchedule.length > 0 ? (
                                    getSchedule.map((collection, index) => {
                                        const isCurrentlySet = isReminderSet(selectedDate, collection);
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {getCollectionIcon(collection.type)}
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <p className="text-lg font-semibold text-gray-900">{collection.type}</p>
                                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                                {collection.route}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">{collection.time}</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                            <MapPin className="w-3 h-3 mr-1" /> {collection.location}
                                                        </p>
                                                    </div>
                                                </div>
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
                                        );
                                    })
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-8 text-center"
                                    >
                                        <Truck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-700">No collections scheduled</h3>
                                        <p className="text-gray-500 mt-2">
                                            {filterType !== 'All' || filterLocation !== 'All'
                                                ? "No collections match your filters. Try adjusting your filters."
                                                : "No waste collections are scheduled for this day."}
                                        </p>
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
            <Timeinfo/>
            <Footer />
        </div>
    );
};

export default Scheduling;