import { Router } from "express";
import UserController from '../controllers/user.controllers';
const router = Router();
const {
    getUser
} = new UserController();

//get a user
router.get("/:id", getUser);

export default router;