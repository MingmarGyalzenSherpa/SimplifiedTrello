import joi from "joi";
export const createListBodySchema = joi
  .object({
    title: joi.string().required().messages({
      "any.required": "Title is required",
    }),
    position: joi.number().required().messages({
      "any.required": "Position is required",
      "base.number": "Position must be a number",
    }),
  })
  .options({
    stripUnknown: true,
  });

export const updateListBodySchema = joi
  .object({
    title: joi.string().required().optional(),
    position: joi.number().optional().messages({
      "base.number": "Position must be a number",
    }),
  })
  .options({
    stripUnknown: true,
  });
