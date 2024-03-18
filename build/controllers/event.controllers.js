"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_services_1 = __importDefault(require("../services/event.services"));
const user_services_1 = __importDefault(require("../services/user.services"));
const { create, findOne, fetchAll, register } = new event_services_1.default();
const userService = new user_services_1.default();
class EventController {
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            //checks if another event with name exists
            if (yield findOne({ name: name })) {
                //sends an error if the name exists
                return res.status(409)
                    .send({
                    success: false,
                    message: "Event name already exists"
                });
            }
            //creates a event if the name doesn't exist
            const createdEvent = yield create(req.body);
            return res.status(201)
                .send({
                success: true,
                message: "Event successfully created",
                event: createdEvent
            });
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _event = yield findOne({ _id: id });
            if (!_event) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "Event doesn't exist"
                });
            }
            return res.status(200).send({
                success: true,
                message: "Event fetched successfully",
                event: _event
            });
        });
    }
    fetchAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _event = yield fetchAll();
            return res.status(200).send({
                success: true,
                message: "Events fetched successfully",
                event: _event
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, userId } = req.params;
            const event = yield findOne({ _id: eventId });
            const user = yield userService.findOne({ _id: userId });
            if (!event) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "Event doesn't exist"
                });
            }
            if (!user) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "User doesn't exist"
                });
            }
            if (event.registeredUsers.includes(userId)) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "User already registered"
                });
            }
            const updatedEvent = yield register(userId, eventId);
            return res.status(200).send({
                success: true,
                message: "User registered successfully for the event",
                event: updatedEvent
            });
        });
    }
}
exports.default = EventController;
