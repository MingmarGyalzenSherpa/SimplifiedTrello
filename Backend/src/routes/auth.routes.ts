import express from "express";
import { login, signup } from "../controllers/auth.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../schema/user.schema";

const router = express();

router.post("/signup", validateReqBody(createUserBodySchema), signup);
router.post("/login", validateReqBody(loginUserBodySchema), login);

export default router;
