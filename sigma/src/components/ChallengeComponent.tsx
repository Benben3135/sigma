import { motion } from "framer-motion";

const ChallengeComponent = ({ title, description, icon, bgColor, bgImage }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
    bgImage: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(255,255,255,0.6)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full relative overflow-hidden cursor-pointer`}
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
        className="relative z-10 flex flex-col items-center"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
        <h2 className="text-2xl font-bold text-white text-center mt-4 mb-2">{title}</h2>
        <p className="text-white text-center">{description}</p>
      </motion.div>
    </motion.div>
  )

  export default ChallengeComponent;