import mongoose from "mongoose";

const dbConnect = () => {
  const db = process.env.DB_URL
  try {
    mongoose.connect(db)
    console.log("database is connected");
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default dbConnect