"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Terminal } from "lucide-react";

const SetUpNavBar = () => {

    const [alert, setAlert] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setAlert(false)
        }, 5000);
    },[alert])

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10 flex flex-row justify-center items-center">
      <Image
      onClick={()=>setAlert(true)}
        src="/logo.svg"
        alt="logo"
        width={30}
        height={30}
        className="cursor-pointer hover:animate-slowspin"
      />
      <Alert className={alert? "w-fit h-2/3 transition-all ease-in-out":"scale-0 absolute transition-all ease-in-out bg-slate-900/[0.] border backdrop-blur-xl flex items-center justify-center w-full h-full text-sm antialiased flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"}>
        <Terminal className="h-4 w-4" />
        <AlertTitle> You can't leave the setup stage.</AlertTitle>
      </Alert>
    </div>
  );
};

export default SetUpNavBar;
