import express from "express";

import authRouter from "./auth.routes";
const router = express();

//auth routes
router.use("/auth", authRouter);
export default router;
