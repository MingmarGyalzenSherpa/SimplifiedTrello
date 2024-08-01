import express from "express";
import {
  authentication,
  boardAuthorization,
} from "../middlewares/auth.middleware";
import {
  createList,
  deleteList,
  getBoardById,
  getBoardsByUser,
  getLabelsByBoard,
  getLists,
  getUsersByBoard,
  updateBoard,
  updateList,
} from "../controllers/board.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { updateBoardBodySchema } from "../schema/board.schema";
import {
  createListBodySchema,
  updateListBodySchema,
} from "../schema/list.schema";
import { Roles } from "../constants/Roles";

const router = express();

router.use(authentication);

//get boards by user
router.get(
  "/",
  boardAuthorization([Roles.ADMIN, Roles.MEMBER]),
  getBoardsByUser
);

//get board by id
router.get(
  "/:boardId",
  boardAuthorization([Roles.ADMIN, Roles.MEMBER]),
  getBoardById
);

//update board
router.put(
  "/:boardId",
  boardAuthorization([Roles.ADMIN]),
  validateReqBody(updateBoardBodySchema),
  updateBoard
);

//get users in a board
router.get("/:boardId/users", getUsersByBoard);

//get labels in a board
router.get("/:boardId/labels", getLabelsByBoard);

//add list in the board
router.post(
  "/:boardId/lists",
  validateReqBody(createListBodySchema),
  createList
);

//get lists in the board
router.get("/:boardId/lists", getLists);

//update list
router.put(
  "/:boardId/lists/:listId",
  validateReqBody(updateListBodySchema),
  updateList
);

//delete list
router.delete("/:boardId/lists/:listId", deleteList);

export default router;
