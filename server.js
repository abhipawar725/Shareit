import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/connectDB.js"

dotenv.config()

const app = express()
connectDB()

app.listen(process.env.PORT, () => console.log("app is conncted"))