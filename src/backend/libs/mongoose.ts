import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("MONGODB_URL is not defined");

  if (!isConnected) {
    return console.log("=> database connection error");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "portfolio",
    });

    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed!", error);
  }
};
