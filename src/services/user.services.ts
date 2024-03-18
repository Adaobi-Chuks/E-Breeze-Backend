import IUser from "../interfaces/user.interfaces";
import User from "../models/user.models";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET!;

export default class UserService {
    async create(user: Partial<IUser>) {
        const createdUser = await User.create(user);
        return await User.findOne({ _id: createdUser.id}, "-__v -password");
    }

    async findOne(param: any) {
        return await User.findOne(param, "-__v");
    }

    generateAuthToken (user: IUser) {
        return jwt.sign({
            id: user.id,
            email: user.email
        }, secret, {
            expiresIn: (3 * 24 * 60 * 60)
        });
    }    
}