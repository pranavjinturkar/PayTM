import express from "express";
import { signUpSchema, signinSchema, updateUserSchema } from "../types.js";
import { User, Accounts } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware.js";

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

    await Accounts.insertOne({
      userId: newUser._id,
      balance: (1 + Math.random() * 10000).toFixed(2) * 100,
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
  if (!success)
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

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Incorrect Inputs and Password should be min 8 letters",
      success: false,
    });

  // const { firstName, lastName, password } = req.body;
  const userId = req.userId;

  // No need of this much as req.body is already being verified
  // const updateUserFields = {};
  // if (typeof firstName === "string" && firstName.length > 0)
  //   updateUserFields.firstName = firstName;
  // if (typeof lastName === "string" && lastName.length > 0)
  //   updateUserFields.lastName = lastName;
  // if (typeof password === "string" && password.length > 0) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   updateUserFields.password = hashedPassword;
  // }
  try {
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $set: req.body }
    );

    if (!updatedUser)
      return res.status(411).json({
        message: "Error Updating User",
        success: false,
      });

    res.status(200).json({
      message: "Updated successfully",
      success: true,
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

router.get("/bulk", async (req, res) => {
  const { filter } = req.query;

  try {
    const usersData =
      typeof filter === "string" && filter.length > 0
        ? await User.find(
            {
              $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
              ],
            },
            {
              firstName: 1,
              lastName: 1,
              _id: 1,
            }
          )
        : await User.find({}, { firstName: 1, lastName: 1, _id: 1 });

    res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      users: usersData,
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
