import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const saltRounds = 10;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = new User({
          username,
          email,
          password: hash,
        });
        await newUser.save();
        console.log(newUser);
        if (!newUser) {
          return res.status(400).json({ message: "User not created" });
        }
        res
          .status(201)
          .json({ message: "User created successfully", data: newUser });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          httpOnly: true, // For security, prevents client-side JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
          maxAge: 3600000, // Cookie expires in 1 hour
          samesite: "strict", // Ensures the cookie is only sent in cross-site requests
        });
        res.send({ message: "Login successful", data: user });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};
export const authcheck = async (req, res) => {
  try {
    console.log(req.user); // Log the user data (or adjust as needed)
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authentication:", error);
  }
};
