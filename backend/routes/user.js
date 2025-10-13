import express from "express";
import { signUpSchema, signinSchema } from "../types.js";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ quiet: true });

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const parsedPayload = signUpSchema.safeParse({
    username,
    firstName,
    lastName,
    password,
  });

  if (!parsedPayload.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      error: parsedPayload.error.issues[0].message,
      success: false,
    });
  }

  try {
    const checkUser = await User.findOne({ username });
    if (checkUser)
      return res.status(411).json({
        message: "User with this email Id Already Exists",
        isAlreadyUser: true,
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.insertOne({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "168h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (success)
    return res.status(411).json({
      message: "Incorrect Inputs",
      success: false,
    });

  try {
    const loginUser = await User.findOne({
      username,
    });

    if (!loginUser)
      return res.status(411).json({
        message: "Incorrect Credentials",
        success: false,
      });

    // Bcrypt: bcrypt.compare(password, hashedDBpass, callBack) => asynchronous Fn
    // compareSync(pass, hashedDBpass) : boolean => synchronous

    const matchedPass = bcrypt.compareSync(password, loginUser.password);
    if (!matchedPass) {
      return res.status(400).json({
        message: "Incorrect Credentials",
        success: false,
      });
    }
    const token = jwt.sign({ userId: loginUser._id }, process.env.JWT_SECRET, {
      expiresIn: "168h",
    });

    res.status(200).json({
      message: "Logged In Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

export default router;
