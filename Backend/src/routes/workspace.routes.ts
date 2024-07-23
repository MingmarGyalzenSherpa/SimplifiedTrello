import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { createWorkspace } from "../controllers/workspace.controller";

const router = express();

router.use(authentication);

router.post("/", createWorkspace);

export default router;
