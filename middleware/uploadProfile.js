import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs"

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
      const uploadPath = "uploads/profile";
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath)
    },
    filename : (req, file, cb) => {
      const ext = path.extname(file.originalname); // get .jpg, .png etc.
      const uniqueName = `${uuidv4()}${ext}`;
      cb(null, uniqueName);
    }
})

const fileFilter = (req, file, cb) => {
 const fileType = file.mimetype.startsWith('image/')
 if(fileType){
  cb(null, true)
 }else{
  cb(new Error("only images file allowed png, jpg, webp"), false)
 }
}

const upload = multer(
  {
    storage,
    fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 3
    }
  }
  )

export default upload