import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
const challengeIcons = {
  water: FaWater,
  meditation: GiMeditation,
  sleep: FaBed,
  gratitude: FaHandsHolding,
  skill: FaBook,
  coding: FaLaptopCode,
};
export default async function ChallengePage({
  params,
}: {
  params: { title: string };
}) {
  const challenge = challenges.find((challenge) => challenge.title === params.title);


  return (
    <>
    {challenge ? (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-white">{challenge?.title}</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-4">
            {challengeIcons[params.title.toLowerCase() as keyof typeof challengeIcons] && React.createElement(challengeIcons[params.title.toLowerCase() as keyof typeof challengeIcons], { className: "text-4xl text-indigo-600 mr-4" })}
            <p className="text-xl text-gray-700">{params.title}</p>
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
                <dt className="text-gray-500">Progress</dt>
                <dd className="text-gray-900">{challenge.progress}%</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${challenge.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Start Today's Task
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Challenge not found</div>
  )}
  </>
  )
}
