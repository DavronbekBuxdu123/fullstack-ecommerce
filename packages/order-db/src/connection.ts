import mongoose from "mongoose";
let isConnected = false;
export const connectOrdersDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined!");
  }
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    isConnected = true;
    console.log("Connected MONGO_DB");
  } catch (error) {
    throw error;
  }
};
