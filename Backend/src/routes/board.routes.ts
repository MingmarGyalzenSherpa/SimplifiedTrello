import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import {
  getBoardsByUser,
  getUsersByBoard,
} from "../controllers/board.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createBoardBodySchema } from "../schema/board.schema";

const router = express();

router.use(authentication);

//get boards by user

router.get("/", getBoardsByUser);

//get users in a board
router.get("/:id/users/", getUsersByBoard);

export default router;
