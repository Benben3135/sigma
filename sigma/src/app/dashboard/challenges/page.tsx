"use client"

import ChallengeComponent from '@/components/ChallengeComponent';
import { FaBed, FaBook, FaBrain, FaCarrot, FaCookie, FaDumbbell, FaLaptopCode, FaLeaf, FaPencilAlt, FaRunning, FaSmile, FaWater } from 'react-icons/fa';
import { FaHandsHolding } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { challenges as allChallenges } from '@/app/constants/challenges';

interface Challenge {
  category: string;
  email: string;
  endDate: string;
  isCompleted: boolean;
  name: string;
  startDate: string;
  targetValue: number;
  __v: number;
  _id: string;
}

const Page = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const { data, isLoading, error } = useQuery<{ data: Challenge[] }>({
    queryKey: ['challenges', email],
    queryFn: () => axios.get(`http://localhost:3001/challenges/?email=${email}`),
    enabled: !!email,
  });

  const startedChallenges = data?.data || [];
  const unstartedChallenges = allChallenges.filter(challenge => 
    !startedChallenges.some((startedChallenge: Challenge) => startedChallenge.name === challenge.title)
  );

  console.log("startedChallenges", startedChallenges);
  console.log("email", email);
  console.log("error", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  const calculateProgress = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Calculate the total number of milliseconds between start and end dates
  const totalDuration = end.getTime() - start.getTime();

  // Calculate the number of milliseconds that have elapsed from start to now
  const elapsedDuration = now.getTime() - start.getTime();

  // Calculate the percentage of the duration that has passed
  let progress = (elapsedDuration / totalDuration) * 100;
  
  // Cap the progress at 100% to handle cases where the end date has passed
  progress = Math.min(progress, 100);

  // Return the rounded progress value
  return Math.round(progress);
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">Challenges</h1>
        {startedChallenges.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-white mb-6">Started Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {startedChallenges.map((challenge: Challenge) => {
                const matchedChallenge = allChallenges.find(c => c.title === challenge.name);
                const progress = calculateProgress(challenge.startDate, challenge.endDate);
                return (
                  <ChallengeComponent
                    key={challenge._id}
                    title={challenge.name}
                    description={matchedChallenge?.description || ''}
                    icon={matchedChallenge?.icon as React.ReactNode}
                    bgColor={matchedChallenge?.bgColor || ''}
                    bgImage={matchedChallenge?.bgImage || ''}
                    progress={progress}
                    startDate={new Date(challenge.startDate)}
                    endDate={new Date(challenge.endDate)}
                  />
                );
              })}
            </div>
          </>
        )}

        <h2 className="text-3xl font-bold text-white mb-6">Available Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {unstartedChallenges.map((challenge) => (
            <ChallengeComponent
              key={challenge.title}
              title={challenge.title}
              description={challenge.description}
              icon={challenge.icon as unknown as React.ReactNode}
              bgColor={challenge.bgColor}
              bgImage={challenge.bgImage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page;
