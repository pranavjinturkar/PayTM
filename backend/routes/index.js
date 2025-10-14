import express from "express";
import userRoutes from "./user.js";
import accountRoutes from "./account.js";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/account", accountRoutes);

export default router;
