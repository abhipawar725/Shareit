import mongoose, { Schema, Types, model } from "mongoose";
import User from "./userModel";

const fileSchema = new Schema({
   user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
   },
   filename: {
    type: String,
    required: true,
    trim: true
   },
   type:{
    type: String,
    lowercase: true,
    trim: true,
    required: true
   },
   size: {
    type: Number,
    trim: true,
    required: true
   },
   path: {
    type: String,
    trim: true,
    required: true
   }

}, {timestamps: true})

const File = model("File", fileSchema)

export default File