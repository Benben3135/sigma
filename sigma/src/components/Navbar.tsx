"use client";

import { Socials } from "@/app/constants";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter , useSearchParams  } from "next/navigation";


const Navbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      {isSignedIn ? (
        <>
          {" "}
          <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
            <a
              href="/dashboard"
              className="h-auto w-auto flex flex-row items-center"
            >
              <Image
                src="/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="cursor-pointer hover:animate-slowspin"
              />

              <span className="font-bold ml-[10px] hidden md:block text-gray-300">
                Sigma
              </span>
            </a>

            <div className="flex flex-row gap-5 justify-center items-center">
              <Link className="hidden md:block" href={"/wiki"}>
                <img src="/sigma-pedia.png" className="h-8 w-16" alt="" />
              </Link>
              {
                <>
                  <Link className="hidden md:block" href={"/about"}>
                    <h1 className="text-md hover:scale-105 transition-all ease-in-out">
                      about
                    </h1>
                  </Link>
                  <Link className="hidden md:block" href={"/billing"}>
                    <h1 className="text-md hover:scale-105 transition-all ease-in-out">
                      billing
                    </h1>
                  </Link>
                </>
              }
              <Link className="hidden sm:block" href={"/Profile"}>
                <h1 className="text-md hover:scale-105 transition-all ease-in-out">
                  Profile
                </h1>
              </Link>
              <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <GiHamburgerMenu className="w-6 h-6 text-purple hover:translate-x-1 transition-all ease-in-out cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/wiki")}>
                    Sigma Pedia
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/Profile")}>
                  Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/Challenges")}>
                  Challenges
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/billing")}>
                  billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/about")}>
                  about
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
              <UserButton />
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
            <a href="/" className="h-auto w-auto flex flex-row items-center">
              <Image
                src="/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="cursor-pointer hover:animate-slowspin"
              />

              <span className="font-bold ml-[10px] hidden md:block text-gray-300">
                Sigma
              </span>
            </a>

            <div className="w-[500px] h-full lg:flex flex-row items-center justify-between md:mr-20 hidden">
              <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                <a href="#about-me" className="cursor-pointer">
                  About us
                </a>
                <a href="#skills" className="cursor-pointer">
                  Skills
                </a>
                <a href="#projects" className="cursor-pointer">
                  Projects
                </a>
              </div>
            </div>

            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <GiHamburgerMenu className="w-6 h-6 text-purple hover:translate-x-1 transition-all ease-in-out cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/Billing")}>
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/Billing")}>
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/Billing")}>
                    Subscription
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-row gap-5">
              <Link href={"/sign-in"}>
                {" "}
                <Button className="w-16 h-8 bg-violet-400">Login</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className="w-16 h-8 bg-violet-500">Register</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
