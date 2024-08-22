import React from 'react';
import { UserResource } from "@clerk/types";

interface DashboardProps {
  user: UserResource 
}

const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className='w-full h-fit min-h-screen mt-[65px] flex'>
      {/* Fixed Green Sidebar */}
      <div className='fixed left-0 top-[65px] h-screen w-[20rem] bg-green-400'>
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-white text-2xl font-bold'>Sidebar</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 ml-[20rem] bg-red-200'>
        <p className='text-center text-2xl font-bold p-4'>Main Content Area</p>
        {/* Add your main content here */}
      </div>
    </div>
  );
}

export default Dashboard;
