import express from "express";
import { login, refresh, signup } from "../controllers/auth.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../schema/user.schema";

const router = express();

router.post("/signup", validateReqBody(createUserBodySchema), signup);
router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh", refresh);

export default router;
