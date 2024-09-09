import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({cat}) => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`/posts/?cat=${cat}`)
                setPosts(res.data)
            } catch(err){
                console.log(err)
        }
    }
    fetchData();
},[cat])
    // const posts = [
    //     {
    //         id: 1,
    //         title: "theku",
    //         desc: "hsdgvgvsdhvb",
    //         img: "https://..." 
    //     },
    //     {
    //         id: 2,
    //         title: "theku",
    //         desc: "hsdgvgvsdhvb",
    //         img: "https://..."   
    //     },
    //     {
    //         id: 3,
    //         title: "thekuuu",
    //         desc: "hsdgvgvsdhhjdkfdljjjvb",
    //         img: "https://..."
    //     },
    //     {
    //         id: 4,
    //         title: "theku",
    //         desc: "hsdgvgvsdhvb",
    //         img: "https://..."
    //     }
    // ]
    return(
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map(post=>(
                <div className="post" key={post.id}>
                    <img src={`../upload/${post?.img}`} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))}
        </div>
    )
}
export default Menu