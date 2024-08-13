import { z } from "zod";
export const createBoardBodySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
  })
  .strip();
