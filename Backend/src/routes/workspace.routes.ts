import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import {
  createBoard,
  createWorkspace,
  getWorkspacesByUser,
} from "../controllers/workspace.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createWorkspaceBodySchema } from "../schema/workspace.schema";
import { createBoardBodySchema } from "../schema/board.schema";

const router = express();

router.use(authentication);

router.post("/", validateReqBody(createWorkspaceBodySchema), createWorkspace);

router.post("/:id/boards", validateReqBody(createBoardBodySchema), createBoard);

router.get("/", getWorkspacesByUser);

export default router;
