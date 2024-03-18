"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const createSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100).trim(),
    date: joi_1.default.string().required().min(3).max(100).trim(),
    time: joi_1.default.string().required().min(3).max(100).trim(),
    entry: joi_1.default.string().required().min(3).max(100).trim().valid("free", "ticketed"),
    eventMode: joi_1.default.string().required().min(3).max(100).trim().valid("physical", "virtual"),
    registeredUsers: joi_1.default.array().items(joi_1.default.string().regex(objectIdPattern))
});
exports.createSchema = createSchema;
