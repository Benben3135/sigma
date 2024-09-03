"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ChartComponent from "@/components/ChartComponent";
import { ChartDataInterface, ChartOptionsInterface } from "@/app/types";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@nextui-org/skeleton";
import AnimatedNumber from "@/components/AnimatedNumber";
import FloatingBear from "@/components/FloatingBear";

export enum ProgressView {
  Week = "week",
  Month = "month",
  Year = "year",
}

function isBeforeTargetTime(
  targetHours: number,
  targetMinutes: number
): boolean {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  return (
    currentHours < targetHours ||
    (currentHours === targetHours && currentMinutes < targetMinutes)
  );
}

export default function Page() {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const [greeting, setGreeting] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [progressView, setProgressView] = useState<ProgressView>(
    ProgressView.Week
  );

  const options: ChartOptionsInterface = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const {
    data: weekData,
    error: weekDataError,
    isLoading: weekDataLoading,
  } = useQuery({
    queryKey: ["week"],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/data?email=${email}&lapse=week`)
        .then((res) => res.data),
    enabled: progressView === ProgressView.Week && !!email,
  });

  const {
    data: monthData,
    error: monthDataError,
    isLoading: monthDataLoading,
  } = useQuery({
    queryKey: ["month"],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/data?email=${email}&lapse=month`)
        .then((res) => res.data),
    enabled: progressView === ProgressView.Month && !!email,
  });

  const {
    data: yearData,
    error: yearDataError,
    isLoading: yearDataLoading,
  } = useQuery({
    queryKey: ["year"],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/data?email=${email}&lapse=year`)
        .then((res) => res.data),
    enabled: progressView === ProgressView.Year && !!email,
  });

  const {
    data: dayDataArray,
    error: dayDataError,
    isLoading: dayDataLoading,
  } = useQuery({
    queryKey: ["day"],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/data/daily?email=${email}`)
        .then((res) => res.data),
    enabled: !!email,
  });

  const dayData = dayDataArray?.[0];

  const dailyRank = (dayData: any) => {
    if (!dayData) return 0;

    const { food = 0, learning = 0, reading = 0, workout = 0 } = dayData;
    const total = food + learning + reading + workout;
    const average = total / 4;

    return Math.min(Math.round(average), 100); // Ensure the rank doesn't exceed 100
  };

  const getData = () => {
    switch (progressView) {
      case ProgressView.Week:
        return weekData;
      case ProgressView.Month:
        return monthData;
      case ProgressView.Year:
        return yearData;
      default:
        return undefined;
    }
  };

  const getColor = (rank: number) => {
    if (rank < 40) {
      return "text-red-500";
    } else if (rank >= 40 && rank < 60) {
      return "text-yellow-500";
    } else if (rank >= 60 && rank < 80) {
      return "text-blue-500";
    } else if (rank >= 80) {
      return "text-green-500";
    }
  };

  const data = getData();

  useEffect(() => {
    const updateGreeting = () => {
      if (isBeforeTargetTime(9, 0)) {
        setGreeting(`Good morning ${user?.firstName}!`);
      } else if (isBeforeTargetTime(12, 0)) {
        setGreeting(`Good day ${user?.firstName}!`);
      } else if (isBeforeTargetTime(18, 0)) {
        setGreeting(`Good afternoon ${user?.firstName}!`);
      } else {
        setGreeting(`Good evening ${user?.firstName}!`);
      }
    };

    const updateWarning = () => {
      if (isBeforeTargetTime(9, 0)) {
        setWarning("Start your day by logging your progress");
      } else if (isBeforeTargetTime(12, 0)) {
        setWarning("Being sleepy today?");
      } else if (isBeforeTargetTime(18, 0)) {
        setWarning("You still have time to catch up");
      } else {
        setWarning("Let's try again tomorrow");
      }
    };

    updateGreeting();
    updateWarning();
  }, [user]);

  useEffect(() => {
    console.log(dayData);
  }, ["dayData", dayData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="space-y-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600 text-center mb-4 pb-4 z-10">
          {greeting}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0">
                Your {progressView} progress
              </h2>
              <div className="flex space-x-2">
                {["Week", "Month", "Year"].map((view) => (
                  <button
                    key={view}
                    onClick={() =>
                      setProgressView(
                        ProgressView[view as keyof typeof ProgressView]
                      )
                    }
                    className={`px-4 py-2 rounded-md transition-colors ${
                      progressView ===
                      ProgressView[view as keyof typeof ProgressView]
                        ? "bg-violet-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
            {data ? (
              <ChartComponent
                data={data}
                options={options}
                height={400}
                width={800}
                className="h-80"
              />
            ) : (
              <Skeleton className="w-full h-80 rounded-lg" />
            )}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            {dayDataLoading ? (
              <Skeleton className="w-full h-full rounded-lg animate-pulse" />
            ) : !dayData || dayData === null || dayData === undefined || dayData === "undefined" ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <p className="text-2xl text-white text-center font-bold">{warning}</p>
                <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                  <p className="text-lg text-gray-300 mb-4">No data available for today. Start tracking your activities to see your progress!</p>
                </div>
                <FloatingBear />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                  Today's Progress
                </h2>
                {["Nutrition", "Learning", "Reading", "Workout"].map(
                  (activity) => (
                    <div
                      key={activity}
                      className="flex justify-between items-center bg-gray-700 p-3 rounded-lg transition-all duration-200 hover:bg-gray-600"
                    >
                      <span className="text-lg text-gray-200 font-medium">{activity}</span>
                      <span
                        className={`text-lg font-bold ${getColor(
                          Math.min(dayData[activity.toLowerCase()], 100)
                        )}`}
                      >
                        <AnimatedNumber
                          target={Math.min(
                            dayData[activity.toLowerCase()],
                            100
                          )}
                          duration={500}
                        />
                        %
                      </span>
                    </div>
                  )
                )}
                <div className="border-t border-gray-600 pt-6 mt-6">
                  <div className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg">
                    <span className="text-xl font-bold text-gray-800">
                      DAILY RANK
                    </span>
                    <span
                      className={`text-2xl font-extrabold ${getColor(
                        dailyRank(dayData)
                      )}`}
                    >
                      <AnimatedNumber
                        target={dailyRank(dayData)}
                        duration={1000}
                      />
                      <span className="text-gray-700 text-xl">/100</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg p-8 cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
            onClick={() => (window.location.href = "/dashboard/challenges")}
            style={{
              backgroundImage: "url('/challenges-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-blue-500/80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Challenges
              </h2>
              <p className="text-white text-center opacity-80">
                Push your limits and conquer new heights
              </p>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="bg-gradient-to-br from-green-500 to-teal-400 rounded-lg shadow-lg p-8 cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
            onClick={() => (window.location.href = "/dashboard/nutrition")}
            style={{
              backgroundImage: "url('/nutrition-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-teal-400/80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Nutrition
              </h2>
              <p className="text-white text-center opacity-90 font-semibold text-lg shadow-sm">
                Fuel your body with the right choices
              </p>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div
            className="bg-gradient-to-br from-orange-500 to-red-400 rounded-lg shadow-lg p-8 cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
            onClick={() => (window.location.href = "/dashboard/alarm")}
            style={{
              backgroundImage: "url('/alarm-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-yellow-400/80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Alarm
              </h2>
              <p className="text-white text-center opacity-90 font-semibold text-lg shadow-sm">
                Wake up refreshed and ready to conquer the day
              </p>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg shadow-lg p-8 cursor-pointer hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
            onClick={() => (window.location.href = "/dashboard/soul")}
            style={{
              backgroundImage: "url('/soul-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 to-pink-400/80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Soul
              </h2>
              <p className="text-white text-center opacity-90 font-semibold text-lg shadow-sm">
                Nourish your spirit and find inner peace
              </p>
              <div className="absolute bottom-4 right-4">
                <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
