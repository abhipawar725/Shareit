import express from "express"
import { getSignup, getLogin, Login, Signup, getDashboard } from "../controllers/userController.js"
import verifyToken from "../middleware/verifyToken.js"


const userRoute = express.Router()

userRoute.get("/signup", getSignup)
userRoute.get("/login", getLogin)
userRoute.get("/dashboard",verifyToken, getDashboard)

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)

export default userRoute