import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import {
  getBoardsByUser,
  getUsersByBoard,
  updateBoard,
} from "../controllers/board.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { updateBoardBodySchema } from "../schema/board.schema";

const router = express();

router.use(authentication);

//get boards by user
router.get("/", getBoardsByUser);

//update board
router.put("/:id", validateReqBody(updateBoardBodySchema), updateBoard);

//get users in a board
router.get("/:id/users/", getUsersByBoard);

export default router;
