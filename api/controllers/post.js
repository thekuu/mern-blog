import { db } from "../db.js";
import { posts, users } from "../schema.js";
import { eq, desc, and } from "drizzle-orm";
import jwt from "jsonwebtoken";

const shapePost = (row) => ({
  _id: row.id,
  id: row.id,
  title: row.title,
  desc: row.desc,
  img: row.img,
  cat: row.cat,
  uid: row.uid,
  date: row.createdAt,
  createdAt: row.createdAt,
});

export const getPosts = async (req, res) => {
  try {
    const rows = req.query.cat
      ? await db
          .select()
          .from(posts)
          .where(eq(posts.cat, req.query.cat))
          .orderBy(desc(posts.createdAt))
      : await db.select().from(posts).orderBy(desc(posts.createdAt));

    res.status(200).json(rows.map(shapePost));
  } catch (err) {
    console.error("getPosts error:", err);
    res.status(500).json(err.message || "Server error");
  }
};

export const getPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json("Invalid post id");

    const rows = await db
      .select({
        id: posts.id,
        title: posts.title,
        desc: posts.desc,
        img: posts.img,
        cat: posts.cat,
        createdAt: posts.createdAt,
        userId: users.id,
        username: users.username,
        userImg: users.img,
      })
      .from(posts)
      .leftJoin(users, eq(posts.uid, users.id))
      .where(eq(posts.id, id))
      .limit(1);

    if (!rows.length) return res.status(404).json("Post not found");

    const r = rows[0];
    res.status(200).json({
      _id: r.id,
      id: r.id,
      title: r.title,
      desc: r.desc,
      img: r.img,
      cat: r.cat,
      date: r.createdAt,
      createdAt: r.createdAt,
      uid: {
        _id: r.userId,
        id: r.userId,
        username: r.username,
        img: r.userImg,
      },
    });
  } catch (err) {
    console.error("getPost error:", err);
    res.status(500).json(err.message || "Server error");
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    try {
      await db.insert(posts).values({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        cat: req.body.cat,
        uid: userInfo.id,
      });
      res.status(200).json("Post has been created.");
    } catch (e) {
      console.error("addPost error:", e);
      res.status(500).json({ error: "Failed to create post", details: e.message });
    }
  });
};

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json("Invalid post id");

      const result = await db
        .delete(posts)
        .where(and(eq(posts.id, id), eq(posts.uid, userInfo.id)))
        .returning();

      if (!result.length) return res.status(403).json("You can delete only your post!");
      res.status(200).json("Post has been deleted!");
    } catch (e) {
      console.error("deletePost error:", e);
      res.status(500).json(e.message || "Server error");
    }
  });
};

export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token has expired or is invalid!");
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) return res.status(400).json("Invalid post id");

      const updated = await db
        .update(posts)
        .set({
          title: req.body.title,
          desc: req.body.desc,
          img: req.body.img,
          cat: req.body.cat,
        })
        .where(and(eq(posts.id, id), eq(posts.uid, userInfo.id)))
        .returning();

      if (!updated.length) return res.status(403).json("You can update only your post!");
      res.status(200).json({ message: "Post has been updated.", updatedPost: shapePost(updated[0]) });
    } catch (e) {
      console.error("updatePost error:", e);
      res.status(500).json({ error: "Server error", details: e.message });
    }
  });
};
