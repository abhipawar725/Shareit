import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
   fullname: {
    type: String,
    required: [true, "Fullname is required"],
    trim: true
   },
   email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is not valid']
   },
   password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/, 'Password is not valid']
   },
   picture: {
    type: String,
    trim: true
   }
},{timestamps: true})

  userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
   next()  
})

userSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = model("User", userSchema)

export default User