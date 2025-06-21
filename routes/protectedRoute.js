import express from "express"
import { GetDashboard } from "../controller/userController.js"

const protectedRoute = express.Router()

protectedRoute.get("/dashboard", GetDashboard)

export default protectedRoute