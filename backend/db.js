import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "PayTM",
  })
  .then(() => console.log("MongoDB connected!"));

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);
