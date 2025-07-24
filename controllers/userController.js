import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getSignup = (req, res) => {
  res.render('signup')
};

export const getLogin = (req, res) => {
  res.send("login page");
};

export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res.status(401).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User Already exits" });

    const user = await User.create({ fullname, email, password });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const {password, email} = req.body
    if(!email || !password) return res.status(400).json({message: "All fields are required"})

    const user = await User.findOne({email})    
    if(!user) return res.status(404).json({message: "User not found"}) 

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(409).json({message: "Incorrect Credentials"}) 
        
    res.status(200).json({message: "Login Successfully"})    

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};
