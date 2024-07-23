import express from "express";
import { authentication } from "../middlewares/auth.middleware";

const router = express();

router.use(authentication);

export default router;
