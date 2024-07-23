import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { createBoard, getBoardsByUser } from "../controllers/board.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createBoardBodySchema } from "../schema/board.schema";

const router = express();

router.use(authentication);

//create board
router.post("/:id", validateReqBody(createBoardBodySchema), createBoard);

//get boards by user

router.get("/", getBoardsByUser);

export default router;
