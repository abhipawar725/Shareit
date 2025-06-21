import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/connectDB.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js"
import protectedRoute from "./routes/protectedRoute.js"
import path, { join } from "path"

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "views"))
app.set("upload", express.static("/upload"))

app.use("/", userRoute)
app.use("/", protectedRoute)

connectDB()
.then(() => {
    app.listen(PORT, () => console.log("app is conncted", PORT))
})
.catch((err) => {
  console.log("database connection failed");
  process.exit(1)
})