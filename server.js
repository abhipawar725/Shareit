import dotenv from "dotenv"
import express from "express"
import dbConnect from "./config/dbConnect.js"
import userRoute from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import expressLayouts from "express-layouts"

dotenv.config()
const app = express()

//Middlewares
app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", 'ejs')
app.set("layout", 'layout')
app.use(cookieParser())

// Routes
app.use("/", userRoute)

dbConnect()
const PORT = process.env.PORT
app.listen(PORT, () => {console.log("app is connected", PORT)})