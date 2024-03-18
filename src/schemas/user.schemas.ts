import Joi from "joi";

const createSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(6).max(50)
});
const loginSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(6).max(50)
});

export {
    createSchema,
    loginSchema
}