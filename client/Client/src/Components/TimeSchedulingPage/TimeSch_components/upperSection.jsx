import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../TimeSchedulingComponents/ui/button'; // Adjust path as needed
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../TimeSchedulingComponents/ui/select"; // Adjust path as needed
import { cn } from '../TimeSchedulingComponents/lib/utils'; // Adjust path as needed

const Uppersec = ({ filter, handleFilterChange, notificationsEnabled, setNotificationsEnabled }) => {
    return (
        <>
            <section className="bg-gradient-to-r from-green-600 to-green-900 text-white py-16 elevate-farming-section">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    {/* Fade in and slide up animation for heading */}
                    <h2 className="text-4xl font-bold mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">
                        Time Schedules
                    </h2>
                    {/* Fade in with slight delay for paragraph */}
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                        Plan your waste collection effortlessly with our tailored schedules. Set your pickup time today and leave the rest to us.
                    </p>
                    {/* Flex container with Select and Notification Button */}
                    <div className="flex gap-4 justify-center items-center">
                        {/* Select component */}
                        <div className="w-[180px] animate-[fadeInScale_0.6s_ease-out_0s_forwards]">
                            <Select onValueChange={handleFilterChange} value={filter}>
                                <SelectTrigger className="w-full bg-white text-green-900 px-4 py-2 rounded-full font-semibold">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem 
                                        value="All" 
                                        className="bg-gray-100 text-gray-900 hover:bg-gray-200"
                                    >
                                        All
                                    </SelectItem>
                                    <SelectItem 
                                        value="General Waste" 
                                        className="bg-gray-300 text-gray-900 hover:bg-gray-400"
                                    >
                                        General Waste
                                    </SelectItem>
                                    <SelectItem 
                                        value="Recyclables" 
                                        className="bg-green-200 text-green-900 hover:bg-green-300"
                                    >
                                        Recyclables
                                    </SelectItem>
                                    <SelectItem 
                                        value="Electronic Waste" 
                                        className="bg-yellow-200 text-yellow-900 hover:bg-yellow-300"
                                    >
                                        Electronic Waste
                                    </SelectItem>
                                    <SelectItem 
                                        value="Green Waste" 
                                        className="bg-lime-200 text-lime-900 hover:bg-lime-300"
                                    >
                                        Green Waste
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Notification Button */}
                        <Button
                            variant="outline"
                            className={cn(
                                "px-6 py-3 rounded-full font-semibold transition-colors animate-[fadeInScale_0.6s_ease-out_0.2s_forwards]",
                                notificationsEnabled
                                    ? 'bg-white text-green-900 hover:bg-green-100'
                                    : 'border-2 border-white text-white hover:bg-white hover:text-green-900'
                            )}
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        >
                            <Bell className="w-4 h-4 mr-2" />
                            {notificationsEnabled ? 'Notification On' : 'Notification Off'}
                        </Button>
                    </div>
                </div>
            </section>
            {/* Inline styles for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default Uppersec;