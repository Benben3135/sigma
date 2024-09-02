"use client";

import { Post } from "@/app/wiki/page";
import { motion } from "framer-motion";
import React from "react";
import Article from "./Article";
import { useRouter } from "next/navigation";
import { Spotlight } from "./ui/Spotlight";
import { FaClock, FaBookOpen, FaCalendarAlt } from "react-icons/fa";

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
        backgroundImage: "url('/back2.webp')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
      className="min-h-screen w-full overflow-x-hidden py-24 px-4 md:px-12 lg:px-20"
    >
      <div className="fixed inset-0 z-0">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-black bg-opacity-50 rounded-xl shadow-2xl p-8 mb-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-lg text-blue-300 mb-6">{post.subTitle}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center text-yellow-400">
                <FaClock className="mr-2" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center text-green-400">
                <FaBookOpen className="mr-2" />
                <span>{post.wordCount} words</span>
              </div>
              <div className="flex items-center text-purple-400">
                <FaCalendarAlt className="mr-2" />
                <span>{new Date(post.created).toLocaleDateString()}</span>
              </div>
            </div>
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="md:w-1/3">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <p className="text-white font-semibold mb-2">Field: <span className="text-blue-300">{post.field}</span></p>
              <p className="text-white font-semibold">Sub-Field: <span className="text-purple-300">{post.subField}</span></p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        <h2 className="text-3xl font-bold text-white mb-8">
          More on {post.subField}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: Post, index: number) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
      </motion.div>
    </div>
  );
};

export default ArticlePage;
