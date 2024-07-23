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

//create a workspace
router.post("/", validateReqBody(createWorkspaceBodySchema), createWorkspace);

//create a board
router.post("/:id/boards", validateReqBody(createBoardBodySchema), createBoard);

//get all workspaces for a user
router.get("/", getWorkspacesByUser);

export default router;
