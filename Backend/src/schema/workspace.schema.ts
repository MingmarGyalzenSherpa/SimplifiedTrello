import joi from "joi";
export const createWorkspaceBodySchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const addUserToWorkspaceBodySchema = joi
  .object({
    email: joi.string().required().messages({
      "any.required": "Email is required",
    }),
  })
  .options({
    stripUnknown: true,
  });
