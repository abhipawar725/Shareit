import express from "express"
import {GetLogin, GetLogout, GetSignup} from "../controller/userController.js"

const userRoute = express.Router()

userRoute.get("/signup", GetSignup)
userRoute.get("/login", GetLogin)
userRoute.get("/logout", GetLogout)

export default userRoute