/* import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const getPosts = (req, res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" 
    : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err, data) => {
        if(err) return res.status(500).send(err)
        return res.status(200).json(data)
    })
}


export const getPost = (req, res)=>{
    const q = "SELECT p.id, `username`, `title`,`desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data)=>{
        if(err) return res.status(500).send(err)
        return res.status(200).json(data[0])
})
};


export const addPost = (req, res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")
    Jwt.verify(token, "jwtkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");
        const q ="INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).send(err)
            return res.json("Post has been creted.")
        })
    });
}


export const deletePost = (req, res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")
    Jwt.verify(token, "jwtkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!")
        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?"
        db.query(q, [postId, userInfo.id], (err, data)=> {
            if(err) return res.status(403).json("You can delete only your post!")
            return res.json("Post has been deleted!")
        })
    })
}


export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const postId = req.params.id;
        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`= ? AND `uid` = ?";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            postId,
            userInfo.id
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).send(err);
            if (data.affectedRows === 0) return res.status(403).json("You can update only your post!");
            return res.json("Post has been updated.");
        });
    });
}; */
import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";

// Get All Posts
export const getPosts = async (req, res) => {
    try {
        const posts = req.query.cat 
            ? await Post.find({ cat: req.query.cat })
            : await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Single Post
export const getPost = async (req, res) => {
    try {
        // Find a post by its _id
        const post = await Post.findById(req.params.id).populate('uid', 'username img');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};


// Add New Post
export const addPost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const newPost = new Post({
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            cat: req.body.cat,
            uid: userInfo.id
        });

        try {
            await newPost.save();
            res.status(200).json("Post has been created.");
        } catch (err) {
            res.status(500).json(err);
        }
    });
};

// Delete Post
export const deletePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        try {
            const post = await Post.findById(req.params.id);
            if (!post || post.uid.toString() !== userInfo.id) {
                return res.status(403).json("You can delete only your post!");
            }

            await post.deleteOne();
            res.status(200).json("Post has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    });
};

// Update Post
export const updatePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token has expired or is invalid!");

        try {
            const post = await Post.findById(req.params.id);
            if (!post || post.uid.toString() !== userInfo.id) {
                return res.status(403).json("You can update only your post!");
            }

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title,
                    desc: req.body.desc,
                    img: req.body.img,
                    cat: req.body.cat
                }
            }, { new: true }); // Return the updated post

            if (!updatedPost) {
                return res.status(404).json("Post not found!");
            }

            res.status(200).json({ message: "Post has been updated.", updatedPost });
        } catch (err) {
            console.log("Error updating post:", err); // Log the error
            res.status(500).json({ error: "Server error", details: err.message });
        }
    });
};
