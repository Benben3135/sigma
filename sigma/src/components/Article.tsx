import React from "react";
import { Button } from "./ui/MovingBorders";
import { FaClock } from "react-icons/fa6";

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
    <Button
      onClick={() => onBoxClick(title)}
      duration={Math.floor(Math.random() * 10000) + 10000}
      borderRadius="1.75rem"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        borderRadius: `calc(1.75rem* 0.96)`,
      }}
      className="flex-1 text-black dark:text-white border-purple"
    >
      <div className="flex flex-col justify-start items-center pt-3 py-3 md:p-5 lg:p-10 gap-2 h-full">
        <div className="w-full h-44">
          <img src={img} alt={title} className="w-fit h-fit rounded-md" />
        </div>

        <div
          style={{
            background: "rgb(4,7,29)",
            backgroundColor:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            borderRadius: `calc(1.75rem* 0.96)`,
          }}
          className="flex flex-col justify-center items-center mt-3 p-2 h-36" // Fixed height
        >
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          <p className="text-white-100 mt-3 font-semibold">{subTitle}</p>
          <div className="flex flex-row justify-center items-center w-fit mt-2 gap-1">
            <FaClock scale={0.6}/>
            <p className="text-white-100 font-semibold">{readingTime}m</p>
          </div>
        </div>
      </div>
    </Button>
  );
};

export default Article;
