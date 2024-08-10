"use client";

import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import SideNavBar from "@/components/SideNavBar";

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
    <div className="w-screen h-screen">
      <SideNavBar />
    </div>
  );
};

export default Page;
