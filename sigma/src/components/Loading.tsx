import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { Spotlight } from "./ui/Spotlight";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full h-full p-24 flex flex-col justify-center items-center">
        <div className="relative">
          <Spotlight
            className="absolute -top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="rgba(255,255,255,0.2)"
          />
          <Spotlight
            className="absolute h-[80vh] w-[50vw] top-10 left-full"
            fill="rgba(128,0,128,0.2)"
          />
          <Spotlight
            className="absolute left-80 top-28 h-[80vh] w-[50vw]"
            fill="rgba(0,0,255,0.2)"
          />
        </div>
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img className="w-24 h-24 animate-pulse" src="/logo.svg" alt="Loading" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
