"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Skeleton } from "@nextui-org/skeleton";
import { FaBell, FaPlus, FaTrash } from "react-icons/fa";

interface Alarm {
  id: string;
  time: string;
  days: string[];
  isActive: boolean;
}

export default function AlarmPage() {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetchAlarms();
    }
  }, [email]);

  const fetchAlarms = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/alarms?email=${email}`);
      setAlarms(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching alarms:", error);
      setIsLoading(false);
    }
  };

  const addAlarm = async () => {
    try {
      const newAlarm = {
        time: "08:00",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        isActive: true,
      };
      const response = await axios.post(`http://localhost:3001/alarms`, { email, ...newAlarm });
      setAlarms([...alarms, response.data]);
    } catch (error) {
      console.error("Error adding alarm:", error);
    }
  };

  const deleteAlarm = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/alarms/${id}`);
      setAlarms(alarms.filter(alarm => alarm.id !== id));
    } catch (error) {
      console.error("Error deleting alarm:", error);
    }
  };

  const toggleAlarm = async (id: string) => {
    try {
      const alarm = alarms.find(a => a.id === id);
      if (alarm) {
        const updatedAlarm = { ...alarm, isActive: !alarm.isActive };
        await axios.put(`http://localhost:3001/alarms/${id}`, updatedAlarm);
        setAlarms(alarms.map(a => a.id === id ? updatedAlarm : a));
      }
    } catch (error) {
      console.error("Error toggling alarm:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen w-full">
      <h1 className="text-3xl font-bold text-white mb-6">Alarms</h1>
      {isLoading ? (
        <Skeleton className="w-full h-64 rounded-lg" />
      ) : (
        <div className="space-y-4">
          {alarms.map((alarm) => (
            <div key={alarm.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-white">{alarm.time}</p>
                <p className="text-sm text-gray-400">{alarm.days.join(", ")}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`p-2 rounded-full ${
                    alarm.isActive ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  <FaBell className="text-white" />
                </button>
                <button
                  onClick={() => deleteAlarm(alarm.id)}
                  className="p-2 rounded-full bg-red-500"
                >
                  <FaTrash className="text-white" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addAlarm}
            className="w-full bg-violet-600 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add Alarm
          </button>
        </div>
      )}
    </div>
  );
}
