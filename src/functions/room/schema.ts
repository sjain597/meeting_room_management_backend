import * as Joi from "joi";


export const DeleteRoomBody=Joi.object().keys({
    roomId: Joi.string().required().messages({
        'any.required' : 'RoomId was not provided'
    })
})


export const EditRoomBody=Joi.object().keys({
    roomId: Joi.string().required().messages({
        'any.required' : 'RoomId was not provided'
    }),
    seats: Joi.number().required().messages({
        'any.required' : 'seats were not mentioned'
    }),
    whiteboard: Joi.boolean().required().messages({
        'any.required' : 'requirment of the whiteboard is not mentioned'
    }),
    roomName: Joi.string().required().messages({
        'any.required' : 'RoomName was not mentioned'
    }),
    projector: Joi.boolean().required().messages({
        'any.required' : 'requirment of the projector is not mentione'
    }),
})

export const AddRoomBody=Joi.object().keys({
    seats: Joi.number().required().messages({
        'any.required' : 'seats were not mentioned'
    }),
    whiteboard: Joi.boolean().required().messages({
        'any.required' : 'requirment of the whiteboard is not mentioned'
    }),
    roomName: Joi.string().required().messages({
        'any.required' : 'RoomName was not mentioned'
    }),
    projector: Joi.boolean().required().messages({
        'any.required' : 'requirment of the projector is not mentione'
    }),
})