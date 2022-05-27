import * as Joi from "joi";

export const validateRequest = (
  schema: Joi.Schema,
  event: { [key: string]: any }
) => {
  if (event) {
    const result = schema.validate(event);
    if (result && result.error && result.error.message) {
      return { message: result.error.message };
    }
    return 0;
  }
  return 0;
};