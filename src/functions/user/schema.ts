import * as Joi from "joi";

export const CreateUserRequestBody = Joi.object().keys({
    email : Joi.string().required().messages({
        'any.required' : 'Email Id was not provided'
    }),
    name : Joi.string().required().messages({
        'any.required' : 'Name was not provided'
    }),
    url : Joi.string().optional()
})