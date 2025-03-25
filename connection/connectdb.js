import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
