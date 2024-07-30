import { loginUserBodySchema } from "../schema/authSchema";
import { z } from "zod";
export interface ILoginCredential extends z.infer<typeof loginUserBodySchema> {}
