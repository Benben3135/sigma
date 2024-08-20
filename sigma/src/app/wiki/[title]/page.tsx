import axios from "axios";
import {Post} from "@/app/wiki/page"
import Error from "next/error";
import ArticlePage from "@/components/ArticlePage";

export default async function page({ params }: { params: { title: string } }) {
  try {
    const { title } = params;
    const article:Post = await axios.get(`http://localhost:3001/wiki/${title}`).then((res) => res.data[0]);

    const allArticles:Post[] = await axios.get(`http://localhost:3001/wiki/${article.subField}?field=subField`).then((res) => res.data);
    const articles = allArticles.filter((article) => article.title !== title).slice(0, 3);

    return (
      <div className="w-screen h-fit">
        <ArticlePage post={article} articles={articles} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching the article:", error);
    return (
      <div>
        <h1 className='text-4xl text-red-600 mt-96'>
          Error fetching the article
        </h1>
      </div>
    );
  }
}
