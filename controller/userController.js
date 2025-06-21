import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const GetSignup = (req, res) => {
  res.render("signup");
};

export const GetLogin = (req, res) => {
  res.render("login");
};

export const GetDashboard = (req, res) => {
  res.render("dashboard");
};

export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res.status(401).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User successfully created",
      redirect: "login",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email || !password))
      return res.status(401).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      picture: user.picture,
    };

    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successfully",
      redirect: "dashboard",
      user: payload,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetLogout = (req, res) => {
   res.clearCookie("token")
}
