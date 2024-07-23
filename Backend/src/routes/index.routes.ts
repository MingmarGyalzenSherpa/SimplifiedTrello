import express from "express";

import authRouter from "./auth.routes";
import boardRouter from "./board.routes";
import userRouter from "./user.routes";
import workspaceRouter from "./workspace.routes";

const router = express();

//auth routes
router.use("/auth", authRouter);

//user routes
router.use("/users", userRouter);

//workspace routes
router.use("/workspaces", workspaceRouter);

//board routes
router.use("/boards", boardRouter);
export default router;
