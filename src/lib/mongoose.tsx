"use server";
import mongoose from "mongoose";
// signleton connection
let isConnected: boolean = false;
export const connectionToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  if (isConnected) {
    console.log("MONGODB is arleady connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "elearning",
    });
    isConnected = true;
    console.log("Using new database connection");
  } catch (error) {
    console.log("Error while connecting to database");
  }
};
