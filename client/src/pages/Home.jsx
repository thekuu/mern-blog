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
    return doc.body.textContent;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post) => (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group" key={post._id}>
            <div className="relative aspect-video overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={post.img ? `../upload/${post.img}` : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"} 
                alt={post.title} 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-teal text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.cat}
                </span>
              </div>
            </div>
            <div className="p-6">
              <Link className="link" to={`/post/${post._id}`}>
                <h1 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h1>
              </Link>
              <p className="text-slate-500 mb-4 line-clamp-3 leading-relaxed text-sm">
                {getText(post.desc)}
              </p>
              <Link to={`/post/${post._id}`} className="inline-flex items-center text-teal font-bold hover:text-teal-dark transition-colors">
                Read More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold text-gray-400">No posts found in this category.</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
