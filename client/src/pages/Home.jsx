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
    return text.length > 160 ? text.substring(0, 160).trimEnd() + "..." : text;
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

      {/* Mobile: single column alternating cards */}
      <div className="flex flex-col gap-10 lg:hidden">
        {posts.map((post) => {
          const imgSrc = post.img
            ? post.img.startsWith("http")
              ? post.img
              : `../upload/${post.img}`
            : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80";

          return (
            <div
              key={post._id}
              className="flex flex-col rounded-2xl overflow-hidden shadow-lg"
              style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.55)" }}
            >
              <img src={imgSrc} alt={post.title} className="w-full h-56 object-cover" />
              <div className="flex flex-col justify-center gap-3 p-6">
                <Link to={`/post/${post._id}`} className="no-underline text-inherit">
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug hover:text-teal-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-slate-600 leading-relaxed">{getText(post.desc)}</p>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <button
                      className="px-5 py-2 text-sm font-medium text-teal-700 rounded-xl border border-teal-600/40 transition-all hover:text-white hover:border-transparent"
                      style={{ background: "rgba(0,128,128,0.10)" }}
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

      {/* Desktop: 2-column card grid with more breathing room */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-10">
        {posts.map((post) => {
          const imgSrc = post.img
            ? post.img.startsWith("http")
              ? post.img
              : `../upload/${post.img}`
            : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80";

          return (
            <div
              key={post._id}
              className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              style={{ background: "rgba(255,255,255,0.30)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.50)" }}
            >
              {/* Image */}
              <div className="overflow-hidden h-56 xl:h-64">
                <img
                  src={imgSrc}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-7 xl:p-8 flex-1">
                <Link to={`/post/${post._id}`} className="no-underline text-inherit">
                  <h2 className="text-xl xl:text-2xl font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm xl:text-base text-slate-600 leading-relaxed flex-1">
                  {getText(post.desc)}
                </p>
                <div className="pt-1">
                  <Link to={`/post/${post._id}`}>
                    <button
                      className="px-5 py-2 text-sm font-medium text-teal-700 rounded-xl border border-teal-600/40 transition-all hover:text-white hover:border-transparent"
                      style={{ background: "rgba(0,128,128,0.10)" }}
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
