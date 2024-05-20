import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "../services/user.services";
import IUser from "../interfaces/user.interfaces";
const {
  create,
  findOne,
  generateAuthToken
} = new UserService();

export default class UserController {
  async createUser(req: Request, res: Response) {
    const { email } = req.body;

    //checks if another user with email exists
    if (await findOne({ email: email })) {
      //sends an error if the email exists
      return res.status(409)
        .send({
          success: false,
          message: "Email already exists"
        });
    }

    //creates a user if the email and phonenumber doesn't exist
    const createdUser = await create(req.body);
    const token = generateAuthToken(createdUser as any);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: (3 * 24 * 60 * 60) * 1000
    });
    return res.status(201)
      .send({
        success: true,
        message: "Successfully signed up",
        user: createdUser,
        token
      });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const _user = await findOne({ email: email });
    if (!_user) {
      return res.status(400)
        .send({
          success: false,
          message: "Invalid credentials"
        });
    }
    const validPassword = await bcrypt.compare(password, _user.password);
    if (!validPassword) {
      return res.status(400)
        .send({
          success: false,
          message: "Invalid credentials"
        });
    }
    const token = generateAuthToken(_user as unknown as IUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: (3 * 24 * 60 * 60) * 1000
    });
    return res.status(200).send({
      success: true,
      message: "Successfully logged in",
      user: _user,
      token
    });
  }

  async getUser(req: Request, res: Response) {
    const user = await findOne({ _id: req.params.id });
    if (user) {
      return res.status(200)
        .send({
          success: true,
          message: "User fetched successfully",
          user
        });
    }
    return res.status(404)
      .send({
        success: false,
        message: "User not found"
      });
  }
}