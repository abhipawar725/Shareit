import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should be at least 8 characters, one upper, one lower, one number and one special",
      ],
    },
    profile: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
   if(!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10) 
  next() 
})

const User = model("User", userSchema);

export default User;
