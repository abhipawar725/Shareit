import mongoose from "mongoose";

const connectDB = async () => {
  const db = process.env.DB_URL;
  try {
    await mongoose.connect(db);
    console.log("database is connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
