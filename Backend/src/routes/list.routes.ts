import express from "express";
import { authentication } from "../middlewares/auth.middleware";

const router = express();

router.use(authentication);

//create card in list
router.post("/:listId/cards")

export default router;
