import mongoose from "mongoose";
import { dbConfig } from "../config/database";
export const connectDB = async () => {
  await mongoose.connect(dbConfig.url!);
  console.log("Database connected!");
};
