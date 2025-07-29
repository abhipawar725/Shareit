import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import fs from "fs"

export const getSignup = (req, res) => {
  res.render('auth/signup', {
    layout: 'layouts/auth'
  })
};

export const getLogin = (req, res) => {
  res.render('auth/login',{
    layout: 'layouts/auth'
  })
};

export const getDashboard = (req, res) => {
  res.render('dashboard/index', {
    layout: 'layouts/main'
  })
}

export const getFiles = (req, res) => {
  res.render('files/index', {
    layout: 'layouts/main'
  })
}

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
      redirect: 'login'
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

    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email
    }  

    const token = jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn: '1d'})
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({message: "Login Successfully", redirect: 'dashboard'})    

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie('token')
    res.redirect('login')
  } catch (error) {
    console.log(error.message)
  }
}

export const uploadProfileImage = async (req, res) => {
     try {
      const path = req.file.path.replace(/\\/g, '/')          
      const {id} = res.locals.user
      if(!id) return res.status(404).json({message: "Invalid user id"})
       const user = await User.findById(id)
       if(!user) return res.status(401).json({message: "Invalid user"})
       if(user.profile && fs.existsSync(user.profile)){
        fs.unlink(user.profile, (err) => {
          if(err) console.error("error file deleted", err)
        })
       }  
          
      const updatedUser =  await User.findByIdAndUpdate(id, { profile: path }, { new: true });
       const profile = updatedUser.profile     

       res.status(200).json({message: "Profile updated successfully", profile}) 
     } catch (error) {
        res.status(500).json({message: error.message})         
     }
}

