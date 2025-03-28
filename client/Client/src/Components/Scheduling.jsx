import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, Clock, Trash2, Recycle as RecyclingIcon, BatteryCharging, Leaf, Bell, Filter, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { cn } from '../Components/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/ui/select.jsx"
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';



const Scheduling = () => {
    const [filter, setFilter] = useState('All');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));
    const [dateError, setDateError] = useState('');
    const [filterError, setFilterError] = useState('');
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({
        name: "John Doe",
        picture: "https://via.placeholder.com/40",
    });

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
        } else {
            setDateError('');
            setSelectedDate(dateString);
            setSelectedWeek(getWeekNumber(newDate));
        }
    }, []);

    const handleDateInputChange = (e) => {
        handleDateChange(e.target.value);
    };

    const handleFilterChange = useCallback((newFilter) => {
        const validFilters = ['All', 'General Waste', 'Recyclables', 'Electronic Waste', 'Green Waste'];

        if (!validFilters.includes(newFilter)) {
            setFilterError('Invalid filter selected.');
        } else {
            setFilterError('');
            setFilter(newFilter);
        }
    }, []);

    const getCollectionIcon = (type) => {
        switch (type) {
            case 'General Waste':
                return <Trash2 className="w-5 h-5 text-gray-700" />;
            case 'Recyclables':
                return <RecyclingIcon className="w-5 h-5 text-green-600" />;
            case 'Electronic Waste':
                return <BatteryCharging className="w-5 h-5 text-yellow-500" />;
            case 'Green Waste':
                return <Leaf className="w-5 h-5 text-green-800" />;
            default:
                return null;
        }
    };

    const getSchedule = useMemo(() => {
        const schedule = [];
        const startDate = new Date(selectedDate);

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dateString = currentDate.toISOString().split('T')[0];

            let collectionType;
            let collectionTime;

            if (selectedWeek % 2 === 0) {
                switch (i % 4) {
                    case 0: collectionType = 'General Waste'; collectionTime = '8:00 AM'; break;
                    case 1: collectionType = 'Recyclables'; collectionTime = '8:00 AM'; break;
                    case 2: collectionType = 'Electronic Waste'; collectionTime = '9:00 AM'; break;
                    case 3: collectionType = 'Green Waste'; collectionTime = '9:00 AM'; break;
                    default: collectionType = 'General Waste'; collectionTime = '8:00 AM';
                }
            } else {
                switch (i % 4) {
                    case 0: collectionType = 'Recyclables'; collectionTime = '10:00 AM'; break;
                    case 1: collectionType = 'General Waste'; collectionTime = '10:00 AM'; break;
                    case 2: collectionType = 'Green Waste'; collectionTime = '11:00 AM'; break;
                    case 3: collectionType = 'Electronic Waste'; collectionTime = '11:00 AM'; break;
                    default: collectionType = 'Recyclables'; collectionTime = '10:00 AM';
                }
            }
            if (filter === 'All' || filter === collectionType) {
                schedule.push({ date: dateString, type: collectionType, time: collectionTime });
            }
        }
        return schedule;
    }, [selectedDate, selectedWeek, filter]);

    const handleSetReminder = (date, type, time) => {
        const reminderId = `${date}-${type}-${time}`;
        const reminderDateTime = new Date(`${date} ${time}`);
        const now = new Date();

        if (reminderDateTime <= now) {
            toast.error("Cannot set a reminder for a past time.", {
                icon: <AlertCircle />,
            });
            return;
        }

        if (reminders.find(r => r.id === reminderId)) {
            toast.error("Reminder already set for this collection.", {
                icon: <AlertCircle />,
            });
            return;
        }

        setReminders(prev => [...prev, { date, type, time, id: reminderId }]);
        toast.success(`Reminder set for ${type} on ${date} at ${time}!`);

        const timeUntilReminder = reminderDateTime.getTime() - now.getTime();
        setTimeout(() => {
            if (notificationsEnabled) {
                alert(`Reminder: ${type} collection on ${date} at ${time}!`);
            } else {
                toast(`Reminder: ${type} collection on ${date} at ${time}!`);
            }
            setReminders(prev => prev.filter(r => r.id !== reminderId));
        }, timeUntilReminder);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const isReminderSet = (date, type, time) => {
        return reminders.some(r => r.date === date && r.type === type && r.time === time);
    };

    return (
        <div className="min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562937950-192257528599?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-green-500/90 backdrop-blur-md border-b border-gray-200"
            >
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">
                            Collection Schedule
                        </h1>
                        <div className="flex items-center space-x-4">
                            <Select onValueChange={handleFilterChange} value={filter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="General Waste">General Waste</SelectItem>
                                    <SelectItem value="Recyclables">Recyclables</SelectItem>
                                    <SelectItem value="Electronic Waste">Electronic Waste</SelectItem>
                                    <SelectItem value="Green Waste">Green Waste</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                                    notificationsEnabled
                                        ? 'bg-green-700 text-white hover:bg-green-600'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                )}
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            >
                                <Bell className="w-4 h-4 mr-2" />
                                {notificationsEnabled ? 'Notification On' : 'Notification Off'}
                            </Button>
                            <div className="flex flex-col items-center gap-1">
                                <img
                                    src={user.picture}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                                <span className="text-white font-medium text-xs">{user.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 mb-8"
                >
                    <div className="flex items-center justify-between mb-4 bg-green-100/50 p-3 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900">Select Date</h2>
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
                            <div className="relative">
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
                    {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
                    <div className="text-sm text-gray-600">
                        Week {selectedWeek} - {selectedWeek % 2 === 0 ? 'Morning Schedule' : 'Late Morning Schedule'}
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
                            getSchedule.map((item, index) => {
                                const reminderId = `${item.date}-${item.type}-${item.time}`;
                                const isCurrentlySet = isReminderSet(item.date, item.type, item.time);

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
                                            {getCollectionIcon(item.type)}
                                            <div>
                                                <p className="text-lg font-semibold text-gray-900">{item.type}</p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(item.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                    {' - '}
                                                    {item.time}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSetReminder(item.date, item.type, item.time)}
                                            disabled={isCurrentlySet}
                                            className={cn(
                                                isCurrentlySet
                                                    ? "bg-yellow-100 text-yellow-700 border-yellow-300 cursor-not-allowed"
                                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                            )}
                                        >
                                            {isCurrentlySet ? 'Reminder Set' : 'Remind Me'}
                                        </Button>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
                {getSchedule.length === 0 && !loading && (
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 text-center">
                        <p className="text-gray-500">No collections scheduled for the selected filter.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Scheduling;