"use client";

import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import MagicButton from "@/components/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const Page = () => {
  const { isSignedIn, user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const { data, error, isLoading } = useQuery({
    queryKey: ["checkEmail", email],
    queryFn: () =>
      axios
        .get(`/api/users/check-email`, { params: { email } })
        .then((res) => res.data),
    enabled: isSignedIn && !!email, // Ensure email is not null or undefined
  });

  useEffect(() => {
    if (!data && !isLoading) {
      // Adjust based on actual response structure
      window.location.href = "/set-up";
      console.log("data is null", data);
    }
  }, [isSignedIn, data]);

  if (isLoading) return <Loading />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pb-20 pt-36">
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
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>


    </div>
  );
};

export default Page;
