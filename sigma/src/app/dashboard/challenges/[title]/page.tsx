"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import {
  FaWater,
  FaBed,
  FaHandHolding,
  FaBook,
  FaLaptopCode,
  FaCalendarCheck,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { FaHandsHolding } from "react-icons/fa6";
import { challenges } from "@/app/constants/challenges";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { CircularProgress } from "@nextui-org/progress";
import MagicButton from "@/components/MagicButton";
import ButtonLoading from "@/components/ButtonLoading";

const challengeIcons = {
  water: FaWater,
  meditation: GiMeditation,
  sleep: FaBed,
  gratitude: FaHandsHolding,
  skill: FaBook,
  coding: FaLaptopCode,
};

const Page = ({ params }: { params: { title: string } }) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const queryClient = useQueryClient();
  const [showPointsAdded, setShowPointsAdded] = useState(false);
  const [appPointsAdded, setAppPointsAdded] = useState(0);
  const [categoryPointsAdded, setCategoryPointsAdded] = useState(0);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [challengeInTimeline, setChallengeInTimeline] = useState(false);

const {
  data: timelineData,
  isLoading: isTimelineLoading,
  error: timelineError,
} = useQuery({
  queryKey: ["timeline", email],
  queryFn: () => axios.get(`http://localhost:3001/timeline/${email}`).then(res => res.data.tasks),
  enabled: !!email,
});


  const {
    data: challengeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["challenges", params.title, email],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/challenges/${params.title}?email=${email}`)
        .then((res) => res.data),
    enabled: !!email,
  });

  useEffect(() => {
    if (timelineData && challengeData) {
      const challengeExists = timelineData.some((task: { type: string; title: string }) => 
        task.type === 'challenge' && task.title === challengeData.name
      );
      setChallengeInTimeline(challengeExists);
    }
  }, [timelineData, challengeData]);

  const addPoints = (points: number, category: string, appPoints: number) => {
    axios
      .put(`http://localhost:3001/data/daily?email=${email}`, {
        [category]: points,
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["challenges", params.title, email],
        });
        addAppPoints(appPoints);
        setCategoryPointsAdded(points);
      });
  };

  const addAppPoints = (points: number) => {
    axios
      .post(
        `http://localhost:3001/users/points?email=${email}&points=${points}`
      )
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["challenges", params.title, email],
        });
        setAppPointsAdded(points);
        setShowPointsAdded(true);
        setTimeout(() => setShowPointsAdded(false), 3000);
      });
  };


  const addToTimeline = (startTime: string, endTime: string) => {
    setButtonLoading(true);
    axios.put(`http://localhost:3001/timeline/${email}/task`, {    
        type: 'challenge',
        title: challengeData?.name || 'Unnamed Challenge',
        startTime: startTime || new Date().toISOString(),
        endTime: endTime || '',
        category: challengeData?.category || '',
        isCompleted: false,
    })
    .then((response) => {
      setButtonLoading(false);
      setIsModalOpen(false);
      console.log("Updated timeline:", response.data);
    })
    .catch((error) => {
      console.error("Error updating timeline:", error);
      setButtonLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("Invalid input. Please check the time format and try again.");
            break;
          case 404:
            alert("Timeline not found. Please refresh the page and try again.");
            break;
          default:
            if (error.response.data && error.response.data.message) {
              alert(`Error: ${error.response.data.message}`);
            } else {
              alert("An error occurred. Please try again later.");
            }
        }
      } else if (error.message === "Network Error") {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    });
  };

  const challenge = challenges.find((c) => c.title === params.title);


  if (isLoading) return <Loading />;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!challenge) return <div>Challenge not found</div>;

  const isStarted = !!challengeData;
  const progress = challengeData?.progress || 0;

  const handleQuitChallenge = () => {
    if (
      confirm(
        "Are you sure you want to quit this challenge? All progress will be lost."
      )
    ) {
      axios
        .delete(
          `http://localhost:3001/challenges/${params.title}?email=${email}`
        )
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["challenges", params.title, email],
          });
        })
        .catch((error) => {
          console.error("Error quitting challenge:", error);
          // You might want to add some user feedback here, e.g.:
          // setError('Failed to quit the challenge. Please try again.');
        });
    }
  };

  if (challengeStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
          <div className="bg-indigo-600 px-6 py-8 sm:px-10">
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              {challenge.titleReadable}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-indigo-100">
                Challenge Started!
              </p>
              <div className="bg-white rounded-full px-4 py-2 flex items-center shadow-md">
                <span className="text-indigo-600 font-bold text-xl mr-2">
                  +{appPointsAdded}
                </span>
                <span className="text-indigo-800 font-medium">
                  Sigma Points
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 py-8 sm:px-10">
            <p className="text-gray-600 text-lg mb-4">
              You've embarked on an exciting journey. Keep pushing forward!
            </p>
            <button
              onClick={() => setChallengeStarted(false)}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              View Challenge Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!challengeStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-white">
              {challenge.titleReadable}
            </h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              {challengeIcons[
                params.title.toLowerCase() as keyof typeof challengeIcons
              ] &&
                React.createElement(
                  challengeIcons[
                    params.title.toLowerCase() as keyof typeof challengeIcons
                  ],
                  { className: "text-4xl text-indigo-600 mr-4" }
                )}
              <p className="text-xl text-gray-700">{challenge.titleReadable}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Challenge Details
              </h2>
              <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="text-gray-900">{challenge.duration}</dd>
                </div>
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="text-gray-900">
                    {isStarted ? "In Progress" : "Not Started"}
                  </dd>
                </div>
                {isStarted && (
                  <div className="py-3 flex justify-between text-sm font-medium">
                    <dt className="text-gray-500">Progress</dt>
                    <dd className="text-gray-900">{progress}%</dd>
                  </div>
                )}
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Difficulty</dt>
                  <dd className="text-gray-900">{challenge.difficulty}</dd>
                </div>
              </dl>
            </div>
            {isStarted && (
              <div className="mt-6">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {isStarted && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {challengeInTimeline ? "update Timeline" : "Add to Timeline"}
                </button>
                {isModalOpen && (
                  <div className="mb-4 mt-6">
                    <div className="w-full">
                      <label
                        htmlFor="wakeUpTime"
                        className="block text-sm font-medium text-gray-800 mb-2"
                      >
                        Start Time
                      </label>
                      <input
                        onChange={(ev) => setStartTime(ev.target.value)}
                        type="time"
                        id="wakeUpTime"
                        name="wakeUpTime"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="sleepTime"
                        className="block text-sm font-medium text-gray-800 mb-2"
                      >
                        End Time
                      </label>
                      <input
                        onChange={(ev) => setEndTime(ev.target.value)}
                        type="time"
                        id="sleepTime"
                        name="sleepTime"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center mt-3">
                    {buttonLoading ? <ButtonLoading /> : <button
                    onClick={() => {
                      addToTimeline(startTime, endTime);
                    }}
                    className="w-fit bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
                      <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Add to Timeline
                      </span>
                    </button>
                    }
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <p className="text-gray-700 mb-4">{challenge.fullDescription}</p>
              {!isStarted ? (
                <button
                  onClick={() => {
                    const challenge = challenges.find(
                      (c) => c.title === params.title
                    );
                    if (challenge) {
                      const startDate = new Date();
                      const endDate = new Date(startDate);
                      endDate.setDate(
                        endDate.getDate() + challenge.durationInDays
                      );
                      const points =
                        challenge.difficulty === "easy"
                          ? 60
                          : challenge.difficulty === "medium"
                          ? 70
                          : 80;
                      const appPoints = points * 10;
                      const challengeData = {
                        email: email,
                        name: challenge.title,
                        startDate: startDate,
                        endDate: endDate,
                        targetValue: 100, // Assuming 100% completion is the target
                        difficulty: challenge.difficulty,
                        category: challenge.category,
                      };

                      axios
                        .post(
                          `http://localhost:3001/challenges?email=${email}`,
                          challengeData
                        )
                        .then(() => {
                          queryClient.invalidateQueries({
                            queryKey: ["challenges", params.title, email],
                          });
                        })
                        .then(() => {
                          console.log(
                            "adding points!",
                            points,
                            challenge.category
                          );
                          addPoints(points, challenge.category, appPoints);
                          setShowPointsAdded(true);
                          setAppPointsAdded(appPoints);
                          setCategoryPointsAdded(points);
                          setChallengeStarted(true);
                        })
                        .catch((error) => {
                          console.error("Error starting challenge:", error);
                        });
                    }
                  }}
                  className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Start Challenge
                </button>
              ) : (
                <button
                  onClick={handleQuitChallenge}
                  className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Quit Challenge
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
