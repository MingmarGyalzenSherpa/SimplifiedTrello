import express from "express";
import { authentication } from "../middlewares/auth.middleware";
import { createWorkspace } from "../controllers/workspace.controller";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createWorkspaceBodySchema } from "../schema/workspace.schema";

const router = express();

router.use(authentication);

router.post("/", validateReqBody(createWorkspaceBodySchema), createWorkspace);

export default router;
