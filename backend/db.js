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

const accountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Accounts = mongoose.model("Account", accountsSchema);
