import * as Joi from "joi";

export const ChangeMemberRoleRequestBody = Joi.object().keys({
    userId : Joi.string().required().messages({
        'any.required' : 'User Id was not provided'
    }),
    isAdmin : Joi.boolean().required().messages({
        'any.required' : 'Admin config not provided'
    })
})