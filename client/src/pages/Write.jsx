import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [cat, setCat] = useState(state?.cat || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [imgMode, setImgMode] = useState('url');
  const [imgUrl, setImgUrl] = useState(state?.img?.startsWith('http') ? state.img : '');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setFilePreview(URL.createObjectURL(selected));
  };

  const uploadToFirebase = () => {
    return new Promise((resolve, reject) => {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `blog-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!title || !value || !cat) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);

    let finalImg = '';

    try {
      if (imgMode === 'file' && file) {
        finalImg = await uploadToFirebase();
      } else if (imgMode === 'url' && imgUrl.trim()) {
        finalImg = imgUrl.trim();
      } else {
        finalImg = state?.img || '';
      }

      if (state?._id) {
        await axios.put(`/api/posts/${state._id}`, {
          title,
          desc: value,
          cat,
          img: finalImg,
        });
      } else {
        await axios.post(`/api/posts/`, {
          title,
          desc: value,
          cat,
          img: finalImg,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data || "An error occurred while saving the post.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const currentPreview = imgMode === 'file' ? filePreview : (imgUrl || null);

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

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Cover Image</h2>

            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              <button
                type="button"
                onClick={() => setImgMode('url')}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${imgMode === 'url' ? 'bg-teal text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setImgMode('file')}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${imgMode === 'file' ? 'bg-teal text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                Upload
              </button>
            </div>

            {imgMode === 'url' ? (
              <div>
                <input
                  type="text"
                  placeholder="Paste image URL here..."
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal transition-colors"
                >
                  {file ? (
                    <span className="text-sm text-teal font-semibold px-2 text-center">{file.name}</span>
                  ) : (
                    <>
                      <span className="text-3xl text-gray-300">↑</span>
                      <span className="text-sm text-gray-400 mt-1">Click to choose a file</span>
                    </>
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {currentPreview && (
              <div className="rounded-lg overflow-hidden border border-gray-100">
                <img
                  src={currentPreview}
                  alt="Preview"
                  className="w-full h-36 object-cover"
                />
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-teal h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}%</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Publish</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><b>Status:</b> Draft</p>
              <p><b>Visibility:</b> Public</p>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <div className="flex justify-between pt-4 border-t">
              <button className="text-teal font-bold px-4 py-2 rounded-lg border border-teal hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button
                onClick={handleClick}
                disabled={isSubmitting}
                className="bg-teal text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (file && uploadProgress < 100 ? `Uploading ${uploadProgress}%` : "Publishing...") : "Publish"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">Category</h2>
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
