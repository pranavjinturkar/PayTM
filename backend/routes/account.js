import express from "express";
import { Accounts } from "../db.js";
import { authMiddleware } from "../middleware.js";
import { sendTransactionSchema } from "../types.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const result = await Accounts.findOne({ userId: userId }, { balance: 1 });

    res.status(200).json({
      message: "Account Balance Fetched Successfully",
      success: true,
      balance: parseFloat((result.balance / 100).toFixed(2)),
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

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  const { success } = sendTransactionSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({
      message: "Invalid amount",
      success: false,
    });

  session.startTransaction();

  const from = req.userId;

  const { amount, to } = req.body;
  const finalCurrency = parseInt((amount * 100).toFixed(0));

  try {
    const checkToUser = await Accounts.findOne({ userId: to }).session(session);
    if (!checkToUser)
      return res.status(400).json({
        message: "Invalid Account",
        success: false,
      });

    const checkBalance = await Accounts.findOne({ userId: from }).session(
      session
    );
    if (!checkBalance || checkBalance.balance < finalCurrency) {
      return res.status(400).json({
        message: "Insufficient balance",
        success: false,
      });
    }
    await Accounts.updateOne(
      { userId: from },
      { $inc: { balance: -finalCurrency } }
    ).session(session);

    await Accounts.updateOne(
      { userId: to },
      {
        $inc: { balance: finalCurrency },
      }
    ).session(session);

    await session.commitTransaction();
    res.status(200).json({
      message: "Transfer successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  } finally {
    session.endSession();
  }
});

export default router;
