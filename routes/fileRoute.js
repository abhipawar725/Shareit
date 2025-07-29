import express from "express"
import { createFile, deleteFileById, getFileById, getFiles, updateFileById } from "../controllers/fileController.js"
import upload from "../middleware/uploadFile.js"
import verifyToken from "../middleware/verifyToken.js"

const fileRoute = express.Router()

fileRoute.get('/files', getFiles)
fileRoute.get("/file/:id", getFileById)
fileRoute.post("/api/create/file", verifyToken, upload.single('file'), createFile)
fileRoute.put("/api/update/file/:id", updateFileById)
fileRoute.delete("/api/delete/file/:id", deleteFileById)

export default fileRoute