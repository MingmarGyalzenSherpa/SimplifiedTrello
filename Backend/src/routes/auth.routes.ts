import express from "express";
import { login, refresh, signup, getMe } from "../controllers/auth.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../schema/user.schema";
import { authentication } from "../middlewares/auth.middleware";

const router = express();

router.post("/signup", validateReqBody(createUserBodySchema), signup);
router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh", refresh);
router.get("/me", authentication, getMe);
export default router;
