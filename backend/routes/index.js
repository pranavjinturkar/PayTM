import express from "express";
import userRoutes from "./user.js";
import accoutRoutes from "./account.js";

const router = express.Router();

router.use("/user", userRoutes);

router.use("/account", accoutRoutes);

export default router;
