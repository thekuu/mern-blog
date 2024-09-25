import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://mern-blog-ypb8.onrender.com/api/posts${cat}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {posts.map(post => (
                    <div className="post" key={post._id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="Post" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`https://mern-blog-ypb8.onrender.com/api/post/${post._id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <button>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;