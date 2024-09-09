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
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]); */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="single">
            <div className="content">
                {post?.img && <img src={`../upload/${post.img}`} alt="Post Image" />}
                <div className="user">
                    {post.uid?.img && <img src={post.uid.img} alt="User Avatar" />}
                    <div className="info">
                        <span>{post.uid?.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.uid?.username && (
                        <div className="edit">
                            <Link to="/write" state={post}>
                                <img src={Edit} alt="Edit" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="Delete" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
            </div>
            <div className="menu">
                <Menu cat={post.cat} />
            </div>
        </div>
    );
};

export default Single;
