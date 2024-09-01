// components/FloatingBear.tsx

import { motion } from 'framer-motion';
import Image from 'next/image'; // Assuming you're using Next.js

const FloatingBear = () => {
  return (
    <motion.div
      className="w-32 h-32" // Adjust the size as needed
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
    >
      <Image
        src="/sleepingBear.png" // Path to your bear image
        alt="Floating Bear"
        layout="fill"
        objectFit="contain"
        style={{scale: 2}}
      />
    </motion.div>
  );
};

export default FloatingBear;
