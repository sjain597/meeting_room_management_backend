import * as Joi from "joi";

export const sendMailRequestBody = Joi.object().keys({
    email : Joi.string().required().messages({
        "any.required": "Email Id is required",
    }),
    subject : Joi.string().required().messages({
        "any.required": "Subject is required",
    }),
    body : Joi.string().required().messages({
        "any.required": "Email Body is required",
    })

}).pattern(/./, Joi.any());