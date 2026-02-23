import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!title || !value || !cat) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    let imgUrl = file ? await upload() : (state?.img || '');

    try {
      if (state?._id) {
        await axios.put(`/api/posts/${state._id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
        });
      } else {
        await axios.post(`/api/posts/`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data || "An error occurred while saving the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-[5] space-y-6">
          <input
            type="text"
            value={title}
            placeholder="Article Title"
            className="w-full text-4xl font-extrabold border-none outline-none placeholder-gray-300 focus:ring-0"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="h-[450px] overflow-hidden rounded-2xl border border-gray-200">
            <ReactQuill 
              className="h-full border-none" 
              theme="snow" 
              value={value} 
              onChange={setValue} 
              placeholder="Tell your story..."
            />
          </div>
        </div>

        <div className="flex-[2] space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h1 className="text-xl font-bold text-gray-900 border-b pb-4">Publish</h1>
            <div className="space-y-3 text-sm text-gray-600">
              <p><b>Status:</b> Draft</p>
              <p><b>Visibility:</b> Public</p>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label 
                className="inline-block cursor-pointer text-teal font-bold hover:underline" 
                htmlFor="file"
              >
                {file ? `Selected: ${file.name}` : "Upload Image"}
              </label>
            </div>
            
            {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg">{error}</p>}

            <div className="flex justify-between pt-4 border-t">
              <button className="text-teal font-bold px-4 py-2 rounded-lg border border-teal hover:bg-teal-light transition-colors">
                Save Draft
              </button>
              <button 
                onClick={handleClick} 
                disabled={isSubmitting}
                className="bg-teal text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">Category</h1>
            <div className="grid grid-cols-2 gap-4">
              {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={cat === category}
                    name="cat"
                    value={category}
                    id={category}
                    className="w-4 h-4 text-teal focus:ring-teal border-gray-300"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor={category} className="text-sm font-medium text-gray-700 capitalize cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

