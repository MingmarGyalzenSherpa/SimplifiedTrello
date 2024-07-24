import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { validateReqBody } from "../middlewares/validator.middleware";
import { updateCardBodySchema } from "../schema/card.schema";
import { updateCard } from "../controllers/list.controller";

const router = express();

router.put("/:cardId", validateReqBody(updateCardBodySchema), updateCard);

router.use(authentication);

export default router;
