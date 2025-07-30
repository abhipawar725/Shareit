import express from "express"
import { createFile, deleteFileById, getFileById, readFiles } from "../controllers/fileController.js"
import upload from "../middleware/uploadFile.js"
import verifyToken from "../middleware/verifyToken.js"

const fileRoute = express.Router()

fileRoute.get('/api/files', readFiles)
fileRoute.get("/api/file/:id", getFileById)
fileRoute.post("/api/file", verifyToken, upload.single('file'), createFile)
fileRoute.delete("/api/file/:id", verifyToken, deleteFileById)

export default fileRoute