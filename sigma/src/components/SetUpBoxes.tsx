"use client";

import React, { useEffect, useState } from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

interface SetUpBoxesProps {
  mappingObject?: any;
  onBoxClick: (index: number) => void;
  checked: number[] | null;
}

interface Card {
    id: number,
    title: string,
    desc: string,
    className: string,
    thumbnail: string
}

const SetUpBoxes: React.FC<SetUpBoxesProps> = ({ onBoxClick , checked, mappingObject }) => {
    useEffect(() => {
        console.log(checked)
    },[checked])
  return (
    <div className="py-4 w-full">
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {mappingObject.map((card: Card, index: number) => (
          <Button
            onClick={() => onBoxClick(index)} // Pass the index to the parent on click
            key={card.id}
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className={checked?.includes(index) ? "flex-1 text-black dark:text-white border-purple":"flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"}
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SetUpBoxes;
