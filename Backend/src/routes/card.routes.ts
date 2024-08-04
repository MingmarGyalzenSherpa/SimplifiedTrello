import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { validateReqBody } from "../middlewares/validator.middleware";
import { updateCardBodySchema } from "../schema/card.schema";
import { updateCard } from "../controllers/list.controller";
import { addUserToCard, getCardsOfUser } from "../controllers/card.controller";

const router = express();
router.use(authentication);

//update a card
router.put("/:cardId", validateReqBody(updateCardBodySchema), updateCard);

//get cards of a user
router.get("/", getCardsOfUser);

//add user to a card
router.post("/:cardId/users", addUserToCard);
export default router;
