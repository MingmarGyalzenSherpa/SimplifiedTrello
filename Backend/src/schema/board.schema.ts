import joi from "joi";
export const createBoardBodySchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
    }),
    description: joi.string().optional(),
    backgroundColor: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });

export const updateBoardBodySchema = joi
  .object({
    title: joi.string().required().optional(),
    description: joi.string().optional(),
    backgroundColor: joi.string().optional(),
  })
  .options({
    stripUnknown: true,
  });
