"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controllers_1 = __importDefault(require("../controllers/event.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const event_schemas_1 = require("../schemas/event.schemas");
const router = (0, express_1.Router)();
const { createEvent, find, fetchAll, register } = new event_controllers_1.default();
//create a event
router.post("/", (0, validate_middleware_1.default)(event_schemas_1.createSchema), createEvent);
//find a event
router.get("/:id", find);
//fetch all event
router.get("/", fetchAll);
//register for an event
router.patch("/register/:eventId/:userId", register);
exports.default = router;
