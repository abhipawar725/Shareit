import dotenv from "dotenv"
import express from "express"
import dbConnect from "./config/dbConnect.js"
import userRoute from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", 'ejs')
app.use(cookieParser())

app.use("/", userRoute)

dbConnect()
const PORT = process.env.PORT
app.listen(PORT, () => {console.log("app is connected", PORT)})