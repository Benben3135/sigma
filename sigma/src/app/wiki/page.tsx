"use client";

import { Spotlight } from "@/components/ui/Spotlight";
import React, { useState, useEffect } from "react";
import ToolbarDynamic from "@/components/SerachBar";
import { FaSearchengin } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Article from "@/components/Article";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export interface Post {
  _id: string;
  field: string;
  subField: string;
  title: string;
  subTitle: string;
  content: string;
  img: string;
  created: Date;
  updated: Date;
  characters: number;
  readingTimeSeconds: number;
  wordCount: number;
}

const page = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    // You can use the searchText here for any other operations like filtering, etc.
    console.log("Search text:", value);
  };

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useQuery({
    queryKey: ["search", searchText],
    queryFn: () =>
      axios
        .get(`/api/wiki/search`, { params: { searchText } })
        .then((res) => res.data)
        .then((data) => {
          setSearchResults(data);
          return data;
        }),
    enabled: searchText !== "", // Ensure email is not null or undefined
  });

  useEffect(() => {
    setSearchResults([]);
  }, [searchText.length == 0]);

  const {
    data: postsData = [], // Default to an empty array
    error: postsError,
    isLoading: postsLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get(`/api/wiki/getAll`, { params: { searchText } })
        .then((res) => res.data),
  });

  if (postsLoading) return <Loading />;

  return (
    <div
      style={{
        backgroundImage: "url('/back2.webp')", // Set the background image
      }}
      className="w-screen h-fit px-36"
    >
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

      <div className="flex flex-col justify-center items-center pt-24">
        <img src="/sigma-pedia.png" className="h-24 w-48" alt="" />
        <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
          Sigma wiki, all you need to know.
        </p>
      </div>
      <div className="w-full h-fit flex flex-row justify-center items-center">
        <ToolbarDynamic onSearchChange={handleSearchChange} />
      </div>
      <div className="w-full h-fit my-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {searchResults.length === 0
          ? postsData.map((post: Post, index: number) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                key={post._id} // Use a unique identifier from the data
                className="p-4 mt-4"
              >
                <Article
                  _id={post._id}
                  field={post.field}
                  subField={post.subField}
                  title={post.title}
                  subTitle={post.subTitle}
                  content={post.content}
                  img={post.img}
                  created={post.created}
                  updated={post.updated}
                  characters={post.characters}
                  readingTimeSeconds={post.readingTimeSeconds}
                  wordCount={post.wordCount}
                  onBoxClick={() => router.push(`/wiki/${post.title}`)}
                />
              </motion.div>
            ))
          : searchResults.map((post: Post, index: number) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                key={post._id}
                className="p-4 mt-4"
              >
                <Article
                  _id={post._id}
                  field={post.field}
                  subField={post.subField}
                  title={post.title}
                  subTitle={post.subTitle}
                  content={post.content}
                  img={post.img}
                  created={post.created}
                  updated={post.updated}
                  characters={post.characters}
                  readingTimeSeconds={post.readingTimeSeconds}
                  wordCount={post.wordCount}
                  onBoxClick={() => router.push(`/wiki/${post.title}`)}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default page;
