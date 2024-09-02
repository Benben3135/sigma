"use client"

import ChallengeComponent from '@/components/ChallengeComponent';
import { FaBed, FaBook, FaBrain, FaCarrot, FaCookie, FaDumbbell, FaLaptopCode, FaLeaf, FaPencilAlt, FaRunning, FaSmile, FaWater } from 'react-icons/fa';
import { FaHandsHolding } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';




const page = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">Challenges</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ChallengeComponent
            title="30-Day Water Challenge"
            description="Drink 8 glasses of water daily for 30 days to improve hydration and overall health."
            icon={<FaWater className="text-6xl text-blue-300" />}
            bgColor="bg-blue-600"
            bgImage="/challenges/water-challenge-bg.jpg"
          />

          <ChallengeComponent
            title="Meditation Marathon"
            description="Practice meditation for 30 minutes daily for a month to reduce stress and improve focus."
            icon={<GiMeditation className="text-6xl text-indigo-300" />}
            bgColor="bg-indigo-600"
            bgImage="/challenges/meditation-bg.jpg"
          />

          <ChallengeComponent
            title="Sleep Improvement Challenge"
            description="Maintain a consistent sleep schedule for 3 weeks to enhance sleep quality and overall well-being."
            icon={<FaBed className="text-6xl text-purple-300" />}
            bgColor="bg-purple-600"
            bgImage="/challenges/sleep-bg.jpg"
          />

          <ChallengeComponent
            title="21 Days of Gratitude"
            description="Write down three things you're grateful for each day for 21 days to boost positivity."
            icon={<FaHandsHolding className="text-6xl text-yellow-300" />}
            bgColor="bg-yellow-600"
            bgImage="/challenges/gratitude-bg.jpg"
          />

          <ChallengeComponent
            title="Learn a New Skill in 30 Days"
            description="Dedicate 1 hour daily for 30 days to learn a new skill of your choice."
            icon={<FaBook className="text-6xl text-green-300" />}
            bgColor="bg-green-600"
            bgImage="/challenges/skill-bg.jpg"
          />

          <ChallengeComponent
            title="100-Day Coding Sprint"
            description="Code for at least 1 hour every day for 100 days to significantly improve your programming skills."
            icon={<FaLaptopCode className="text-6xl text-red-300" />}
            bgColor="bg-red-600"
            bgImage="/challenges/coding-bg.jpg"
          />

          <ChallengeComponent
            title="30-Day Plank Challenge"
            description="Start with a 20-second plank and gradually increase duration over 30 days to strengthen your core."
            icon={<FaDumbbell className="text-6xl text-orange-300" />}
            bgColor="bg-orange-600"
            bgImage="/challenges/plank-bg.jpg"
          />

          <ChallengeComponent
            title="Couch to 5K"
            description="Follow a 9-week program to go from being a non-runner to completing a 5K run."
            icon={<FaRunning className="text-6xl text-teal-300" />}
            bgColor="bg-teal-600"
            bgImage="/challenges/running-bg.jpg"
          />

          <ChallengeComponent
            title="Daily Journaling Challenge"
            description="Write in a journal for 15 minutes every day for a month to improve self-reflection and mental clarity."
            icon={<FaPencilAlt className="text-6xl text-pink-300" />}
            bgColor="bg-pink-600"
            bgImage="/challenges/journaling-bg.jpg"
          />

          <ChallengeComponent
            title="Mindfulness Month"
            description="Practice mindfulness techniques for 10 minutes daily for a month to reduce anxiety and improve focus."
            icon={<FaBrain className="text-6xl text-cyan-300" />}
            bgColor="bg-cyan-600"
            bgImage="/challenges/mindfulness-bg.jpg"
          />

          <ChallengeComponent
            title="Positive Affirmations Challenge"
            description="Repeat positive affirmations to yourself every morning for 30 days to boost self-confidence."
            icon={<FaSmile className="text-6xl text-lime-300" />}
            bgColor="bg-lime-600"
            bgImage="/challenges/affirmations-bg.jpg"
          />

          <ChallengeComponent
            title="Whole30 Diet Challenge"
            description="Follow the Whole30 diet plan for 30 days to reset your eating habits and improve overall health."
            icon={<FaCarrot className="text-6xl text-amber-300" />}
            bgColor="bg-amber-600"
            bgImage="/challenges/whole30-bg.jpg"
          />

          <ChallengeComponent
            title="Sugar-Free Month"
            description="Eliminate added sugars from your diet for a month to improve energy levels and overall health."
            icon={<FaCookie className="text-6xl text-gray-300" />}
            bgColor="bg-gray-600"
            bgImage="/challenges/sugar-free-bg.jpg"
          />

          <ChallengeComponent
            title="Vegetarian for a Week"
            description="Try a vegetarian diet for a week to explore new recipes and potential health benefits."
            icon={<FaLeaf className="text-6xl text-emerald-300" />}
            bgColor="bg-emerald-600"
            bgImage="/challenges/vegetarian-bg.jpg"
          />
        </div>
      </div>
    </div>
  )
}

export default page
