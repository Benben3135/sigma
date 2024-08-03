"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {motion} from "framer-motion"
import Hero from "@/app/components/landing/main/Hero";
import Skills from "@/app/components/landing/main/Skills";
import Encryption from "@/app/components/landing/main/Encryption";
import Projects from "@/app/components/landing/main/Projects";
import Footer from "@/app/components/landing/main/Footer";

export default function Home() {

  return (
    <main className="h-full w-full">
      <div className="h-[850px] flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
