"use client";

import { Post } from "@/app/wiki/page";
import { motion } from "framer-motion";
import React from "react";
import Article from "./Article";
import { useRouter } from "next/navigation";
import { Spotlight } from "./ui/Spotlight";
import { FaClock } from "react-icons/fa6";

interface ArticlePageProps {
  post: Post;
  articles: Post[];
}

const ArticlePage = ({ post, articles }: ArticlePageProps) => {
  const router = useRouter();
  const readingTime = Math.ceil(post.readingTimeSeconds / 60);

  return (
    <div
    style={{
      backgroundImage: "url('/back2.webp')", // Set the background image
    }}
    className="w-full h-full overflow-x-hidden overflow-y-scroll py-24 px-20">
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
      className="w-full h-fit flex flex-col md:flex-row justify-center items-start">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-fit flex flex-col justify-start items-start flex-1">
          <h1 className="text-4xl font-bold text-white-100">{post.title}</h1>
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 mt-1">
            {post.subTitle}
          </p>
          <div className="w-fit h-fit">
          <div className="flex flex-row justify-center items-center w-fit mt-2 gap-1">
            <FaClock className="scale-75"/>
            <p className="text-white-100 font-semibold text-xs">{readingTime}m</p>
          </div>
          </div>
          <div
            className="max-w-[100ch] mt-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 h-full flex flex-col md:justify-start md:items-start md:pl-24 md:pt-24 mt-12 md:mt-0 justify-center items-center">
          <img
            src={post.img}
            alt={post.title}
            className="w-96 h-96 rounded-md"
          />
          <div className="flex flex-col justify-start items-start mt-4">
            <p className="text-white-100 font-semibold">Field: {post.field.toLocaleLowerCase()}</p>
            <p className="text-white-100 font-semibold">
              Sub-Field: {post.subField.toLocaleLowerCase()}
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="w-full px-8 h-[1px] bg-gray-600 mt-8 mb-4"></motion.div>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="w-full h-fit">
        {" "}
        <div className="w-full h-fit justify-start items-start">
          <h1 className="text-3xl font-bold text-white-100">
            Another {post.subField.toLocaleLowerCase()} topics
          </h1>

          <div className="w-full h-fit my-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
            {articles.map((article: Post, index: number) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                key={article._id}
                className="p-4 mt-4"
              >
                <Article
                  _id={article._id}
                  field={article.field}
                  subField={article.subField}
                  title={article.title}
                  subTitle={article.subTitle}
                  content={article.content}
                  img={article.img}
                  created={article.created}
                  updated={article.updated}
                  characters={article.characters}
                  readingTimeSeconds={article.readingTimeSeconds}
                  wordCount={article.wordCount}
                  onBoxClick={() => router.push(`/wiki/${article.title}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArticlePage;
