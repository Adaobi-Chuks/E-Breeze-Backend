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
const event_models_1 = __importDefault(require("../models/event.models"));
class EventService {
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdEvent = yield event_models_1.default.create(event);
            return yield event_models_1.default.findOne({ _id: createdEvent.id }, "-__v");
        });
    }
    findOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_models_1.default.findOne(param, "-__v").populate("registeredUsers");
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_models_1.default.find({}, "-__v");
        });
    }
    register(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield event_models_1.default.findById(eventId);
            event === null || event === void 0 ? void 0 : event.registeredUsers.push(userId);
            yield event.save();
            return yield event_models_1.default.findById(eventId).populate("registeredUsers");
        });
    }
}
exports.default = EventService;
