import { Router } from "express";
import AuthController from '../controllers/user.controllers';
import validate from "../middlewares/validate.middleware";
import { createSchema, loginSchema } from "../schemas/user.schemas";
const router = Router();
const {
    createUser,
    login
} = new AuthController();

//create a user or signup
router.post("/", validate(createSchema), createUser);

//login a user
router.post("/login", validate(loginSchema), login);

export default router;