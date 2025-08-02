import mongoose from "mongoose";
import Files from "../models/fileModel.js";
import nodemailer from "nodemailer"


export const readFiles = async (req, res) => {
  try {
    const files = await Files.find();
    if (files.length <= 0)
      return res.status(404).json({ message: "No files found" });

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "invalid file id" });

    const file = await Files.findById(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.status(200).json({ file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFile = async (req, res) => {
  try {
    const path = req.file.path.replace(/\\/g, '/')
    const { id } = res.locals.user;

    if (!id) return res.status(401).json({ message: "Invalid user" });

        if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, size, mimetype } = req.file;

    const file = await Files.create({
      user: id,
      file: originalname,
      type: mimetype,
      size,
      path
    });

    res.status(200).json({ message: "file uploaded successfully", file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "invalid file id" });

    const file = await Files.findByIdAndDelete(id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.status(200).json({ message: "file deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const {path} = req.body
    res.download(path, (err) => {
      if(err) return res.status(404).json({message: "file not found"})
    }) 
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const shareFile = async (req, res) => {
  try {
    console.log(req.body);
 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        password: process.env.SMTP_PASSWORD 
      }
    })

    await transporter.sendMail({
      from: process.env.sendMail,
      to: 'abhishek.p.tradologie@gmail.com',
      subject: 'testing',
      text: 'hello i am abhi'
    })    

    res.status(200).json({message: "mail send"})

  } catch (error) {
    
  }
}