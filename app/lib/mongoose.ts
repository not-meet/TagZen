import mongoose from "mongoose";

let isConnected = false; // variable to track the connection status!

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('> mogodb url is not defined');

  if (isConnected) return console.log("> using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('> Mongodb connnected');
  } catch (e) {
    console.log(e);
  }
}
