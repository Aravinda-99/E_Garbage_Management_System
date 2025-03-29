import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../TimeSchedulingComponents/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../TimeSchedulingComponents/ui/select";
import { cn } from '../TimeSchedulingComponents/lib/utils';

const Uppersec = ({ filter, handleFilterChange, notificationsEnabled, setNotificationsEnabled }) => {
    return (
        <>
            <section className="bg-gradient-to-r from-emerald-100 to-green-900 text-white py-20 relative elevate-farming-section">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: ` url('https://as1.ftcdn.net/v2/jpg/10/11/95/72/1000_F_1011957216_YyeQQbQRFsWn4pzgOKglsj7kTBXIjO5V.jpg')`, // Replace with your image URL
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent opacity-80"></div> {/* Darker overlay */}
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    {/* Fade in and slide up animation for heading */}
                    <h2 className="text-4xl font-bold mb-4 animate-[fadeInUp_0.8s_ease-out_forwards]">
                        Time Schedules
                    </h2>
                    {/* Fade in with slight delay for paragraph */}
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                        Plan your waste collection effortlessly with our tailored schedules. Set your pickup time today and leave the rest to us.
                    </p>
                    {/* Flex container with Select and Notification Button */}
                    <div className="flex gap-4 justify-end items-center">

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

                .elevate-farming-section::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3); /* Adjust the opacity here */
                    pointer-events: none; /* Allows clicks to go through */
                }
            `}</style>
        </>
    );
};

export default Uppersec;
