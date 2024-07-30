import joi from "joi";
export const createCardBodySchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
    }),
    description: joi.string().optional(),
    position: joi.number().required().messages({
      "any.required": "Position is required",
      "base.number": "Position must be a number",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const updateCardBodySchema = joi
  .object({
    title: joi.string().required().optional(),
    description: joi.string().optional(),
    position: joi.number().optional().messages({
      "base.number": "Position must be a number",
    }),
  })
  .options({
    stripUnknown: true,
  });
