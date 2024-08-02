import joi from "joi";
export const createUserBodySchema = joi
  .object({
    id: joi.number().optional(),

    firstName: joi.string().required().messages({
      "any.required": "First name is required.",
      "string.empty": "First name is required",
    }),
    lastName: joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name is required",
    }),
    username: joi.string().required().messages({
      "any.required": "Username is required.",
      "string.empty": "Username is required",
    }),

    email: joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.email": "Not a valid email",
      "string.empty": "Email is required",
    }),

    password: joi.string().min(5).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least five characters.",
      "string.empty": "Password is required",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const loginUserBodySchema = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Not a valid email",
    "string.empty": "Email is required",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is required",
  }),
});

export const getUserQuerySchema = joi
  .object({
    q: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });
