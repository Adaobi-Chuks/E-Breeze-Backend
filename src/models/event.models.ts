import { model, Schema } from "mongoose";

const eventSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
}, {
    timestamps: true
});

const Event = model("event", eventSchema);
export default Event;