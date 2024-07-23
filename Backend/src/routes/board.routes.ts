import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { getBoards } from "../controllers/board.controller";

const router = express();

router.use(authentication);

router.get("/", getBoards);

export default router;
