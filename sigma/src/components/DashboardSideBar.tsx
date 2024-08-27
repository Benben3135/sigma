"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaBurger, FaClock, FaLocationArrow, FaPills } from "react-icons/fa6";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { SiProgress } from "react-icons/si";
import { FaUserFriends } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

const DashboardSideBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();

  const tabs1 = [
    {
      name: "Challenges",
      href: "/dashboard/challenges",
      icon: <FaLocationArrow />,
    },
    { name: "Alarm", href: "/dashboard/alarm", icon: <FaClock /> },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: <FaPills /> },
    {
      name: "Workouts",
      href: "/dashboard/workouts",
      icon: <MdOutlineSportsGymnastics />,
    },
    { name: "Progress", href: "/dashboard/progress", icon: <SiProgress /> },
  ];

  const tabs2 = [
    {
      name: "friends",
      href: "/dashboard/friends",
      icon: <FaUserFriends />,
    },
    { name: "messages", href: "/dashboard/messages", icon: <FaRegEnvelope /> },
    { name: "groups", href: "/dashboard/groups", icon: <FaPeopleGroup /> },
  ];

  const tabs3 = [
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <FaLocationArrow />,
    },
    { name: "Help", href: "/dashboard/help", icon: <FaClock /> },
    { name: "Log Out", href: "/dashboard/logout", icon: <FaPills /> },
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 top-0 h-screen w-[15rem] bg-violet-700 bg-opacity-70 z-10"
    >
      <div className="flex flex-col items-center justify-start pt-20 h-full">
        <div className="h-fit flex flex-row justify-center items-center w-full mb-6">
          <p className="text-white text-[1.2rem] font-extrabold antialiased">
            {user?.firstName?.charAt(0).toLocaleUpperCase()}
            {user?.firstName?.slice(1)}'s Dashboard
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          <div className="w-full" onClick={() => setActiveTab(0)}>
            <Link href={"/dashboard"}>
              <div
                className={
                  activeTab == 0
                    ? "text-white bg-gradient-to-r from-indigo-400 to-transparent py-3 text-md font-bold antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                    : "text-white text-md font-bold py-3 antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                }
              >
                <FaBurger />
                <span className="bg-gradient-to-r from-pink-700  to-violet-300 inline-block text-transparent bg-clip-text">
                  Main
                </span>
              </div>
            </Link>
          </div>
          {tabs1.map((tab, index) => (
            <div
              key={index}
              className="w-full"
              onClick={() => setActiveTab(index + 1)}
            >
              <Link href={tab.href}>
                <div
                  className={
                    activeTab == index + 1
                      ? "text-white bg-gradient-to-r from-indigo-400 to-transparent py-3 text-md font-bold antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                      : "text-white text-md font-bold py-3 antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                  }
                >
                  {tab.icon}
                  {tab.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full mt-4">
          <div
            className={
              "text-white  py-3 text-lg font-bold antialiased w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
            }
          >
            <span className="bg-gradient-to-r from-pink-700  to-violet-300 inline-block text-transparent bg-clip-text">
              Social
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-4 w-full">
          {tabs2.map((tab, index) => (
            <div
              key={index}
              className="w-full"
              onClick={() => setActiveTab(index + 1)}
            >
              <Link href={tab.href}>
                <div
                  className={
                    activeTab == index + 1
                      ? "text-white bg-gradient-to-r from-indigo-400 to-transparent py-3 text-md font-bold antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                      : "text-white text-md font-bold py-3 antialiased hover:text-yellow-400 w-full h-fit flex flex-row justify-start pl-12 items-center gap-2"
                  }
                >
                  {tab.icon}
                  {tab.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSideBar;
