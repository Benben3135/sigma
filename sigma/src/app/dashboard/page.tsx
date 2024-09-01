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
    if (!dayData) return 0; // Handle missing dayData case

    const { food = 0, learning = 0, reading = 0, workout = 0 } = dayData;
    const total = food + learning + reading + workout;
    const average = total / 4;

    return Math.round(average);
  };

  // Determine the data to pass based on the selected view
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
      return "bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 inline-block text-transparent bg-clip-text";
    } else if (rank >= 40 && rank < 60) {
      return "bg-gradient-to-r from-yellow-500 via-indigo-500 to-yellow-500 inline-block text-transparent bg-clip-text";
    } else if (rank >= 60 && rank < 80) {
      return "bg-gradient-to-r from-yellow-500 via-green-500 to-indigo-500 inline-block text-transparent bg-clip-text";
    } else if (rank >= 80) {
      return "bg-gradient-to-r from-green-400 via-green-500 to-green-400 inline-block text-transparent bg-clip-text";
    }
  };

  const data = getData();

  useEffect(() => {
    // Function to determine if current time is before target time
    const isBeforeTargetTime = (hour: number, minute: number) => {
      const now = new Date();
      return (
        now.getHours() < hour ||
        (now.getHours() === hour && now.getMinutes() < minute)
      );
    };

    // Update greeting
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

    // Update warning
    const updateWarning = () => {
      if (isBeforeTargetTime(9, 0)) {
        setWarning("Good morning! Start your day by logging your progress");
      } else if (isBeforeTargetTime(12, 0)) {
        setWarning("Being sleepy today?");
      } else if (isBeforeTargetTime(18, 0)) {
        setWarning("You still have time to catch up");
      } else {
        setWarning("Let's try again tomorrow");
      }
    };

    // Set greeting and warning
    updateGreeting();
    updateWarning();
  }, [user]);

  return (
    <div className="w-full h-fit p-6">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="w-full h-fit items-center justify-center">
          <h1 className="text-4xl font-bold text-white-100 antialiased text-center">
            {greeting}
          </h1>
        </div>
        <div className="w-full h-fit flex xl:flex-row flex-col gap-4 mt-6">
          {data ? (
            <div className="w-fit h-fit">
              <div className="w-full h-full p-3 flex flex-col gap-3 justify-start items-start">
                <div className="flex flex-row justify-start items-start gap-4">
                  <h1 className="text-white-100 text-2xl font-bold antialiased">
                    Your {progressView} progress
                  </h1>
                  <div className="w-fit h-fit flex flex-row justify-center items-center">
                    <button
                      onClick={() => setProgressView(ProgressView.Week)}
                      className={
                        progressView === ProgressView.Week
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setProgressView(ProgressView.Month)}
                      className={
                        progressView === ProgressView.Month
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setProgressView(ProgressView.Year)}
                      className={
                        progressView === ProgressView.Year
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Year
                    </button>
                  </div>
                </div>

                <section className="w-full flex-1 min-w-[50rem] border">
                  <ChartComponent
                    data={data}
                    options={options}
                    height={400}
                    width={800}
                  />
                </section>
              </div>
            </div>
          ) : (
            <Skeleton className="w-full h-[25rem]" /> // Adjust the height of the skeleton to match the intended chart area
          )}
          <section className="min-w-[20rem] w-fit h-[15rem] mt-6">
            <div className="w-full h-full">
              {dayDataLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <>
                  {dayData == null ? (
                    <div className="w-full h-full bg-black-200 rounded-md">
                      <div className="w-full h-full p-3 flex flex-col gap-4 items-center justify-start relative">
                        <p className="text-white-100 text-lg font-semibold antialiased">
                          {warning}
                        </p>
                        <FloatingBear />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-black-200 rounded-md">
                      <div className="w-full h-full p-3 flex flex-col gap-4 items-center justify-start">
                        <h1 className="text-white-100 text-2xl font-bold antialiased">
                          Today's progress
                        </h1>
                        <div className="w-full h-fit flex flex-col justify-start items-start">
                          <div className="w-full h-fit flex flex-row justify-between items-center">
                            <h2 className="text-white-100 text-lg font-semibold antialiased">
                              Nutrition
                            </h2>
                            <p
                              className={`text-lg font-bold ${getColor(
                                dayData?.food
                              )}`}
                            >
                              <AnimatedNumber
                                target={dayData?.food}
                                duration={500}
                              />
                            </p>
                          </div>
                          <div className="w-full h-fit flex flex-row justify-between items-center">
                            <h2 className="text-white-100 text-lg font-semibold antialiased">
                              learning
                            </h2>
                            <p
                              className={`text-lg font-bold ${getColor(
                                dayData?.learning
                              )}`}
                            >
                              <AnimatedNumber
                                target={dayData?.learning}
                                duration={500}
                              />
                            </p>
                          </div>
                          <div className="w-full h-fit flex flex-row justify-between items-center">
                            <h2 className="text-white-100 text-lg font-semibold antialiased">
                              reading
                            </h2>
                            <p
                              className={`text-lg font-bold ${getColor(
                                dayData?.reading
                              )}`}
                            >
                              <AnimatedNumber
                                target={dayData?.reading}
                                duration={500}
                              />
                            </p>
                          </div>
                          <div className="w-full h-fit flex flex-row justify-between items-center">
                            <h2 className="text-white-100 text-lg font-semibold antialiased">
                              workout
                            </h2>
                            <p
                              className={`text-lg font-bold ${getColor(
                                dayData?.workout
                              )}`}
                            >
                              <AnimatedNumber
                                target={dayData?.workout}
                                duration={500}
                              />
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[1px] bg-slate-500"></div>
                        <div className="w-full h-fit flex flex-row justify-between items-center text-2xl font-bold antialiased">
                          <h1 className="text-yellow-300 antialiased">RANK</h1>
                          <h1 className={`${getColor(dailyRank(dayData))}`}>
                            <AnimatedNumber
                              target={dailyRank(dayData)}
                              duration={1000}
                            />
                            <span className="text-white-100">/100</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
