"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_schemas_1 = require("../schemas/user.schemas");
const router = (0, express_1.Router)();
const { createUser, login } = new user_controllers_1.default();
//create a user or signup
router.post("/", (0, validate_middleware_1.default)(user_schemas_1.createSchema), createUser);
//login a user
router.post("/login", (0, validate_middleware_1.default)(user_schemas_1.loginSchema), login);
exports.default = router;
