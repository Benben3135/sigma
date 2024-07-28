"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {motion} from "framer-motion"

export default function Home() {
  return (
    <main className="w-screen h-[400vh]">
      {/* first page */}
      <div style={{ backgroundImage: "url(/background4.jpg)" }} className=" w-full h-screen bg-gradient-to-b from-slate-900 to-slate-600 bg-cover">
        <div className="flex flex-col items-center justify-center"></div>
      </div>
      {/*  */}
      {/* second page */}
      <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 1}}
      style={{ backgroundImage: "url(/background3.jpg)" }} className=" w-full h-screen bg-gradient-to-b from-slate-900 to-slate-600 bg-cover">
        <div className="flex flex-col items-center justify-center"></div>
      </motion.div>
      {/*  */}
      {/* third page */}
      <div
        style={{ backgroundImage: "url(/background2.jpg)" }}
        className=" w-full h-screen bg-gradient-to-b from-slate-900 to-slate-600 bg-cover"
      >
        <div className="flex flex-col items-center justify-center"></div>
      </div>
      {/*  */}
    </main>
  );
}
