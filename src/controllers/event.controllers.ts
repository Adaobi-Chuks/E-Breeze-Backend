import { Request, Response } from "express";
import EventService from "../services/event.services";
import UserService from "../services/user.services";
const {
  create,
  findOne,
  fetchAll,
  register
} = new EventService();
const userService = new UserService();

export default class EventController {
    async createEvent(req: Request, res: Response) {
        const {name} = req.body;
        
        //checks if another event with name exists
        if (await findOne({name: name})) {
        //sends an error if the name exists
        return res.status(409)
        .send({
            success: false,
            message: "Event name already exists"
        });
        }
        
        //creates a event if the name doesn't exist
        const createdEvent = await create(req.body);
        return res.status(201)
        .send({
            success: true,
            message: "Event successfully created",
            event: createdEvent
        });
    }

    async find(req: Request, res: Response) {
        const {id} = req.params;
        const _event = await findOne({_id: id});
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
    }

    async fetchAll(req: Request, res: Response) {
        const _event = await fetchAll();
        return res.status(200).send({
            success: true,
            message: "Events fetched successfully",
            event: _event
        });
    }

    async register(req: Request, res: Response) {
        const {eventId, userId} = req.params;
        const event = await findOne({_id: eventId});
        const user = await userService.findOne({_id: userId});
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
        if(event.registeredUsers.includes(userId as any)) {
            return res.status(400)
            .send({ 
                success: false, 
                message: "User already registered"
            });
        }
        const updatedEvent = await register(userId, eventId);
        return res.status(200).send({
            success: true,
            message: "User registered successfully for the event",
            event: updatedEvent
        });
    }
}