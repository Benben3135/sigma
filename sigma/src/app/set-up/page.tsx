"use client";

import MagicButton from "@/components/MagicButton";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import React, { useEffect, useState } from "react";
import { FaAngleRight, FaLocationArrow } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
import Approach from "@/components/Approach";
import Grid from "@/components/Grid";
import SetUpBoxes from "@/components/SetUpBoxes";
import { firstSetUp } from "@/data";
import { Spotlight } from "@/components/ui/Spotlight";
import {z, ZodError} from "zod"
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const page = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = user?.firstName;
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [selected1, setSelected1] = useState<number[] | null>([]);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [sleep, setSleep] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const Schema = z.object({
    weight: z.string().regex(/^\d+$/, { message: "Weight must be a string containing only numbers" }).min(1, { message: "Weight must be at least 1 character long" }),
    height: z.string().regex(/^\d+$/, { message: "height must be a string containing only numbers" }).min(1, { message: "height must be at least 1 character long" }),
    age: z.string().regex(/^\d+$/, { message: "age must be a string containing only numbers" }).min(1, { message: "age must be at least 1 character long" }),
    work: z.string().regex(/^\d+$/, { message: "work must be a string containing only numbers" }).min(1, { message: "work must be at least 1 character long" }),
  })

  const handleConfirm = async () => {
    try {
      setErrors({});
  
      // Validate data using Zod schema
      const result = Schema.parse({
        weight,
        height,
        age,
        work,
      });
  
      // Log the data being sent to the API
      console.log('Sending data:', {
        email,
        weight,
        height,
        age,
        work,
        sleep,
        target,
      });

    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedAge = parseFloat(age);
    const parsedWork = parseFloat(work);
    const parsedSleep = parseFloat(sleep);
    const parsedTarget = parseFloat(target);
  
      // Make POST request to your Next.js API route
      const createNewUser = await axios.post("/api/users/send-new-user", {
        email,
        weight: parsedWeight,
        height: parsedHeight,
        age: parsedAge,
        work: parsedWork,
        sleep: parsedSleep,
        target: parsedTarget,
      });
      
      console.log('Response from server:', createNewUser);
      if(createNewUser.status === 201) {
        setPage(5);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const initializeData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/data", {
        email,
      });
      debugger;
      console.log('Response from server:', response);
      if(response.status === 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  const handleBoxClick1 = (index: number) => {
    setSelected1((prevSelected) => {
      // Check if index is already selected
      if (prevSelected!.includes(index)) {
        // Remove the index if it's already selected
        return prevSelected!.filter((i) => i !== index);
      } else {
        // Add the index if it's not selected
        return [...prevSelected!, index];
      }
    });
  };

  if(loading) {
    return <Loading />
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {page === 0 && (
        <>
          <div className="flex justify-center relative my-20 z-10">
            <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
              <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                Welcome to your next version.
              </p>
              <TextGenerateEffect
                words={`${name}, are you ready to your new version?`}
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
              />

              <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                With{" "}
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  AI
                </span>{" "}
                tools and medical technologies
              </p>

              <MagicButton
                handleClick={() => setPage(1)}
                title="I'm ready."
                icon={<FaAngleRight />}
                position="right"
              />
            </div>
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center relative my-20 z-10">
              <h1 className="heading">
                What you mostly want{" "}
                <span className="text-purple">to change?</span>
              </h1>
              <SetUpBoxes
                mappingObject={firstSetUp}
                onBoxClick={handleBoxClick1}
                checked={selected1}
              />
              <MagicButton
                handleClick={() => setPage(2)}
                title="Let's go."
                icon={<FaAngleRight />}
                position="right"
              />
            </div>
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <h1>TODO</h1>
          <MagicButton
            handleClick={() => setPage(3)}
            title="Let's go."
            icon={<FaAngleRight />}
            position="right"
          />
        </>
      )}
      {page === 3 && (
        <>
          <h1>TODO</h1>
          <MagicButton
            handleClick={() => setPage(4)}
            title="Let's go."
            icon={<FaAngleRight />}
            position="right"
          />
        </>
      )}
      {page === 4 && (
        <>
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center relative my-20 z-10">
              <div>
                <Spotlight
                  className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                  fill="white"
                />
                <Spotlight
                  className="h-[80vh] w-[50vw] top-10 left-full"
                  fill="purple"
                />
                <Spotlight
                  className="left-80 top-28 h-[80vh] w-[50vw]"
                  fill="blue"
                />
              </div>
              <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                  Welcome to your next version.
                </p>

                {/**
                 *  Link: https://ui.aceternity.com/components/text-generate-effect
                 *
                 *  change md:text-6xl, add more responsive code
                 */}
                <h1 className="heading">
                  Let's get some <span className="text-purple">data</span>
                </h1>

                <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl mt-4">
                  All your{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    data
                  </span>{" "}
                  stays completely private.
                </p>

                <div
                  style={{
                    background: "rgb(4,7,29)",
                    backgroundColor:
                      "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                    borderRadius: `calc(1.75rem* 0.96)`,
                  }}
                  className="text-black dark:text-white border-purple w-[40rem] h-[20rem] bg-red-900"
                >
                  <div className="w-full h-full p-4 grid grid-cols-2 grid-rows-3">
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">Weight</h2>
                      <input placeholder="KG" onChange={(ev) => setWeight(ev.target.value)} type="text" className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2" />
                    </div>
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">Height</h2>
                      <input placeholder="CM" onChange={(ev) => setHeight(ev.target.value)} type="text" className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2" />
                    </div>
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">age</h2>
                      <input onChange={(ev) => setAge(ev.target.value)} type="text" className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2" />
                    </div>
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">Avg. sleep hours</h2>
                      <select onChange={(ev) => setSleep(ev.target.value)} className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2 flex-1" >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">sleep target</h2>
                      <select onChange={(ev) => setTarget(ev.target.value)} className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2 flex-1" >
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                    </div>
                    <div className="flex-1 p-4 gap-2 flex flex-row justify-between items-center">
                      <h2 className="font-sans antialiased font-bold">work hours</h2>
                      <input onChange={(ev) => setWork(ev.target.value)} type="text" className="rounded-md bg-indigo-900 backdrop-blur-md text-white-100 pl-2" />
                    </div>
                    
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 antialiased mt-3">
                {errors.weight && <p className="text-sm" style={{ color: 'red' }}>{errors.weight}</p>}
                {errors.height && <p className="text-sm" style={{ color: 'red' }}>{errors.weight}</p>}
                {errors.age && <p className="text-sm" style={{ color: 'red' }}>{errors.weight}</p>}
                {errors.work && <p className="text-sm" style={{ color: 'red' }}>{errors.weight}</p>}
                </div>
               
                <MagicButton
                  title="Confirm"
                  icon={<FaLocationArrow />}
                  position="right"
                  handleClick={() => handleConfirm()}
                />
              </div>
            </div>
          </div>
        </>
      )}
       {page === 5 && (
        <>
          <div className="flex justify-center relative my-20 z-10">
            <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
              <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                you just finished your first step
              </p>
              <TextGenerateEffect
                words={`${name}, Let's change your life`}
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
              />

              <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                we are{" "}
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  all
                </span>{" "}
               done.
              </p>

              <MagicButton
                handleClick={() => initializeData()}
                title="let's go."
                icon={<FaAngleRight />}
                position="right"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
