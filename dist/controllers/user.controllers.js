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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_services_1 = __importDefault(require("../services/user.services"));
const { create, findOne, generateAuthToken } = new user_services_1.default();
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            //checks if another user with email exists
            if (yield findOne({ email: email })) {
                //sends an error if the email exists
                return res.status(409)
                    .send({
                    success: false,
                    message: "Email already exists"
                });
            }
            //creates a user if the email and phonenumber doesn't exist
            const createdUser = yield create(req.body);
            const { _id, name, email: Email } = createdUser;
            const token = generateAuthToken(createdUser);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: (3 * 24 * 60 * 60) * 1000
            });
            return res.status(201)
                .send({
                success: true,
                message: "Successfully signed up",
                user: { id: _id, name, email: Email },
                token
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const _user = yield findOne({ email: email });
            if (!_user) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "Invalid credentials"
                });
            }
            const validPassword = yield bcrypt_1.default.compare(password, _user.password);
            if (!validPassword) {
                return res.status(400)
                    .send({
                    success: false,
                    message: "Invalid credentials"
                });
            }
            const token = generateAuthToken(_user);
            const { _id, name, email: Email } = _user;
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: (3 * 24 * 60 * 60) * 1000
            });
            return res.status(200).send({
                success: true,
                message: "Successfully logged in",
                user: { id: _id, name, email: Email },
                token
            });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield findOne({ _id: req.params.id });
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
        });
    }
}
exports.default = UserController;
