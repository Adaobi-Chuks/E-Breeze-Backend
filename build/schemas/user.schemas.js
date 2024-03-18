"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100).trim(),
    email: joi_1.default.string().email().required().lowercase().trim(),
    password: joi_1.default.string().required().min(6).max(50)
});
exports.createSchema = createSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().lowercase().trim(),
    password: joi_1.default.string().required().min(6).max(50)
});
exports.loginSchema = loginSchema;
