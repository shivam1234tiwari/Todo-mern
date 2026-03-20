import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(403).json({
        message: "All fields are required",
        success: false,
      });
    }
    // FFind the user based on email
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(403).json({
        message: "Already Email registered",
        success: false,
      });
    }
    // create a new user and hash the password using bcrypt
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Signup successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Not user Found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Password not matched",
        success: false,
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 100,
      })
      .json({
        message: "Login Success",
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {}
};
