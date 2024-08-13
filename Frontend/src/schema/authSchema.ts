import { z } from "zod";
export const createUserBodySchema = z
  .object({
    id: z.number().optional(),

    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(5, "Username must be at least 5 characters."),

    email: z.string().email("Invalid email format"),

    password: z.string().min(5, "Password must be at least 5 characters."),
    confirmPassword: z.string(),
  })
  .strip();

export const loginUserBodySchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5, "Password must be at least 5 characters."),
  })
  .strip();
