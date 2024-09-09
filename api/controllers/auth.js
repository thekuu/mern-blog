/* import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res)=>{
    //CHECK ExISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err, data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash the password and creat a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(username,email,password) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email, 
            hash,
        ]
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created!");

        })
    })

}
export const login = (req, res)=>{
    //CHECK USER

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Useer not found!")
     //CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    
    if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({id:data[0].id}, "jwtkey");
    const {password, ...other} = data[0]

    res.cookie("access_token", token, {httponly:true}).status(200).json(other)
    const postId = req.params.id
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
    })
}
export const logout = (req, res)=>{

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out!")
} */
    import User from '../models/user.model.js';
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";
    
    // Register User
    export const register = async (req, res) => {
        try {
            const existingUser = await User.findOne({ 
                $or: [{ email: req.body.email }, { username: req.body.username }] 
            });
            if (existingUser) return res.status(409).json("User already exists!");
    
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
    
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
    
            await newUser.save();
            res.status(200).json("User has been created!");
        } catch (err) {
            res.status(500).json(err);
        }
    };
    
    // Login User
    export const login = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json("User not found!");
    
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
    
            const token = jwt.sign({ id: user._id }, "jwtkey");
            const { password, ...other } = user._doc;
    
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    };
    
    // Logout User
    export const logout = (req, res) => {
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
        }).status(200).json("User has been logged out!");
    };
    