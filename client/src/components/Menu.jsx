import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (cat) fetchData();
  }, [cat]);

  if (loading) return null;

  return (
    <div className="space-y-8 sticky top-24">
      <h1 className="text-xl font-extrabold text-gray-900 border-b pb-4">Related Stories</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <div className="flex flex-col space-y-3 group" key={post._id}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={post.img ? (post.img.startsWith("http") ? post.img : `../upload/${post.img}`) : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"} 
                alt={post.title} 
              />
            </div>
            <Link to={`/post/${post._id}`}>
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-teal transition-colors">
                {post.title}
              </h2>
            </Link>
            <Link to={`/post/${post._id}`} className="text-sm font-bold text-teal uppercase tracking-widest hover:text-teal-dark transition-colors">
              Read Story
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
