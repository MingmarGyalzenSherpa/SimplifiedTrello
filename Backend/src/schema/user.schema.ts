import joi from "joi";
export const createUserBodySchema = joi
  .object({
    id: joi.number().optional(),

    username: joi.string().required().messages({
      "any.required": "Username is required.",
    }),

    first_name: joi.string().required().messages({
      "any.required": "First name is required.",
    }),
    last_name: joi.string().required().messages({
      "any.required": "Last name is required",
    }),

    email: joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.email": "Not a valid email",
    }),

    password: joi.string().min(5).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least five characters.",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const loginUserBodySchema = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Not a valid email",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is required",
  }),
});
