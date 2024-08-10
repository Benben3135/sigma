import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { Spotlight } from "./ui/Spotlight";

const Loading = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full p-24 flex flex-col justify-center items-center">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>
        <div className="w-fit h-fit p-24 border-b-2 rounded-full animate-spin">
          <img className="w-24 h-24 animate-pulse" src="/logo.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
