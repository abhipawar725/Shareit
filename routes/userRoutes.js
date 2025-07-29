import express from "express"
import { getSignup, getLogin, Login, Signup, getDashboard, uploadProfileImage, getFiles, Logout } from "../controllers/userController.js"
import verifyToken from "../middleware/verifyToken.js"
import upload from "../middleware/uploadProfile.js"


const userRoute = express.Router()

userRoute.get("/signup", getSignup)
userRoute.get("/login", getLogin)
userRoute.get("/logout", Logout)
userRoute.get("/dashboard",verifyToken, getDashboard)
userRoute.get("/files",verifyToken, getFiles)

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)

userRoute.post('/api/upload-profile', verifyToken, upload.single('profile'), uploadProfileImage)

export default userRoute