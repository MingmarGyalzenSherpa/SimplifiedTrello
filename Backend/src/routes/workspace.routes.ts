import express from "express";
import {
  authentication,
  workspaceAuthorization,
} from "../middlewares/auth.middleware";
import {
  addUserToWorkspace,
  createBoard,
  createWorkspace,
  getBoardByWorkspaceId,
  getWorkspacesById,
  getWorkspacesByUser,
} from "../controllers/workspace.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import {
  addUserToWorkspaceBodySchema,
  createWorkspaceBodySchema,
} from "../schema/workspace.schema";
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
router.get(
  "/:workspaceId",
  workspaceAuthorization([Roles.ADMIN, Roles.MEMBER]),
  getWorkspacesById
);

//get boards by workspace id
router.get(
  "/:workspaceId/boards",
  workspaceAuthorization([Roles.ADMIN, Roles.MEMBER]),
  getBoardByWorkspaceId
);

//add user to workspace
router.post(
  "/:workspaceId/users",
  workspaceAuthorization([Roles.ADMIN]),
  validateReqBody(addUserToWorkspaceBodySchema),
  addUserToWorkspace
);

export default router;
