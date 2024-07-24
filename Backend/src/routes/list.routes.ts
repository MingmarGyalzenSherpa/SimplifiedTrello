import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { createCard, getCards } from "../controllers/list.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createCardBodySchema } from "../schema/card.schema";

const router = express();

router.use(authentication);

//create card in list
router.post(
  "/:listId/cards",
  validateReqBody(createCardBodySchema),
  createCard
);

//get cards in list
router.get("/:listId/cards", getCards);

export default router;
