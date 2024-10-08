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
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError(
            title.trim() === ''
                ? 'Title is required.'
                : value.trim() === ''
                    ? 'Description is required.'
                    : !file && !state?.img
                        ? 'Image file is required.'
                        : cat === ''
                            ? 'Category is required.'
                            : ''
        );
        if (title.trim() === '' || value.trim() === '' || (!file && !state?.img) || cat === '') return;
        if (isSubmitting) return;
        setIsSubmitting(true);

        let imgUrl = file ? await upload() : (state?.img || '');

        try {
            if (state?._id) {
                // Update post
                await axios.put(`/posts/${state._id}`, {
                    title,
                    desc: value,
                    cat,
                    img: imgUrl,
                });
            } else {
                // Create new post
                await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: imgUrl,
                    date: moment(Date.now()).format("YYYY-MM-DD HH-mm-ss"),
                });
            }

            navigate('/');
        } catch (err) {
            console.log(err);
            console.log("Response:", err.response);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{ display: 'none' }} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])} />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick} disabled={isSubmitting}>{isSubmitting ? 'Publishing...' : 'Publish'}</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "art"} name="cat" value="art" id='art' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "science"} name="cat" value="science" id='science' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "technology"} name="cat" value="technology" id='technology' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id='cinema' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "design"} name="cat" value="design" id='design' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "food"} name="cat" value="food" id='food' onChange={e => setCat(e.target.value)} />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
