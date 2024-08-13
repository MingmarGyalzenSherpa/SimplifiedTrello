import { createUserBodySchema } from "../schema/authSchema";
import { z } from "zod";

export interface ISignupCredential
  extends z.infer<typeof createUserBodySchema> {}
