import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { getBoardsByUser } from "../controllers/board.controller";

const router = express();

router.use(authentication);

router.get("/", getBoardsByUser);

export default router;
