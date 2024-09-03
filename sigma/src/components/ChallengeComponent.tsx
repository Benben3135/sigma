import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ChallengeComponent = ({ title, description, icon, bgColor, bgImage, progress, startDate, endDate }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
    bgImage: string;
    progress?: number;
    startDate?: Date;
    endDate?: Date;
  }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
      if (progress !== undefined) {
        const timer = setTimeout(() => {
          setAnimatedProgress(progress);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [progress]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`${bgColor} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full relative overflow-hidden cursor-pointer`}
        onClick={() => (window.location.href = `/dashboard/challenges/${title.toLowerCase().replace(/\s+/g, '-')}`)}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className={`absolute inset-0 ${bgColor} opacity-80`}
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        <motion.div 
          className="relative z-10 flex flex-col items-center w-full"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
          <h2 className="text-2xl font-bold text-white text-center mt-4 mb-2">{title}</h2>
          <p className="text-white text-center">{description}</p>
          {progress !== undefined && startDate && endDate && (
            <div className="w-full mt-4">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white bg-opacity-30">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${animatedProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                  ></motion.div>
                </div>
              </div>
              <p className="text-white text-center text-sm">
                {animatedProgress}% Complete
              </p>
              <p className="text-white text-center text-sm mt-2">
                Ends on: {new Date(endDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  export default ChallengeComponent;