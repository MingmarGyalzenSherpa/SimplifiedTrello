import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import {
  createList,
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

const router = express();

router.use(authentication);

//get boards by user
router.get("/", getBoardsByUser);

//update board
router.put("/:boardId", validateReqBody(updateBoardBodySchema), updateBoard);

//get users in a board
router.get("/:boardId/users/", getUsersByBoard);

//get labels in a board
router.get("/:boardId/labels/", getLabelsByBoard);

//add list in the board
router.post(
  "/:boardId/lists/",
  validateReqBody(createListBodySchema),
  createList
);

//get lists in the board
router.get("/:boardId/lists/", getLists);

//update list
router.put(
  "/:boardId/lists/:listId",
  validateReqBody(updateListBodySchema),
  updateList
);

export default router;
