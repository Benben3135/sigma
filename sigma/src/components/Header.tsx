import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default async function Header() {
  return (
    <div className="bg-gray-600 text-neutral-100 sticky z-[100] inset-x-0 top-0 w-full shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 sticky">
        <Link href="/">
        <Image src="/sigma_logo.svg" alt="logo" width={40} height={40} className="text-white"/>
        </Link>
        <div>
          <div className="flex gap-4 items-center">
            <Button size="sm" variant="secondary" className="h-8">
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button size="sm" className="h-8">
              {" "}
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
