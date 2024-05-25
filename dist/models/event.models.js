"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    entry: {
        type: String,
        required: true,
        enum: ["free", "ticketed"],
        trim: true
    },
    eventMode: {
        type: String,
        required: true,
        enum: ["physical", "virtual"],
        trim: true
    },
    registeredUsers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user"
        }]
}, {
    timestamps: true
});
const Event = (0, mongoose_1.model)("event", eventSchema);
exports.default = Event;
