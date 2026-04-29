import { db } from "../db.js";
import { users } from "../schema.js";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const existing = await db
      .select()
      .from(users)
      .where(or(eq(users.email, req.body.email), eq(users.username, req.body.username)))
      .limit(1);

    if (existing.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await db.insert(users).values({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    res.status(200).json("User has been created!");
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json(err.message || "Server error");
  }
};

export const login = async (req, res) => {
  try {
    const found = await db
      .select()
      .from(users)
      .where(eq(users.username, req.body.username))
      .limit(1);

    if (!found.length) return res.status(404).json("User not found!");

    const user = found[0];
    const ok = bcrypt.compareSync(req.body.password, user.password);
    if (!ok) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: user.id }, "jwtkey");
    const { password, ...other } = user;
    other._id = user.id;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(other);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json(err.message || "Server error");
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json("User has been logged out!");
};
