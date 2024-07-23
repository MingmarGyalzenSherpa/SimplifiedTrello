import joi from "joi";
export const createWorkspaceBodySchema = joi.object({
  title: joi.string().required().messages({
    "any.required": "Title is required",
  }),
});
