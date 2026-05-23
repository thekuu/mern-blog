import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent;
    return text.length > 200 ? text.substring(0, 200).trimEnd() + "..." : text;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-12 md:gap-20 lg:gap-24">
        {posts.map((post, index) => {
          const imgSrc = post.img
            ? post.img.startsWith("http")
              ? post.img
              : `../upload/${post.img}`
            : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80";

          const isReversed = index % 2 === 0;

          return (
            <div
              key={post._id}
              className={`flex items-center gap-8 md:gap-12 lg:gap-16 flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image — always first in DOM so it appears on top when stacked */}
              <div className="w-full md:flex-[2] relative">
                <div className="hidden md:block absolute w-full h-full bg-teal-100 top-5 -left-5 -z-10" />
                <img
                  src={imgSrc}
                  alt={post.title}
                  className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full md:flex-[3] flex flex-col justify-center gap-3 md:gap-5">
                <Link to={`/post/${post._id}`} className="no-underline text-inherit">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                  {getText(post.desc)}
                </p>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <button className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-teal-600 text-teal-600 text-sm md:text-base cursor-pointer hover:bg-teal-50 hover:border-teal-700 transition-colors">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
