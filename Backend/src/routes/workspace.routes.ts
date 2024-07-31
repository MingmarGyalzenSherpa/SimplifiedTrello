import express from "express";
import {
  authentication,
  workspaceAuthorization,
} from "../middlewares/auth.middleware";
import {
  createBoard,
  createWorkspace,
  getBoardByWorkspaceId,
  getWorkspacesById,
  getWorkspacesByUser,
} from "../controllers/workspace.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createWorkspaceBodySchema } from "../schema/workspace.schema";
import { createBoardBodySchema } from "../schema/board.schema";
import { Roles } from "../constants/Roles";

const router = express();

router.use(authentication);

//create a workspace
router.post("/", validateReqBody(createWorkspaceBodySchema), createWorkspace);

//create a board
router.post(
  "/:workspaceId/boards",
  workspaceAuthorization([Roles.ADMIN]),
  validateReqBody(createBoardBodySchema),
  createBoard
);

//get all workspaces for a user
router.get("/", getWorkspacesByUser);

//get workspace by id
router.get("/:workspaceId", getWorkspacesById);

//get boards by workspace id
router.get("/:workspaceId/boards", getBoardByWorkspaceId);

export default router;
