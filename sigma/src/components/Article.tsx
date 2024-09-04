import React from "react";
import { Button } from "./ui/MovingBorders";
import { FaClock, FaBookOpen } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ArticleProps {
  _id: string;
  field: string;
  subField: string;
  title: string;
  subTitle: string;
  content: string;
  img: string;
  created: Date;
  updated: Date;
  characters: number;
  readingTimeSeconds: number;
  wordCount: number;
  onBoxClick: (title: string) => void;
}

const Article = ({
  _id,
  field,
  subField,
  title,
  subTitle,
  content,
  img,
  created,
  updated,
  characters,
  readingTimeSeconds,
  wordCount,
  onBoxClick,
}: ArticleProps) => {
  const readingTime = Math.ceil(readingTimeSeconds / 60);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full h-[450px]" // Changed to full width, kept fixed height
    >
      <Button
        onClick={() => onBoxClick(title)}
        duration={Math.floor(Math.random() * 10000) + 10000}
        borderRadius="1.75rem"
        className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col justify-start items-center p-6 gap-4 h-full">
          <div className="w-full h-48 overflow-hidden rounded-lg">
            <img 
              src={img} 
              alt={title} 
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col justify-center items-center mt-3 p-4 bg-black bg-opacity-30 rounded-xl w-full">
            <h1 className="text-2xl font-bold text-center mb-2 text-white">
              {title}
            </h1>
            <p className="text-gray-300 text-center font-medium mb-3">{subTitle}</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FaClock className="text-purple-400" />
                <p className="text-sm font-semibold">{readingTime}m read</p>
              </div>
              <div className="flex items-center space-x-1">
                <FaBookOpen className="text-purple-400" />
                <p className="text-sm font-semibold">{wordCount} words</p>
              </div>
            </div>
          </div>
        </div>
      </Button>
    </motion.div>
  );
};

export default Article;
