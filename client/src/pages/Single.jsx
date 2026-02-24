import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContxt";

const Single = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-[5] space-y-8">
          {post?.img && (
            <img 
              className="w-full h-[400px] object-cover rounded-3xl shadow-lg" 
              src={`../upload/${post.img}`} 
              alt={post.title} 
            />
          )}
          
          <div className="flex items-center justify-between border-b pb-8">
            <div className="flex items-center gap-4">
              {post.uid?.img ? (
                <img className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-light" src={post.uid.img} alt="" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-teal-light flex items-center justify-center text-teal font-bold text-xl uppercase">
                  {post.uid?.username?.charAt(0)}
                </div>
              )}
              <div className="text-sm">
                <span className="block font-bold text-gray-900 text-base">{post.uid?.username}</span>
                <p className="text-gray-500 italic">Posted {moment(post.date).fromNow()}</p>
              </div>
            </div>

            {currentUser?.username === post.uid?.username && (
              <div className="flex gap-3">
                <Link to="/write" state={post} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <img className="w-6 h-6" src={Edit} alt="Edit" />
                </Link>
                <button onClick={handleDelete} className="p-2 hover:bg-red-50 rounded-full transition-colors">
                  <img className="w-6 h-6" src={Delete} alt="Delete" />
                </button>
              </div>
            )}
          </div>

          <div className="prose-content max-w-none">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-8">
              {post.title}
            </h1>
            <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
              {getText(post.desc)}
            </div>
          </div>
        </div>
        
        <div className="flex-[2]">
          <Menu cat={post.cat} />
        </div>
      </div>
    </div>
  );
};

export default Single;

