import express from "express"
import { CreateProfile, GetDashboard, profileUpload } from "../controller/userController.js"
import verifyToken from "../middelware/verifyToken.js"

const protectedRoute = express.Router()

protectedRoute.get("/dashboard", verifyToken, GetDashboard)
protectedRoute.post("/api/profile/create", verifyToken, profileUpload.single('picture'), CreateProfile)

export default protectedRoute