import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { validateReqQuery } from "../middlewares/validator.middleware";
import { getUserQuerySchema } from "../schema/user.schema";
import { searchUsers } from "../controllers/user.controller";

const router = express();

router.use(authentication);

router.get(
  "/",
  authentication,
  validateReqQuery(getUserQuerySchema),
  searchUsers
);

export default router;
