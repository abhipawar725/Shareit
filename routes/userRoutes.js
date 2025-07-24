import express from "express"
import { getSignup, getLogin, Login, Signup } from "../controllers/userController.js"

const userRoute = express.Router()

userRoute.get("/signup", getSignup)
userRoute.get("/login", getLogin)

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)

export default userRoute