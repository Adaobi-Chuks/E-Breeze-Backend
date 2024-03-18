import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    date: Joi.string().required().min(3).max(100).trim(),
    time: Joi.string().required().min(3).max(100).trim(),
    entry: Joi.string().required().min(3).max(100).trim().valid("free", "ticketed"),
    eventMode: Joi.string().required().min(3).max(100).trim().valid("physical", "virtual"),
    registeredUsers: Joi.array().items(
        Joi.string().regex(objectIdPattern)
    )
});

export {
    createSchema
}