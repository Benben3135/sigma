"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaLocationArrow, FaPills, FaDumbbell, FaSun, FaMoon } from "react-icons/fa";

import { useQuery } from '@tanstack/react-query';

interface Task {
  type: string;
  title: string;
  startTime: string;
  endTime?: string;
  isCompleted: boolean;
  lastUpdated: Date;
}

interface Timeline {
  email: string;
  wakeUpTime: string;
  sleepTime: string;
  tasks: Task[];
}

const TimelinePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusedItem, setFocusedItem] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchTimeline = async (email: string) => {
    const response = await axios.get<Timeline>(`http://localhost:3001/timeline/${email}`);
    return response.data;
  };

  const { data: timeline, isLoading, error } = useQuery<Timeline, Error>({
    queryKey: ["timeline"],
    queryFn: () => fetchTimeline(user?.emailAddresses[0]?.emailAddress || ''),
    enabled: !!user?.emailAddresses[0]?.emailAddress,
  })

  useEffect(() => {
    console.log("timeline", timeline);
  }, [timeline]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'challenge': return <FaLocationArrow />;
      case 'alarm': return <FaClock />;
      case 'nutrition': return <FaPills />;
      case 'workout': return <FaDumbbell />;
      case 'wakeUp': return <FaSun />;
      case 'sleep': return <FaMoon />;
      default: return null;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'wakeUp': return 'from-yellow-400 to-orange-500';
      case 'sleep': return 'from-blue-400 to-indigo-500';
      default: return 'from-indigo-500 to-purple-500';
    }
  };

  if (!timeline) {
    return <div className="flex justify-center items-center h-screen">No timeline data available.</div>;
  }

  const calculatePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours + minutes / 60) * (100 / 24);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Your Timeline</h1>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 h-[calc(100vh-12rem)]">
        <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-4">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="text-center">{`${i.toString().padStart(2, '0')}:00`}</span>
          ))}
        </div>
        <div className="ml-16 relative h-full">
          {/* Current time indicator */}
          <div 
            className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
            style={{ top: `${calculatePosition(currentTime.toTimeString().slice(0, 5))}%` }}
          >
            <div className="absolute -left-16 -top-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <AnimatePresence>
            {[
              { type: 'wakeUp', title: 'Wake Up', time: timeline.wakeUpTime },
              ...timeline.tasks,
              { type: 'sleep', title: 'Sleep', time: timeline.sleepTime }
            ].map((item, index) => {
              const startTime = new Date(`2000-01-01T${('time' in item) ? item.time : item.startTime}`);
              const endTime = 'endTime' in item && item.endTime ? new Date(`2000-01-01T${item.endTime}`) : new Date(startTime.getTime() + 60 * 60 * 1000);
              const top = calculatePosition(startTime.toTimeString().slice(0, 5));
              const height = calculatePosition(endTime.toTimeString().slice(0, 5)) - top;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    zIndex: focusedItem === index ? 20 : 10,
                    scale: focusedItem === index ? 1.05 : 1
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute left-0 right-4 bg-gradient-to-r ${getTaskColor(item.type)} dark:from-indigo-700 dark:to-purple-700 rounded-md p-3 text-white shadow-lg cursor-pointer`}
                  style={{ top: `${top}%`, height: `${Math.max(height, 4)}%`, minHeight: '40px' }}
                  onClick={() => setFocusedItem(focusedItem === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">
                        {getTaskIcon(item.type)}
                      </div>
                      <h3 className="text-sm font-semibold mr-2">{item.title}</h3>
                      <p className="text-xs opacity-80">
                        {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {'endTime' in item && ` - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                    {'isCompleted' in item && (
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${item.isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {item.isCompleted ? 'Completed' : 'Pending'}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
