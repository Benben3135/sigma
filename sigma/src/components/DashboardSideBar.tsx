"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaClock, FaLocationArrow, FaPills, FaUserFriends, FaRegEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { FaBars, FaBurger, FaPeopleGroup, FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { SiProgress } from "react-icons/si";
import { usePathname } from 'next/navigation'

const DashboardSideBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();
  const path = usePathname();

  useEffect(() => {
    const pathToTabIndex = {
      "/dashboard": 0,
      "/dashboard/challenges": 1,
      "/dashboard/alarm": 2,
      "/dashboard/nutrition": 3,
      "/dashboard/workouts": 4,
      "/dashboard/timeline": 5,
      "/dashboard/friends": 6,
      "/dashboard/messages": 7,
      "/dashboard/groups": 8,
      "/dashboard/settings": 9,
      "/dashboard/help": 10,
      "/dashboard/logout": 11
    } as const;
    setActiveTab(pathToTabIndex[path as keyof typeof pathToTabIndex] || 0);
  }, [path]);

  const tabs = [
    { name: "Main", href: "/dashboard", icon: <FaBurger />, category: "main" },
    { name: "Challenges", href: "/dashboard/challenges", icon: <FaLocationArrow />, category: "features" },
    { name: "Alarm", href: "/dashboard/alarm", icon: <FaClock />, category: "features" },
    { name: "Nutrition", href: "/dashboard/nutrition", icon: <FaPills />, category: "features" },
    { name: "Workouts", href: "/dashboard/workouts", icon: <MdOutlineSportsGymnastics />, category: "features" },
    { name: "Timeline", href: "/dashboard/timeline", icon: <SiProgress />, category: "features" },
    { name: "Friends", href: "/dashboard/friends", icon: <FaUserFriends />, category: "social" },
    { name: "Messages", href: "/dashboard/messages", icon: <FaRegEnvelope />, category: "social" },
    { name: "Groups", href: "/dashboard/groups", icon: <FaPeopleGroup />, category: "social" },
    { name: "Settings", href: "/dashboard/settings", icon: <FaCog />, category: "account" },
    { name: "Help", href: "/dashboard/help", icon: <FaQuestionCircle />, category: "account" },
    { name: "Log Out", href: "/dashboard/logout", icon: <FaSignOutAlt />, category: "account" }
  ];

  const renderTabs = (category: string) => {
    return tabs
      .filter(tab => tab.category === category)
      .map((tab, index) => (
        <Link href={tab.href} key={tab.name}>
          <motion.div
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === tabs.findIndex(t => t.name === tab.name)
                ? "bg-violet-600 text-white"
                : "text-gray-300 hover:bg-violet-600 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </motion.div>
        </Link>
      ));
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 top-0 h-screen pt-24 w-64 bg-gradient-to-b scrollbar-hide from-violet-800 to-indigo-900 text-white shadow-lg overflow-y-auto"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ''}'s Dashboard
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-8">
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Main</h3>
            {renderTabs("main")}
          </div>
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Features</h3>
            {renderTabs("features")}
          </div>
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Social</h3>
            {renderTabs("social")}
          </div>
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-wider text-gray-400">Account</h3>
            {renderTabs("account")}
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <p className="text-sm text-gray-400">&copy; 2024 Sigma</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSideBar;
