import IEvent from "../interfaces/event.interfaces";
import Event from "../models/event.models";

export default class EventService {
    async create(event: Partial<IEvent>) {
        const createdEvent = await Event.create(event);
        return await Event.findOne({ _id: createdEvent.id}, "-__v");
    }

    async findOne(param: any) {
        return await Event.findOne(param, "-__v").populate("registeredUsers");
    }

    async fetchAll() {
        return await Event.find({}, "-__v");
    }

    async register(userId: string, eventId: string) {
        const event = await Event.findById(eventId);
        event?.registeredUsers.push(userId as any);
        await event!.save();
        return await Event.findById(eventId).populate("registeredUsers");
    }
}