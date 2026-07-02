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
              className={`flex items-stretch gap-0 flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""} rounded-2xl overflow-hidden shadow-lg`}
              style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.55)" }}
            >
              {/* Image */}
              <div className="w-full md:flex-[2]">
                <img
                  src={imgSrc}
                  alt={post.title}
                  className="w-full h-56 sm:h-64 md:h-full object-cover"
                  style={{ minHeight: "260px" }}
                />
              </div>

              {/* Glass content panel */}
              <div className="w-full md:flex-[3] flex flex-col justify-center gap-4 p-6 md:p-10">
                <Link to={`/post/${post._id}`} className="no-underline text-inherit">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight hover:text-teal-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {getText(post.desc)}
                </p>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <button
                      className="px-5 py-2.5 text-sm font-medium text-teal-700 rounded-xl border border-teal-600/40 transition-all hover:text-white hover:border-transparent hover:shadow-md"
                      style={{ background: "rgba(0,128,128,0.10)", backdropFilter: "blur(8px)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#008080"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,128,128,0.10)"; }}
                    >
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
