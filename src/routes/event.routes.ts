import { Router } from "express";
import EventController from '../controllers/event.controllers';
import validate from "../middlewares/validate.middleware";
import { createSchema } from "../schemas/event.schemas";
const router = Router();
const {
    createEvent,
    find,
    fetchAll,
    register
} = new EventController();

//create a event or signup
router.post("/", validate(createSchema), createEvent);
//find a event
router.get("/:id", find);
//fetch all event
router.get("/", fetchAll);
//register for an event
router.patch("/:eventId/:userId", register);

export default router;