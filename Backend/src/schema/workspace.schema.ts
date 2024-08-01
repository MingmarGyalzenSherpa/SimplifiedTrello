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
    userId: joi.number().required().messages({
      "any.required": "User id is required",
    }),
  })
  .options({
    stripUnknown: true,
  });
