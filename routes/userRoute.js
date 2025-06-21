import express from "express"
import {GetLogin, GetLogout, GetSignup, Login, Signup} from "../controller/userController.js"

const userRoute = express.Router()

userRoute.get("/signup", GetSignup)
userRoute.get("/login", GetLogin)
userRoute.get("/logout", GetLogout)

userRoute.post("/api/signup", Signup)
userRoute.post("/api/login", Login)

export default userRoute