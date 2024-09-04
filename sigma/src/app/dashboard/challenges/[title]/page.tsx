"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import {
  FaWater,
  FaBed,
  FaHandHolding,
  FaBook,
  FaLaptopCode,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { FaHandsHolding } from "react-icons/fa6";
import { challenges } from "@/app/constants/challenges";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

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

  const challenge = challenges.find((c) => c.title === params.title);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!challenge) return <div>Challenge not found</div>;

  const isStarted = !!challengeData;
  const progress = challengeData?.progress || 0;

  const handleQuitChallenge = () => {
    if (confirm("Are you sure you want to quit this challenge? All progress will be lost.")) {
      axios.delete(`http://localhost:3001/challenges/${params.title}?email=${email}`)
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ["challenges", params.title, email],
          });
        })
        .catch(error => {
          console.error('Error quitting challenge:', error);
          // You might want to add some user feedback here, e.g.:
          // setError('Failed to quit the challenge. Please try again.');
        });
    }
  };

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
          <div className="mt-6">
            <p className="text-gray-700 mb-4">{challenge.fullDescription}</p>
            {!isStarted ? (
              <button 
                onClick={() => {
                  const challenge = challenges.find(c => c.title === params.title);
                  if (challenge) {
                    const startDate = new Date();
                    const endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() + challenge.durationInDays);
                    
                    const challengeData = {
                      email: email,
                      name: challenge.title,
                      startDate: startDate,
                      endDate: endDate,
                      targetValue: 100, // Assuming 100% completion is the target
                      isCompleted: false
                    };

                    axios.post(`http://localhost:3001/challenges?email=${email}`, challengeData)
                    .then(() => {
                      queryClient.invalidateQueries({
                        queryKey: ["challenges", params.title, email],
                      });
                    })
                    .catch(error => {
                      console.error('Error starting challenge:', error);
                      // You might want to add some user feedback here, e.g.:
                      // setError('Failed to start the challenge. Please try again.');
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
};

export default Page;
