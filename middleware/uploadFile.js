import multer from "multer";
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "uploads/files"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const uniqueName = `${uuidv4()}${ext}`
        cb(null, uniqueName)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})

export default upload