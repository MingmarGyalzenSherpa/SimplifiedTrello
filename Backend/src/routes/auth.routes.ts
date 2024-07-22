import express from "express";
import { signup } from "../controllers/auth.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createUserBodySchema } from "../schema/user.schema";

const router = express();

router.post("/signup", validateReqBody(createUserBodySchema), signup);

export default router;
